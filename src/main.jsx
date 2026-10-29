import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { LESSONS, LANDS, BADGES } from './data';
import { INITIAL_VIDEOS } from './data/videoLibrary';
import { sounds } from './utils/audio';

// Core Components
import BeBitRobot from './components/BeBitRobot';
import HomeDashboard from './components/HomeDashboard';
import LessonMap from './components/LessonMap';
import LessonView from './components/LessonView';
import TeacherCorner from './components/TeacherCorner';
import GroupBattle from './components/GroupBattle';
import BadgesModal from './components/BadgesModal';
import AITheater from './components/AITheater';
import VirtualLab from './components/VirtualLab';
import TechDetective from './components/TechDetective';
import CreativeWorkshop from './components/CreativeWorkshop';
import RobotTreasury from './components/RobotTreasury';
import WeeklyMissions from './components/WeeklyMissions';
import KnowledgeFlashcards from './components/KnowledgeFlashcards';

// 12 Mini-Games
import MouseGame from './components/games/MouseGame';
import KeyboardGame from './components/games/KeyboardGame';
import FileFolderGame from './components/games/FileFolderGame';
import PathfinderGame from './components/games/PathfinderGame';
import PaintGame from './components/games/PaintGame';
import SafetyGame from './components/games/SafetyGame';
import AssemblyGame from './components/games/AssemblyGame';
import MazeGame from './components/games/MazeGame';
import FolderRescueGame from './components/games/FolderRescueGame';
import SequenceGame from './components/games/SequenceGame';
import ShieldGame from './components/games/ShieldGame';
import QuizMasterGame from './components/games/QuizMasterGame';

// Icons
import {
  Home,
  Map,
  Gamepad2,
  Users,
  GraduationCap,
  Volume2,
  VolumeX,
  Star,
  Award,
  Sparkles,
  MousePointer,
  Keyboard,
  Folder,
  Palette,
  ShieldCheck,
  Zap,
  Monitor,
  Compass,
  FolderTree,
  ListOrdered,
  BrainCircuit,
  Eye,
  EyeOff,
  Film,
  Search,
  Calendar,
  Brain,
  Trophy,
} from 'lucide-react';

const STORAGE_KEY = 'vui_hoc_tin_hoc_3_progress';
const VIDEOS_STORAGE_KEY = 'vui_hoc_tin_hoc_3_videos';

const DEFAULT_PROGRESS = {
  studentName: 'Bé Bít Nhí',
  studentClass: 'Lớp 3A',
  totalStars: 0,
  xp: 0,
  unlockAll: false,
  lessons: {
    1: { unlocked: true, completed: false, stars: 0, correct: 0 },
  },
  gameScores: {},
  watchedVideos: {},
  completedLabs: {},
  solvedCases: {},
  weeklyRewardClaimed: false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  // 'home', 'map', 'theater', 'labs', 'detective', 'creative', 'treasury', 'missions', 'flashcards', 'games', 'battle', 'teacher'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  // Video Library State with localStorage persistence
  const [videos, setVideos] = useState(() => {
    try {
      const saved = localStorage.getItem(VIDEOS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_VIDEOS;
  });

  const handleUpdateVideos = (updated) => {
    setVideos(updated);
    try {
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.totalStars === 'number') {
          return parsed;
        }
      }
    } catch {}
    return DEFAULT_PROGRESS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  // Reduced motion toggle on document body
  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  const toggleSound = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) sounds.playClick();
  };

  const handleLessonFinish = (lessonId, starsEarned, correctCount) => {
    setProgress((prev) => {
      const currentLessonData = prev.lessons?.[lessonId] || {};
      const oldStars = currentLessonData.stars || 0;
      const newStars = Math.max(oldStars, starsEarned);
      const starDiff = newStars - oldStars;

      const nextLessonId = lessonId + 1;
      const updatedLessons = {
        ...prev.lessons,
        [lessonId]: {
          unlocked: true,
          completed: true,
          stars: newStars,
          correct: correctCount,
        },
      };

      if (nextLessonId <= 16 && !updatedLessons[nextLessonId]) {
        updatedLessons[nextLessonId] = {
          unlocked: true,
          completed: false,
          stars: 0,
          correct: 0,
        };
      }

      return {
        ...prev,
        totalStars: prev.totalStars + starDiff,
        xp: (prev.xp || 0) + correctCount * 25,
        lessons: updatedLessons,
      };
    });
  };

  const handleGameComplete = (gameId, scoreEarned) => {
    setProgress((prev) => ({
      ...prev,
      gameScores: {
        ...prev.gameScores,
        [gameId]: Math.max(prev.gameScores?.[gameId] || 0, scoreEarned),
      },
      xp: (prev.xp || 0) + scoreEarned,
    }));
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setSelectedLesson(null);
    setActiveGame(null);
  };

  // 12 Games Catalog Metadata
  const gamesCatalog = [
    {
      id: 'mouse',
      title: '1. Săn sao thần tốc (Thao tác chuột)',
      desc: 'Rèn luyện nhấp đơn, nhấp đúp, chuột phải và rê thả pin',
      icon: <MousePointer size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
    {
      id: 'keyboard',
      title: '2. Giải cứu bàn phím (Luyện gõ phím)',
      desc: 'Luyện hàng phím cơ sở (F, J có gờ nổi) và từ vựng Tin học',
      icon: <Keyboard size={24} color="#ec4899" />,
      color: '#ec4899',
      bgColor: '#fce7f3',
    },
    {
      id: 'sorter',
      title: '3. Phân loại thông minh (Tệp & Thư mục)',
      desc: 'Phân loại các tệp hình ảnh, âm nhạc, văn bản và video',
      icon: <Folder size={24} color="#06b6d4" />,
      color: '#06b6d4',
      bgColor: '#e0f2fe',
    },
    {
      id: 'pathfinder',
      title: '4. Dẫn đường cho robot (Lệnh thuật toán)',
      desc: 'Lập trình chuỗi câu lệnh tiến, quay trái, quay phải vượt chướng ngại vật',
      icon: <Zap size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      id: 'paint',
      title: '5. Họa sĩ nhí (Xưởng vẽ Paint Canvas)',
      desc: 'Vẽ tranh hình khối, bút vẽ, tẩy, màu pastel và tải ảnh PNG thật',
      icon: <Palette size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      id: 'safety',
      title: '6. Thám tử an toàn số (Tình huống ứng xử)',
      desc: 'Bảo vệ thông tin cá nhân và cư xử văn minh trên không gian số',
      icon: <ShieldCheck size={24} color="#ec4899" />,
      color: '#ec4899',
      bgColor: '#fdf2f8',
    },
    {
      id: 'assembly',
      title: '7. Lắp ráp máy tính (Bộ phận phần cứng)',
      desc: 'Lắp ghép màn hình, thân máy, bàn phím, chuột, loa và máy in',
      icon: <Monitor size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
    {
      id: 'maze',
      title: '8. Mê cung robot (Định hướng không gian)',
      desc: 'Điều khiển Bé Bít 2D qua 3 cấp độ mê cung ăn chip sao về đích',
      icon: <Compass size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      id: 'folderRescue',
      title: '9. Giải cứu tệp và thư mục (Sơ đồ cây)',
      desc: 'Đưa các tệp học tập và giải trí vào đúng thư mục con phân cấp',
      icon: <FolderTree size={24} color="#0284c7" />,
      color: '#0284c7',
      bgColor: '#e0f2fe',
    },
    {
      id: 'sequence',
      title: '10. Đội trưởng trình tự (Sắp xếp các bước)',
      desc: 'Sắp xếp quy trình bật/tắt máy tính, vẽ tranh và soạn thảo chuẩn',
      icon: <ListOrdered size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
    {
      id: 'shield',
      title: '11. Chiếc khiên Internet (Phòng vệ an toàn)',
      desc: 'Kích hoạt khiên bảo mật, từ chối người lạ và chặn bẫy lừa đảo',
      icon: <ShieldCheck size={24} color="#ec4899" />,
      color: '#ec4899',
      bgColor: '#fce7f3',
    },
    {
      id: 'quizMaster',
      title: '12. Ai là chuyên gia Tin học? (Đố vui 3 cấp độ)',
      desc: 'Đấu trường kiến thức tổng hợp 48 câu hỏi với đồng hồ đếm ngược',
      icon: <BrainCircuit size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
  ];

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: <Home size={15} />, color: '#8b5cf6' },
    { id: 'map', label: '16 Bài học', icon: <Map size={15} />, color: '#8b5cf6' },
    { id: 'theater', label: 'Rạp phim AI', icon: <Film size={15} />, color: '#ec4899' },
    { id: 'labs', label: 'Thực hành ảo', icon: <Monitor size={15} />, color: '#06b6d4' },
    { id: 'detective', label: 'Thám tử', icon: <Search size={15} />, color: '#f59e0b' },
    { id: 'creative', label: 'Sáng tạo', icon: <Palette size={15} />, color: '#10b981' },
    { id: 'treasury', label: 'Kho báu', icon: <Trophy size={15} />, color: '#8b5cf6' },
    { id: 'missions', label: 'Nhiệm vụ tuần', icon: <Calendar size={15} />, color: '#ec4899' },
    { id: 'flashcards', label: 'Thẻ ghi nhớ', icon: <Brain size={15} />, color: '#06b6d4' },
    { id: 'games', label: '12 Trò chơi', icon: <Gamepad2 size={15} />, color: '#ec4899' },
    { id: 'battle', label: 'Thi đấu nhóm', icon: <Users size={15} />, color: '#f59e0b' },
    { id: 'teacher', label: 'Góc giáo viên', icon: <GraduationCap size={15} />, color: '#10b981' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Decorative Pastel Clouds and Stars Background */}
      <div className="pastel-bg-decor">
        <div className="floating-cloud" style={{ top: '8%', width: '160px', height: '45px', opacity: 0.6 }} />
        <div className="floating-cloud" style={{ top: '28%', width: '220px', height: '60px', animationDelay: '-10s', opacity: 0.5 }} />
        <div className="floating-cloud" style={{ top: '65%', width: '180px', height: '50px', animationDelay: '-18s', opacity: 0.4 }} />
        <span className="floating-star" style={{ top: '15%', left: '10%', fontSize: '24px' }}>✨</span>
        <span className="floating-star" style={{ top: '22%', right: '14%', fontSize: '20px', animationDelay: '1s' }}>⭐</span>
        <span className="floating-star" style={{ top: '75%', left: '18%', fontSize: '22px', animationDelay: '2s' }}>🌟</span>
        <span className="floating-star" style={{ top: '82%', right: '8%', fontSize: '26px', animationDelay: '1.5s' }}>✨</span>
      </div>

      {/* Top Application Bar */}
      <header
        className="no-print"
        style={{
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '2px solid #ede9fe',
          padding: '10px 16px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 16px rgba(139, 92, 246, 0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Logo Brand */}
          <div
            onClick={() => {
              setSelectedLesson(null);
              setActiveGame(null);
              setActiveTab('home');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              }}
            >
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#4c1d95', letterSpacing: '-0.3px', lineHeight: '1.2' }}>
                VUI HỌC TIN HỌC 3
              </div>
              <div style={{ fontSize: '10px', color: '#ec4899', fontWeight: 'bold' }}>
                Thế giới Robot Pastel • Kết nối tri thức
              </div>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn-bouncy"
              onClick={() => setShowBadgesModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#ede9fe',
                padding: '6px 10px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#6d28d9',
                border: 'none',
                cursor: 'pointer',
              }}
              title="Xem bộ sưu tập huy hiệu"
            >
              <Award size={15} />
              <span>Huy hiệu</span>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#fef3c7',
                padding: '6px 10px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#b45309',
              }}
            >
              <Star size={15} color="#f59e0b" fill="#f59e0b" />
              <span>{progress.totalStars} sao</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#dcfce7',
                padding: '6px 10px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#15803d',
              }}
            >
              <Zap size={14} color="#15803d" />
              <span>{progress.xp || 0} XP</span>
            </div>

            {/* Reduced motion toggle button */}
            <button
              className="btn-bouncy"
              onClick={() => setReducedMotion(!reducedMotion)}
              style={{
                background: reducedMotion ? '#fef3c7' : '#f1f5f9',
                color: reducedMotion ? '#b45309' : '#64748b',
                border: 'none',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              title={reducedMotion ? 'Đang bật chế độ Giảm chuyển động' : 'Bật chế độ Giảm chuyển động'}
            >
              {reducedMotion ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

            {/* Sound toggle button */}
            <button
              className="btn-bouncy"
              onClick={toggleSound}
              style={{
                background: isMuted ? '#f1f5f9' : '#ede9fe',
                color: isMuted ? '#94a3b8' : '#8b5cf6',
                border: 'none',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Pills Bar */}
        <div style={{ maxWidth: '1280px', margin: '8px auto 0 auto', display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const isCurrent = activeTab === item.id && !selectedLesson && !activeGame;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedLesson(null);
                  setActiveGame(null);
                  setActiveTab(item.id);
                }}
                style={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: isCurrent ? `1.5px solid ${item.color}` : '1px solid transparent',
                  background: isCurrent ? item.color : 'rgba(245, 243, 255, 0.7)',
                  color: isCurrent ? '#ffffff' : '#475569',
                  fontWeight: isCurrent ? '800' : '600',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container Area */}
      <main style={{ flex: 1, padding: '16px 10px 40px', position: 'relative', zIndex: 1 }}>
        {/* If viewing a single lesson */}
        {selectedLesson ? (
          <LessonView
            lesson={selectedLesson}
            onBack={() => setSelectedLesson(null)}
            onFinishLesson={handleLessonFinish}
            onPlayGame={(gameId) => {
              setSelectedLesson(null);
              setActiveGame(gameId);
            }}
          />
        ) : activeGame ? (
          /* If playing a mini game */
          <div>
            <div style={{ maxWidth: '900px', margin: '0 auto 14px', padding: '0 16px' }}>
              <button
                className="btn-bouncy"
                onClick={() => setActiveGame(null)}
                style={{
                  background: '#f1edff',
                  color: '#6d28d9',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                ← Quay lại danh mục 12 trò chơi
              </button>
            </div>

            {activeGame === 'mouse' && <MouseGame onComplete={(s) => handleGameComplete('mouse', s)} />}
            {activeGame === 'keyboard' && <KeyboardGame onComplete={(s) => handleGameComplete('keyboard', s)} />}
            {activeGame === 'sorter' && <FileFolderGame onComplete={(s) => handleGameComplete('sorter', s)} />}
            {activeGame === 'pathfinder' && <PathfinderGame onComplete={(s) => handleGameComplete('pathfinder', s)} />}
            {activeGame === 'paint' && <PaintGame onComplete={(s) => handleGameComplete('paint', s)} />}
            {activeGame === 'safety' && <SafetyGame onComplete={(s) => handleGameComplete('safety', s)} />}
            {activeGame === 'assembly' && <AssemblyGame onComplete={(s) => handleGameComplete('assembly', s)} />}
            {activeGame === 'maze' && <MazeGame onComplete={(s) => handleGameComplete('maze', s)} />}
            {activeGame === 'folderRescue' && <FolderRescueGame onComplete={(s) => handleGameComplete('folderRescue', s)} />}
            {activeGame === 'sequence' && <SequenceGame onComplete={(s) => handleGameComplete('sequence', s)} />}
            {activeGame === 'shield' && <ShieldGame onComplete={(s) => handleGameComplete('shield', s)} />}
            {activeGame === 'quizMaster' && <QuizMasterGame onComplete={(s) => handleGameComplete('quizMaster', s)} />}
          </div>
        ) : activeTab === 'home' ? (
          <HomeDashboard
            progress={progress}
            videosCount={videos.length}
            onNavigate={(tab) => {
              setSelectedLesson(null);
              setActiveGame(null);
              setActiveTab(tab);
            }}
            onStartAdventure={() => setActiveTab('map')}
            onOpenBadges={() => setShowBadgesModal(true)}
          />
        ) : activeTab === 'map' ? (
          <LessonMap
            progress={progress}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            onUpdateProgress={setProgress}
          />
        ) : activeTab === 'theater' ? (
          <AITheater
            videos={videos}
            progress={progress}
            onUpdateProgress={setProgress}
            onNavigateToPractice={(tab) => {
              if (tab === 'labs') setActiveTab('labs');
              else if (tab === 'creative') setActiveTab('creative');
              else if (tab === 'games') setActiveTab('games');
              else setActiveTab('labs');
            }}
          />
        ) : activeTab === 'labs' ? (
          <VirtualLab
            progress={progress}
            onUpdateProgress={setProgress}
          />
        ) : activeTab === 'detective' ? (
          <TechDetective
            progress={progress}
            onUpdateProgress={setProgress}
          />
        ) : activeTab === 'creative' ? (
          <CreativeWorkshop
            progress={progress}
            onUpdateProgress={setProgress}
          />
        ) : activeTab === 'treasury' ? (
          <RobotTreasury
            progress={progress}
          />
        ) : activeTab === 'missions' ? (
          <WeeklyMissions
            progress={progress}
            onUpdateProgress={setProgress}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        ) : activeTab === 'flashcards' ? (
          <KnowledgeFlashcards />
        ) : activeTab === 'games' ? (
          <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '16px' }}>
            <div
              className="card-glass"
              style={{
                padding: '24px',
                borderRadius: '24px',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#ec4899', marginBottom: '8px' }}>
                <Gamepad2 size={16} />
                <span>12 Trò Chơi Giáo Dục Tin Học 3</span>
              </div>
              <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#4c1d95', margin: '0 0 6px 0' }}>
                Thế Giới Trò Chơi Tương Tác Cùng Bé Bít 🎮
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                Tất cả 12 trò chơi đều mô phỏng thao tác kỹ năng thực tế: chuột, phím, tệp, thuật toán và vẽ tranh.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {gamesCatalog.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="card-bouncy"
                  style={{
                    background: '#ffffff',
                    border: `2px solid ${game.color}30`,
                    borderRadius: '20px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        background: game.bgColor,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      {game.icon}
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
                      {game.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
                      {game.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: game.color,
                      marginTop: '14px',
                    }}
                  >
                    <span>Vào chơi ngay ➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'battle' ? (
          <GroupBattle />
        ) : (
          <TeacherCorner
            progress={progress}
            onUpdateProgress={setProgress}
            onResetProgress={handleResetProgress}
            videos={videos}
            onUpdateVideos={handleUpdateVideos}
          />
        )}
      </main>

      {/* Badges Modal */}
      {showBadgesModal && (
        <BadgesModal
          progress={progress}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {/* Footer */}
      <footer
        className="no-print"
        style={{
          textAlign: 'center',
          padding: '16px 20px',
          color: '#8b5cf6',
          fontSize: '12px',
          borderTop: '1px solid #ede9fe',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span>Vui học Tin học 3 – Thế giới Robot Pastel • Kết nối tri thức với cuộc sống • Chuẩn GDPT 2018</span>
      </footer>
    </div>
  );
}

// Render root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
