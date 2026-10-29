import React, { useState, useRef, useEffect } from 'react';
import {
  Monitor,
  MousePointer,
  Keyboard,
  Layers,
  FolderPlus,
  FolderTree,
  Palette,
  Presentation,
  ListOrdered,
  Bot,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Folder,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Trash2,
  Edit2,
  Play,
  Volume2,
  Tv,
  Cpu,
  Printer,
  Headphones,
  Camera,
  Star,
  Award,
  ChevronRight,
  Save,
  Undo2,
  Compass,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function VirtualLab({ progress, onUpdateProgress, initialLab = 1 }) {
  const [activeLabId, setActiveLabId] = useState(initialLab);
  const [labState, setLabState] = useState({});
  const [completedLabs, setCompletedLabs] = useState(() => progress.completedLabs || {});

  const markLabCompleted = (labId) => {
    if (!completedLabs[labId]) {
      const updated = { ...completedLabs, [labId]: true };
      setCompletedLabs(updated);
      onUpdateProgress({
        ...progress,
        completedLabs: updated,
        xp: (progress.xp || 0) + 50,
        totalStars: (progress.totalStars || 0) + 1,
      });
    }
  };

  const labs = [
    {
      id: 1,
      title: '1. Khám phá Phần Cứng Máy Tính',
      shortTitle: 'Phần cứng PC',
      icon: <Monitor size={20} color="#8b5cf6" />,
      color: '#8b5cf6',
      badge: 'Bài 1 & 2',
      desc: 'Nhận biết 8 bộ phận thân máy, màn hình, chuột, bàn phím, loa, webcam, máy in',
    },
    {
      id: 2,
      title: '2. Luyện Thao Tác Chuột Chuẩn',
      shortTitle: 'Luyện Chuột',
      icon: <MousePointer size={20} color="#ec4899" />,
      color: '#ec4899',
      badge: 'Bài 3',
      desc: 'Luyện 4 thao tác: Nhấp đơn, nhấp đúp, nhấp chuột phải, kéo thả linh kiện',
    },
    {
      id: 3,
      title: '3. Bàn Phím Ảo & Hàng Phím Cơ Sở',
      shortTitle: 'Bàn phím cơ sở',
      icon: <Keyboard size={20} color="#06b6d4" />,
      color: '#06b6d4',
      badge: 'Bài 4',
      desc: 'Đặt đúng 10 ngón tay, cảm nhận gờ nổi F, J và gõ từ vựng Tin học',
    },
    {
      id: 4,
      title: '4. Phân Loại Dữ Liệu & Thông Tin',
      shortTitle: 'Phân loại dữ liệu',
      icon: <Layers size={20} color="#10b981" />,
      color: '#10b981',
      badge: 'Bài 6',
      desc: 'Kéo thả tệp văn bản, ảnh, âm thanh, video vào 4 ngăn kéo thông minh',
    },
    {
      id: 5,
      title: '5. Quản Lý Tệp & Thư Mục Desktop Ảo',
      shortTitle: 'Tạo & Đổi tên Thư mục',
      icon: <FolderPlus size={20} color="#f59e0b" />,
      color: '#f59e0b',
      badge: 'Bài 8 & 9',
      desc: 'Mô phỏng chuột phải tạo thư mục mới, kiểm tra ký tự cấm, đổi tên và xóa tệp',
    },
    {
      id: 6,
      title: '6. Trình Quản Lý Tệp (File Explorer)',
      shortTitle: 'Cây thư mục Explorer',
      icon: <FolderTree size={20} color="#8b5cf6" />,
      color: '#8b5cf6',
      badge: 'Bài 9',
      desc: 'Duyệt cây thư mục ổ C, D, chọn và di chuyển tệp về đúng vị trí lưu trữ',
    },
    {
      id: 7,
      title: '7. Họa Sĩ Nhí Vẽ Tranh Cơ Bản',
      shortTitle: 'Vẽ Paint cơ bản',
      icon: <Palette size={20} color="#ec4899" />,
      color: '#ec4899',
      badge: 'Bài 11',
      desc: 'Vẽ hình chữ nhật, hình tròn, ngôi sao, tô màu pastel và lưu tranh kỷ niệm',
    },
    {
      id: 8,
      title: '8. Tạo Trang Chiếu Trình Bày',
      shortTitle: 'Trang chiếu PowerPoint',
      icon: <Presentation size={20} color="#06b6d4" />,
      color: '#06b6d4',
      badge: 'Bài 12',
      desc: 'Thiết kế slide giới thiệu: Chọn mẫu bìa, nhập nội dung, chèn sticker Bé Bít',
    },
    {
      id: 9,
      title: '9. Sắp Xếp Thứ Tự Công Việc',
      shortTitle: 'Thuật toán đời sống',
      icon: <ListOrdered size={20} color="#10b981" />,
      color: '#10b981',
      badge: 'Bài 14 & 15',
      desc: 'Sắp xếp quy trình pha trà, rửa tay 6 bước, mở máy tính theo đúng thứ tự logic',
    },
    {
      id: 10,
      title: '10. Lập Trình Lệnh Cho Robot Bé Bít',
      shortTitle: 'Lập trình lệnh khối',
      icon: <Bot size={20} color="#f59e0b" />,
      color: '#f59e0b',
      badge: 'Bài 16',
      desc: 'Ghép lệnh Tiến, Rẽ trái, Rẽ phải, Ăn sao và chạy mô phỏng trên sa bàn',
    },
  ];

  const currentLabInfo = labs.find((l) => l.id === activeLabId) || labs[0];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '16px' }}>
      {/* Header Banner */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #e0f2fe 100%)',
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
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.25)',
              color: '#ffffff',
            }}
          >
            <Monitor size={30} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>
              <Sparkles size={14} />
              <span>Phòng Thực Hành Ảo 100% Tương Tác</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#4c1d95', margin: 0 }}>
              Phòng Thực Hành Của Bé Bít 🔬
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              Rèn luyện 10 kỹ năng thực hành máy tính chuẩn SGK Tin học 3 Kết nối tri thức.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '10px 18px',
              borderRadius: '16px',
              border: '2px solid #ddd6fe',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 'bold' }}>TIẾN ĐỘ THỰC HÀNH</div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#4c1d95' }}>
              {Object.keys(completedLabs).length} / 10 Bài
            </div>
          </div>
        </div>
      </div>

      {/* Lab Navigation Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '20px',
          scrollbarWidth: 'thin',
        }}
      >
        {labs.map((lab) => {
          const isSelected = lab.id === activeLabId;
          const isDone = completedLabs[lab.id];
          return (
            <button
              key={lab.id}
              onClick={() => setActiveLabId(lab.id)}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '14px',
                border: isSelected ? `2px solid ${lab.color}` : '2px solid #e2e8f0',
                background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                color: isSelected ? lab.color : '#475569',
                fontWeight: isSelected ? '800' : '600',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: isSelected ? `0 4px 12px ${lab.color}25` : 'none',
                transition: 'all 0.2s',
              }}
            >
              {lab.icon}
              <span>{lab.shortTitle}</span>
              {isDone ? (
                <CheckCircle2 size={16} color="#10b981" />
              ) : (
                <span
                  style={{
                    background: '#f1f5f9',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    color: '#64748b',
                  }}
                >
                  {lab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Lab Container */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: '#ffffff',
          boxShadow: '0 12px 32px rgba(139, 92, 246, 0.08)',
          border: '2px solid #f1f5f9',
        }}
      >
        {/* Lab Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px dashed #f1f5f9',
            paddingBottom: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  background: currentLabInfo.color + '20',
                  color: currentLabInfo.color,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '800',
                }}
              >
                {currentLabInfo.badge}
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
                {currentLabInfo.title}
              </h2>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              {currentLabInfo.desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {completedLabs[activeLabId] && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                <CheckCircle2 size={16} /> Đã hoàn thành (+50 XP)
              </span>
            )}
            <button
              onClick={() => {
                setLabState((prev) => ({ ...prev, [activeLabId]: null }));
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} /> Làm lại
            </button>
          </div>
        </div>

        {/* Dynamic Lab Content */}
        {activeLabId === 1 && <LabHardware onComplete={() => markLabCompleted(1)} />}
        {activeLabId === 2 && <LabMouseGym onComplete={() => markLabCompleted(2)} />}
        {activeLabId === 3 && <LabKeyboard onComplete={() => markLabCompleted(3)} />}
        {activeLabId === 4 && <LabDataGrouping onComplete={() => markLabCompleted(4)} />}
        {activeLabId === 5 && <LabDesktopManager onComplete={() => markLabCompleted(5)} />}
        {activeLabId === 6 && <LabFileExplorer onComplete={() => markLabCompleted(6)} />}
        {activeLabId === 7 && <LabPaintTool onComplete={() => markLabCompleted(7)} />}
        {activeLabId === 8 && <LabSlideCreator onComplete={() => markLabCompleted(8)} />}
        {activeLabId === 9 && <LabSequencer onComplete={() => markLabCompleted(9)} />}
        {activeLabId === 10 && <LabRobotBlockCode onComplete={() => markLabCompleted(10)} />}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 1: Khám phá phần cứng máy tính
// -------------------------------------------------------------
function LabHardware({ onComplete }) {
  const [selectedPart, setSelectedPart] = useState(null);
  const [discoveredParts, setDiscoveredParts] = useState({});

  const parts = [
    {
      id: 'cpu',
      name: 'Thân máy (CPU)',
      role: 'Bộ não xử lý',
      detail: 'Chứa bộ vi xử lý và bộ nhớ. Là nơi tiếp nhận, xử lý mọi dữ liệu và điều khiển hoạt động của máy tính.',
      type: 'Xử lý',
      icon: <Cpu size={36} color="#8b5cf6" />,
      color: '#8b5cf6',
      x: '35%',
      y: '30%',
    },
    {
      id: 'monitor',
      name: 'Màn hình',
      role: 'Thiết bị xuất (ra)',
      detail: 'Hiển thị kết quả xử lý bằng hình ảnh, chữ viết và video để chúng ta nhìn thấy.',
      type: 'Xuất',
      icon: <Tv size={36} color="#06b6d4" />,
      color: '#06b6d4',
      x: '62%',
      y: '28%',
    },
    {
      id: 'keyboard',
      name: 'Bàn phím',
      role: 'Thiết bị nhập (vào)',
      detail: 'Dùng để nhập chữ, số và các ký hiệu điều khiển vào máy tính thông qua các phím bấm.',
      type: 'Nhập',
      icon: <Keyboard size={36} color="#ec4899" />,
      color: '#ec4899',
      x: '55%',
      y: '70%',
    },
    {
      id: 'mouse',
      name: 'Chuột máy tính',
      role: 'Thiết bị nhập (vào)',
      detail: 'Dùng để điều khiển con trỏ trên màn hình, ra lệnh bằng các thao tác nhấp chuột, kéo thả.',
      type: 'Nhập',
      icon: <MousePointer size={36} color="#f59e0b" />,
      color: '#f59e0b',
      x: '80%',
      y: '72%',
    },
    {
      id: 'speaker',
      name: 'Loa máy tính',
      role: 'Thiết bị xuất (ra)',
      detail: 'Phát ra âm thanh, lời bài hát, tiếng thông báo hoặc âm thanh trò chơi cho người dùng nghe.',
      type: 'Xuất',
      icon: <Volume2 size={36} color="#10b981" />,
      color: '#10b981',
      x: '18%',
      y: '45%',
    },
    {
      id: 'headphones',
      name: 'Tai nghe',
      role: 'Thiết bị xuất (ra)',
      detail: 'Giúp em nghe âm thanh riêng tư mà không làm phiền những bạn xung quanh trong phòng tin học.',
      type: 'Xuất',
      icon: <Headphones size={36} color="#6366f1" />,
      color: '#6366f1',
      x: '15%',
      y: '20%',
    },
    {
      id: 'webcam',
      name: 'Webcam (Camera)',
      role: 'Thiết bị nhập (vào)',
      detail: 'Thu hình ảnh và video của em truyền vào máy tính khi học trực tuyến cùng thầy cô và bạn bè.',
      type: 'Nhập',
      icon: <Camera size={36} color="#ef4444" />,
      color: '#ef4444',
      x: '62%',
      y: '10%',
    },
    {
      id: 'printer',
      name: 'Máy in',
      role: 'Thiết bị xuất (ra)',
      detail: 'In văn bản hoặc bức tranh từ trong máy tính ra tờ giấy trắng thật để em kẹp vào vở học tập.',
      type: 'Xuất',
      icon: <Printer size={36} color="#14b8a6" />,
      color: '#14b8a6',
      x: '85%',
      y: '35%',
    },
  ];

  const handleSelect = (part) => {
    setSelectedPart(part);
    const updated = { ...discoveredParts, [part.id]: true };
    setDiscoveredParts(updated);
    if (Object.keys(updated).length === parts.length) {
      onComplete();
    }
  };

  const progressCount = Object.keys(discoveredParts).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          Em hãy <strong>nhấp vào từng bộ phận</strong> trên bàn máy tính để khám phá chức năng của chúng:
        </p>
        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#8b5cf6' }}>
          Đã khám phá: {progressCount} / {parts.length} bộ phận
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Visual Workbench */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
            border: '2px solid #ddd6fe',
            borderRadius: '20px',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '12px',
          }}
        >
          {parts.map((p) => {
            const isDiscovered = !!discoveredParts[p.id];
            const isSelected = selectedPart?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                style={{
                  background: isSelected ? '#ffffff' : isDiscovered ? '#f5f3ff' : '#ffffff',
                  border: isSelected ? `2px solid ${p.color}` : isDiscovered ? '2px solid #a78bfa' : '2px dashed #cbd5e1',
                  borderRadius: '16px',
                  padding: '16px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: isSelected ? '0 6px 16px rgba(139, 92, 246, 0.2)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {isDiscovered && (
                  <span style={{ position: 'absolute', top: '6px', right: '6px' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                  </span>
                )}
                <div style={{ padding: '8px', borderRadius: '12px', background: p.color + '15' }}>
                  {p.icon}
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b', textAlign: 'center' }}>
                  {p.name}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    background: p.type === 'Nhập' ? '#fce7f3' : p.type === 'Xuất' ? '#dcfce7' : '#e0e7ff',
                    color: p.type === 'Nhập' ? '#be185d' : p.type === 'Xuất' ? '#15803d' : '#3730a3',
                    fontWeight: '700',
                  }}
                >
                  {p.type}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div
          style={{
            background: '#ffffff',
            border: '2px solid #e2e8f0',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {selectedPart ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', borderRadius: '16px', background: selectedPart.color + '20' }}>
                  {selectedPart.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: selectedPart.color }}>
                    {selectedPart.name}
                  </h3>
                  <div style={{ display: 'inline-block', marginTop: '4px', fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>
                    Vai trò: {selectedPart.role}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '14px',
                  borderLeft: `4px solid ${selectedPart.color}`,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#334155',
                }}
              >
                {selectedPart.detail}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8' }}>
              <BeBitRobot mood="thinking" size={90} speech="Nhấp vào một thiết bị bên trái để mình giới thiệu cho bạn nhé!" />
            </div>
          )}

          {progressCount === parts.length && (
            <div style={{ marginTop: '20px', background: '#dcfce7', border: '2px solid #86efac', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: '800', color: '#166534', fontSize: '15px' }}>
                🎉 Chúc mừng em! Đã khám phá trọn vẹn 8 bộ phận phần cứng máy tính!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 2: Luyện tập thao tác chuột
// -------------------------------------------------------------
function LabMouseGym({ onComplete }) {
  const [step, setStep] = useState(1); // 1: Click, 2: DoubleClick, 3: RightClick, 4: Drag
  const [clickCount, setClickCount] = useState(0);
  const [doubleClickDone, setDoubleClickDone] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState(null);
  const [rightClickDone, setRightClickDone] = useState(false);
  const [draggedIn, setDraggedIn] = useState(false);

  const handleBalloonClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setStep(2);
    }
  };

  const handleGiftBoxDoubleClick = () => {
    setDoubleClickDone(true);
    setTimeout(() => setStep(3), 800);
  };

  const handleContextMenuOpen = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleSelectContextAction = (action) => {
    if (action === 'open') {
      setRightClickDone(true);
      setContextMenuPos(null);
      setTimeout(() => setStep(4), 800);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedIn(true);
    onComplete();
  };

  return (
    <div>
      {/* Step Indicators */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { num: 1, label: '1. Nhấp đơn' },
          { num: 2, label: '2. Nhấp đúp' },
          { num: 3, label: '3. Chuột phải' },
          { num: 4, label: '4. Kéo và thả' },
        ].map((s) => (
          <div
            key={s.num}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              background: step === s.num ? '#ec4899' : step > s.num ? '#dcfce7' : '#f1f5f9',
              color: step === s.num ? '#ffffff' : step > s.num ? '#166534' : '#64748b',
              border: step === s.num ? '2px solid #db2777' : '1px solid #e2e8f0',
            }}
          >
            {s.label} {step > s.num && '✓'}
          </div>
        ))}
      </div>

      <div
        style={{
          minHeight: '280px',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 100%)',
          border: '2px dashed #f472b6',
          borderRadius: '20px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {step === 1 && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#be185d', marginBottom: '8px' }}>
              Thử thách 1: Nhấp đơn (Click) để nổ 5 quả bóng bay ({clickCount}/5)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
              Dùng ngón trỏ tay phải bấm nhanh 1 lần vào nút chuột trái!
            </p>
            <button
              onClick={handleBalloonClick}
              className="btn-bouncy"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f472b6, #db2777)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '28px',
                boxShadow: '0 10px 20px rgba(219, 39, 119, 0.3)',
              }}
            >
              🎈
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#be185d', marginBottom: '8px' }}>
              Thử thách 2: Nhấp đúp (Double Click) mở hộp quà thần kỳ!
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              Nhấp nhanh 2 lần liên tiếp nút chuột trái vào hộp quà nhé!
            </p>
            <div
              onDoubleClick={handleGiftBoxDoubleClick}
              style={{
                width: '120px',
                height: '120px',
                background: doubleClickDone ? '#86efac' : '#fbcfe8',
                border: '3px solid #ec4899',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                cursor: 'pointer',
                margin: '0 auto',
                boxShadow: '0 8px 16px rgba(236, 72, 153, 0.2)',
                userSelect: 'none',
              }}
            >
              {doubleClickDone ? '🎉' : '🎁'}
            </div>
            {doubleClickDone && <p style={{ color: '#15803d', fontWeight: 'bold', marginTop: '12px' }}>Xuất sắc! Mở quà thành công!</p>}
          </div>
        )}

        {step === 3 && (
          <div
            onContextMenu={handleContextMenuOpen}
            style={{
              width: '100%',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'context-menu',
            }}
          >
            <h3 style={{ color: '#be185d', marginBottom: '8px' }}>
              Thử thách 3: Nhấp chuột phải (Right Click) vào khu vực này
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Dùng ngón giữa bấm nút chuột phải để mở Menu lệnh, sau đó chọn lệnh <strong>"Mở tệp"</strong>!
            </p>

            <div style={{ padding: '16px 24px', background: '#ffffff', borderRadius: '14px', border: '2px solid #cbd5e1' }}>
              📁 Tệp "Bai_Hoc_Cua_Em.docx" (Nhấp chuột phải vào đây)
            </div>

            {contextMenuPos && (
              <div
                style={{
                  position: 'absolute',
                  left: `${Math.min(contextMenuPos.x, 300)}px`,
                  top: `${contextMenuPos.y}px`,
                  background: '#ffffff',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '6px',
                  zIndex: 20,
                  width: '160px',
                }}
              >
                <div
                  onClick={() => handleSelectContextAction('open')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#8b5cf6',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    background: '#ede9fe',
                  }}
                >
                  ✨ Mở tệp (Chọn đây!)
                </div>
                <div style={{ padding: '8px 12px', fontSize: '13px', color: '#64748b' }}>Đổi tên</div>
                <div style={{ padding: '8px 12px', fontSize: '13px', color: '#64748b' }}>Xóa tệp</div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h3 style={{ color: '#be185d', marginBottom: '8px' }}>
              Thử thách 4: Kéo và thả (Drag and Drop)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              Nhấn giữ chuột trái vào Pin Năng Lượng và kéo rê vào trong Bụng Robot Bé Bít!
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              {/* Draggable battery */}
              {!draggedIn ? (
                <div
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', 'battery')}
                  style={{
                    width: '90px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'grab',
                    boxShadow: '0 6px 16px rgba(245, 158, 11, 0.3)',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>⚡</span>
                  Pin Robot
                </div>
              ) : (
                <div style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Đã sạc pin xong!</div>
              )}

              {/* Drop Target */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '24px',
                  background: draggedIn ? '#dcfce7' : '#ffffff',
                  border: draggedIn ? '3px solid #10b981' : '3px dashed #8b5cf6',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s',
                }}
              >
                <BeBitRobot mood={draggedIn ? 'celebrating' : 'thinking'} size={80} />
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: draggedIn ? '#15803d' : '#8b5cf6' }}>
                  {draggedIn ? 'Đầy 100% Năng lượng!' : 'Thả Pin vào đây!'}
                </span>
              </div>
            </div>

            {draggedIn && (
              <div style={{ marginTop: '20px', background: '#dcfce7', padding: '12px', borderRadius: '12px', color: '#166534', fontWeight: 'bold' }}>
                🎉 Tuyệt vời! Em đã thành thạo cả 4 thao tác chuột vi tính!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 3: Bàn phím ảo & Hàng phím cơ sở
// -------------------------------------------------------------
function LabKeyboard({ onComplete }) {
  const [typedChars, setTypedChars] = useState('');
  const targetWords = ['F', 'J', 'A', 'S', 'D', 'K', 'L', 'F', 'J'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const homeRowKeys = [
    { key: 'A', finger: 'Út trái', color: '#f43f5e' },
    { key: 'S', finger: 'Áp út trái', color: '#f59e0b' },
    { key: 'D', finger: 'Giữa trái', color: '#10b981' },
    { key: 'F', finger: 'Trỏ trái (CÓ GỜ)', color: '#06b6d4', hasBump: true },
    { key: 'G', finger: 'Trỏ trái vươn', color: '#06b6d4' },
    { key: 'H', finger: 'Trỏ phải vươn', color: '#8b5cf6' },
    { key: 'J', finger: 'Trỏ phải (CÓ GỜ)', color: '#8b5cf6', hasBump: true },
    { key: 'K', finger: 'Giữa phải', color: '#10b981' },
    { key: 'L', finger: 'Áp út phải', color: '#f59e0b' },
    { key: ';', finger: 'Út phải', color: '#f43f5e' },
  ];

  const handleKeyPress = (pressedKey) => {
    if (pressedKey.toUpperCase() === targetWords[currentIndex]) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setTypedChars((prev) => prev + pressedKey.toUpperCase() + ' ');
      if (next >= targetWords.length) {
        onComplete();
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#475569' }}>
          <strong>Quy tắc vàng:</strong> Hai ngón tay trỏ luôn đặt vào 2 phím xuất phát có gờ nổi là <strong>F</strong> (tay trái) và <strong>J</strong> (tay phải)!
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ede9fe', padding: '12px 16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#5b21b6' }}>Mục tiêu gõ tiếp theo:</span>
          {targetWords.map((ch, idx) => (
            <span
              key={idx}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '16px',
                background: idx < currentIndex ? '#dcfce7' : idx === currentIndex ? '#8b5cf6' : '#ffffff',
                color: idx < currentIndex ? '#15803d' : idx === currentIndex ? '#ffffff' : '#64748b',
                border: idx === currentIndex ? '2px solid #6d28d9' : '1px solid #cbd5e1',
                transform: idx === currentIndex ? 'scale(1.15)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Visual Home Row Keyboard */}
      <div
        style={{
          background: '#1e293b',
          padding: '24px',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
          flexWrap: 'wrap',
        }}
      >
        {homeRowKeys.map((item) => {
          const isTarget = item.key === targetWords[currentIndex];
          return (
            <button
              key={item.key}
              onClick={() => handleKeyPress(item.key)}
              style={{
                width: '68px',
                height: '76px',
                background: isTarget ? '#a855f7' : '#334155',
                border: isTarget ? '3px solid #f472b6' : '2px solid #475569',
                borderRadius: '12px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 4px',
                cursor: 'pointer',
                position: 'relative',
                transform: isTarget ? 'translateY(-4px)' : 'none',
                boxShadow: isTarget ? '0 8px 16px rgba(168, 85, 247, 0.4)' : '0 4px 0 #0f172a',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: '900' }}>{item.key}</span>

              {item.hasBump && (
                <div
                  style={{
                    width: '16px',
                    height: '3px',
                    background: '#facc15',
                    borderRadius: '2px',
                    boxShadow: '0 0 6px #facc15',
                  }}
                  title="Gờ nổi định vị ngón trỏ"
                />
              )}

              <span
                style={{
                  fontSize: '9px',
                  color: item.color,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: '1.1',
                }}
              >
                {item.finger}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#64748b' }}>
          Đã gõ: <strong style={{ color: '#10b981' }}>{typedChars || '(Chưa gõ ký tự nào)'}</strong>
        </span>
        {currentIndex >= targetWords.length && (
          <span style={{ color: '#15803d', fontWeight: 'bold' }}>
            🎉 Xuất sắc! Em đã định vị chuẩn các phím hàng cơ sở!
          </span>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 4: Phân loại dữ liệu & thông tin
// -------------------------------------------------------------
function LabDataGrouping({ onComplete }) {
  const allItems = [
    { id: 1, name: 'Bai_tho_Dong_dao.txt', type: 'text', label: 'Văn bản' },
    { id: 2, name: 'Anh_be_bit_di_hoc.png', type: 'image', label: 'Hình ảnh' },
    { id: 3, name: 'Bai_hat_Reo_vang_binh_minh.mp3', type: 'audio', label: 'Âm thanh' },
    { id: 4, name: 'Video_Robot_nhay_mua.mp4', type: 'video', label: 'Video' },
    { id: 5, name: 'Bang_diem_to_1.docx', type: 'text', label: 'Văn bản' },
    { id: 6, name: 'Buc_tranh_phong_canh.jpg', type: 'image', label: 'Hình ảnh' },
    { id: 7, name: 'Tieng_ti_tach_mua_roi.wav', type: 'audio', label: 'Âm thanh' },
    { id: 8, name: 'Phim_hoat_hinh_khoa_hoc.mp4', type: 'video', label: 'Video' },
  ];

  const [items, setItems] = useState(allItems);
  const [shelves, setShelves] = useState({
    text: [],
    image: [],
    audio: [],
    video: [],
  });

  const handleClassify = (item, targetType) => {
    if (item.type === targetType) {
      setShelves((prev) => ({
        ...prev,
        [targetType]: [...prev[targetType], item],
      }));
      const remaining = items.filter((i) => i.id !== item.id);
      setItems(remaining);
      if (remaining.length === 0) {
        onComplete();
      }
    }
  };

  const shelfDefs = [
    { type: 'text', title: 'Ngăn Văn Bản', icon: <FileText size={22} color="#0284c7" />, color: '#0284c7', bg: '#e0f2fe' },
    { type: 'image', title: 'Ngăn Hình Ảnh', icon: <ImageIcon size={22} color="#ec4899" />, color: '#ec4899', bg: '#fce7f3' },
    { type: 'audio', title: 'Ngăn Âm Thanh', icon: <Music size={22} color="#10b981" />, color: '#10b981', bg: '#dcfce7' },
    { type: 'video', title: 'Ngăn Phim Video', icon: <Video size={22} color="#8b5cf6" />, color: '#8b5cf6', bg: '#ede9fe' },
  ];

  return (
    <div>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#475569' }}>
        Em hãy phân loại các tệp chưa được sắp xếp vào đúng 4 ngăn kéo thông minh bên dưới:
      </p>

      {/* Available items queue */}
      <div
        style={{
          background: '#f8fafc',
          border: '2px dashed #cbd5e1',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          minHeight: '70px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {items.length === 0 ? (
          <div style={{ color: '#15803d', fontWeight: 'bold', margin: 'auto' }}>
            🎉 Tất cả các tệp dữ liệu đã được xếp gọn gàng vào ngăn kéo!
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <span>📄 {it.name}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => handleClassify(it, 'text')}
                  title="Xếp vào Văn bản"
                  style={{ background: '#e0f2fe', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', cursor: 'pointer' }}
                >
                  Chữ
                </button>
                <button
                  onClick={() => handleClassify(it, 'image')}
                  title="Xếp vào Hình ảnh"
                  style={{ background: '#fce7f3', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', cursor: 'pointer' }}
                >
                  Ảnh
                </button>
                <button
                  onClick={() => handleClassify(it, 'audio')}
                  title="Xếp vào Âm thanh"
                  style={{ background: '#dcfce7', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', cursor: 'pointer' }}
                >
                  Nhạc
                </button>
                <button
                  onClick={() => handleClassify(it, 'video')}
                  title="Xếp vào Video"
                  style={{ background: '#ede9fe', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', cursor: 'pointer' }}
                >
                  Phim
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4 Shelves */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {shelfDefs.map((sh) => (
          <div
            key={sh.type}
            style={{
              background: sh.bg,
              border: `2px solid ${sh.color}`,
              borderRadius: '16px',
              padding: '16px',
              minHeight: '140px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: sh.color, fontWeight: '800' }}>
              {sh.icon}
              <span>{sh.title} ({shelves[sh.type].length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {shelves[sh.type].map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: '#ffffff',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CheckCircle2 size={12} color="#10b981" />
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 5: Quản lý Tệp & Thư mục Desktop Ảo
// -------------------------------------------------------------
function LabDesktopManager({ onComplete }) {
  const [folders, setFolders] = useState([
    { id: 1, name: 'Hoc_Tap_Lop_3', type: 'folder' },
    { id: 2, name: 'Tranh_Ve', type: 'folder' },
  ]);
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [creating, setCreating] = useState(false);
  const [namingError, setNamingError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const forbiddenChars = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];

  const validateName = (name) => {
    for (const char of forbiddenChars) {
      if (name.includes(char)) {
        return `Tên thư mục không được chứa ký tự cấm: ${char}`;
      }
    }
    if (!name.trim()) return 'Tên thư mục không được để trống!';
    return '';
  };

  const handleCreateFolder = () => {
    const err = validateName(newFolderName);
    if (err) {
      setNamingError(err);
      return;
    }
    const newF = {
      id: Date.now(),
      name: newFolderName.trim(),
      type: 'folder',
    };
    setFolders([...folders, newF]);
    setNewFolderName('');
    setCreating(false);
    setNamingError('');
    onComplete();
  };

  const handleDelete = (id) => {
    setFolders(folders.filter((f) => f.id !== id));
  };

  const handleStartRename = (f) => {
    setEditingId(f.id);
    setEditName(f.name);
  };

  const handleSaveRename = (id) => {
    const err = validateName(editName);
    if (err) {
      setNamingError(err);
      return;
    }
    setFolders(folders.map((f) => (f.id === id ? { ...f, name: editName.trim() } : f)));
    setEditingId(null);
    setNamingError('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          <strong>Quy tắc đặt tên:</strong> Dễ hiểu, gợi nhớ và KHÔNG chứa các ký tự đặc biệt như <code>/ \ : * ? " &lt; &gt; |</code>
        </p>
        <button
          onClick={() => setCreating(true)}
          style={{
            background: '#f59e0b',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <FolderPlus size={16} /> Tạo Thư Mục Mới
        </button>
      </div>

      {namingError && (
        <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={16} /> {namingError}
        </div>
      )}

      {creating && (
        <div style={{ background: '#fef3c7', padding: '14px', borderRadius: '12px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Folder size={24} color="#d97706" />
          <input
            type="text"
            placeholder="Nhập tên thư mục mới (VD: Toan_Lop_3)..."
            value={newFolderName}
            onChange={(e) => {
              setNewFolderName(e.target.value);
              setNamingError('');
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #f59e0b',
              fontSize: '14px',
            }}
            autoFocus
          />
          <button
            onClick={handleCreateFolder}
            style={{ background: '#d97706', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Lưu
          </button>
          <button
            onClick={() => {
              setCreating(false);
              setNamingError('');
            }}
            style={{ background: '#e2e8f0', color: '#475569', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Hủy
          </button>
        </div>
      )}

      {/* Simulated Desktop Canvas */}
      <div
        style={{
          minHeight: '260px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          borderRadius: '16px',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '20px',
          alignContent: 'start',
        }}
      >
        {folders.map((f) => (
          <div
            key={f.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 8px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <Folder size={44} color="#fde047" />

            {editingId === f.id ? (
              <div style={{ marginTop: '6px', width: '100%' }}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ width: '90%', padding: '4px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ffffff' }}
                />
                <button
                  onClick={() => handleSaveRename(f.id)}
                  style={{ marginTop: '4px', padding: '2px 8px', fontSize: '10px', background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  OK
                </button>
              </div>
            ) : (
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff', marginTop: '6px', wordBreak: 'break-all' }}>
                {f.name}
              </span>
            )}

            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              <button
                onClick={() => handleStartRename(f)}
                title="Đổi tên"
                style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '6px', padding: '4px', color: '#ffffff', cursor: 'pointer' }}
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDelete(f.id)}
                title="Xóa vào thùng rác"
                style={{ background: 'rgba(239, 68, 68, 0.7)', border: 'none', borderRadius: '6px', padding: '4px', color: '#ffffff', cursor: 'pointer' }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}

        {/* Trash bin icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 8px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px dashed rgba(255, 255, 255, 0.4)',
          }}
        >
          <Trash2 size={40} color="#fca5a5" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fecaca', marginTop: '6px' }}>
            Thùng rác
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 6: Trình Quản Lý Tệp (File Explorer)
// -------------------------------------------------------------
function LabFileExplorer({ onComplete }) {
  const [selectedFolder, setSelectedFolder] = useState('HocTap');
  const [copiedFile, setCopiedFile] = useState(null);

  const [fileSystem, setFileSystem] = useState({
    HocTap: [
      { id: 1, name: 'Bai_Kiem_Tra_Toan.docx', size: '24 KB' },
      { id: 2, name: 'Lich_Bao_Giang.xlsx', size: '18 KB' },
    ],
    TranhVe: [
      { id: 3, name: 'Ngoi_Nha_Mo_Uoc.png', size: '1.2 MB' },
    ],
    NgoaiKhoa: [
      { id: 4, name: 'Anh_Di_Da_Ngoai.jpg', size: '2.5 MB' },
    ],
  });

  const handleCopy = (file) => {
    setCopiedFile(file);
  };

  const handlePaste = () => {
    if (copiedFile) {
      setFileSystem((prev) => ({
        ...prev,
        [selectedFolder]: [...prev[selectedFolder], { ...copiedFile, id: Date.now() }],
      }));
      setCopiedFile(null);
      onComplete();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          Mô phỏng cửa sổ <strong>File Explorer</strong>: Di chuyển giữa các thư mục và thử sao chép tệp!
        </p>
        {copiedFile && (
          <button
            onClick={handlePaste}
            style={{
              background: '#8b5cf6',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            📋 Dán tệp vào "{selectedFolder}"
          </button>
        )}
      </div>

      <div
        style={{
          border: '2px solid #cbd5e1',
          borderRadius: '16px',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          minHeight: '260px',
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        {/* Left Tree */}
        <div style={{ background: '#f8fafc', borderRight: '2px solid #e2e8f0', padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>
            Ổ đĩa (D:) / Lớp 3
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'HocTap', name: '📁 Học Tập' },
              { id: 'TranhVe', name: '📁 Tranh Vẽ' },
              { id: 'NgoaiKhoa', name: '📁 Ngoại Khóa' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFolder(f.id)}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedFolder === f.id ? '#ede9fe' : 'transparent',
                  color: selectedFolder === f.id ? '#6d28d9' : '#334155',
                  fontWeight: selectedFolder === f.id ? '800' : '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Contents */}
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
            Vị trí: <strong>D:\Lớp 3\{selectedFolder}</strong> ({fileSystem[selectedFolder]?.length || 0} mục)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {fileSystem[selectedFolder]?.map((f) => (
              <div
                key={f.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#f8fafc',
                }}
              >
                <FileText size={28} color="#0284c7" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{f.size}</div>
                </div>
                <button
                  onClick={() => handleCopy(f)}
                  title="Sao chép tệp này"
                  style={{ background: '#ede9fe', border: 'none', borderRadius: '6px', padding: '6px 8px', fontSize: '11px', color: '#7c3aed', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Sao chép
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 7: Họa sĩ nhí (Vẽ hình cơ bản)
// -------------------------------------------------------------
function LabPaintTool({ onComplete }) {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('free'); // 'free', 'rect', 'circle', 'eraser'
  const [selectedColor, setSelectedColor] = useState('#8b5cf6');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#1e293b'];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPos({ x, y });

    if (selectedTool === 'free' || selectedTool === 'eraser') {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'free') {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (selectedTool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor + '33';
    ctx.lineWidth = 3;

    if (selectedTool === 'rect') {
      ctx.beginPath();
      ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      ctx.fill();
      ctx.stroke();
      onComplete();
    } else if (selectedTool === 'circle') {
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      onComplete();
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '14px', background: '#f8fafc', padding: '10px 16px', borderRadius: '14px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'free', label: '✏️ Bút vẽ' },
            { id: 'rect', label: '▭ Chữ nhật' },
            { id: 'circle', label: '◯ Hình tròn' },
            { id: 'eraser', label: '🧹 Tẩy' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTool(t.id)}
              style={{
                background: selectedTool === t.id ? '#8b5cf6' : '#ffffff',
                color: selectedTool === t.id ? '#ffffff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ height: '24px', width: '1px', background: '#cbd5e1' }} />

        {/* Colors */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: c,
                border: selectedColor === c ? '3px solid #1e293b' : '2px solid #ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={clearCanvas}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer',
              color: '#ef4444',
              fontWeight: '600',
            }}
          >
            Làm sạch bảng vẽ
          </button>
        </div>
      </div>

      <div style={{ border: '2px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: '#ffffff' }}>
        <canvas
          ref={canvasRef}
          width={700}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ cursor: selectedTool === 'eraser' ? 'cell' : 'crosshair' }}
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 8: Tạo Trang Chiếu Trình Bày (PowerPoint mô phỏng)
// -------------------------------------------------------------
function LabSlideCreator({ onComplete }) {
  const [title, setTitle] = useState('Trường Tiểu Học Của Em');
  const [subtitle, setSubtitle] = useState('Học sinh: Nguyễn Văn An - Lớp 3A');
  const [theme, setTheme] = useState('lavender');
  const [sticker, setSticker] = useState('robot');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const themes = {
    lavender: { bg: 'linear-gradient(135deg, #ede9fe 0%, #ffffff 100%)', text: '#5b21b6', border: '#c4b5fd' },
    mint: { bg: 'linear-gradient(135deg, #dcfce7 0%, #ffffff 100%)', text: '#15803d', border: '#86efac' },
    sunset: { bg: 'linear-gradient(135deg, #fed7aa 0%, #fee2e2 100%)', text: '#c2410c', border: '#fdba74' },
    ocean: { bg: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)', text: '#0369a1', border: '#7dd3fc' },
  };

  const currentTheme = themes[theme];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Slide Canvas */}
        <div>
          <div
            style={{
              aspectRatio: '16 / 9',
              background: currentTheme.bg,
              border: `3px solid ${currentTheme.border}`,
              borderRadius: '20px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>
              Trang chiếu 1 / 1
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '900', color: currentTheme.text, margin: '0 0 12px 0' }}>
              {title || '(Nhập tiêu đề trang chiếu)'}
            </h2>

            <p style={{ fontSize: '16px', color: '#475569', margin: '0 0 24px 0', fontWeight: '500' }}>
              {subtitle || '(Nhập người trình bày)'}
            </p>

            <div style={{ fontSize: '48px' }}>
              {sticker === 'robot' && '🤖'}
              {sticker === 'star' && '⭐'}
              {sticker === 'school' && '🏫'}
              {sticker === 'book' && '📖'}
            </div>
          </div>
        </div>

        {/* Slide Settings */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>
            Nội dung trang chiếu
          </h4>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Tiêu đề lớn</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Tên người trình bày</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
            Chọn màu chủ đề
          </h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['lavender', 'mint', 'sunset', 'ocean'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  background: themes[t].bg,
                  border: theme === t ? '2px solid #4c1d95' : '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
            Chọn hình dán Sticker
          </h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {[
              { id: 'robot', emoji: '🤖' },
              { id: 'star', emoji: '⭐' },
              { id: 'school', emoji: '🏫' },
              { id: 'book', emoji: '📖' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSticker(s.id)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  background: sticker === s.id ? '#ede9fe' : '#ffffff',
                  border: sticker === s.id ? '2px solid #8b5cf6' : '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}
              >
                {s.emoji}
              </button>
            ))}
          </div>

          <button
            onClick={onComplete}
            style={{
              width: '100%',
              background: '#06b6d4',
              color: '#ffffff',
              border: 'none',
              padding: '10px',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ✓ Hoàn thành trang chiếu
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 9: Sắp xếp thứ tự công việc (Thuật toán đời sống)
// -------------------------------------------------------------
function LabSequencer({ onComplete }) {
  const correctOrder = [
    { step: 1, text: 'Bước 1: Cắm phích điện hoặc bật công tắc nguồn điện' },
    { step: 2, text: 'Bước 2: Bấm nút nguồn (Power) trên thân máy tính (CPU)' },
    { step: 3, text: 'Bước 3: Bấm nút bật màn hình máy tính' },
    { step: 4, text: 'Bước 4: Chờ máy tính khởi động và hiện màn hình làm việc' },
  ];

  const [cards, setCards] = useState([
    correctOrder[2],
    correctOrder[0],
    correctOrder[3],
    correctOrder[1],
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...cards];
    const temp = next[idx];
    next[idx] = next[idx - 1];
    next[idx - 1] = temp;
    setCards(next);
  };

  const moveDown = (idx) => {
    if (idx === cards.length - 1) return;
    const next = [...cards];
    const temp = next[idx];
    next[idx] = next[idx + 1];
    next[idx + 1] = temp;
    setCards(next);
  };

  const handleCheck = () => {
    const isCorrect = cards.every((c, i) => c.step === i + 1);
    if (isCorrect) {
      setIsSuccess(true);
      onComplete();
    } else {
      setIsSuccess(false);
      alert('Thứ tự chưa chính xác! Em hãy đọc kỹ và sắp xếp lại các bước nhé!');
    }
  };

  return (
    <div>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#475569' }}>
        <strong>Bài toán:</strong> Hãy sắp xếp quy trình <strong>"Bật máy tính đúng cách và an toàn"</strong> theo thứ tự từng bước từ trên xuống dưới:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto 20px auto' }}>
        {cards.map((c, idx) => (
          <div
            key={c.step}
            style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 8px rgba(0,0,0,0.03)',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>
              {c.text}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                disabled={idx === 0}
                onClick={() => moveUp(idx)}
                style={{ background: '#ede9fe', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ▲
              </button>
              <button
                disabled={idx === cards.length - 1}
                onClick={() => moveDown(idx)}
                style={{ background: '#ede9fe', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleCheck}
          className="btn-bouncy"
          style={{
            background: '#10b981',
            color: '#ffffff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '12px',
            fontWeight: '900',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          ✓ Kiểm tra thuật toán
        </button>

        {isSuccess && (
          <div style={{ marginTop: '16px', color: '#15803d', fontWeight: 'bold', fontSize: '15px' }}>
            🎉 Chuẩn xác 100%! Em đã nắm vững thuật toán mở máy tính an toàn!
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// LAB 10: Lập trình lệnh khối cho Robot Bé Bít
// -------------------------------------------------------------
function LabRobotBlockCode({ onComplete }) {
  const gridSize = 4;
  const [robotPos, setRobotPos] = useState({ x: 0, y: 3 }); // bottom-left
  const [starPos] = useState({ x: 3, y: 0 }); // top-right
  const [program, setProgram] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [won, setWon] = useState(false);

  const addCommand = (cmd) => {
    if (program.length < 8) {
      setProgram([...program, cmd]);
    }
  };

  const resetSim = () => {
    setRobotPos({ x: 0, y: 3 });
    setIsRunning(false);
    setWon(false);
  };

  const runProgram = async () => {
    setIsRunning(true);
    let cur = { x: 0, y: 3 };
    setRobotPos(cur);

    for (let i = 0; i < program.length; i++) {
      const cmd = program[i];
      await new Promise((r) => setTimeout(r, 500));

      if (cmd === 'UP') cur = { ...cur, y: Math.max(0, cur.y - 1) };
      if (cmd === 'DOWN') cur = { ...cur, y: Math.min(gridSize - 1, cur.y + 1) };
      if (cmd === 'LEFT') cur = { ...cur, x: Math.max(0, cur.x - 1) };
      if (cmd === 'RIGHT') cur = { ...cur, x: Math.min(gridSize - 1, cur.x + 1) };

      setRobotPos(cur);
    }

    if (cur.x === starPos.x && cur.y === starPos.y) {
      setWon(true);
      onComplete();
    }
    setIsRunning(false);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'center' }}>
        {/* Sa bàn 4x4 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 65px)`,
              gridTemplateRows: `repeat(${gridSize}, 65px)`,
              gap: '6px',
              background: '#ede9fe',
              padding: '12px',
              borderRadius: '16px',
              border: '3px solid #8b5cf6',
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
              const x = idx % gridSize;
              const y = Math.floor(idx / gridSize);
              const isRobot = robotPos.x === x && robotPos.y === y;
              const isStar = starPos.x === x && starPos.y === y;

              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd6fe',
                    position: 'relative',
                  }}
                >
                  {isRobot && <BeBitRobot mood={won ? 'celebrating' : 'thinking'} size={44} />}
                  {isStar && !won && <span style={{ fontSize: '28px' }}>⭐</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Command Panel */}
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#1e293b' }}>
            Khối câu lệnh điều khiển:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            <button onClick={() => addCommand('UP')} disabled={isRunning} style={{ padding: '8px', borderRadius: '8px', background: '#3b82f6', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              ⬆ Tiến Lên
            </button>
            <button onClick={() => addCommand('DOWN')} disabled={isRunning} style={{ padding: '8px', borderRadius: '8px', background: '#3b82f6', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              ⬇ Đi Xuống
            </button>
            <button onClick={() => addCommand('LEFT')} disabled={isRunning} style={{ padding: '8px', borderRadius: '8px', background: '#3b82f6', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              ⬅ Rẽ Trái
            </button>
            <button onClick={() => addCommand('RIGHT')} disabled={isRunning} style={{ padding: '8px', borderRadius: '8px', background: '#3b82f6', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              ➡ Rẽ Phải
            </button>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>
            Khối lệnh đã nạp ({program.length}/8):
          </div>
          <div style={{ minHeight: '40px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
            {program.map((c, i) => (
              <span key={i} style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                {i + 1}. {c}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={runProgram}
              disabled={isRunning || program.length === 0}
              style={{
                flex: 1,
                background: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ▶ Chạy chương trình
            </button>
            <button
              onClick={() => {
                setProgram([]);
                resetSim();
              }}
              style={{ background: '#e2e8f0', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Xóa
            </button>
          </div>

          {won && (
            <div style={{ marginTop: '12px', background: '#dcfce7', color: '#15803d', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
              🎉 Robot Bé Bít đã thu thập được ngôi sao!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
