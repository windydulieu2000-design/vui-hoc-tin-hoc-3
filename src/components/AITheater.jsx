import React, { useState } from 'react';
import { getDriveEmbedUrl, getDriveViewUrl, extractDriveFileId } from '../data/videoLibrary';
import { LESSONS, LANDS } from '../data';
import {
  Film,
  Play,
  CheckCircle,
  ExternalLink,
  Maximize2,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  Video,
  Ticket,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function AITheater({
  videos,
  progress,
  onUpdateProgress,
  onNavigateToPractice,
}) {
  const [selectedVideoId, setSelectedVideoId] = useState(videos[0]?.id || 1);
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterLesson, setFilterLesson] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({}); // { [qIndex]: chosenOpt }
  const [showExplanation, setShowExplanation] = useState({});

  const currentVideo = videos.find(v => v.id === selectedVideoId) || videos[0];
  const watchedVideos = progress.watchedVideos || {};
  const isCurrentWatched = !!watchedVideos[currentVideo.id];

  // Filter video list
  const filteredVideos = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.objectives && v.objectives.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchTheme = filterTheme === 'all' || v.themeId === Number(filterTheme);
    const matchLesson = filterLesson === 'all' || v.lessonId === Number(filterLesson);
    return matchSearch && matchTheme && matchLesson;
  });

  const handleMarkWatched = (vidId) => {
    if (!watchedVideos[vidId]) {
      onUpdateProgress({
        ...progress,
        watchedVideos: {
          ...watchedVideos,
          [vidId]: true,
        },
        xp: (progress.xp || 0) + 30,
      });
    }
  };

  const handleAnswerQuiz = (qIdx, optIdx) => {
    if (quizAnswers[qIdx] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));

    const isCorrect = optIdx === currentVideo.quizQuestions[qIdx]?.correctIndex;
    if (isCorrect) {
      handleMarkWatched(currentVideo.id);
      onUpdateProgress({
        ...progress,
        xp: (progress.xp || 0) + 15,
      });
    }
  };

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === currentVideo.id);
    const nextVideo = videos[(currentIndex + 1) % videos.length];
    setSelectedVideoId(nextVideo.id);
    setQuizAnswers({});
    setShowExplanation({});
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const driveId = extractDriveFileId(currentVideo.driveId || currentVideo.driveUrl);
  const embedUrl = getDriveEmbedUrl(driveId);
  const viewUrl = getDriveViewUrl(driveId);

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '16px' }}>
      {/* Marquee Header Banner */}
      <div
        className="card-glass"
        style={{
          borderRadius: '26px',
          padding: '24px 28px',
          marginBottom: '26px',
          background: 'linear-gradient(135deg, rgba(237, 233, 254, 0.95) 0%, rgba(224, 242, 254, 0.95) 50%, rgba(252, 231, 243, 0.95) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 30px rgba(139, 92, 246, 0.12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <BeBitRobot mood="welcome" size="medium" bubble="Vé vào rạp phim AI của em đây rồi! 🎟️" screenText="🎬" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ background: '#ec4899', color: '#ffffff', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Ticket size={13} /> VÉ XEM PHIM VIP
              </span>
              <span style={{ fontSize: '12px', color: '#6d28d9', fontWeight: 'bold' }}>
                23 Video AI • Khám Phá Tin Học 3
              </span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#4c1d95', margin: '4px 0' }}>
              RẠP PHIM AI – KHÁM PHÁ CÙNG BÉ BÍT 🎬
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '580px', lineHeight: '1.5' }}>
              Mỗi video là một bài học hoạt hình kỳ thú. Xem video, ghi nhớ kiến thức cốt lõi và chinh phục các câu hỏi trắc nghiệm sau phim!
            </p>
          </div>
        </div>

        {/* Progress Badge */}
        <div
          style={{
            background: '#ffffff',
            padding: '12px 20px',
            borderRadius: '18px',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.1)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block' }}>TIẾN ĐỘ XEM PHIM</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '2px' }}>
            <Film size={20} color="#ec4899" />
            <span style={{ fontSize: '22px', fontWeight: '900', color: '#be185d' }}>
              {Object.keys(watchedVideos).length} / {videos.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Theater Screen: Video Player & Information */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '22px', marginBottom: '32px' }}>
        {/* Left Column: 16:9 Video Player & Post-Video Quiz */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* 16:9 Video Container with Movie Theater Frame */}
          <div
            className="card-3d"
            style={{
              padding: '16px',
              borderRadius: '24px',
              background: '#1e1b4b',
              boxShadow: '0 12px 36px rgba(30, 27, 75, 0.25)',
            }}
          >
            {/* Top Bar of Screen */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '12px', color: '#c4b5fd', fontWeight: 'bold', marginLeft: '6px' }}>
                  {currentVideo.title}
                </span>
              </div>

              {driveId && (
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bouncy"
                  style={{
                    color: '#e0e7ff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>MỞ TRÊN GOOGLE DRIVE</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Responsive 16:9 Player Viewport */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#0f172a',
              }}
            >
              {driveId ? (
                <iframe
                  src={embedUrl}
                  title={currentVideo.title}
                  allow="autoplay; fullscreen"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  onLoad={() => handleMarkWatched(currentVideo.id)}
                />
              ) : (
                /* Fallback when Drive ID is yet to be pasted by teacher */
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e2e8f0',
                    textAlign: 'center',
                    padding: '24px',
                    background: 'radial-gradient(circle, #2e1065 0%, #0f172a 100%)',
                  }}
                >
                  <Film size={48} color="#a78bfa" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
                    {currentVideo.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#c4b5fd', maxWidth: '420px', lineHeight: '1.5', marginBottom: '14px' }}>
                    Video AI Google Drive chưa có đường link hoặc đang chờ cấp quyền. Thầy/Cô có thể dán link Drive của video này trong mục <strong>Góc Giáo Viên</strong>!
                  </p>
                  <button
                    className="btn-bouncy"
                    onClick={() => handleMarkWatched(currentVideo.id)}
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <CheckCircle size={15} /> Đánh dấu đã học bài này
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Video Learning Objectives & Key Takeaways Card */}
          <div
            className="card-3d"
            style={{
              padding: '22px',
              borderRadius: '22px',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ background: '#ede9fe', color: '#6d28d9', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
                  {currentVideo.lessonId ? `Bài ${currentVideo.lessonId}` : 'Chờ phân loại'}
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginTop: '6px' }}>
                  {currentVideo.title}
                </h2>
              </div>

              {isCurrentWatched && (
                <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Đã hoàn thành
                </span>
              )}
            </div>

            {/* Learning Objectives */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                🎯 Mục tiêu học tập:
              </span>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
                {currentVideo.objectives}
              </p>
            </div>

            {/* Key Takeaways */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4c1d95', display: 'block', marginBottom: '6px' }}>
                💡 Kiến thức cốt lõi cần nhớ:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {currentVideo.keyTakeaways?.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                    <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Practice & Next Video */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
              {currentVideo.practiceTarget ? (
                <button
                  className="btn-bouncy"
                  onClick={() => onNavigateToPractice(currentVideo.practiceTarget)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '14px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <Play size={16} />
                  <span>THỰC HÀNH NGAY</span>
                </button>
              ) : <div />}

              <button
                className="btn-bouncy btn-primary-3d"
                onClick={handleNextVideo}
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                <span>XEM VIDEO TIẾP THEO</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Post-Video Interactive Quiz (3 - 5 Questions) */}
          {currentVideo.quizQuestions && currentVideo.quizQuestions.length > 0 && (
            <div
              className="card-3d"
              style={{
                padding: '22px',
                borderRadius: '22px',
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: '#fce7f3', padding: '8px', borderRadius: '12px', color: '#ec4899' }}>
                  <Award size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>
                    Thử Thách Sau Video ({currentVideo.quizQuestions.length} câu)
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>
                    Kiểm tra độ hiểu bài để nhận sao và điểm kinh nghiệm XP!
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {currentVideo.quizQuestions.map((q, qIdx) => {
                  const chosenOpt = quizAnswers[qIdx];
                  const hasAnswered = chosenOpt !== undefined;

                  return (
                    <div
                      key={qIdx}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '16px',
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>
                        Câu {qIdx + 1}: {q.question}
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosenOpt === optIdx;
                          const isCorrect = optIdx === q.correctIndex;

                          let bg = '#ffffff';
                          let border = '1px solid #cbd5e1';
                          let text = '#334155';

                          if (hasAnswered) {
                            if (isCorrect) {
                              bg = '#d1fae5';
                              border = '2px solid #10b981';
                              text = '#065f46';
                            } else if (isSelected && !isCorrect) {
                              bg = '#fee2e2';
                              border = '2px solid #ef4444';
                              text = '#991b1b';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              className="btn-bouncy"
                              disabled={hasAnswered}
                              onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                              style={{
                                background: bg,
                                border: border,
                                padding: '10px 14px',
                                borderRadius: '12px',
                                textAlign: 'left',
                                fontSize: '13px',
                                fontWeight: hasAnswered && isCorrect ? 'bold' : '600',
                                color: text,
                                cursor: hasAnswered ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isCorrect && <CheckCircle size={16} color="#10b981" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {hasAnswered && (
                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#78350f', background: '#fef3c7', padding: '10px', borderRadius: '10px', border: '1px solid #fde68a' }}>
                          <strong>Giải thích:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Video Playlists, Search & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Search & Filter Controls */}
          <div
            className="card-3d"
            style={{
              padding: '18px',
              borderRadius: '22px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={18} color="#8b5cf6" />
              <span>Tìm kiếm & Bộ lọc</span>
            </h3>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Tìm kiếm video..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Filter by Theme */}
            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                THEO CHỦ ĐỀ:
              </label>
              <select
                value={filterTheme}
                onChange={(e) => { setFilterTheme(e.target.value); setFilterLesson('all'); }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#4c1d95',
                  outline: 'none',
                  background: '#ffffff',
                }}
              >
                <option value="all">Tất cả 6 chủ đề</option>
                {LANDS.map(land => (
                  <option key={land.id} value={land.id}>
                    {land.name} ({land.themeName})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Lesson */}
            <div>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                THEO BÀI HỌC:
              </label>
              <select
                value={filterLesson}
                onChange={(e) => setFilterLesson(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#4c1d95',
                  outline: 'none',
                  background: '#ffffff',
                }}
              >
                <option value="all">Tất cả bài học</option>
                {LESSONS.map(l => (
                  <option key={l.id} value={l.id}>
                    Bài {l.id}: {l.title.replace(/^Bài \d+: /, '')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Video List / Playlist */}
          <div
            className="card-3d"
            style={{
              padding: '18px',
              borderRadius: '22px',
              background: '#ffffff',
              maxHeight: '680px',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b' }}>
                Danh Sách 23 Video AI ({filteredVideos.length})
              </h3>
              <span style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 'bold' }}>
                16:9 HD
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredVideos.map((video) => {
                const isSelected = video.id === currentVideo.id;
                const isWatched = !!watchedVideos[video.id];

                return (
                  <div
                    key={video.id}
                    className="btn-bouncy"
                    onClick={() => {
                      setSelectedVideoId(video.id);
                      setQuizAnswers({});
                      setShowExplanation({});
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '16px',
                      background: isSelected ? '#ede9fe' : isWatched ? '#f0fdf4' : '#f8fafc',
                      border: isSelected ? '2px solid #8b5cf6' : isWatched ? '1px solid #86efac' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: isSelected ? '0 4px 14px rgba(139, 92, 246, 0.15)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: isSelected ? '#8b5cf6' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#8b5cf6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      }}
                    >
                      <Play size={18} fill={isSelected ? '#ffffff' : '#8b5cf6'} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#8b5cf6', background: '#ffffff', padding: '1px 6px', borderRadius: '6px' }}>
                          {video.badge || `Video ${video.id}`}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          {video.duration}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontSize: '13px',
                          fontWeight: 'bold',
                          color: '#1e293b',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {video.title}
                      </h4>
                    </div>

                    {isWatched && (
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
