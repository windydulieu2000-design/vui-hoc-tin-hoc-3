import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { ShieldCheck, ShieldAlert, Trophy, RotateCcw, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const THREATS = [
  {
    id: 1,
    threat: 'Người lạ trên mạng nhắn tin: "Gửi cho mình địa chỉ nhà và số điện thoại bố mẹ để nhận gấu bông miễn phí nhé!"',
    correctShield: 'privacy',
    desc: 'Nguy cơ lộ thông tin cá nhân vào tay kẻ xấu',
    advice: 'Địa chỉ nhà và số điện thoại là dữ liệu cá nhân tối mật, tuyệt đối không chia sẻ cho người lạ!',
  },
  {
    id: 2,
    threat: 'Cửa sổ quảng cáo nhấp nháy: "Chúc mừng bạn trúng thưởng iPhone 15! Nhấp vào đường link lạ này ngay!"',
    correctShield: 'block_report',
    desc: 'Bẫy lừa đảo trúng thưởng và virus độc hại',
    advice: 'Đây là cạm bẫy lừa đảo ảo. Hãy đóng ngay lập tức và báo cho người lớn kiểm tra!',
  },
  {
    id: 3,
    threat: 'Bạn thân trong lớp nhắn: "Cho mình mượn mật khẩu tài khoản của bạn để vào học chung một lúc nhé!"',
    correctShield: 'password',
    desc: 'Nguy cơ mất an toàn tài khoản cá nhân',
    advice: 'Mật khẩu là bí mật riêng tư của em và bố mẹ, không cho bạn bè mượn để tránh lộ thông tin!',
  },
  {
    id: 4,
    threat: 'Thấy một bạn cùng lớp đăng bài trên mạng trêu chọc, nói xấu và chế giễu một bạn khác',
    correctShield: 'polite',
    desc: 'Hành vi bắt nạt trên không gian mạng',
    advice: 'Luôn cư xử văn minh, lịch sự trên mạng: không hùa theo, khuyên bạn dừng lại hoặc báo cô giáo!',
  },
  {
    id: 5,
    threat: 'Người lạ quen qua mạng rủ em trốn bố mẹ ra quán net hoặc công viên gặp mặt riêng',
    correctShield: 'privacy',
    desc: 'Nguy cơ bị kẻ xấu tiếp cận gây nguy hiểm ngoài đời thực',
    advice: 'Cực kỳ nguy hiểm! Tuyệt đối không bao giờ đồng ý gặp mặt người lạ quen qua mạng Internet!',
  },
  {
    id: 6,
    threat: 'Trang web yêu cầu tải một tệp lạ không rõ nguồn gốc để chơi game',
    correctShield: 'block_report',
    desc: 'Nguy cơ tệp chứa mã độc hoặc virus phá hỏng máy tính',
    advice: 'Không tự ý tải tệp lạ về máy tính khi chưa có sự đồng ý của thầy cô giáo hoặc bố mẹ!',
  },
];

const SHIELDS = [
  { id: 'privacy', name: 'Khiên Bảo Vệ Thông Tin Cá Nhân', icon: '🛡️', color: '#8b5cf6', bgColor: '#ede9fe' },
  { id: 'block_report', name: 'Khiên Đóng Trang Lạ & Báo Người Lớn', icon: '🛑', color: '#ec4899', bgColor: '#fce7f3' },
  { id: 'password', name: 'Khiên Giữ Kín Mật Khẩu', icon: '🔑', color: '#06b6d4', bgColor: '#e0f2fe' },
  { id: 'polite', name: 'Khiên Cư Xử Văn Minh, Lịch Sự', icon: '🤝', color: '#10b981', bgColor: '#d1fae5' },
];

export default function ShieldGame({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const threat = THREATS[currentIdx];
  const [shieldPower, setShieldPower] = useState(100);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('Đọc kỹ tình huống nguy hiểm và bấm chọn Chiếc Khiên phòng thủ chuẩn xác nhất!');
  const [robotMood, setRobotMood] = useState('welcome');
  const [selectedShield, setSelectedShield] = useState(null);
  const [isWon, setIsWon] = useState(false);

  const handleActivateShield = (shieldId) => {
    if (selectedShield !== null) return;
    setSelectedShield(shieldId);

    if (shieldId === threat.correctShield) {
      sounds.playCorrect();
      setScore(s => s + 25);
      setRobotMood('celebrating');
      setFeedback(`Phòng thủ thành công! ${threat.advice}`);
    } else {
      sounds.playWrong();
      setShieldPower(p => Math.max(0, p - 20));
      setRobotMood('encouraging');
      setFeedback(`Khiên chưa khớp! ${threat.advice}`);
    }
  };

  const handleNextThreat = () => {
    if (currentIdx < THREATS.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedShield(null);
      setRobotMood('welcome');
      setFeedback('Hãy chọn chiếc khiên phù hợp cho mối nguy tiếp theo!');
    } else {
      sounds.playStar();
      setIsWon(true);
      setRobotMood('proud');
      if (onComplete) onComplete(150);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setShieldPower(100);
    setScore(0);
    setSelectedShield(null);
    setIsWon(false);
    setRobotMood('welcome');
    setFeedback('Đọc kỹ tình huống nguy hiểm và bấm chọn Chiếc Khiên phòng thủ chuẩn xác nhất!');
  };

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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#fce7f3', padding: '10px', borderRadius: '14px', color: '#ec4899' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 11: Chiếc Khiên Internet (Bảo Vệ Không Gian Số)
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Bài học 6, 7, 11: Phòng chống lừa đảo, bảo mật mật khẩu và văn hóa ứng xử trên mạng
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>NĂNG LƯỢNG KHIÊN</span>
            <span style={{ fontSize: '18px', fontWeight: '900', color: shieldPower > 40 ? '#10b981' : '#ef4444' }}>
              🛡️ {shieldPower}%
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ĐIỂM SỐ</span>
            <span style={{ fontSize: '18px', fontWeight: '900', color: '#f59e0b' }}>{score}đ</span>
          </div>
        </div>
      </div>

      {!isWon ? (
        <div
          className="card-3d"
          style={{
            padding: '26px',
            borderRadius: '24px',
          }}
        >
          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ec4899' }}>
              Nguy cơ {currentIdx + 1} / {THREATS.length}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Mục tiêu: Dựng khiên an toàn bảo vệ Bé Bít
            </span>
          </div>

          {/* Incoming Threat Box */}
          <div
            style={{
              background: '#fff1f2',
              border: '2px dashed #fecdd3',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <BeBitRobot mood={robotMood} size="small" screenText="⚠️" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#e11d48', textTransform: 'uppercase', marginBottom: '4px' }}>
                🚨 NGUY CƠ ĐANG XUẤT HIỆN:
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#9f1239', lineHeight: '1.5' }}>
                "{threat.threat}"
              </div>
            </div>
          </div>

          {/* Feedback banner */}
          <div
            style={{
              background: selectedShield ? (selectedShield === threat.correctShield ? '#d1fae5' : '#fee2e2') : '#f8fafc',
              border: selectedShield ? (selectedShield === threat.correctShield ? '1px solid #a7f3d0' : '1px solid #fecdd3') : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px 18px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: selectedShield ? (selectedShield === threat.correctShield ? '#065f46' : '#991b1b') : '#475569',
            }}
          >
            📢 {feedback}
          </div>

          {/* 4 Shields Options */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '22px' }}>
            {SHIELDS.map((sh) => {
              const isSelected = selectedShield === sh.id;
              const isCorrect = sh.id === threat.correctShield;

              let border = '2px solid #e2e8f0';
              let bg = '#ffffff';

              if (selectedShield !== null) {
                if (isCorrect) {
                  border = '2px solid #10b981';
                  bg = '#d1fae5';
                } else if (isSelected && !isCorrect) {
                  border = '2px solid #ef4444';
                  bg = '#fee2e2';
                }
              }

              return (
                <button
                  key={sh.id}
                  className="btn-bouncy"
                  disabled={selectedShield !== null}
                  onClick={() => handleActivateShield(sh.id)}
                  style={{
                    background: bg,
                    border: border,
                    borderRadius: '18px',
                    padding: '16px',
                    textAlign: 'left',
                    cursor: selectedShield !== null ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{sh.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>
                      {sh.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Bấm để kích hoạt lá chắn
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {selectedShield !== null && (
            <div style={{ textAlign: 'right' }}>
              <button
                className="btn-bouncy btn-primary-3d"
                onClick={handleNextThreat}
              >
                <span>Nguy cơ tiếp theo ➔</span>
              </button>
            </div>
          )}
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
          <Trophy size={60} color="#10b981" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#047857', marginBottom: '8px' }}>
            Huy Hiệu Hiệp Sĩ Chiếc Khiên Internet!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Em đã kích hoạt chính xác các tấm khiên bảo vệ thông tin cá nhân, chặn đứng các mối nguy hại và lừa đảo trên không gian mạng!
          </p>
          <div style={{ background: '#d1fae5', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', color: '#065f46', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm đạt được: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={handleRestart}
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
