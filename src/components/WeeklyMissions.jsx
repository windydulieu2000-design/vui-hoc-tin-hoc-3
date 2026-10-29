import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Gift,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Star,
  Film,
  BookOpen,
  Monitor,
  Palette,
  Search,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function WeeklyMissions({ progress, onUpdateProgress, onNavigate }) {
  const [claimedReward, setClaimedReward] = useState(() => progress.weeklyRewardClaimed || false);

  // Check actual completion states from progress
  const watchedCount = Object.keys(progress.watchedVideos || {}).length;
  const completedLessons = Object.values(progress.lessons || {}).filter((l) => l.completed).length;
  const completedLabs = Object.keys(progress.completedLabs || {}).length;
  const solvedCases = Object.keys(progress.solvedCases || {}).length;

  const missions = [
    {
      id: 'm1',
      title: 'Khám phá Rạp phim AI',
      desc: 'Xem ít nhất 1 video bài giảng AI của Bé Bít',
      icon: <Film size={20} color="#8b5cf6" />,
      color: '#8b5cf6',
      done: watchedCount >= 1,
      progressLabel: `${Math.min(watchedCount, 1)}/1 Video`,
      targetTab: 'theater',
    },
    {
      id: 'm2',
      title: 'Chinh phục bài học SGK',
      desc: 'Hoàn thành ít nhất 1 bài học trên Bản đồ 16 bài',
      icon: <BookOpen size={20} color="#ec4899" />,
      color: '#ec4899',
      done: completedLessons >= 1,
      progressLabel: `${Math.min(completedLessons, 1)}/1 Bài`,
      targetTab: 'map',
    },
    {
      id: 'm3',
      title: 'Rèn luyện thao tác máy tính',
      desc: 'Hoàn thành 1 bài tập trong Phòng thực hành ảo',
      icon: <Monitor size={20} color="#06b6d4" />,
      color: '#06b6d4',
      done: completedLabs >= 1,
      progressLabel: `${Math.min(completedLabs, 1)}/1 Lab`,
      targetTab: 'labs',
    },
    {
      id: 'm4',
      title: 'Họa sĩ công nghệ nhí',
      desc: 'Sáng tạo một tác phẩm trong Xưởng sáng tạo',
      icon: <Palette size={20} color="#10b981" />,
      color: '#10b981',
      done: true, // Creative sandbox is open anytime
      progressLabel: '1/1 Tác phẩm',
      targetTab: 'creative',
    },
    {
      id: 'm5',
      title: 'Phá án công nghệ',
      desc: 'Điều tra và giải quyết thành công 1 vụ án Thám tử',
      icon: <Search size={20} color="#f59e0b" />,
      color: '#f59e0b',
      done: solvedCases >= 1,
      progressLabel: `${Math.min(solvedCases, 1)}/1 Vụ án`,
      targetTab: 'detective',
    },
  ];

  const completedCount = missions.filter((m) => m.done).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  const handleClaimReward = () => {
    if (completedCount === missions.length && !claimedReward) {
      setClaimedReward(true);
      onUpdateProgress({
        ...progress,
        weeklyRewardClaimed: true,
        xp: (progress.xp || 0) + 150,
        totalStars: (progress.totalStars || 0) + 3,
      });
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ede9fe 0%, #fef3c7 50%, #dcfce7 100%)',
          borderRadius: '24px',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.25)',
            }}
          >
            <Calendar size={30} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>
              <Flame size={14} color="#f59e0b" />
              <span>Kế Hoạch Học Tập Tuần</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#4c1d95', margin: 0 }}>
              Nhiệm Vụ Tuần Của Em 📅
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              Hoàn thành 5 nhiệm vụ để nhận Rương phần thưởng tuần siêu to khổng lồ!
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>TIẾN ĐỘ TUẦN NÀY</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a' }}>
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: '#e2e8f0', height: '14px', borderRadius: '999px', overflow: 'hidden', marginBottom: '24px' }}>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #8b5cf6, #10b981)',
            borderRadius: '999px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* Mission List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
        {missions.map((m) => (
          <div
            key={m.id}
            style={{
              background: '#ffffff',
              border: m.done ? '2px solid #86efac' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: m.color + '15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {m.icon}
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 'bold', color: '#1e293b' }}>
                  {m.title}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{m.desc}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: m.done ? '#15803d' : '#64748b',
                  background: m.done ? '#dcfce7' : '#f1f5f9',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                {m.done ? '✓ Đã đạt' : m.progressLabel}
              </span>

              {!m.done && onNavigate && (
                <button
                  onClick={() => onNavigate(m.targetTab)}
                  style={{
                    background: '#8b5cf6',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Đi làm ngay →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Mystery Chest */}
      <div
        className="card-glass"
        style={{
          background: claimedReward ? '#f8fafc' : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
          border: claimedReward ? '2px dashed #cbd5e1' : '3px solid #f59e0b',
          borderRadius: '24px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 12px 28px rgba(245, 158, 11, 0.15)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>
          {claimedReward ? '🎁' : '👑'}
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '900', color: claimedReward ? '#64748b' : '#78350f', margin: '0 0 6px 0' }}>
          {claimedReward ? 'Đã Nhận Rương Phần Thưởng Tuần' : 'Rương Kho Báu Tuần Của Bé Bít'}
        </h3>
        <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 16px 0' }}>
          {claimedReward
            ? 'Em đã nhận +150 XP và 3 Ngôi Sao Vàng trong tuần này! Hãy tiếp tục duy trì nhé!'
            : 'Phần thưởng: +150 XP kinh nghiệm, 3 Ngôi Sao Vàng và Huy hiệu Tuần Siêu Đẳng!'}
        </p>

        {!claimedReward && (
          <button
            disabled={completedCount < missions.length}
            onClick={handleClaimReward}
            className="btn-bouncy"
            style={{
              background: completedCount === missions.length ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#cbd5e1',
              color: '#ffffff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '14px',
              fontWeight: '900',
              fontSize: '15px',
              cursor: completedCount === missions.length ? 'pointer' : 'not-allowed',
              boxShadow: completedCount === missions.length ? '0 8px 20px rgba(245, 158, 11, 0.35)' : 'none',
            }}
          >
            {completedCount === missions.length ? 'MỞ RƯƠNG PHẦN THƯỞNG 🎁' : `Cần hoàn thành đủ 5/5 (${completedCount}/5)`}
          </button>
        )}
      </div>
    </div>
  );
}
