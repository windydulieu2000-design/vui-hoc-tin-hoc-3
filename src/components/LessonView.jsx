import React, { useState } from 'react';
import { sounds, speakVietnamese, stopSpeaking } from '../utils/audio';
import {
  Volume2,
  VolumeX,
  CheckCircle,
  XCircle,
  Star,
  ArrowLeft,
  ArrowRight,
  Play,
  BookOpen,
  Lightbulb,
  Target,
  Sparkles,
  Trophy,
  Compass,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function LessonView({
  lesson,
  onBack,
  onFinishLesson,
  onPlayGame,
}) {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'quiz' | 'result'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({}); // { qIndex: { chosen, isCorrect } }
  const [robotMood, setRobotMood] = useState('welcome');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQ = lesson.questions[currentQIndex];
  const totalQuestions = lesson.questions.length;

  const handleSpeakQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const textToSpeak = `${currentQ.question}. Các đáp án là: ${currentQ.options.join('. ')}`;
    speakVietnamese(textToSpeak, () => setIsSpeaking(false));
  };

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isCorrect = index === currentQ.correctIndex;

    setAnswers(prev => ({
      ...prev,
      [currentQIndex]: { chosen: index, isCorrect }
    }));

    if (isCorrect) {
      sounds.playCorrect();
      setRobotMood('celebrating');
    } else {
      sounds.playWrong();
      setRobotMood('encouraging');
    }
  };

  const handleNextQuestion = () => {
    stopSpeaking();
    setIsSpeaking(false);

    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(i => i + 1);
      setSelectedOption(null);
      setRobotMood('thinking');
    } else {
      // Completed all questions
      const correctCount = Object.values({
        ...answers,
        [currentQIndex]: { chosen: selectedOption, isCorrect: selectedOption === currentQ.correctIndex }
      }).filter(a => a.isCorrect).length;

      sounds.playStar();
      setRobotMood('proud');
      setActiveTab('result');

      const starsEarned = Math.max(1, correctCount);
      onFinishLesson(lesson.id, starsEarned, correctCount, totalQuestions);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
      {/* Top Header */}
      <div
        className="card-glass"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderRadius: '20px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <button
          className="btn-bouncy"
          onClick={() => { stopSpeaking(); onBack(); }}
          style={{
            background: '#f1edff',
            color: '#6d28d9',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ArrowLeft size={16} /> Bản đồ bài học
        </button>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#8b5cf6', textTransform: 'uppercase' }}>
            {lesson.landName}
          </span>
          <h2 style={{ fontSize: '17px', fontWeight: 'bold', color: '#332d4b', margin: 0 }}>
            {lesson.title}
          </h2>
        </div>

        {lesson.gameLink ? (
          <button
            className="btn-bouncy"
            onClick={() => { stopSpeaking(); onPlayGame(lesson.gameLink); }}
            style={{
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.25)',
            }}
          >
            <Play size={14} /> Trò chơi liên quan
          </button>
        ) : (
          <div style={{ width: '100px' }} />
        )}
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          className="btn-bouncy"
          onClick={() => { stopSpeaking(); setActiveTab('learn'); setRobotMood('welcome'); }}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '14px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            background: activeTab === 'learn' ? '#8b5cf6' : '#ffffff',
            color: activeTab === 'learn' ? '#ffffff' : '#64748b',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <BookOpen size={18} />
          <span>1. Khám Phá Kiến Thức</span>
        </button>

        <button
          className="btn-bouncy"
          onClick={() => { stopSpeaking(); setActiveTab('quiz'); setRobotMood('thinking'); }}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '14px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            background: activeTab === 'quiz' || activeTab === 'result' ? '#ec4899' : '#ffffff',
            color: activeTab === 'quiz' || activeTab === 'result' ? '#ffffff' : '#64748b',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Sparkles size={18} />
          <span>2. Trắc Nghiệm Củng Cố ({totalQuestions} câu)</span>
        </button>
      </div>

      {/* TAB 1: LEARN (Khám phá kiến thức) */}
      {activeTab === 'learn' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Objectives Card */}
          <div
            className="card-3d"
            style={{
              padding: '22px',
              borderRadius: '20px',
              borderLeft: '6px solid #8b5cf6',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Target size={20} color="#8b5cf6" />
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#4c1d95' }}>
                Mục tiêu cần đạt (Chuẩn GDPT 2018)
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
              {lesson.objectives}
            </p>
          </div>

          {/* Core Knowledge */}
          <div
            className="card-3d"
            style={{
              padding: '24px',
              borderRadius: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <BeBitRobot mood="welcome" size="small" screenText="📖" />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px' }}>
                  Kiến thức trọng tâm
                </h3>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
                  {lesson.summary}
                </p>
              </div>
            </div>

            {/* Keypoints list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
                📌 Ghi nhớ cốt lõi:
              </span>
              {lesson.keyPoints.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
                  <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Relatable Examples */}
            {lesson.examples && lesson.examples.length > 0 && (
              <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '16px', border: '1px solid #fde68a', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Lightbulb size={18} color="#b45309" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#92400e' }}>
                    Ví dụ gần gũi thực tế:
                  </span>
                </div>
                {lesson.examples.map((ex, idx) => (
                  <p key={idx} style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.5', marginTop: '4px' }}>
                    {ex}
                  </p>
                ))}
              </div>
            )}

            {/* Interactive Activity Box */}
            {lesson.interactiveActivity && (
              <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: '16px', border: '1px solid #bae6fd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Compass size={18} color="#0284c7" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0369a1' }}>
                    {lesson.interactiveActivity.title}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#0c4a6e', lineHeight: '1.5' }}>
                  {lesson.interactiveActivity.description}
                </p>
              </div>
            )}
          </div>

          {/* Action to Quiz */}
          <div style={{ textAlign: 'center', marginTop: '4px' }}>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={() => {
                sounds.playClick();
                setActiveTab('quiz');
                setRobotMood('thinking');
              }}
              style={{ fontSize: '16px', padding: '14px 32px' }}
            >
              <span>Em đã hiểu bài, Bắt đầu Trắc nghiệm ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: QUIZ (Trắc nghiệm củng cố) */}
      {activeTab === 'quiz' && (
        <div
          className="card-3d"
          style={{
            padding: '28px',
            borderRadius: '24px',
          }}
        >
          {/* Header of Quiz */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  background: '#ede9fe',
                  color: '#6d28d9',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                }}
              >
                Câu hỏi {currentQIndex + 1} / {totalQuestions}
              </span>

              <button
                className={`btn-bouncy ${isSpeaking ? 'speaking-pulse' : ''}`}
                onClick={handleSpeakQuestion}
                style={{
                  background: isSpeaking ? '#ec4899' : '#f1edff',
                  color: isSpeaking ? '#ffffff' : '#8b5cf6',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{isSpeaking ? 'Dừng đọc' : 'Đọc câu hỏi'}</span>
              </button>
            </div>

            {/* Question Progress Dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background:
                      i === currentQIndex
                        ? '#8b5cf6'
                        : answers[i]
                        ? answers[i].isCorrect
                          ? '#10b981'
                          : '#ef4444'
                        : '#e2e8f0',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Question Text with Bé Bít Robot emotional response */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
            <BeBitRobot mood={robotMood} size="small" screenText="❓" />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', lineHeight: '1.5' }}>
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              let bg = '#f8fafc';
              let border = '1px solid #e2e8f0';
              let textColor = '#334155';

              if (selectedOption !== null) {
                if (isCorrect) {
                  bg = '#d1fae5';
                  border = '2px solid #10b981';
                  textColor = '#065f46';
                } else if (isSelected && !isCorrect) {
                  bg = '#fee2e2';
                  border = '2px solid #ef4444';
                  textColor = '#991b1b';
                }
              }

              return (
                <button
                  key={optIdx}
                  className="btn-bouncy"
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    background: bg,
                    border: border,
                    padding: '16px 20px',
                    borderRadius: '16px',
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: isSelected || (selectedOption !== null && isCorrect) ? 'bold' : '600',
                    color: textColor,
                    cursor: selectedOption !== null ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && isCorrect && <CheckCircle size={22} color="#10b981" />}
                  {selectedOption !== null && isSelected && !isCorrect && <XCircle size={22} color="#ef4444" />}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation Box */}
          {selectedOption !== null && (
            <div
              style={{
                background: selectedOption === currentQ.correctIndex ? '#d1fae5' : '#fef3c7',
                border: selectedOption === currentQ.correctIndex ? '1px solid #a7f3d0' : '1px solid #fde68a',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <Lightbulb size={22} color={selectedOption === currentQ.correctIndex ? '#047857' : '#b45309'} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: selectedOption === currentQ.correctIndex ? '#047857' : '#92400e', marginBottom: '4px' }}>
                  {selectedOption === currentQ.correctIndex ? 'Hoan hô em! Bé Bít giải thích thêm:' : 'Đừng lo lắng! Cùng Bé Bít xem lại nhé:'}
                </h4>
                <p style={{ fontSize: '14px', color: selectedOption === currentQ.correctIndex ? '#065f46' : '#78350f', lineHeight: '1.5' }}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <div style={{ textAlign: 'right' }}>
              <button
                className="btn-bouncy btn-primary-3d"
                onClick={handleNextQuestion}
              >
                <span>{currentQIndex < totalQuestions - 1 ? 'Câu tiếp theo' : 'Xem kết quả bài học'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RESULT (Tổng kết & Phần thưởng) */}
      {activeTab === 'result' && (
        <div
          className="card-3d"
          style={{
            padding: '40px 24px',
            borderRadius: '26px',
            textAlign: 'center',
          }}
        >
          <BeBitRobot
            mood="proud"
            size="large"
            bubble="Chúc mừng em đã hoàn thành bài học xuất sắc!"
          />

          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4c1d95', marginTop: '16px', marginBottom: '6px' }}>
            Tổng Kết {lesson.title}
          </h2>

          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '18px' }}>
            Vùng đất: <strong>{lesson.landName}</strong>
          </p>

          {/* Stars display */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
            {[1, 2, 3].map((starIdx) => {
              const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
              const hasStar = (starIdx === 1 && correctCount >= 1) || (starIdx === 2 && correctCount >= 2) || (starIdx === 3 && correctCount === 3);
              return (
                <Star
                  key={starIdx}
                  size={48}
                  color={hasStar ? '#f59e0b' : '#cbd5e1'}
                  fill={hasStar ? '#f59e0b' : 'none'}
                />
              );
            })}
          </div>

          <div style={{ background: '#ede9fe', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#6d28d9' }}>
              Trả lời đúng: {Object.values(answers).filter(a => a.isCorrect).length} / {totalQuestions} câu hỏi • +{Object.values(answers).filter(a => a.isCorrect).length * 20} XP
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-bouncy"
              onClick={onBack}
              style={{
                background: '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                padding: '12px 26px',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Về Bản Đồ Mở Khóa
            </button>

            {lesson.gameLink && (
              <button
                className="btn-bouncy"
                onClick={() => onPlayGame(lesson.gameLink)}
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 26px',
                  borderRadius: '14px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Chơi trò chơi rèn luyện ngay ➔
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
