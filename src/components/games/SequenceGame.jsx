import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { ListOrdered, ArrowUp, ArrowDown, CheckCircle2, RotateCcw, Trophy, Sparkles, Check, HelpCircle } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const SEQUENCE_CHALLENGES = [
  {
    id: 1,
    title: 'Thử thách 1: Quy trình Bật máy tính an toàn',
    lessonRef: 'Bài 4: Làm việc với máy tính',
    steps: [
      { id: 's1', text: 'Bước 1: Kiểm tra dây cắm nguồn điện và phích cắm an toàn' },
      { id: 's2', text: 'Bước 2: Bấm nút nguồn (Power) trên Thân máy tính (CPU)' },
      { id: 's3', text: 'Bước 3: Bấm nút nguồn bật Màn hình máy tính' },
      { id: 's4', text: 'Bước 4: Chờ máy tính khởi động vào màn hình nền Windows' },
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy trình chuẩn: Luôn kiểm tra an toàn điện trước -> Bật nút nguồn thân máy -> Bật màn hình -> Chờ máy khởi động.',
  },
  {
    id: 2,
    title: 'Thử thách 2: Quy trình Tắt máy tính đúng cách',
    lessonRef: 'Bài 4: Làm việc với máy tính',
    steps: [
      { id: 's1', text: 'Bước 1: Lưu lại tất cả bài tập và đóng các phần mềm đang mở' },
      { id: 's2', text: 'Bước 2: Dùng chuột nhấp vào biểu tượng nút Start góc dưới màn hình' },
      { id: 's3', text: 'Bước 3: Nhấp chọn Power rồi chọn Shut down' },
      { id: 's4', text: 'Bước 4: Chờ đèn thân máy tắt hẳn rồi tắt nút màn hình' },
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy trình chuẩn: Phải lưu bài và đóng phần mềm trước -> Start -> Power -> Shut down -> Tắt màn hình.',
  },
  {
    id: 3,
    title: 'Thử thách 3: Quy trình Vẽ tranh trên phần mềm đồ họa',
    lessonRef: 'Bài 12, 13: Thực hành vẽ hình và tô màu',
    steps: [
      { id: 's1', text: 'Bước 1: Khởi động phần mềm đồ họa (Paint) từ màn hình' },
      { id: 's2', text: 'Bước 2: Chọn công cụ hình mẫu (Shapes) hoặc bút vẽ để phác thảo các nét khép kín' },
      { id: 's3', text: 'Bước 3: Dùng công cụ Thùng sơn chọn màu yêu thích và đổ màu vào hình' },
      { id: 's4', text: 'Bước 4: Nhấp vào nút Lưu (Save / hình đĩa mềm) để lưu bức tranh vào thư mục' },
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy trình chuẩn: Mở Paint -> Phác họa nét kín -> Đổ màu sơn -> Lưu bức tranh thành tệp ảnh.',
  },
  {
    id: 4,
    title: 'Thử thách 4: Quy trình Soạn thảo văn bản tiếng Việt',
    lessonRef: 'Bài 14, 15: Soạn thảo văn bản và gõ dấu',
    steps: [
      { id: 's1', text: 'Bước 1: Khởi động phần mềm hỗ trợ gõ tiếng Việt (UniKey kiểu Telex)' },
      { id: 's2', text: 'Bước 2: Mở phần mềm soạn thảo văn bản (Word hoặc WordPad)' },
      { id: 's3', text: 'Bước 3: Đặt 10 ngón tay lên bàn phím và gõ nội dung bài văn theo đúng quy tắc chính tả' },
      { id: 's4', text: 'Bước 4: Kiểm tra lỗi chính tả và nhấn nút Save (Ctrl + S) để lưu bài' },
    ],
    correctOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Quy trình chuẩn: Bật UniKey -> Mở phần mềm Word -> Gõ văn bản chuẩn -> Kiểm tra và lưu bài.',
  },
];

// Helper to shuffle array
const shuffleSteps = (steps) => {
  const shuffled = [...steps];
  // Simple rotation to ensure not already in correct order initially
  return [shuffled[2], shuffled[0], shuffled[3], shuffled[1]];
};

export default function SequenceGame({ onComplete }) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const challenge = SEQUENCE_CHALLENGES[challengeIdx];
  const [currentList, setCurrentList] = useState(() => shuffleSteps(challenge.steps));
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('Sử dụng nút ⬆️ Lên / ⬇️ Xuống để đổi vị trí các thẻ theo đúng thứ tự!');
  const [robotMood, setRobotMood] = useState('welcome');
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return;
    sounds.playClick();
    const updated = [...currentList];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setCurrentList(updated);
    setIsChecked(false);
  };

  const moveDown = (index) => {
    if (index === currentList.length - 1) return;
    sounds.playClick();
    const updated = [...currentList];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setCurrentList(updated);
    setIsChecked(false);
  };

  const checkOrder = () => {
    const isMatched = currentList.every((item, idx) => item.id === challenge.correctOrder[idx]);
    setIsChecked(true);

    if (isMatched) {
      sounds.playCorrect();
      setIsCorrect(true);
      setScore(s => s + 30);
      setRobotMood('celebrating');
      setFeedback(`Chính xác! ${challenge.explanation}`);
    } else {
      sounds.playWrong();
      setIsCorrect(false);
      setRobotMood('encouraging');
      setFeedback('Thứ tự các bước chưa chuẩn rồi! Hãy đọc lại và suy nghĩ xem bước nào cần làm trước nhé!');
    }
  };

  const handleNextChallenge = () => {
    if (challengeIdx < SEQUENCE_CHALLENGES.length - 1) {
      const nextIdx = challengeIdx + 1;
      setChallengeIdx(nextIdx);
      setCurrentList(shuffleSteps(SEQUENCE_CHALLENGES[nextIdx].steps));
      setIsChecked(false);
      setIsCorrect(false);
      setRobotMood('welcome');
      setFeedback('Hãy sắp xếp các thẻ bước cho thử thách tiếp theo!');
    } else {
      sounds.playStar();
      setIsWon(true);
      setRobotMood('proud');
      if (onComplete) onComplete(120);
    }
  };

  const handleResetAll = () => {
    setChallengeIdx(0);
    setCurrentList(shuffleSteps(SEQUENCE_CHALLENGES[0].steps));
    setIsChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsWon(false);
    setRobotMood('welcome');
    setFeedback('Sử dụng nút ⬆️ Lên / ⬇️ Xuống để đổi vị trí các thẻ theo đúng thứ tự!');
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
          <div style={{ background: '#ede9fe', padding: '10px', borderRadius: '14px', color: '#8b5cf6' }}>
            <ListOrdered size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 10: Đội Trưởng Trình Tự
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Bài học 2, 4, 13, 16: Rèn luyện tư duy thuật toán và sắp xếp các bước logic
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ĐIỂM SỐ</span>
          <span style={{ fontSize: '18px', fontWeight: '900', color: '#f59e0b' }}>{score}đ</span>
        </div>
      </div>

      {!isWon ? (
        <div
          className="card-3d"
          style={{
            padding: '24px',
            borderRadius: '24px',
          }}
        >
          {/* Challenge Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ background: '#ede9fe', color: '#6d28d9', padding: '4px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>
                Thử thách {challengeIdx + 1} / {SEQUENCE_CHALLENGES.length}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>
                ({challenge.lessonRef})
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>
              {challenge.title}
            </h3>
          </div>

          {/* Feedback banner */}
          <div style={{ background: isChecked ? (isCorrect ? '#d1fae5' : '#fee2e2') : '#f5f3ff', border: isChecked ? (isCorrect ? '1px solid #a7f3d0' : '1px solid #fecdd3') : '1px solid #ddd6fe', borderRadius: '16px', padding: '12px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BeBitRobot mood={robotMood} size="small" screenText="🔢" />
            <p style={{ fontSize: '13px', color: isChecked ? (isCorrect ? '#065f46' : '#991b1b') : '#4c1d95', fontWeight: 'bold', margin: 0, lineHeight: '1.5' }}>
              {feedback}
            </p>
          </div>

          {/* Steps list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentList.map((step, idx) => (
              <div
                key={step.id}
                style={{
                  background: '#ffffff',
                  border: isChecked
                    ? step.id === challenge.correctOrder[idx]
                      ? '2px solid #10b981'
                      : '2px solid #ef4444'
                    : '2px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#ede9fe',
                      color: '#6d28d9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                    {step.text}
                  </span>
                </div>

                {/* Move buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    className="btn-bouncy"
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    style={{
                      background: idx === 0 ? '#f1f5f9' : '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      cursor: idx === 0 ? 'not-allowed' : 'pointer',
                      color: idx === 0 ? '#cbd5e1' : '#334155',
                    }}
                    title="Chuyển lên trên"
                  >
                    <ArrowUp size={16} />
                  </button>

                  <button
                    className="btn-bouncy"
                    disabled={idx === currentList.length - 1}
                    onClick={() => moveDown(idx)}
                    style={{
                      background: idx === currentList.length - 1 ? '#f1f5f9' : '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      cursor: idx === currentList.length - 1 ? 'not-allowed' : 'pointer',
                      color: idx === currentList.length - 1 ? '#cbd5e1' : '#334155',
                    }}
                    title="Chuyển xuống dưới"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {!isCorrect ? (
              <button
                className="btn-bouncy btn-primary-3d"
                onClick={checkOrder}
              >
                <Check size={18} />
                <span>Kiểm tra trình tự</span>
              </button>
            ) : (
              <button
                className="btn-bouncy btn-primary-3d"
                onClick={handleNextChallenge}
              >
                <span>Thử thách tiếp theo ➔</span>
              </button>
            )}
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
            Xuất Sắc! Đội Trưởng Trình Tự Tài Ba!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Em đã sắp xếp chuẩn xác 100% toàn bộ quy trình bật/tắt máy tính, vẽ tranh và soạn thảo văn bản tiếng Việt!
          </p>
          <div style={{ background: '#fef3c7', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm đạt được: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={handleResetAll}
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
