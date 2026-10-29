import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { Monitor, Cpu, Keyboard, Mouse, Volume2, Printer, CheckCircle2, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const PARTS = [
  { id: 'screen', name: 'Màn hình máy tính', icon: '🖥️', slot: 'top-center', desc: 'Hiển thị chữ viết, hình vẽ và kết quả làm việc của máy tính' },
  { id: 'cpu', name: 'Thân máy (CPU)', icon: '🖲️', slot: 'bottom-left', desc: 'Bộ não của máy tính, chứa CPU điều khiển và xử lý thông tin' },
  { id: 'keyboard', name: 'Bàn phím máy tính', icon: '⌨️', slot: 'bottom-center', desc: 'Dùng để nhập chữ cái, chữ số và gửi các lệnh vào máy tính' },
  { id: 'mouse', name: 'Chuột máy tính', icon: '🖱️', slot: 'bottom-right', desc: 'Dùng để chỉ trỏ, chọn và mở các chương trình một cách nhanh chóng' },
  { id: 'speaker', name: 'Loa máy tính', icon: '🔊', slot: 'top-right', desc: 'Thiết bị phát âm thanh, lời giảng và bài hát thiếu nhi' },
  { id: 'printer', name: 'Máy in', icon: '🖨️', slot: 'top-left', desc: 'In tranh vẽ và bài tập từ máy tính ra giấy thật' },
];

export default function AssemblyGame({ onComplete }) {
  const [assembled, setAssembled] = useState({});
  const [selectedPart, setSelectedPart] = useState(null);
  const [feedback, setFeedback] = useState('Hãy chọn một bộ phận ở dưới rồi nhấp vào ô trống trên bàn để lắp ráp!');
  const [robotMood, setRobotMood] = useState('welcome');
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);

  const availableParts = PARTS.filter(p => !assembled[p.id]);

  const handleSelectPart = (part) => {
    sounds.playClick();
    setSelectedPart(part);
    setFeedback(`Đang cầm [${part.name}]. Hãy nhấp vào đúng vị trí trên bàn máy tính!`);
    setRobotMood('thinking');
  };

  const handlePlaceToSlot = (slotId) => {
    if (!selectedPart) {
      setFeedback('Hãy nhấp chọn một bộ phận bên dưới trước nhé!');
      return;
    }

    if (selectedPart.slot === slotId) {
      sounds.playCorrect();
      setAssembled(prev => ({
        ...prev,
        [selectedPart.id]: true,
      }));
      setScore(s => s + 20);
      setFeedback(`Chính xác! ${selectedPart.name}: ${selectedPart.desc}`);
      setRobotMood('celebrating');
      setSelectedPart(null);

      // Check win condition
      if (Object.keys(assembled).length + 1 >= PARTS.length) {
        sounds.playStar();
        setIsWon(true);
        setRobotMood('proud');
        if (onComplete) onComplete(120);
      }
    } else {
      sounds.playWrong();
      setRobotMood('encouraging');
      setFeedback(`Chưa đúng vị trí của [${selectedPart.name}] rồi! Hãy thử vị trí khác nhé!`);
    }
  };

  const handleReset = () => {
    setAssembled({});
    setSelectedPart(null);
    setIsWon(false);
    setScore(0);
    setRobotMood('welcome');
    setFeedback('Hãy chọn một bộ phận ở dưới rồi nhấp vào ô trống trên bàn để lắp ráp!');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#ede9fe', padding: '10px', borderRadius: '14px', color: '#8b5cf6' }}>
            <Monitor size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 7: Lắp Ráp Máy Tính Hoàn Chỉnh
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Bài học 3: Nhận biết vị trí và công dụng 4 bộ phận chính và thiết bị ngoại vi
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ĐIỂM SỐ</span>
          <span style={{ fontSize: '18px', fontWeight: '900', color: '#f59e0b' }}>{score}đ</span>
        </div>
      </div>

      {!isWon ? (
        <div>
          {/* Instructions banner */}
          <div
            style={{
              background: '#fdf4ff',
              border: '1px solid #f5d0fe',
              padding: '12px 18px',
              borderRadius: '16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <BeBitRobot mood={robotMood} size="small" screenText="🛠️" />
            <p style={{ fontSize: '14px', color: '#86198f', fontWeight: 'bold', margin: 0 }}>
              📢 {feedback}
            </p>
          </div>

          {/* Computer Desk Workbench (Slots Area) */}
          <div
            className="card-3d"
            style={{
              background: 'linear-gradient(180deg, #f8fafc 0%, #ede9fe 100%)',
              border: '3px solid #ddd6fe',
              borderRadius: '24px',
              padding: '24px',
              minHeight: '380px',
              position: 'relative',
              marginBottom: '20px',
              boxShadow: 'inset 0 4px 12px rgba(139, 92, 246, 0.06)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ background: '#ffffff', padding: '4px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#6d28d9', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                BÀN LÀM VIỆC MÁY TÍNH
              </span>
            </div>

            {/* Top Row Slots: Printer (left) | Screen (center) | Speaker (right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {/* Printer Slot */}
              <div
                className="btn-bouncy"
                onClick={() => handlePlaceToSlot('top-left')}
                style={{
                  height: '110px',
                  background: assembled.printer ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  border: assembled.printer ? '2px solid #10b981' : '2px dashed #a78bfa',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: assembled.printer ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
                }}
              >
                {assembled.printer ? (
                  <>
                    <span style={{ fontSize: '36px' }}>🖨️</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>Máy in</span>
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 'bold' }}>[ Vị trí Máy in ]</span>
                )}
              </div>

              {/* Screen Slot */}
              <div
                className="btn-bouncy"
                onClick={() => handlePlaceToSlot('top-center')}
                style={{
                  height: '130px',
                  background: assembled.screen ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  border: assembled.screen ? '2px solid #10b981' : '2px dashed #8b5cf6',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: assembled.screen ? '0 4px 16px rgba(16, 185, 129, 0.2)' : 'none',
                }}
              >
                {assembled.screen ? (
                  <>
                    <span style={{ fontSize: '48px' }}>🖥️</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#10b981' }}>Màn hình máy tính</span>
                  </>
                ) : (
                  <span style={{ fontSize: '13px', color: '#6d28d9', fontWeight: 'bold' }}>⭐ [ Vị trí Màn hình ]</span>
                )}
              </div>

              {/* Speaker Slot */}
              <div
                className="btn-bouncy"
                onClick={() => handlePlaceToSlot('top-right')}
                style={{
                  height: '110px',
                  background: assembled.speaker ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  border: assembled.speaker ? '2px solid #10b981' : '2px dashed #a78bfa',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: assembled.speaker ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
                }}
              >
                {assembled.speaker ? (
                  <>
                    <span style={{ fontSize: '36px' }}>🔊</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>Loa ngoài</span>
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 'bold' }}>[ Vị trí Loa ]</span>
                )}
              </div>
            </div>

            {/* Bottom Row Slots: CPU (left) | Keyboard (center) | Mouse (right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '16px' }}>
              {/* CPU Slot */}
              <div
                className="btn-bouncy"
                onClick={() => handlePlaceToSlot('bottom-left')}
                style={{
                  height: '110px',
                  background: assembled.cpu ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  border: assembled.cpu ? '2px solid #10b981' : '2px dashed #8b5cf6',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {assembled.cpu ? (
                  <>
                    <span style={{ fontSize: '36px' }}>🖲️</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>Thân máy (CPU)</span>
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#6d28d9', fontWeight: 'bold' }}>⭐ [ Thân máy CPU ]</span>
                )}
              </div>

              {/* Keyboard Slot */}
              <div
                className="btn-bouncy"
                onClick={() => handlePlaceToSlot('bottom-center')}
                style={{
                  height: '90px',
                  background: assembled.keyboard ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  border: assembled.keyboard ? '2px solid #10b981' : '2px dashed #8b5cf6',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {assembled.keyboard ? (
                  <>
                    <span style={{ fontSize: '32px' }}>⌨️</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>Bàn phím</span>
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#6d28d9', fontWeight: 'bold' }}>⭐ [ Bàn phím ]</span>
                )}
              </div>

              {/* Mouse Slot */}
              <div
                className="btn-bouncy"
                onClick={() => handlePlaceToSlot('bottom-right')}
                style={{
                  height: '90px',
                  background: assembled.mouse ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                  border: assembled.mouse ? '2px solid #10b981' : '2px dashed #8b5cf6',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {assembled.mouse ? (
                  <>
                    <span style={{ fontSize: '32px' }}>🖱️</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>Chuột máy tính</span>
                  </>
                ) : (
                  <span style={{ fontSize: '12px', color: '#6d28d9', fontWeight: 'bold' }}>⭐ [ Chuột ]</span>
                )}
              </div>
            </div>
          </div>

          {/* Available Parts Tray */}
          <div
            className="card-3d"
            style={{
              padding: '18px',
              borderRadius: '20px',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#4c1d95' }}>
                KHAY LINH KIỆN CHỜ LẮP RÁP ({availableParts.length}):
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Nhấp chọn linh kiện rồi nhấp vào ô trống
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {availableParts.map((part) => {
                const isSelected = selectedPart?.id === part.id;

                return (
                  <button
                    key={part.id}
                    className="btn-bouncy"
                    onClick={() => handleSelectPart(part)}
                    style={{
                      background: isSelected ? '#ede9fe' : '#f8fafc',
                      border: isSelected ? '3px solid #8b5cf6' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '12px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: isSelected ? '0 4px 14px rgba(139, 92, 246, 0.25)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>{part.icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: isSelected ? '#6d28d9' : '#334155', textAlign: 'center' }}>
                      {part.name}
                    </span>
                  </button>
                );
              })}
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
            Chúc Mừng Kỹ Sư Lắp Ráp Máy Tính Nhí!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Em đã lắp ráp chính xác toàn bộ 4 bộ phận chính (Màn hình, Thân máy, Bàn phím, Chuột) cùng Loa và Máy in thành bộ máy tính hoàn chỉnh!
          </p>
          <div style={{ background: '#fef3c7', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm đạt được: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={handleReset}
            >
              <RotateCcw size={18} />
              <span>Chơi lại lần nữa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
