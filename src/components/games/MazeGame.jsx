import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';
import { Compass, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const MAZE_LEVELS = [
  {
    id: 1,
    name: 'Mức 1: Mê cung Vườn Sao (Dễ)',
    rows: 6,
    cols: 6,
    start: { r: 0, c: 0 },
    exit: { r: 5, c: 5 },
    // 1 is wall, 0 is path
    grid: [
      [0, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 0],
    ],
    chips: [{ r: 0, c: 4 }, { r: 2, c: 1 }, { r: 5, c: 2 }],
  },
  {
    id: 2,
    name: 'Mức 2: Mê cung Lõi Vi Mạch (Trung bình)',
    rows: 7,
    cols: 7,
    start: { r: 0, c: 0 },
    exit: { r: 6, c: 6 },
    grid: [
      [0, 0, 0, 1, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ],
    chips: [{ r: 0, c: 5 }, { r: 2, c: 2 }, { r: 4, c: 1 }, { r: 6, c: 4 }],
  },
  {
    id: 3,
    name: 'Mức 3: Mê cung Vũ Trụ (Thử thách)',
    rows: 8,
    cols: 8,
    start: { r: 0, c: 0 },
    exit: { r: 7, c: 7 },
    grid: [
      [0, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
    ],
    chips: [{ r: 1, c: 3 }, { r: 3, c: 4 }, { r: 5, c: 1 }, { r: 6, c: 5 }],
  },
];

export default function MazeGame({ onComplete }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLvl = MAZE_LEVELS[levelIdx];
  const [playerPos, setPlayerPos] = useState({ ...currentLvl.start });
  const [collectedChips, setCollectedChips] = useState({});
  const [steps, setSteps] = useState(0);
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [feedback, setFeedback] = useState('Dùng phím mũi tên hoặc nút ảo để đưa Bé Bít thu thập chip và về đích!');
  const [robotMood, setRobotMood] = useState('welcome');

  useEffect(() => {
    setPlayerPos({ ...currentLvl.start });
    setCollectedChips({});
    setSteps(0);
    setRobotMood('welcome');
    setFeedback(`Bắt đầu ${currentLvl.name}!`);
  }, [levelIdx]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        movePlayer(-1, 0);
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        movePlayer(1, 0);
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        movePlayer(0, -1);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        movePlayer(0, 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const movePlayer = (dr, dc) => {
    if (isWon) return;

    const nr = playerPos.r + dr;
    const nc = playerPos.c + dc;

    // Boundary check
    if (nr < 0 || nr >= currentLvl.rows || nc < 0 || nc >= currentLvl.cols) {
      sounds.playWrong();
      return;
    }

    // Wall check
    if (currentLvl.grid[nr][nc] === 1) {
      sounds.playWrong();
      setRobotMood('encouraging');
      setFeedback('Chạm tường rồi! Hãy rẽ hướng khác nhé!');
      return;
    }

    sounds.playStep();
    setPlayerPos({ r: nr, c: nc });
    setSteps(s => s + 1);

    // Check chip pickup
    const chipKey = `${nr}-${nc}`;
    const isChipHere = currentLvl.chips.some(ch => ch.r === nr && ch.c === nc);
    if (isChipHere && !collectedChips[chipKey]) {
      sounds.playCorrect();
      setCollectedChips(prev => ({ ...prev, [chipKey]: true }));
      setScore(s => s + 25);
      setRobotMood('celebrating');
      setFeedback('Thu thập được 1 chip năng lượng ⭐!');
    }

    // Check exit reach
    if (nr === currentLvl.exit.r && nc === currentLvl.exit.c) {
      const allChipsCount = currentLvl.chips.length;
      const collectedCount = Object.keys({ ...collectedChips, ...(isChipHere ? { [chipKey]: true } : {}) }).length;

      if (collectedCount < allChipsCount) {
        sounds.playWrong();
        setRobotMood('thinking');
        setFeedback(`Em cần thu thập đủ tất cả ${allChipsCount} chip sao mới có thể mở cửa thoát hiểm nhé!`);
        return;
      }

      sounds.playStar();
      if (levelIdx < MAZE_LEVELS.length - 1) {
        setRobotMood('celebrating');
        setFeedback(`Xuất sắc! Hoàn thành ${currentLvl.name}!`);
        setTimeout(() => {
          setLevelIdx(l => l + 1);
        }, 1500);
      } else {
        setIsWon(true);
        setRobotMood('proud');
        if (onComplete) onComplete(150);
      }
    }
  };

  const chipsCollectedCount = Object.keys(collectedChips).length;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderRadius: '20px',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '14px', color: '#f59e0b' }}>
            <Compass size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 8: Mê Cung Robot Bé Bít
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Rèn luyện: Khả năng định hướng không gian và tư duy giải quyết vấn đề
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {MAZE_LEVELS.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => setLevelIdx(idx)}
              style={{
                padding: '6px 12px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                background: levelIdx === idx ? '#8b5cf6' : '#f1edff',
                color: levelIdx === idx ? '#ffffff' : '#6d28d9',
              }}
            >
              Mức {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {!isWon ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', alignItems: 'start' }}>
          {/* Maze Board */}
          <div
            className="card-3d"
            style={{
              padding: '20px',
              borderRadius: '22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Status bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6' }}>
                ⭐ Chip sao: {chipsCollectedCount} / {currentLvl.chips.length}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#047857' }}>
                👟 Bước đi: {steps}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#b45309' }}>
                Điểm: {score}đ
              </span>
            </div>

            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${currentLvl.cols}, 1fr)`,
                gap: '4px',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: `${currentLvl.cols}/${currentLvl.rows}`,
                background: '#ede9fe',
                padding: '8px',
                borderRadius: '16px',
              }}
            >
              {currentLvl.grid.map((row, r) =>
                row.map((cell, c) => {
                  const isPlayer = playerPos.r === r && playerPos.c === c;
                  const isExit = currentLvl.exit.r === r && currentLvl.exit.c === c;
                  const chipKey = `${r}-${c}`;
                  const isChip = currentLvl.chips.some(ch => ch.r === r && ch.c === c) && !collectedChips[chipKey];
                  const isWall = cell === 1;

                  return (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        background: isPlayer
                          ? '#c4b5fd'
                          : isWall
                          ? '#475569'
                          : isExit
                          ? '#86efac'
                          : '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        position: 'relative',
                        boxShadow: isWall ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none',
                        transition: 'background 0.15s',
                      }}
                    >
                      {isPlayer && <span>🤖</span>}
                      {isChip && !isPlayer && <span>⭐</span>}
                      {isExit && !isPlayer && <span>🚪</span>}
                    </div>
                  );
                })
              )}
            </div>

            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '12px', textAlign: 'center' }}>
              🤖 Robot Bé Bít | ⭐ Chip sao cần thu thập | 🚪 Cổng về đích
            </p>
          </div>

          {/* Controls & D-pad */}
          <div
            className="card-3d"
            style={{
              padding: '20px',
              borderRadius: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '340px',
            }}
          >
            <div>
              <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BeBitRobot mood={robotMood} size="small" screenText="🧭" />
                <p style={{ fontSize: '13px', color: '#4c1d95', fontWeight: 'bold', margin: 0 }}>
                  {feedback}
                </p>
              </div>

              {/* Virtual D-pad (Lên, Xuống, Trái, Phải) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '14px 0' }}>
                <button
                  className="btn-bouncy"
                  onClick={() => movePlayer(-1, 0)}
                  style={{
                    width: '60px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#ede9fe',
                    color: '#6d28d9',
                    border: '2px solid #c4b5fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(139, 92, 246, 0.15)',
                  }}
                  title="Đi Lên (Phím mũi tên Lên)"
                >
                  <ArrowUp size={24} />
                </button>

                <div style={{ display: 'flex', gap: '18px' }}>
                  <button
                    className="btn-bouncy"
                    onClick={() => movePlayer(0, -1)}
                    style={{
                      width: '60px',
                      height: '56px',
                      borderRadius: '16px',
                      background: '#ede9fe',
                      color: '#6d28d9',
                      border: '2px solid #c4b5fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(139, 92, 246, 0.15)',
                    }}
                    title="Sang Trái (Phím mũi tên Trái)"
                  >
                    <ArrowLeft size={24} />
                  </button>

                  <button
                    className="btn-bouncy"
                    onClick={() => movePlayer(1, 0)}
                    style={{
                      width: '60px',
                      height: '56px',
                      borderRadius: '16px',
                      background: '#ede9fe',
                      color: '#6d28d9',
                      border: '2px solid #c4b5fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(139, 92, 246, 0.15)',
                    }}
                    title="Đi Xuống (Phím mũi tên Xuống)"
                  >
                    <ArrowDown size={24} />
                  </button>

                  <button
                    className="btn-bouncy"
                    onClick={() => movePlayer(0, 1)}
                    style={{
                      width: '60px',
                      height: '56px',
                      borderRadius: '16px',
                      background: '#ede9fe',
                      color: '#6d28d9',
                      border: '2px solid #c4b5fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(139, 92, 246, 0.15)',
                    }}
                    title="Sang Phải (Phím mũi tên Phải)"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button
                className="btn-bouncy"
                onClick={() => {
                  setPlayerPos({ ...currentLvl.start });
                  setCollectedChips({});
                  setSteps(0);
                  setFeedback('Đã đặt lại vị trí xuất phát!');
                }}
                style={{
                  background: '#f1f5f9',
                  color: '#64748b',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={14} /> Chơi lại màn này
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <div
          className="card-3d"
          style={{
            padding: '40px 24px',
            borderRadius: '26px',
            textAlign: 'center',
          }}
        >
          <Trophy size={60} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4c1d95', marginBottom: '8px' }}>
            Xuất Sắc! Bậc Thầy Vượt Mê Cung Robot!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Em đã đưa Bé Bít vượt qua cả 3 mê cung kỳ bí, thu thập đầy đủ chip sao năng lượng và về đích an toàn!
          </p>
          <div style={{ background: '#fef3c7', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm đạt được: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={() => {
                setLevelIdx(0);
                setIsWon(false);
              }}
            >
              <RotateCcw size={18} />
              <span>Chơi lại từ đầu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
