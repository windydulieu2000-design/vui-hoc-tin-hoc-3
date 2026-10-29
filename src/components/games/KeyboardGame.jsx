import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';
import { Keyboard, Trophy, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const HOME_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];
const COMPUTER_WORDS = ['ROBOT', 'CHUOT', 'BAN PHIM', 'MAN HINH', 'TEP TIN', 'THU MUC', 'UNIKEY', 'INTERNET'];

export default function KeyboardGame({ onComplete }) {
  const [mode, setMode] = useState('home'); // home, words
  const [targetChar, setTargetChar] = useState('F');
  const [targetWord, setTargetWord] = useState('ROBOT');
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('Hãy nhấn đúng phím đang sáng trên bàn phím!');
  const [robotMood, setRobotMood] = useState('normal');
  const [completedCount, setCompletedCount] = useState(0);

  const keyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SPACE'],
  ];

  const pickNewChar = () => {
    const nextChar = HOME_ROW[Math.floor(Math.random() * HOME_ROW.length)];
    setTargetChar(nextChar);
  };

  const pickNewWord = () => {
    const nextWord = COMPUTER_WORDS[Math.floor(Math.random() * COMPUTER_WORDS.length)];
    setTargetWord(nextWord);
    setWordIndex(0);
  };

  useEffect(() => {
    if (mode === 'home') {
      pickNewChar();
    } else {
      pickNewWord();
    }
  }, [mode]);

  // Handle keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressed = e.key.toUpperCase();
      checkKeyInput(pressed === ' ' ? 'SPACE' : pressed);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const checkKeyInput = (key) => {
    if (mode === 'home') {
      if (key === targetChar) {
        sounds.playCorrect();
        setScore(s => s + 10 + combo * 2);
        setCombo(c => c + 1);
        setRobotMood('happy');
        setFeedback(`Chính xác! Bạn gõ phím [${targetChar}] rất chuẩn!`);
        const nextCount = completedCount + 1;
        setCompletedCount(nextCount);
        if (nextCount >= 15) {
          sounds.playStar();
          setFeedback('Hoan hô! Em đã hoàn thành thử thách hàng phím cơ sở!');
          if (onComplete) onComplete(100);
        }
        pickNewChar();
      } else {
        sounds.playWrong();
        setCombo(0);
        setRobotMood('sad');
        setFeedback(`Chưa đúng rồi! Phím cần gõ là [${targetChar}], em vừa nhấn [${key}].`);
      }
    } else {
      // Word mode
      const neededChar = targetWord[wordIndex] === ' ' ? 'SPACE' : targetWord[wordIndex];
      if (key === neededChar) {
        sounds.playCorrect();
        const nextIndex = wordIndex + 1;
        setScore(s => s + 15);
        if (nextIndex >= targetWord.length) {
          sounds.playStar();
          setRobotMood('happy');
          setFeedback(`Xuất sắc! Em đã hoàn thành từ '${targetWord}'!`);
          setCompletedCount(c => c + 1);
          pickNewWord();
        } else {
          setWordIndex(nextIndex);
          setFeedback(`Tiếp tục gõ chữ tiếp theo nhé!`);
        }
      } else {
        sounds.playWrong();
        setRobotMood('sad');
        setFeedback(`Nhầm một chút rồi! Hãy gõ ký tự '${neededChar}'.`);
      }
    }
  };

  const activeKeyToHighlight = mode === 'home' ? targetChar : (targetWord[wordIndex] === ' ' ? 'SPACE' : targetWord[wordIndex]);

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
            <Keyboard size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 2: Tay gõ siêu tốc (Luyện bàn phím)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6387' }}>
              Rèn ngón tay: Hàng phím cơ sở và từ vựng Tin học lớp 3
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Điểm</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>{score}đ</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Liên tiếp</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ec4899' }}>🔥 x{combo}</span>
          </div>
        </div>
      </div>

      {/* Mode selection */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button
          onClick={() => { setMode('home'); setCompletedCount(0); }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            background: mode === 'home' ? '#8b5cf6' : '#ffffff',
            color: mode === 'home' ? '#ffffff' : '#6b6387',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          Mức 1: Hàng phím cơ sở (A S D F J K L ;)
        </button>
        <button
          onClick={() => { setMode('words'); setCompletedCount(0); }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            background: mode === 'words' ? '#ec4899' : '#ffffff',
            color: mode === 'words' ? '#ffffff' : '#6b6387',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          Mức 2: Từ vựng Tin học (ROBOT, CHUOT...)
        </button>
      </div>

      {/* Target Screen */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '24px 20px',
          textAlign: 'center',
          boxShadow: '0 6px 20px rgba(139, 92, 246, 0.08)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <BeBitRobot mood={robotMood} size="small" screenText="⌨️" />
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {mode === 'home' ? 'Phím cần gõ tiếp theo' : 'Từ vựng cần hoàn thành'}
            </span>
            {mode === 'home' ? (
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: '900',
                  color: '#4c1d95',
                  letterSpacing: '2px',
                  lineHeight: '1.2',
                }}
              >
                {targetChar}
              </div>
            ) : (
              <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '4px', marginTop: '6px' }}>
                {targetWord.split('').map((char, idx) => (
                  <span
                    key={idx}
                    style={{
                      color: idx < wordIndex ? '#10b981' : idx === wordIndex ? '#ec4899' : '#cbd5e1',
                      borderBottom: idx === wordIndex ? '4px solid #ec4899' : 'none',
                      padding: '0 4px',
                    }}
                  >
                    {char === ' ' ? '␣' : char}
                  </span>
                ))}
              </div>
            )}
            <p style={{ fontSize: '13px', color: '#6b6387', marginTop: '6px' }}>{feedback}</p>
          </div>
        </div>
      </div>

      {/* Virtual Keyboard */}
      <div
        style={{
          background: '#ede9fe',
          borderRadius: '20px',
          padding: '16px',
          border: '2px solid #ddd6fe',
          boxShadow: '0 4px 16px rgba(139, 92, 246, 0.1)',
        }}
      >
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b6387', marginBottom: '10px' }}>
          💡 Hai ngón trỏ đặt mốc tại <strong>F</strong> và <strong>J</strong> (có gờ nổi màu cam)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          {keyLayout.map((row, rIdx) => (
            <div key={rIdx} style={{ display: 'flex', gap: '6px', justifyContent: 'center', width: '100%' }}>
              {row.map((k) => {
                const isActive = activeKeyToHighlight === k;
                const isAnchor = k === 'F' || k === 'J';
                const isSpace = k === 'SPACE';

                return (
                  <button
                    key={k}
                    className="btn-bouncy"
                    onClick={() => checkKeyInput(k)}
                    style={{
                      width: isSpace ? '200px' : '48px',
                      height: '46px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: isSpace ? '12px' : '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      background: isActive
                        ? '#ec4899'
                        : isAnchor
                        ? '#fef3c7'
                        : '#ffffff',
                      color: isActive ? '#ffffff' : isAnchor ? '#b45309' : '#332d4b',
                      borderBottom: isActive ? '4px solid #be185d' : '4px solid #c4b5fd',
                      boxShadow: isActive ? '0 0 12px rgba(236, 72, 153, 0.5)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {k}
                    {isAnchor && <span style={{ display: 'block', fontSize: '8px', marginTop: '-4px' }}>━</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
