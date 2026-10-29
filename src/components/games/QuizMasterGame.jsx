import React, { useState, useEffect } from 'react';
import { sounds, speakVietnamese, stopSpeaking } from '../../utils/audio';
import { LESSONS } from '../../data';
import { BrainCircuit, Trophy, Timer, RotateCcw, Volume2, VolumeX, CheckCircle, XCircle, Sparkles, Zap, Award } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const ALL_QUESTIONS = LESSONS.flatMap(l =>
  l.questions.map(q => ({
    ...q,
    lessonTitle: l.title,
  }))
);

export default function QuizMasterGame({ onComplete }) {
  const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing' | 'ended'
  const [difficulty, setDifficulty] = useState('medium'); // 'easy' (5 Qs, no timer) | 'medium' (10 Qs, 30s) | 'hard' (15 Qs, 15s)
  const [quizList, setQuizList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [robotMood, setRobotMood] = useState('welcome');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startQuiz = (diff) => {
    setDifficulty(diff);
    sounds.playClick();

    const count = diff === 'easy' ? 5 : diff === 'medium' ? 10 : 15;
    // Shuffle all 48 questions
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, count);

    setQuizList(shuffled);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setTimeLeft(diff === 'hard' ? 15 : 30);
    setRobotMood('thinking');
    setGameState('playing');
  };

  const currentQ = quizList[currentIdx];

  // Timer effect for medium & hard
  useEffect(() => {
    if (gameState !== 'playing' || difficulty === 'easy' || selectedOpt !== null) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, selectedOpt, difficulty]);

  const handleTimeout = () => {
    sounds.playWrong();
    setSelectedOpt(-1); // Timeout indicator
    setStreak(0);
    setRobotMood('encouraging');
  };

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return;
    stopSpeaking();
    setIsSpeaking(false);
    setSelectedOpt(idx);

    if (idx === currentQ.correctIndex) {
      sounds.playCorrect();
      const bonus = streak * 5;
      setScore(s => s + 20 + bonus);
      setStreak(st => st + 1);
      setCorrectCount(c => c + 1);
      setRobotMood('celebrating');
    } else {
      sounds.playWrong();
      setStreak(0);
      setRobotMood('encouraging');
    }
  };

  const handleNext = () => {
    stopSpeaking();
    setIsSpeaking(false);

    if (currentIdx < quizList.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedOpt(null);
      setTimeLeft(difficulty === 'hard' ? 15 : 30);
      setRobotMood('thinking');
    } else {
      sounds.playStar();
      setGameState('ended');
      setRobotMood('proud');
      if (onComplete) onComplete(score);
    }
  };

  const handleSpeak = () => {
    if (!currentQ) return;
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakVietnamese(`${currentQ.question}. Các đáp án là: ${currentQ.options.join('. ')}`, () => setIsSpeaking(false));
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
          <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '14px', color: '#0284c7' }}>
            <BrainCircuit size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 12: Ai Là Chuyên Gia Tin Học?
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Thử thách tổng hợp kiến thức từ kho 48 câu hỏi SGK Tin học 3
            </p>
          </div>
        </div>

        {gameState === 'playing' && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {difficulty !== 'easy' && (
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>THỜI GIAN</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: timeLeft <= 5 ? '#ef4444' : '#8b5cf6' }}>
                  ⏱️ {timeLeft}s
                </span>
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>COMBO</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#ec4899' }}>
                🔥 x{streak}
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ĐIỂM SỐ</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#f59e0b' }}>
                {score}đ
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Menu Screen */}
      {gameState === 'menu' && (
        <div
          className="card-3d"
          style={{
            padding: '40px 24px',
            borderRadius: '26px',
            textAlign: 'center',
          }}
        >
          <BeBitRobot mood="welcome" size="large" bubble="Em đã sẵn sàng trở thành Chuyên gia Tin học 3 chưa?" />

          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4c1d95', marginTop: '16px', marginBottom: '8px' }}>
            Đấu Trường Tri Thức Tin Học 3
          </h2>

          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '540px', margin: '0 auto 24px', lineHeight: '1.6' }}>
            Chọn cấp độ thử thách để bắt đầu giải các câu đố ngẫu nhiên từ 16 bài học SGK Kết nối tri thức:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', maxWidth: '700px', margin: '0 auto' }}>
            <button
              className="btn-bouncy card-3d"
              onClick={() => startQuiz('easy')}
              style={{
                padding: '20px',
                borderRadius: '18px',
                border: '2px solid #86efac',
                background: '#f0fdf4',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '32px' }}>🌱</span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#15803d', margin: '6px 0 2px' }}>
                Cấp Độ: Dễ
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                5 Câu hỏi • Không giới hạn giờ
              </p>
            </button>

            <button
              className="btn-bouncy card-3d"
              onClick={() => startQuiz('medium')}
              style={{
                padding: '20px',
                borderRadius: '18px',
                border: '2px solid #93c5fd',
                background: '#eff6ff',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '32px' }}>⚡</span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1d4ed8', margin: '6px 0 2px' }}>
                Cấp Độ: Trung Bình
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                10 Câu hỏi • 30s mỗi câu
              </p>
            </button>

            <button
              className="btn-bouncy card-3d"
              onClick={() => startQuiz('hard')}
              style={{
                padding: '20px',
                borderRadius: '18px',
                border: '2px solid #fbcfe8',
                background: '#fdf2f8',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '32px' }}>🔥</span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#be185d', margin: '6px 0 2px' }}>
                Cấp Độ: Thử Thách
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                15 Câu hỏi • 15s đếm ngược
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && currentQ && (
        <div
          className="card-3d"
          style={{
            padding: '28px',
            borderRadius: '24px',
          }}
        >
          {/* Top question status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ background: '#ede9fe', color: '#6d28d9', padding: '4px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>
              {currentQ.lessonTitle} • Câu {currentIdx + 1} / {quizList.length}
            </span>

            <button
              className={`btn-bouncy ${isSpeaking ? 'speaking-pulse' : ''}`}
              onClick={handleSpeak}
              style={{
                background: isSpeaking ? '#ec4899' : '#f1edff',
                color: isSpeaking ? '#ffffff' : '#8b5cf6',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isSpeaking ? 'Dừng' : 'Đọc câu hỏi'}</span>
            </button>
          </div>

          {/* Question text */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '22px' }}>
            <BeBitRobot mood={robotMood} size="small" screenText="🧠" />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', lineHeight: '1.5' }}>
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;

              let bg = '#f8fafc';
              let border = '1px solid #e2e8f0';
              let textColor = '#334155';

              if (selectedOpt !== null) {
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
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    background: bg,
                    border: border,
                    padding: '14px 18px',
                    borderRadius: '14px',
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: isSelected || (selectedOpt !== null && isCorrect) ? 'bold' : '600',
                    color: textColor,
                    cursor: selectedOpt !== null ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle size={20} color="#10b981" />}
                  {selectedOpt !== null && isSelected && !isCorrect && <XCircle size={20} color="#ef4444" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {selectedOpt !== null && (
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '14px', padding: '14px', marginBottom: '20px', fontSize: '13px', color: '#78350f', lineHeight: '1.5' }}>
              <strong>Giải thích:</strong> {currentQ.explanation}
            </div>
          )}

          {/* Next Button */}
          {selectedOpt !== null && (
            <div style={{ textAlign: 'right' }}>
              <button
                className="btn-bouncy btn-primary-3d"
                onClick={handleNext}
              >
                <span>{currentIdx < quizList.length - 1 ? 'Câu tiếp theo' : 'Xem tổng kết đấu trường'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ended / Results Screen */}
      {gameState === 'ended' && (
        <div
          className="card-3d"
          style={{
            padding: '40px 24px',
            borderRadius: '26px',
            textAlign: 'center',
          }}
        >
          <Trophy size={64} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4c1d95', marginBottom: '8px' }}>
            Chúc Mừng Chuyên Gia Tin Học Nhí!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', marginBottom: '18px' }}>
            Em đã trả lời đúng <strong>{correctCount} / {quizList.length}</strong> câu hỏi ở cấp độ {difficulty === 'easy' ? 'Dễ' : difficulty === 'medium' ? 'Trung Bình' : 'Thử Thách'}!
          </p>

          <div style={{ background: '#fef3c7', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '20px', marginBottom: '24px' }}>
            Tổng điểm đạt được: {score} điểm ⭐⭐⭐
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={() => setGameState('menu')}
            >
              <RotateCcw size={18} />
              <span>Chơi lại vòng mới</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
