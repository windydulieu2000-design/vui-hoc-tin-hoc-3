import React, { useState } from 'react';
import { BADGES, LANDS, LESSONS } from '../data';
import {
  Trophy,
  Award,
  Sparkles,
  Star,
  Printer,
  CheckCircle2,
  Lock,
  Bot,
  Zap,
  Flame,
  Crown,
  Heart,
  Shield,
  Layers,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function RobotTreasury({ progress }) {
  const [activeTab, setActiveTab] = useState('puzzle'); // 'puzzle', 'badges', 'certificate'

  // Calculate theme completion for 6 robot pieces
  const pieces = LANDS.map((land) => {
    const lessonsInTheme = LESSONS.filter((l) => l.themeId === land.id);
    const completedCount = lessonsInTheme.filter((l) => progress.lessons?.[l.id]?.completed).length;
    const isUnlocked = completedCount === lessonsInTheme.length && lessonsInTheme.length > 0;

    const pieceMeta = [
      { name: 'Bánh xích tốc độ', icon: '⚙️', slot: 'Chân di chuyển' },
      { name: 'Mắt cảm biến quang', icon: '👁️', slot: 'Mắt quan sát' },
      { name: 'Trái tim vi xử lý Pastel', icon: '💎', slot: 'Thân năng lượng' },
      { name: 'Khiên giáp an toàn', icon: '🛡️', slot: 'Khiên bảo vệ' },
      { name: 'Cánh tay cơ học tài hoa', icon: '🦾', slot: 'Tay sáng tạo' },
      { name: 'Bộ não siêu thuật toán', icon: '🧠', slot: 'Đầu tư duy' },
    ][land.id - 1] || { name: 'Mảnh ghép công nghệ', icon: '🧩', slot: 'Linh kiện' };

    return {
      landId: land.id,
      landName: land.name,
      completedCount,
      totalCount: lessonsInTheme.length,
      isUnlocked,
      ...pieceMeta,
    };
  });

  const unlockedPiecesCount = pieces.filter((p) => p.isUnlocked).length;
  const isGoldenRobotUnlocked = unlockedPiecesCount === 6;

  // Unlocked badges
  const unlockedBadges = BADGES.filter((b) => b.requirement(progress));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #ede9fe 50%, #fce7f3 100%)',
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
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 16px rgba(245, 158, 11, 0.25)',
            }}
          >
            <Trophy size={30} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#b45309', marginBottom: '4px' }}>
              <Crown size={14} />
              <span>Vinh Danh Thành Tích & Cúp Danh Dự</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#78350f', margin: 0 }}>
              Kho Báu Của Bé Bít 🏆
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              Thu thập 6 mảnh ghép robot hoàng gia, vinh danh huy hiệu và nhận giấy khen tốt nghiệp!
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: '#ffffff', padding: '8px 16px', borderRadius: '14px', border: '2px solid #fde68a', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 'bold' }}>MẢNH GHÉP</div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#b45309' }}>{unlockedPiecesCount}/6</div>
          </div>
          <div style={{ background: '#ffffff', padding: '8px 16px', borderRadius: '14px', border: '2px solid #ddd6fe', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 'bold' }}>HUY HIỆU</div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#6d28d9' }}>{unlockedBadges.length}/8</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[
          { id: 'puzzle', label: '🧩 6 Mảnh Ghép Robot Vàng', count: `${unlockedPiecesCount}/6` },
          { id: 'badges', label: '🎖️ Bộ Sưu Tập Huy Hiệu', count: `${unlockedBadges.length}/8` },
          { id: 'certificate', label: '📜 Giấy Khen Điện Tử', count: 'In ấn' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '12px 20px',
              borderRadius: '14px',
              border: activeTab === t.id ? '2px solid #f59e0b' : '2px solid #e2e8f0',
              background: activeTab === t.id ? '#ffffff' : 'rgba(255,255,255,0.7)',
              color: activeTab === t.id ? '#b45309' : '#64748b',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === t.id ? '0 4px 12px rgba(245, 158, 11, 0.2)' : 'none',
            }}
          >
            <span>{t.label}</span>
            <span style={{ fontSize: '11px', background: '#fef3c7', padding: '2px 8px', borderRadius: '999px', color: '#b45309' }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: 6 Robot Pieces */}
      {activeTab === 'puzzle' && (
        <div
          className="card-glass"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: '2px solid #fef3c7',
            boxShadow: '0 12px 32px rgba(245, 158, 11, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
                Hành Trình Chế Tạo Robot Hoàng Gia 👑
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                Mỗi khi em hoàn thành toàn bộ các bài học trong một Chủ đề, mảnh ghép tương ứng sẽ được rèn đúc!
              </p>
            </div>

            {isGoldenRobotUnlocked ? (
              <div style={{ background: '#dcfce7', border: '2px solid #86efac', padding: '8px 16px', borderRadius: '12px', color: '#166534', fontWeight: '900', fontSize: '13px' }}>
                ✨ ĐÃ KÍCH HOẠT ROBOT HOÀNG GIA!
              </div>
            ) : (
              <div style={{ background: '#fef3c7', padding: '8px 16px', borderRadius: '12px', color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>
                Cần thêm {6 - unlockedPiecesCount} mảnh ghép nữa
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {pieces.map((p) => (
              <div
                key={p.landId}
                style={{
                  border: p.isUnlocked ? '2px solid #f59e0b' : '2px dashed #cbd5e1',
                  background: p.isUnlocked ? 'linear-gradient(135deg, #fef3c7 0%, #ffffff 100%)' : '#f8fafc',
                  borderRadius: '18px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  position: 'relative',
                  boxShadow: p.isUnlocked ? '0 8px 18px rgba(245, 158, 11, 0.15)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: p.isUnlocked ? '#f59e0b' : '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    color: '#ffffff',
                    boxShadow: p.isUnlocked ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none',
                  }}
                >
                  {p.isUnlocked ? p.icon : <Lock size={24} color="#94a3b8" />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: p.isUnlocked ? '#b45309' : '#94a3b8', textTransform: 'uppercase' }}>
                    Chủ đề {p.landId}: {p.slot}
                  </div>
                  <h4 style={{ margin: '2px 0 6px 0', fontSize: '15px', fontWeight: '900', color: p.isUnlocked ? '#78350f' : '#475569' }}>
                    {p.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Tiến độ: <strong>{p.completedCount}/{p.totalCount} bài hoàn thành</strong>
                  </div>
                </div>

                {p.isUnlocked && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <CheckCircle2 size={18} color="#10b981" />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Golden Robot Showcase */}
          <div
            style={{
              marginTop: '28px',
              background: isGoldenRobotUnlocked ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : '#f8fafc',
              border: isGoldenRobotUnlocked ? '3px solid #f59e0b' : '2px dashed #cbd5e1',
              borderRadius: '24px',
              padding: '28px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <BeBitRobot mood={isGoldenRobotUnlocked ? 'proud' : 'thinking'} size={110} speech={isGoldenRobotUnlocked ? 'Vinh quang vô hạn! Em đã rèn đúc thành công bộ giáp Robot Hoàng Gia Pastel!' : 'Hãy cố gắng hoàn thành đủ 16 bài học để đánh thức Robot Hoàng Gia nhé!'} />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#78350f', margin: '0 0 6px 0' }}>
              Robot Hoàng Gia Pastel Bất Khả Chiến Bại
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0, maxWidth: '600px', marginInline: 'auto' }}>
              Biểu tượng đỉnh cao dành cho học sinh hoàn thành xuất sắc toàn bộ 6 chủ đề của chương trình Tin học lớp 3 Kết nối tri thức.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Skill Badges */}
      {activeTab === 'badges' && (
        <div
          className="card-glass"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: '2px solid #ddd6fe',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
              Bộ Sưu Tập 8 Huy Hiệu Danh Giá
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              Được trao tặng khi em đạt các mốc kỹ năng đặc biệt trong hành trình học tập.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {BADGES.map((b) => {
              const isUnlocked = b.requirement(progress);
              return (
                <div
                  key={b.id}
                  style={{
                    border: isUnlocked ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                    background: isUnlocked ? 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)' : '#f8fafc',
                    borderRadius: '16px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '10px',
                    position: 'relative',
                    opacity: isUnlocked ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: isUnlocked ? '#8b5cf6' : '#cbd5e1',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      boxShadow: isUnlocked ? '0 6px 16px rgba(139, 92, 246, 0.3)' : 'none',
                    }}
                  >
                    {isUnlocked ? b.icon : <Lock size={22} />}
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '900', color: isUnlocked ? '#4c1d95' : '#64748b' }}>
                      {b.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                      {b.desc}
                    </p>
                  </div>

                  <span
                    style={{
                      marginTop: 'auto',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: isUnlocked ? '#15803d' : '#94a3b8',
                      background: isUnlocked ? '#dcfce7' : '#f1f5f9',
                      padding: '4px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {isUnlocked ? '✓ Đã mở khóa' : 'Chưa đạt yêu cầu'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Printable Certificate */}
      {activeTab === 'certificate' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button
              onClick={handlePrint}
              className="btn-bouncy"
              style={{
                background: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Printer size={16} /> In Giấy Khen Ngay
            </button>
          </div>

          {/* Certificate Container */}
          <div
            id="certificate-print-area"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              background: '#ffffff',
              border: '12px double #f59e0b',
              borderRadius: '24px',
              padding: '48px',
              textAlign: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
              position: 'relative',
              backgroundImage: 'radial-gradient(circle at 50% 50%, #fffdfa 0%, #fef3c7 100%)',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '2px', color: '#b45309', textTransform: 'uppercase', marginBottom: '8px' }}>
              CHƯƠNG TRÌNH GIÁO DỤC PHỔ THÔNG 2018 • TIN HỌC LỚP 3
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#78350f', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              GIẤY CHỨNG NHẬN VINH DANH
            </h1>

            <div style={{ width: '80px', height: '4px', background: '#f59e0b', margin: '0 auto 24px auto', borderRadius: '2px' }} />

            <p style={{ fontSize: '16px', color: '#475569', margin: '0 0 12px 0' }}>
              Chứng nhận em học sinh:
            </p>

            <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#4c1d95', margin: '0 0 8px 0' }}>
              {progress.studentName || 'Học Sinh Lớp 3'}
            </h2>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#ec4899', marginBottom: '24px' }}>
              {progress.studentClass || 'Lớp 3A'} • Trường Tiểu Học
            </div>

            <p style={{ fontSize: '16px', color: '#334155', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 36px auto' }}>
              Đã xuất sắc hoàn thành khóa học <strong>“Vui Học Tin Học 3 – Kết Nối Tri Thức”</strong>, chinh phục các bài học công nghệ và rèn luyện kỹ năng thực hành máy tính với tổng số <strong>{progress.totalStars || 0} Ngôi sao vàng</strong> và <strong>{progress.xp || 0} Điểm kinh nghiệm</strong>.
            </p>

            {/* Signatures */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', marginTop: '40px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '40px' }}>
                  ĐỒNG HÀNH CHUYÊN MÔN
                </div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#8b5cf6' }}>
                  Robot Bé Bít 🤖
                </div>
              </div>

              <div>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '3px dashed #f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b',
                    fontWeight: '900',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    margin: '0 auto',
                  }}
                >
                  XÁC NHẬN<br />HOÀN THÀNH
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '40px' }}>
                  GIÁO VIÊN BỘ MÔN
                </div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b' }}>
                  (Ký và ghi rõ họ tên)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
