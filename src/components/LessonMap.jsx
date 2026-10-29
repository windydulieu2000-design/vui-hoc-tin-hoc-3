import React, { useState } from 'react';
import { LANDS, LESSONS } from '../data';
import { sounds } from '../utils/audio';
import { Star, Lock, CheckCircle2, Play, Sparkles, Compass, Unlock, ShieldAlert, Award } from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function LessonMap({
  progress,
  onSelectLesson,
  onQuickGame,
}) {
  const [teacherMode, setTeacherMode] = useState(false);

  const completedCount = Object.values(progress.lessons || {}).filter(l => l.completed).length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px' }}>
      {/* Adventure Header Banner */}
      <div
        className="card-glass"
        style={{
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(237, 233, 254, 0.9) 0%, rgba(252, 231, 243, 0.9) 50%, rgba(224, 242, 254, 0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <BeBitRobot
            mood={completedCount >= 16 ? 'celebrating' : 'welcome'}
            size="medium"
            bubble={completedCount >= 16 ? 'Tuyệt đỉnh! Em đã mở khóa toàn bộ 16 bài!' : 'Cùng khám phá 6 vùng đất kỳ diệu nhé!'}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ background: '#8b5cf6', color: '#ffffff', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
                BẢN ĐỒ PHIÊU LƯU
              </span>
              <span style={{ fontSize: '13px', color: '#6d28d9', fontWeight: 'bold' }}>
                6 Vùng Đất • 16 Bài Học
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#4c1d95', marginBottom: '4px' }}>
              Bản Đồ Hành Trình Tin Học 3
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '500px' }}>
              Bộ sách Kết nối tri thức với cuộc sống. Vượt qua từng bài để thắp sáng ngôi sao và mở khóa chặng tiếp theo!
            </p>
          </div>
        </div>

        {/* Stats & Teacher Mode Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '12px 18px',
              borderRadius: '16px',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.12)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>TỔNG SAO</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Star size={20} color="#f59e0b" fill="#f59e0b" />
                <span style={{ fontSize: '20px', fontWeight: '900', color: '#b45309' }}>
                  {progress.totalStars} / 48
                </span>
              </div>
            </div>

            <div style={{ width: '1px', height: '30px', background: '#e2e8f0' }} />

            <div>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ĐÃ HỌC</span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>
                {completedCount} / 16
              </span>
            </div>
          </div>

          {/* Teacher Mode Button (allows previewing any lesson without changing progress) */}
          <button
            className="btn-bouncy"
            onClick={() => {
              sounds.playClick();
              setTeacherMode(!teacherMode);
            }}
            style={{
              background: teacherMode ? '#fef3c7' : '#ffffff',
              color: teacherMode ? '#b45309' : '#64748b',
              border: teacherMode ? '2px solid #f59e0b' : '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="Chế độ giáo viên: Cho phép truy cập trực tiếp bài học để giảng dạy"
          >
            {teacherMode ? <Unlock size={14} /> : <Lock size={14} />}
            <span>{teacherMode ? 'Chế độ Giáo Viên: BẬT (Mở xem mọi bài)' : 'Bật chế độ Giáo Viên'}</span>
          </button>
        </div>
      </div>

      {/* 6 Themed Lands */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {LANDS.map((land, landIdx) => {
          const landLessons = LESSONS.filter(l => l.themeId === land.id);

          return (
            <div
              key={land.id}
              className="card-3d"
              style={{
                borderRadius: '26px',
                padding: '24px',
                borderTop: `8px solid ${land.color}`,
                background: '#ffffff',
                position: 'relative',
              }}
            >
              {/* Land Banner */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      fontSize: '32px',
                      width: '54px',
                      height: '54px',
                      borderRadius: '18px',
                      background: land.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    {land.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: land.color, textTransform: 'uppercase' }}>
                        Vùng đất {landIdx + 1}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>• {land.themeName}</span>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                      {land.name}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                      {land.landscape}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    background: land.bgColor,
                    color: land.color,
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {landLessons.length} Trạm bài học
                </span>
              </div>

              {/* Connected Lesson Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '16px',
                }}
              >
                {landLessons.map((lesson) => {
                  const lessonProg = progress.lessons?.[lesson.id] || {
                    stars: 0,
                    completed: false,
                    unlocked: lesson.id === 1,
                  };

                  const isUnlocked = lessonProg.unlocked || progress.unlockAll || teacherMode;
                  const isCompleted = lessonProg.completed;
                  const stars = lessonProg.stars || 0;

                  return (
                    <div
                      key={lesson.id}
                      className="btn-bouncy"
                      onClick={() => {
                        if (isUnlocked) {
                          sounds.playClick();
                          onSelectLesson(lesson);
                        } else {
                          sounds.playWrong();
                          alert(`Bài ${lesson.id} chưa mở khóa! Hãy hoàn thành Bài ${lesson.id - 1} trước nhé!`);
                        }
                      }}
                      style={{
                        background: isCompleted ? '#ffffff' : isUnlocked ? '#ffffff' : '#f8fafc',
                        border: isCompleted
                          ? '2px solid #10b981'
                          : isUnlocked
                          ? `2px solid ${land.accentColor}`
                          : '2px dashed #cbd5e1',
                        borderRadius: '20px',
                        padding: '18px',
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        opacity: isUnlocked ? 1 : 0.65,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '150px',
                        position: 'relative',
                        boxShadow: isCompleted
                          ? '0 6px 18px rgba(16, 185, 129, 0.15)'
                          : isUnlocked
                          ? '0 6px 18px rgba(139, 92, 246, 0.08)'
                          : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div>
                        {/* Card Top */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span
                            style={{
                              background: isCompleted ? '#d1fae5' : isUnlocked ? land.bgColor : '#e2e8f0',
                              color: isCompleted ? '#065f46' : isUnlocked ? land.color : '#64748b',
                              padding: '3px 10px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: 'bold',
                            }}
                          >
                            Bài {lesson.id}
                          </span>

                          {isUnlocked ? (
                            <div style={{ display: 'flex', gap: '3px' }}>
                              {[1, 2, 3].map((s) => (
                                <Star
                                  key={s}
                                  size={16}
                                  color={s <= stars ? '#f59e0b' : '#e2e8f0'}
                                  fill={s <= stars ? '#f59e0b' : 'none'}
                                />
                              ))}
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '11px' }}>
                              <Lock size={14} />
                              <span>Khóa</span>
                            </div>
                          )}
                        </div>

                        {/* Lesson Title */}
                        <h3
                          style={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: isUnlocked ? '#1e293b' : '#94a3b8',
                            lineHeight: '1.4',
                            marginBottom: '6px',
                          }}
                        >
                          {lesson.title.replace(/^Bài \d+: /, '')}
                        </h3>

                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                          {lesson.objectives?.slice(0, 75)}...
                        </p>
                      </div>

                      {/* Card Bottom */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: isCompleted ? '#10b981' : isUnlocked ? '#8b5cf6' : '#94a3b8' }}>
                          {isCompleted ? '✓ Đã hoàn thành' : isUnlocked ? 'Đang mở • Vào học' : 'Chưa mở khóa'}
                        </span>

                        {isUnlocked && (
                          <div
                            style={{
                              background: isCompleted ? '#d1fae5' : land.bgColor,
                              color: isCompleted ? '#047857' : land.color,
                              padding: '4px 10px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          >
                            <Play size={12} fill={isCompleted ? '#047857' : land.color} />
                            <span>Học ngay</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
