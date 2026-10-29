import React, { useState } from 'react';
import { sounds, speakVietnamese } from '../utils/audio';
import { LESSONS, LANDS, INITIAL_TEAMS } from '../data';
import {
  Users,
  Trophy,
  Shuffle,
  Plus,
  Minus,
  Eye,
  RotateCcw,
  Volume2,
  Sparkles,
  Settings,
  Edit2,
  Check,
  Zap,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function GroupBattle() {
  const [numTeams, setNumTeams] = useState(4); // 2, 3, or 4 teams
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [selectedThemeId, setSelectedThemeId] = useState('all'); // 'all' or 1..6
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [leadingTeam, setLeadingTeam] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editScoreValue, setEditScoreValue] = useState(0);

  // Filter pool based on selected theme
  const questionPool = LESSONS.filter(l => selectedThemeId === 'all' || l.themeId === Number(selectedThemeId))
    .flatMap(lesson =>
      lesson.questions.map(q => ({
        ...q,
        lessonTitle: lesson.title,
        landName: lesson.landName,
      }))
    );

  const pickRandomQuestion = () => {
    sounds.playClick();
    if (questionPool.length === 0) return;
    const rand = questionPool[Math.floor(Math.random() * questionPool.length)];
    setCurrentQuestion(rand);
    setShowAnswer(false);
  };

  const handleScoreChange = (teamId, delta) => {
    if (delta > 0) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }

    setTeams(prev => {
      const updated = prev.map(t => {
        if (t.id === teamId) {
          return { ...t, score: Math.max(0, t.score + delta) };
        }
        return t;
      });

      const activeTeams = updated.slice(0, numTeams);
      const sorted = [...activeTeams].sort((a, b) => b.score - a.score);
      if (sorted[0].score > 0) {
        setLeadingTeam(sorted[0]);
      }
      return updated;
    });
  };

  const handleSaveEditScore = (teamId) => {
    sounds.playClick();
    setTeams(prev =>
      prev.map(t => {
        if (t.id === teamId) {
          return { ...t, score: Math.max(0, Number(editScoreValue)) };
        }
        return t;
      })
    );
    setEditingTeamId(null);
  };

  const resetAllScores = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại điểm số của tất cả các đội về 0 không?')) {
      sounds.playClick();
      setTeams(prev => prev.map(t => ({ ...t, score: 0 })));
      setLeadingTeam(null);
      setCurrentQuestion(null);
      setShowAnswer(false);
    }
  };

  const activeTeamsList = teams.slice(0, numTeams);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px' }}>
      {/* Top Banner Control */}
      <div
        className="card-glass"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderRadius: '20px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '14px', color: '#f59e0b' }}>
            <Users size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Thi Đấu Nhóm Tại Phòng Máy (Màn Chiếu Lớp Học)
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Dành cho giáo viên: Bấm câu hỏi lớn, cộng/trừ điểm và vinh danh đội chiến thắng
            </p>
          </div>
        </div>

        {/* Setup Controls: Number of teams & Theme Filter */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Select number of teams */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '4px 8px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Số đội:</span>
            {[2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setNumTeams(n)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  background: numTeams === n ? '#8b5cf6' : 'transparent',
                  color: numTeams === n ? '#ffffff' : '#64748b',
                }}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Select Theme */}
          <select
            value={selectedThemeId}
            onChange={(e) => setSelectedThemeId(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#4c1d95',
              background: '#ffffff',
              outline: 'none',
            }}
          >
            <option value="all">Tất cả 6 Chủ đề</option>
            {LANDS.map(land => (
              <option key={land.id} value={land.id}>
                {land.themeName}
              </option>
            ))}
          </select>

          <button
            className="btn-bouncy btn-primary-3d"
            onClick={pickRandomQuestion}
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <Shuffle size={16} />
            <span>Bốc câu hỏi ngẫu nhiên</span>
          </button>

          <button
            className="btn-bouncy"
            onClick={resetAllScores}
            style={{
              background: '#f1f5f9',
              color: '#64748b',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            title="Đặt lại điểm số"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Team Scoreboards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numTeams}, 1fr)`,
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        {activeTeamsList.map((team) => {
          const isLeader = leadingTeam?.id === team.id && team.score > 0;
          const isEditing = editingTeamId === team.id;

          return (
            <div
              key={team.id}
              className="card-3d"
              style={{
                borderRadius: '22px',
                padding: '16px',
                textAlign: 'center',
                border: isLeader ? `3px solid ${team.color}` : '2px solid #ede9fe',
                boxShadow: isLeader ? `0 10px 24px ${team.color}33` : '0 4px 12px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
            >
              {isLeader && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: team.color,
                    color: '#ffffff',
                    padding: '2px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trophy size={12} /> Dẫn đầu
                </div>
              )}

              <span style={{ fontSize: '32px' }}>{team.avatar}</span>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: team.color, margin: '4px 0 2px' }}>
                {team.name}
              </h3>
              <p style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '8px' }}>
                {team.motto}
              </p>

              {/* Score Display / Edit */}
              {isEditing ? (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0' }}>
                  <input
                    type="number"
                    value={editScoreValue}
                    onChange={(e) => setEditScoreValue(e.target.value)}
                    style={{
                      width: '70px',
                      padding: '4px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      borderRadius: '8px',
                      border: '2px solid #8b5cf6',
                    }}
                  />
                  <button
                    onClick={() => handleSaveEditScore(team.id)}
                    style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', padding: '4px 8px', cursor: 'pointer' }}
                  >
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: '38px',
                    fontWeight: '900',
                    color: '#332d4b',
                    margin: '6px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setEditingTeamId(team.id);
                    setEditScoreValue(team.score);
                  }}
                  title="Nhấp để sửa điểm số trực tiếp"
                >
                  {team.score}
                </div>
              )}

              {/* Score increment & decrement buttons */}
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px' }}>
                <button
                  className="btn-bouncy"
                  onClick={() => handleScoreChange(team.id, 10)}
                  style={{
                    flex: 1,
                    background: '#d1fae5',
                    color: '#065f46',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                  }}
                >
                  <Plus size={14} /> +10
                </button>

                <button
                  className="btn-bouncy"
                  onClick={() => handleScoreChange(team.id, 20)}
                  style={{
                    flex: 1,
                    background: '#ede9fe',
                    color: '#6d28d9',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                  }}
                  title="Thưởng thêm câu khó"
                >
                  <Plus size={14} /> +20
                </button>

                <button
                  className="btn-bouncy"
                  onClick={() => handleScoreChange(team.id, -5)}
                  style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    border: 'none',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                  title="Trừ 5 điểm khi trả lời sai"
                >
                  <Minus size={14} /> -5
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Question Projector Screen */}
      <div
        className="card-3d"
        style={{
          borderRadius: '26px',
          padding: '30px',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {currentQuestion ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span
                style={{
                  background: '#ede9fe',
                  color: '#6d28d9',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                }}
              >
                {currentQuestion.lessonTitle} • {currentQuestion.landName}
              </span>

              <button
                className="btn-bouncy"
                onClick={() => speakVietnamese(`${currentQuestion.question}. Các phương án là: ${currentQuestion.options.join('. ')}`)}
                style={{
                  background: '#f1edff',
                  color: '#8b5cf6',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Volume2 size={16} /> Đọc câu hỏi
              </button>
            </div>

            <h3
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#1e293b',
                lineHeight: '1.5',
                marginBottom: '22px',
              }}
            >
              ❓ {currentQuestion.question}
            </h3>

            {/* 4 Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              {currentQuestion.options.map((opt, idx) => {
                const isCorrect = idx === currentQuestion.correctIndex;

                return (
                  <div
                    key={idx}
                    style={{
                      background: showAnswer && isCorrect ? '#d1fae5' : '#f8fafc',
                      border: showAnswer && isCorrect ? '2px solid #10b981' : '1px solid #e2e8f0',
                      padding: '16px',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontWeight: showAnswer && isCorrect ? 'bold' : '600',
                      color: showAnswer && isCorrect ? '#065f46' : '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: showAnswer && isCorrect ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'none',
                    }}
                  >
                    <span>{opt}</span>
                    {showAnswer && isCorrect && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ ĐÁP ÁN ĐÚNG</span>}
                  </div>
                );
              })}
            </div>

            {/* Explanation when revealed */}
            {showAnswer && (
              <div
                style={{
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  borderRadius: '16px',
                  padding: '16px',
                  fontSize: '14px',
                  color: '#78350f',
                  marginBottom: '16px',
                  lineHeight: '1.6',
                }}
              >
                <strong>Giải thích chi tiết:</strong> {currentQuestion.explanation}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <BeBitRobot mood="welcome" size="large" bubble="Thầy/Cô hãy bấm 'Bốc câu hỏi ngẫu nhiên' để các tổ bắt đầu thi đua nhé!" />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4c1d95', marginTop: '16px' }}>
              Đấu Trường Thi Đấu Nhóm Sẵn Sàng!
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
              Chiếu lên màn chiếu phòng máy để tổ chức trò chơi học tập sôi nổi cho học sinh lớp 3.
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        {currentQuestion && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
            <button
              className="btn-bouncy"
              onClick={() => setShowAnswer(!showAnswer)}
              style={{
                background: showAnswer ? '#f1f5f9' : '#06b6d4',
                color: showAnswer ? '#64748b' : '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Eye size={16} /> {showAnswer ? 'Ẩn đáp án' : 'Hiện đáp án & Giải thích'}
            </button>

            <button
              className="btn-bouncy btn-primary-3d"
              onClick={pickRandomQuestion}
            >
              <Zap size={16} />
              <span>Câu hỏi tiếp theo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
