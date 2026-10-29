import React from 'react';
import { sounds } from '../utils/audio';
import { LESSONS, LANDS, BADGES } from '../data';
import {
  Map,
  Gamepad2,
  Sparkles,
  Award,
  Users,
  Compass,
  Star,
  Zap,
  ArrowRight,
  CheckCircle2,
  Trophy,
  BrainCircuit,
  BarChart3,
  Calendar,
  Film,
  Monitor,
  Search,
  Palette,
  Brain,
  Crown,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function HomeDashboard({
  progress,
  onNavigate,
  onStartAdventure,
  onOpenBadges,
  videosCount = 23,
}) {
  const completedLessonsCount = Object.values(progress.lessons || {}).filter((l) => l.completed).length;
  const progressPercent = Math.round((completedLessonsCount / 16) * 100);

  // Next lesson calculation
  const nextLessonId = Math.min(16, completedLessonsCount + 1);
  const nextLesson = LESSONS.find((l) => l.id === nextLessonId) || LESSONS[0];

  // Badges unlocked count
  const unlockedBadgesCount = BADGES.filter((b) => b.requirement(progress)).length;
  const watchedVideosCount = Object.keys(progress.watchedVideos || {}).length;
  const completedLabsCount = Object.keys(progress.completedLabs || {}).length;

  const featureCards = [
    {
      id: 'map',
      title: 'Khám Phá 16 Bài Học',
      subtitle: 'Hành trình 6 vùng đất tri thức',
      desc: 'Bản đồ phiêu lưu theo đúng chuẩn SGK Tin học 3 Kết nối tri thức',
      icon: <Map size={28} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #ede9fe 0%, #ffffff 100%)',
      borderColor: '#c4b5fd',
      badge: `${completedLessonsCount}/16 Bài`,
      action: () => onNavigate('map'),
    },
    {
      id: 'theater',
      title: 'Rạp Phim AI Của Bé Bít',
      subtitle: 'Thư viện 23 Video AI Google Drive',
      desc: 'Xem bài giảng video 16:9 sắc nét, đố vui sau phim và thực hành ngay',
      icon: <Film size={28} color="#ec4899" />,
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #fce7f3 0%, #ffffff 100%)',
      borderColor: '#fbcfe8',
      badge: `${watchedVideosCount}/${videosCount} Đã xem`,
      action: () => onNavigate('theater'),
    },
    {
      id: 'labs',
      title: 'Phòng Thực Hành Ảo',
      subtitle: '10 Mô phỏng máy tính 100% tương tác',
      desc: 'Khám phá phần cứng, chuột, bàn phím F/J, tạo thư mục desktop, vẽ paint...',
      icon: <Monitor size={28} color="#06b6d4" />,
      color: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)',
      borderColor: '#bae6fd',
      badge: `${completedLabsCount}/10 Lab`,
      action: () => onNavigate('labs'),
    },
    {
      id: 'detective',
      title: 'Bé Bít – Thám Tử Công Nghệ',
      subtitle: '6 Vụ án điều tra lỗi máy tính',
      desc: 'Tìm tệp thất lạc, kiểm tra mật khẩu, phát hiện tư thế sai và gỡ lỗi robot',
      icon: <Search size={28} color="#f59e0b" />,
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 100%)',
      borderColor: '#fde68a',
      badge: '6 Vụ án',
      action: () => onNavigate('detective'),
    },
    {
      id: 'creative',
      title: 'Xưởng Sáng Tạo Của Em',
      subtitle: 'Đồ họa tuổi thơ & Triển lãm',
      desc: 'Vẽ tranh pastel, ghép hình robot, làm thiệp mừng 20/11, thiết kế slide mini',
      icon: <Palette size={28} color="#10b981" />,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #ffffff 100%)',
      borderColor: '#a7f3d0',
      badge: 'Triển lãm',
      action: () => onNavigate('creative'),
    },
    {
      id: 'treasury',
      title: 'Kho Báu Của Bé Bít',
      subtitle: '6 Mảnh ghép Robot & Giấy khen',
      desc: 'Rèn đúc Robot Hoàng Gia Pastel, bộ sưu tập huy hiệu và in giấy khen vinh danh',
      icon: <Trophy size={28} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
      borderColor: '#ddd6fe',
      badge: `${unlockedBadgesCount}/8 Huy hiệu`,
      action: () => onNavigate('treasury'),
    },
    {
      id: 'missions',
      title: 'Nhiệm Vụ Tuần Của Em',
      subtitle: 'Checklist rèn luyện hàng tuần',
      desc: 'Hoàn thành 5 thử thách công nghệ để mở Rương kho báu tuần +150 XP',
      icon: <Calendar size={28} color="#ec4899" />,
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 100%)',
      borderColor: '#f472b6',
      badge: 'Rương quà',
      action: () => onNavigate('missions'),
    },
    {
      id: 'flashcards',
      title: 'Thư Viện Thẻ Kiến Thức',
      subtitle: '16 Flashcard 3D lật 2 mặt',
      desc: 'Ôn tập nhanh các khái niệm cốt lõi SGK: CPU, thư mục, mật khẩu, thuật toán...',
      icon: <Brain size={28} color="#06b6d4" />,
      color: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 100%)',
      borderColor: '#a5f3fc',
      badge: '16 Khái niệm',
      action: () => onNavigate('flashcards'),
    },
    {
      id: 'games',
      title: 'Thế Giới Trò Chơi (12 Trò)',
      subtitle: 'Thực hành thao tác tương tác thật',
      desc: 'Chuột, bàn phím, mê cung, xếp tệp, lắp ráp máy tính, câu cá thuật toán...',
      icon: <Gamepad2 size={28} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
      borderColor: '#ddd6fe',
      badge: '12 Trò chơi',
      action: () => onNavigate('games'),
    },
    {
      id: 'battle',
      title: 'Thi Đấu Nhóm Tại Lớp',
      subtitle: 'Chiếu màn hình máy chiếu phòng máy',
      desc: 'Chia 4 tổ tranh tài giải đố 48 câu hỏi với điểm số và pháo hoa rực rỡ',
      icon: <Users size={28} color="#ec4899" />,
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #fce7f3 0%, #ffffff 100%)',
      borderColor: '#fbcfe8',
      badge: 'Phòng máy',
      action: () => onNavigate('battle'),
    },
    {
      id: 'teacher',
      title: 'Thành Tích & Góc Giáo Viên',
      subtitle: 'Đánh giá TT 27 & Quản lý Video AI',
      desc: 'Bảng theo dõi điểm số, tạo đề kiểm tra tự động, in phiếu và xuất JSON/CSV',
      icon: <BarChart3 size={28} color="#10b981" />,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #ffffff 100%)',
      borderColor: '#a7f3d0',
      badge: 'Báo cáo TT 27',
      action: () => onNavigate('teacher'),
    },
  ];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '16px' }}>
      {/* Hero Welcome Card */}
      <div
        className="card-glass"
        style={{
          padding: '32px 28px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(237, 233, 254, 0.85) 0%, rgba(252, 231, 243, 0.85) 50%, rgba(224, 242, 254, 0.85) 100%)',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '12px', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.12)' }}>
              <Sparkles size={16} />
              <span>Thế Giới Robot Pastel • Tin Học 3 Kết Nối Tri Thức</span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#4c1d95', lineHeight: '1.25', marginBottom: '10px' }}>
              Chào bạn {progress.studentName || 'Bé Bít Nhí'}! 🚀
            </h1>

            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
              Cùng <strong>Robot Bé Bít</strong> khám phá 16 bài học SGK, 23 video AI, phòng thực hành ảo và trở thành <strong>Chuyên gia Tin học tiểu học</strong> nhé!
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn-bouncy"
                onClick={onStartAdventure}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.35)',
                }}
              >
                <span>BẮT ĐẦU PHIÊU LƯU</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => onNavigate('theater')}
                style={{
                  background: '#ffffff',
                  color: '#ec4899',
                  border: '2px solid #fbcfe8',
                  padding: '12px 22px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Film size={18} />
                <span>Rạp Phim AI (23 Video)</span>
              </button>
            </div>
          </div>

          {/* Robot Avatar and Speech */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <BeBitRobot
              mood={completedLessonsCount > 8 ? 'proud' : 'welcome'}
              size={130}
              speech={`Xin chào! Mình là Bé Bít. Hôm nay chúng mình sẽ cùng học ${nextLesson ? nextLesson.title : 'bài mới'} nhé!`}
            />
          </div>
        </div>

        {/* Learning Journey Progress Bar */}
        <div style={{ marginTop: '28px', background: 'rgba(255, 255, 255, 0.7)', padding: '16px 20px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#8b5cf6" />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#4c1d95' }}>TIẾN TRÌNH HỌC TẬP CỦA EM</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#ec4899' }}>
              {completedLessonsCount}/16 Bài hoàn thành ({progressPercent}%)
            </span>
          </div>

          <div style={{ background: '#e2e8f0', height: '14px', borderRadius: '999px', overflow: 'hidden', position: 'relative' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
                borderRadius: '999px',
                transition: 'width 0.6s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
            <span>⭐ <strong>{progress.totalStars || 0}</strong> Sao vàng đạt được</span>
            <span>⚡ <strong>{progress.xp || 0}</strong> Điểm kinh nghiệm (XP)</span>
            <span>🎖️ <strong>{unlockedBadgesCount}/8</strong> Huy hiệu đã mở khóa</span>
          </div>
        </div>
      </div>

      {/* Feature Navigation Grid */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Các Khu Vực Học Tập & Sáng Tạo</span>
          <span style={{ fontSize: '12px', fontWeight: 'bold', background: '#ede9fe', color: '#7c3aed', padding: '2px 10px', borderRadius: '999px' }}>
            11 Phân Khu
          </span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {featureCards.map((card) => (
            <div
              key={card.id}
              onClick={card.action}
              className="card-bouncy"
              style={{
                background: card.bgGradient,
                border: `2px solid ${card.borderColor}`,
                borderRadius: '20px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '170px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <span
                  style={{
                    background: card.color + '20',
                    color: card.color,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '800',
                  }}
                >
                  {card.badge}
                </span>
              </div>

              <div>
                <div style={{ padding: '10px', borderRadius: '14px', background: '#ffffff', width: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '12px' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1e293b', margin: '0 0 4px 0' }}>
                  {card.title}
                </h3>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: card.color, marginBottom: '6px' }}>
                  {card.subtitle}
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
                  {card.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '14px', fontSize: '12px', fontWeight: 'bold', color: card.color }}>
                <span>Khám phá ngay</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
