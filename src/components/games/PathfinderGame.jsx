import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';
import { Play, RotateCcw, RotateCw, ArrowUp, Trophy, Sparkles, AlertTriangle } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const LEVELS = [
  {
    id: 1,
    title: 'Mức 1: Đường thẳng nạp năng lượng',
    gridSize: 5,
    start: { x: 0, y: 2, dir: 1 }, // 0: N, 1: E, 2: S, 3: W
    goal: { x: 3, y: 2 },
    obstacles: [{ x: 1, y: 1 }, { x: 1, y: 3 }],
    maxCommands: 5,
  },
  {
    id: 2,
    title: 'Mức 2: Khúc cua khám phá',
    gridSize: 5,
    start: { x: 0, y: 0, dir: 1 },
    goal: { x: 3, y: 3 },
    obstacles: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
    maxCommands: 8,
  },
  {
    id: 3,
    title: 'Mức 3: Thám hiểm mê cung đá',
    gridSize: 5,
    start: { x: 0, y: 4, dir: 0 },
    goal: { x: 4, y: 0 },
    obstacles: [{ x: 0, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    maxCommands: 10,
  },
];

export default function PathfinderGame({ onComplete }) {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const level = LEVELS[currentLevelIdx];
  const [robotPos, setRobotPos] = useState({ ...level.start });
  const [commands, setCommands] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [feedback, setFeedback] = useState('Ghép các câu lệnh rồi bấm nút "Chạy lệnh" nhé!');
  const [robotMood, setRobotMood] = useState('normal');
  const [isWon, setIsWon] = useState(false);

  const resetToStart = () => {
    setRobotPos({ ...level.start });
    setActiveStep(-1);
    setIsRunning(false);
    setRobotMood('normal');
  };

  useEffect(() => {
    resetToStart();
    setCommands([]);
    setFeedback(`Chào mừng em đến với ${level.title}!`);
  }, [currentLevelIdx]);

  const addCommand = (cmd) => {
    if (isRunning) return;
    if (commands.length >= level.maxCommands) {
      setFeedback(`Tối đa ${level.maxCommands} câu lệnh trong màn này!`);
      return;
    }
    sounds.playClick();
    setCommands([...commands, cmd]);
  };

  const removeCommand = (idx) => {
    if (isRunning) return;
    sounds.playClick();
    const newCmds = [...commands];
    newCmds.splice(idx, 1);
    setCommands(newCmds);
  };

  const clearCommands = () => {
    if (isRunning) return;
    sounds.playClick();
    setCommands([]);
    resetToStart();
  };

  const runCommands = async () => {
    if (commands.length === 0 || isRunning) return;
    setIsRunning(true);
    resetToStart();
    setRobotMood('thinking');
    setFeedback('Bé Bít đang di chuyển theo các bước lệnh...');

    let cur = { ...level.start };

    for (let i = 0; i < commands.length; i++) {
      setActiveStep(i);
      const cmd = commands[i];

      // Delay between steps
      await new Promise(r => setTimeout(r, 650));
      sounds.playStep();

      if (cmd === 'FORWARD') {
        let nx = cur.x;
        let ny = cur.y;
        if (cur.dir === 0) ny -= 1; // North
        if (cur.dir === 1) nx += 1; // East
        if (cur.dir === 2) ny += 1; // South
        if (cur.dir === 3) nx -= 1; // West

        // Check bounds
        if (nx < 0 || nx >= level.gridSize || ny < 0 || ny >= level.gridSize) {
          sounds.playWrong();
          setRobotMood('sad');
          setFeedback('Ôi! Bé Bít bị đụng vào mép bản đồ rồi!');
          setIsRunning(false);
          return;
        }

        // Check obstacle
        const hitObstacle = level.obstacles.some(ob => ob.x === nx && ob.y === ny);
        if (hitObstacle) {
          sounds.playWrong();
          setRobotMood('sad');
          setFeedback('Ối! Vấp phải chướng ngại vật rồi! Hãy điều chỉnh lệnh nhé!');
          setIsRunning(false);
          return;
        }

        cur = { ...cur, x: nx, y: ny };
        setRobotPos(cur);
      } else if (cmd === 'LEFT') {
        const ndir = (cur.dir + 3) % 4;
        cur = { ...cur, dir: ndir };
        setRobotPos(cur);
      } else if (cmd === 'RIGHT') {
        const ndir = (cur.dir + 1) % 4;
        cur = { ...cur, dir: ndir };
        setRobotPos(cur);
      }

      // Check if reached goal
      if (cur.x === level.goal.x && cur.y === level.goal.y) {
        sounds.playStar();
        setRobotMood('happy');
        setFeedback('HOAN HÔ! Bé Bít đã thu thập được pin năng lượng!');
        setIsRunning(false);
        if (currentLevelIdx < LEVELS.length - 1) {
          setTimeout(() => {
            setCurrentLevelIdx(c => c + 1);
          }, 1800);
        } else {
          setIsWon(true);
          if (onComplete) onComplete(100);
        }
        return;
      }
    }

    setIsRunning(false);
    if (cur.x !== level.goal.x || cur.y !== level.goal.y) {
      sounds.playWrong();
      setRobotMood('sad');
      setFeedback('Chưa đến được đích rồi! Thử thêm câu lệnh hoặc đổi hướng xem sao nhé!');
    }
  };

  const dirSymbols = ['⬆️', '➡️', '⬇️', '⬅️'];

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff',
          padding: '14px 20px',
          borderRadius: '16px',
          boxShadow: '0 4px 14px rgba(139, 92, 246, 0.08)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px', color: '#f59e0b' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 4: Lập trình Bé Bít thám hiểm (Mô phỏng robot lệnh hướng)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6387' }}>
              Bài học 16: Các bước thực hiện một công việc (Chia nhỏ nhiệm vụ thành chuỗi lệnh logic)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {LEVELS.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => setCurrentLevelIdx(idx)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                background: currentLevelIdx === idx ? '#8b5cf6' : '#f1edff',
                color: currentLevelIdx === idx ? '#ffffff' : '#6b6387',
              }}
            >
              Mức {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {!isWon ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
          {/* Grid Map */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
                gap: '6px',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '1/1',
                background: '#ede9fe',
                padding: '10px',
                borderRadius: '16px',
              }}
            >
              {Array.from({ length: level.gridSize * level.gridSize }).map((_, i) => {
                const x = i % level.gridSize;
                const y = Math.floor(i / level.gridSize);
                const isRobot = robotPos.x === x && robotPos.y === y;
                const isGoal = level.goal.x === x && level.goal.y === y;
                const isObstacle = level.obstacles.some(ob => ob.x === x && ob.y === y);

                return (
                  <div
                    key={i}
                    style={{
                      background: isRobot
                        ? '#d8b4fe'
                        : isGoal
                        ? '#fef08a'
                        : isObstacle
                        ? '#fca5a5'
                        : '#ffffff',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      fontSize: '22px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
                    }}
                  >
                    {isRobot && (
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '24px' }}>🤖</span>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#4c1d95', marginTop: '-4px' }}>
                          {dirSymbols[robotPos.dir]}
                        </div>
                      </div>
                    )}
                    {isGoal && !isRobot && <span>⚡</span>}
                    {isObstacle && <span>🪨</span>}
                  </div>
                );
              })}
            </div>

            <p style={{ fontSize: '13px', color: '#6b6387', marginTop: '12px', textAlign: 'center' }}>
              💡 Robot: 🤖 (hướng mũi tên) | Đích: ⚡ Pin năng lượng | Vật cản: 🪨 Đá
            </p>
          </div>

          {/* Controls & Command Queue */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ background: '#f5f3ff', padding: '10px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #ddd6fe' }}>
                <p style={{ fontSize: '13px', color: '#4c1d95', fontWeight: '600' }}>
                  📢 {feedback}
                </p>
              </div>

              {/* Commands Buttons */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b6387', display: 'block', marginBottom: '8px' }}>
                  CHỌN THẺ LỆNH:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button
                    className="btn-bouncy"
                    disabled={isRunning}
                    onClick={() => addCommand('FORWARD')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#dcfce7',
                      color: '#15803d',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <ArrowUp size={18} />
                    <span>TIẾN 1 BƯỚC</span>
                  </button>

                  <button
                    className="btn-bouncy"
                    disabled={isRunning}
                    onClick={() => addCommand('LEFT')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#ede9fe',
                      color: '#6d28d9',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <RotateCcw size={18} />
                    <span>QUAY TRÁI</span>
                  </button>

                  <button
                    className="btn-bouncy"
                    disabled={isRunning}
                    onClick={() => addCommand('RIGHT')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#fce7f3',
                      color: '#be185d',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <RotateCw size={18} />
                    <span>QUAY PHẢI</span>
                  </button>
                </div>
              </div>

              {/* Command Queue Box */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b6387' }}>
                    DÃY LỆNH ĐÃ XẾP ({commands.length}/{level.maxCommands}):
                  </span>
                  {commands.length > 0 && !isRunning && (
                    <button
                      onClick={clearCommands}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Xóa hết
                    </button>
                  )}
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '8px',
                    minHeight: '80px',
                    maxHeight: '140px',
                    overflowY: 'auto',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  {commands.length === 0 ? (
                    <span style={{ fontSize: '12px', color: '#94a3b8', margin: 'auto' }}>
                      Chưa có lệnh nào. Nhấp các nút trên để thêm lệnh.
                    </span>
                  ) : (
                    commands.map((cmd, idx) => (
                      <div
                        key={idx}
                        onClick={() => removeCommand(idx)}
                        style={{
                          background: activeStep === idx ? '#f59e0b' : '#ffffff',
                          color: activeStep === idx ? '#ffffff' : '#332d4b',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: isRunning ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>{idx + 1}.</span>
                        <span>{cmd === 'FORWARD' ? 'Tiến' : cmd === 'LEFT' ? 'Quay Trái' : 'Quay Phải'}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Run Button */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              <button
                className="btn-bouncy"
                disabled={isRunning || commands.length === 0}
                onClick={runCommands}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '14px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: commands.length === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                }}
              >
                <Play size={18} /> {isRunning ? 'Đang chạy...' : 'Chạy lệnh'}
              </button>

              <button
                className="btn-bouncy"
                disabled={isRunning}
                onClick={resetToStart}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                title="Đặt lại vị trí xuất phát"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px 20px',
            textAlign: 'center',
            boxShadow: '0 6px 24px rgba(139, 92, 246, 0.12)',
          }}
        >
          <Trophy size={56} style={{ color: '#f59e0b', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4c1d95', marginBottom: '8px' }}>
            Xuất sắc! Nhà lập trình nhí siêu tài năng!
          </h3>
          <p style={{ color: '#6b6387', fontSize: '15px', marginBottom: '20px' }}>
            Em đã vượt qua cả 3 mê cung thám hiểm bằng những câu lệnh thuật toán cực kỳ chính xác!
          </p>
          <button
            className="btn-bouncy"
            onClick={() => { setCurrentLevelIdx(0); setIsWon(false); }}
            style={{
              background: '#8b5cf6',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <RotateCcw size={18} /> Chơi lại từ đầu
          </button>
        </div>
      )}
    </div>
  );
}
