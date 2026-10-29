import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../../utils/audio';
import { MousePointer, CheckCircle, RefreshCw, Trophy, Zap, AlertCircle } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

export default function MouseGame({ onComplete }) {
  const [stage, setStage] = useState('menu'); // menu, playing, won
  const [level, setLevel] = useState(1); // 1: click, 2: dblclick, 3: contextmenu, 4: drag
  const [score, setScore] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [timeLeft, setTimeLeft] = useState(25);
  const [currentGoal, setCurrentGoal] = useState(5);
  const [itemsCollected, setItemsCollected] = useState(0);
  const [feedback, setFeedback] = useState('Sẵn sàng thao tác chuột nhé!');
  const [robotMood, setRobotMood] = useState('normal');
  const [isDragging, setIsDragging] = useState(false);
  const boardRef = useRef(null);

  const levelConfigs = {
    1: { name: 'Thao tác 1: Nhấp chuột đơn (Click)', tip: 'Nhấp chuột trái 1 lần vào bánh răng!', targetType: 'gear', icon: '⚙️', goal: 5 },
    2: { name: 'Thao tác 2: Nhấp đúp chuột (Double click)', tip: 'Nhấp nhanh nút chuột trái 2 lần liên tiếp vào chiếc hộp!', targetType: 'box', icon: '📦', goal: 5 },
    3: { name: 'Thao tác 3: Nhấp chuột phải (Right-click)', tip: 'Nhấp nút chuột phải vào chip điện tử!', targetType: 'chip', icon: '💡', goal: 4 },
    4: { name: 'Thao tác 4: Rê và kéo thả (Drag & Drop)', tip: 'Nhấn giữ chuột kéo viên pin vào trạm sạc Bé Bít!', targetType: 'battery', icon: '🔋', goal: 4 },
  };

  const spawnRandomPos = () => {
    // Keep target inside the 80% inner box
    const x = Math.floor(Math.random() * 70) + 10;
    const y = Math.floor(Math.random() * 60) + 15;
    setTargetPos({ x, y });
  };

  const startGame = (lvl = 1) => {
    setLevel(lvl);
    setScore(0);
    setItemsCollected(0);
    setTimeLeft(25);
    setCurrentGoal(levelConfigs[lvl].goal);
    setStage('playing');
    setRobotMood('happy');
    setFeedback(levelConfigs[lvl].tip);
    spawnRandomPos();
  };

  // Timer
  useEffect(() => {
    if (stage !== 'playing') return;
    if (timeLeft <= 0) {
      if (itemsCollected >= currentGoal) {
        handleLevelPass();
      } else {
        sounds.playWrong();
        setRobotMood('sad');
        setFeedback('Hết giờ rồi! Thử lại để rèn đôi tay nhanh nhẹn hơn nhé!');
        setStage('menu');
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, timeLeft, itemsCollected, currentGoal]);

  const handleTargetAction = (actionType, e) => {
    if (stage !== 'playing') return;
    e.preventDefault();

    if (level === 1 && actionType === 'click') {
      successHit('Tuyệt vời! Nhấp chuột trái rất chuẩn!');
    } else if (level === 2 && actionType === 'dblclick') {
      successHit('Hoan hô! Nhấp đúp chuột siêu nhanh!');
    } else if (level === 3 && actionType === 'contextmenu') {
      successHit('Đúng rồi! Bạn đã mở lệnh bằng chuột phải!');
    }
  };

  const successHit = (msg) => {
    sounds.playCorrect();
    setScore(s => s + 20);
    const nextCollected = itemsCollected + 1;
    setItemsCollected(nextCollected);
    setFeedback(msg);
    setRobotMood('happy');

    if (nextCollected >= currentGoal) {
      handleLevelPass();
    } else {
      spawnRandomPos();
    }
  };

  const handleLevelPass = () => {
    sounds.playStar();
    if (level < 4) {
      setFeedback(`Chúc mừng em hoàn thành ${levelConfigs[level].name}!`);
      setTimeout(() => {
        startGame(level + 1);
      }, 1500);
    } else {
      setStage('won');
      setRobotMood('happy');
      setFeedback('Xuất sắc! Em đã thành thạo toàn bộ các thao tác chuột máy tính!');
      if (onComplete) onComplete(100);
    }
  };

  // Drag and drop logic for level 4
  const handleDropToStation = () => {
    if (level === 4) {
      successHit('Đã nạp pin thành công cho Bé Bít!');
      setIsDragging(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff',
          padding: '12px 20px',
          borderRadius: '16px',
          boxShadow: '0 4px 14px rgba(139, 92, 246, 0.08)',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#ede9fe', padding: '10px', borderRadius: '12px', color: '#8b5cf6' }}>
            <MousePointer size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 1: Bắt linh kiện Robot (Thao tác Chuột)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6387' }}>
              Rèn luyện: Nhấp đơn, Nhấp đúp, Chuột phải và Kéo thả chuột
            </p>
          </div>
        </div>

        {stage === 'playing' && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Thời gian</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: timeLeft <= 5 ? '#ef4444' : '#8b5cf6' }}>
                ⏱️ {timeLeft}s
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Thu thập</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                ⭐ {itemsCollected}/{currentGoal}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Điểm</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>
                {score}đ
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Game Stage */}
      {stage === 'menu' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '32px 20px',
            textAlign: 'center',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.1)',
          }}
        >
          <BeBitRobot mood="happy" bubble="Cùng Bé Bít luyện tập đôi bàn tay vàng với chuột máy tính nhé!" size="medium" />
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4c1d95', margin: '16px 0 8px' }}>
            4 Cấp độ thử thách thao tác chuột
          </h3>
          <p style={{ color: '#6b6387', fontSize: '14px', maxWidth: '500px', margin: '0 auto 24px' }}>
            1. Nhấp đơn (Click) • 2. Nhấp đúp (Double-click) • 3. Chuột phải • 4. Rê & Kéo thả
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-bouncy"
              onClick={() => startGame(1)}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)',
              }}
            >
              <Zap size={20} /> Bắt đầu từ Mức 1
            </button>
          </div>
        </div>
      )}

      {stage === 'playing' && (
        <div
          ref={boardRef}
          style={{
            background: 'linear-gradient(135deg, #fdf4ff 0%, #ede9fe 100%)',
            borderRadius: '20px',
            minHeight: '400px',
            position: 'relative',
            overflow: 'hidden',
            border: '3px dashed #c4b5fd',
            boxShadow: 'inset 0 2px 10px rgba(139, 92, 246, 0.08)',
          }}
          onContextMenu={(e) => {
            // Prevent default right click menu only if in level 3
            if (level === 3) e.preventDefault();
          }}
        >
          {/* Instructions banner */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid #ddd6fe',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4c1d95' }}>
              <span style={{ background: '#8b5cf6', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontSize: '12px' }}>
                Mức {level}
              </span>
              {levelConfigs[level].tip}
            </div>
            <span style={{ fontSize: '13px', color: '#059669', fontWeight: '600' }}>
              {feedback}
            </span>
          </div>

          {/* Target Element for Levels 1, 2, 3 */}
          {level !== 4 && (
            <div
              className="btn-bouncy"
              style={{
                position: 'absolute',
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '3px solid #8b5cf6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(139, 92, 246, 0.25)',
                userSelect: 'none',
                zIndex: 5,
              }}
              onClick={(e) => handleTargetAction('click', e)}
              onDoubleClick={(e) => handleTargetAction('dblclick', e)}
              onContextMenu={(e) => handleTargetAction('contextmenu', e)}
            >
              <span>{levelConfigs[level].icon}</span>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#8b5cf6' }}>
                {level === 1 ? 'Click' : level === 2 ? '2x Click' : 'Phải chuột'}
              </span>
            </div>
          )}

          {/* Level 4: Drag and Drop station */}
          {level === 4 && (
            <div style={{ height: '100%', position: 'relative', minHeight: '380px' }}>
              {/* Draggable Battery */}
              <div
                draggable
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                style={{
                  position: 'absolute',
                  left: `${targetPos.x}%`,
                  top: `${targetPos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '3px solid #10b981',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'grab',
                  boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)',
                  zIndex: 5,
                }}
              >
                <span style={{ fontSize: '32px' }}>🔋</span>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#059669' }}>Kéo tôi đi!</span>
              </div>

              {/* Station of Bé Bít */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropToStation}
                onClick={handleDropToStation} // Mobile touch fallback
                style={{
                  position: 'absolute',
                  right: '30px',
                  bottom: '30px',
                  padding: '16px',
                  borderRadius: '24px',
                  background: isDragging ? '#d1fae5' : 'rgba(255, 255, 255, 0.95)',
                  border: isDragging ? '3px dashed #10b981' : '3px dashed #c4b5fd',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  zIndex: 4,
                }}
              >
                <BeBitRobot mood="thinking" size="small" screenText="⚡" />
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4c1d95', marginTop: '4px' }}>
                  Thả pin vào đây!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {stage === 'won' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '36px 20px',
            textAlign: 'center',
            boxShadow: '0 6px 24px rgba(139, 92, 246, 0.12)',
          }}
        >
          <Trophy size={56} style={{ color: '#f59e0b', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4c1d95', marginBottom: '8px' }}>
            Xuất sắc! Bậc thầy Chuột Máy Tính!
          </h3>
          <p style={{ color: '#6b6387', fontSize: '15px', marginBottom: '16px' }}>
            Em đã hoàn thành xuất sắc 4 thao tác chuột: Click đơn, Click đúp, Chuột phải và Kéo thả.
          </p>
          <div style={{ display: 'inline-block', background: '#fef3c7', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy"
              onClick={() => startGame(1)}
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
              <RefreshCw size={18} /> Chơi lại lần nữa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
