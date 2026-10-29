import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { ShieldCheck, ShieldAlert, Trophy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const SCENARIOS = [
  {
    id: 1,
    situation: 'Một người lạ trên mạng nhắn tin: "Chào bạn, hãy gửi cho mình địa chỉ nhà và số điện thoại của bố mẹ để mình gửi quà tặng nhé!"',
    correctChoice: 'safe',
    optionSafe: 'Không trả lời, không gửi thông tin gì và báo ngay cho bố mẹ.',
    optionDanger: 'Gửi ngay địa chỉ nhà và số điện thoại để được nhận quà.',
    advice: 'Tuyệt đối không chia sẻ địa chỉ nhà và số điện thoại với người lạ trên mạng!'
  },
  {
    id: 2,
    situation: 'Một người bạn trong lớp muốn mượn mật khẩu tài khoản học tập của em để xem bài tập.',
    correctChoice: 'safe',
    optionSafe: 'Lịch sự từ chối và khuyên bạn nên tự dùng tài khoản của mình hoặc hỏi thầy cô.',
    optionDanger: 'Cho bạn mật khẩu ngay để thể hiện tình bạn.',
    advice: 'Mật khẩu tài khoản là bí mật cá nhân, chỉ chia sẻ với bố mẹ, không cho bạn bè mượn!'
  },
  {
    id: 3,
    situation: 'Đang xem thông tin học tập, bỗng xuất hiện một cửa sổ quảng cáo nhấp nháy: "Chúc mừng bạn trúng thưởng iPhone 15! Nhấp vào đây ngay!".',
    correctChoice: 'safe',
    optionSafe: 'Đóng cửa sổ quảng cáo đó lại và tiếp tục việc học tập.',
    optionDanger: 'Bấm vào đường link đó và làm theo hướng dẫn nộp tiền.',
    advice: 'Đây là cạm bẫy lừa đảo trúng thưởng ảo. Hãy đóng ngay lập tức!'
  },
  {
    id: 4,
    situation: 'Em thấy một bạn đăng ảnh hoặc lời lẽ trêu chọc, nói xấu một bạn khác trong nhóm lớp.',
    correctChoice: 'safe',
    optionSafe: 'Không tham gia hùa theo, khuyên bạn dừng lại hoặc báo cô giáo chủ nhiệm.',
    optionDanger: 'Thả tim và viết thêm lời trêu chọc để trêu bạn đó nhiều hơn.',
    advice: 'Cư xử văn minh trên mạng: tôn trọng bạn bè, không bắt nạt hay nói xấu người khác!'
  },
  {
    id: 5,
    situation: 'Em đã ngồi học máy tính liên tục được 45 phút và cảm thấy mắt bắt đầu mỏi.',
    correctChoice: 'safe',
    optionSafe: 'Đứng dậy đi lại, nhìn ra xa vào cây xanh và chớp mắt nhẹ nhàng thư giãn.',
    optionDanger: 'Cúi sát mắt hơn vào màn hình và mở trò chơi điện tử chơi tiếp 3 tiếng.',
    advice: 'Sau mỗi 30-45 phút, luôn cho mắt và cơ thể nghỉ ngơi thư giãn để bảo vệ thị lực!'
  },
  {
    id: 6,
    situation: 'Người lạ trên mạng rủ em ra công viên gặp mặt riêng và hứa sẽ cho đồ chơi đẹp.',
    correctChoice: 'safe',
    optionSafe: 'Từ chối dứt khoát, tuyệt đối không đi và kể ngay với bố mẹ.',
    optionDanger: 'Lén trốn bố mẹ tự đi gặp người lạ một mình.',
    advice: 'Rất nguy hiểm! Tuyệt đối không bao giờ đi gặp mặt người lạ quen qua mạng Internet!'
  }
];

export default function SafetyGame({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 'safe' | 'danger'
  const [robotMood, setRobotMood] = useState('normal');
  const [feedback, setFeedback] = useState('Đọc kỹ tình huống và chọn cách ứng xử thông minh nhất nhé!');
  const [isFinished, setIsFinished] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleChoose = (choice) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);

    if (choice === scenario.correctChoice) {
      sounds.playCorrect();
      setScore(s => s + 20);
      setRobotMood('happy');
      setFeedback(`Xuất sắc! ${scenario.advice}`);
    } else {
      sounds.playWrong();
      setRobotMood('sad');
      setFeedback(`Cảnh báo nguy hiểm! ${scenario.advice}`);
    }
  };

  const nextScenario = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedAnswer(null);
      setRobotMood('normal');
      setFeedback('Tiếp tục với tình huống tiếp theo nhé!');
    } else {
      sounds.playStar();
      setIsFinished(true);
      if (onComplete) onComplete(100);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setRobotMood('normal');
    setIsFinished(false);
    setFeedback('Đọc kỹ tình huống và chọn cách ứng xử thông minh nhất nhé!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
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
          <div style={{ background: '#fce7f3', padding: '10px', borderRadius: '12px', color: '#ec4899' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 6: Hiệp sĩ An toàn số (Tình huống ứng xử)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6387' }}>
              Bài học 4, 7, 11: Bảo vệ thông tin cá nhân, phòng tránh lừa đảo và giữ gìn sức khỏe
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Điểm an toàn</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{score}đ</span>
        </div>
      </div>

      {!isFinished ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.08)',
          }}
        >
          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ec4899' }}>
              Tình huống {currentIdx + 1} / {SCENARIOS.length}
            </span>
            <span style={{ fontSize: '12px', color: '#6b6387' }}>
              Bé Bít khuyên: Cẩn trọng trên không gian số
            </span>
          </div>

          {/* Scenario description */}
          <div
            style={{
              background: '#fff1f2',
              border: '2px dashed #fecdd3',
              borderRadius: '16px',
              padding: '18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <BeBitRobot mood={robotMood} size="small" screenText="🛡️" />
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#9f1239', lineHeight: '1.5' }}>
              "{scenario.situation}"
            </div>
          </div>

          {/* Feedback banner */}
          {selectedAnswer !== null && (
            <div
              style={{
                background: selectedAnswer === 'safe' ? '#d1fae5' : '#fee2e2',
                color: selectedAnswer === 'safe' ? '#065f46' : '#991b1b',
                padding: '12px 16px',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {selectedAnswer === 'safe' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              {feedback}
            </div>
          )}

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <button
              className="btn-bouncy"
              disabled={selectedAnswer !== null}
              onClick={() => handleChoose('safe')}
              style={{
                background: selectedAnswer === 'safe' ? '#d1fae5' : '#f8fafc',
                border: selectedAnswer === 'safe' ? '2px solid #10b981' : '1px solid #e2e8f0',
                padding: '16px',
                borderRadius: '14px',
                textAlign: 'left',
                fontSize: '15px',
                fontWeight: '600',
                color: '#1e293b',
                cursor: selectedAnswer !== null ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ background: '#10b981', color: '#ffffff', padding: '6px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                Phương án A
              </div>
              {scenario.optionSafe}
            </button>

            <button
              className="btn-bouncy"
              disabled={selectedAnswer !== null}
              onClick={() => handleChoose('danger')}
              style={{
                background: selectedAnswer === 'danger' ? '#fee2e2' : '#f8fafc',
                border: selectedAnswer === 'danger' ? '2px solid #ef4444' : '1px solid #e2e8f0',
                padding: '16px',
                borderRadius: '14px',
                textAlign: 'left',
                fontSize: '15px',
                fontWeight: '600',
                color: '#1e293b',
                cursor: selectedAnswer !== null ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ background: '#ef4444', color: '#ffffff', padding: '6px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                Phương án B
              </div>
              {scenario.optionDanger}
            </button>
          </div>

          {/* Next Button */}
          {selectedAnswer !== null && (
            <div style={{ textAlign: 'right' }}>
              <button
                className="btn-bouncy"
                onClick={nextScenario}
                style={{
                  background: '#8b5cf6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '14px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Tình huống tiếp theo ➔
              </button>
            </div>
          )}
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
          <Trophy size={56} style={{ color: '#10b981', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px' }}>
            Huy hiệu Hiệp Sĩ An Toàn Số!
          </h3>
          <p style={{ color: '#6b6387', fontSize: '15px', marginBottom: '20px' }}>
            Em đã nắm vững quy tắc bảo vệ thông tin cá nhân và cư xử thông minh, văn minh trên môi trường mạng!
          </p>
          <div style={{ display: 'inline-block', background: '#d1fae5', padding: '10px 24px', borderRadius: '16px', color: '#065f46', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm: {score} / 120 điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy"
              onClick={handleRestart}
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
              <RefreshCw size={18} /> Thử lại lần nữa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
