import React, { useState, useRef, useEffect } from 'react';
import {
  Palette,
  Shapes,
  FolderTree,
  Heart,
  Presentation,
  ShieldCheck,
  Download,
  Trash2,
  Sparkles,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  Stamp,
  Award,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

const CREATIVE_WORKS_KEY = 'vui_hoc_tin_hoc_3_creative_gallery';

export default function CreativeWorkshop({ progress, onUpdateProgress }) {
  const [activeModule, setActiveModule] = useState('paint'); // 'paint', 'tangram', 'tree', 'card', 'slide', 'poster', 'gallery'
  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem(CREATIVE_WORKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveWorkToGallery = (title, type, dataUrlOrDetails) => {
    const newWork = {
      id: Date.now(),
      title,
      type,
      date: new Date().toLocaleDateString('vi-VN'),
      data: dataUrlOrDetails,
    };
    const updated = [newWork, ...gallery];
    setGallery(updated);
    try {
      localStorage.setItem(CREATIVE_WORKS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage limit reached');
    }
    onUpdateProgress({
      ...progress,
      xp: (progress.xp || 0) + 40,
    });
    alert(`🎉 Tác phẩm "${title}" đã được lưu vào Triển Lãm Sáng Tạo (+40 XP)!`);
  };

  const deleteWork = (id) => {
    const updated = gallery.filter((w) => w.id !== id);
    setGallery(updated);
    try {
      localStorage.setItem(CREATIVE_WORKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const modules = [
    { id: 'paint', title: '1. Vẽ Tranh Tự Do', icon: <Palette size={18} color="#8b5cf6" />, color: '#8b5cf6', badge: 'Màu Pastel' },
    { id: 'tangram', title: '2. Xếp Hình Robot', icon: <Shapes size={18} color="#ec4899" />, color: '#ec4899', badge: 'Hình học' },
    { id: 'tree', title: '3. Thiết Kế Sơ Đồ Cây', icon: <FolderTree size={18} color="#06b6d4" />, color: '#06b6d4', badge: 'Tổ chức dữ liệu' },
    { id: 'card', title: '4. Thiệp Chúc Mừng 20/11', icon: <Heart size={18} color="#f43f5e" />, color: '#f43f5e', badge: 'Thiệp hoa pastel' },
    { id: 'slide', title: '5. Thiết Kế Slide Mini', icon: <Presentation size={18} color="#10b981" />, color: '#10b981', badge: 'Trình chiếu' },
    { id: 'poster', title: '6. Poster An Toàn Số', icon: <ShieldCheck size={18} color="#f59e0b" />, color: '#f59e0b', badge: 'Tuyên truyền' },
    { id: 'gallery', title: '🖼️ Triển Lãm Của Em', icon: <ImageIcon size={18} color="#6366f1" />, color: '#6366f1', badge: `${gallery.length} Tác phẩm` },
  ];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #fef3c7 100%)',
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
              background: '#ec4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 16px rgba(236, 72, 153, 0.25)',
            }}
          >
            <Palette size={30} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>
              <Sparkles size={14} />
              <span>Góc Sáng Tạo & Đồ Họa Tuổi Thơ</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#831843', margin: 0 }}>
              Xưởng Sáng Tạo Của Em 🎨
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
              Thỏa sức vẽ tranh, ghép hình học, làm thiệp mừng, tạo poster và lưu vào triển lãm cá nhân!
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveModule('gallery')}
          style={{
            background: '#ffffff',
            border: '2px solid #fbcfe8',
            borderRadius: '16px',
            padding: '10px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold',
            color: '#be185d',
          }}
        >
          <ImageIcon size={18} /> Xem Triển Lãm ({gallery.length})
        </button>
      </div>

      {/* Module Navigation */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
        {modules.map((m) => {
          const isSelected = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '14px',
                border: isSelected ? `2px solid ${m.color}` : '2px solid #e2e8f0',
                background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                color: isSelected ? m.color : '#475569',
                fontWeight: isSelected ? '800' : '600',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: isSelected ? `0 4px 12px ${m.color}25` : 'none',
                transition: 'all 0.2s',
              }}
            >
              {m.icon}
              <span>{m.title}</span>
              <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '6px', color: '#64748b' }}>
                {m.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Workspace */}
      <div
        className="card-glass"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '24px',
          border: '2px solid #f1f5f9',
          boxShadow: '0 12px 32px rgba(236, 72, 153, 0.08)',
        }}
      >
        {activeModule === 'paint' && <ToolFreePaint onSave={(t, d) => saveWorkToGallery(t, 'Tranh vẽ', d)} />}
        {activeModule === 'tangram' && <ToolTangramRobot onSave={(t, d) => saveWorkToGallery(t, 'Ghép hình', d)} />}
        {activeModule === 'tree' && <ToolTreeDiagram onSave={(t, d) => saveWorkToGallery(t, 'Sơ đồ cây', d)} />}
        {activeModule === 'card' && <ToolGreetingCard onSave={(t, d) => saveWorkToGallery(t, 'Thiệp chúc mừng', d)} />}
        {activeModule === 'slide' && <ToolMiniSlide onSave={(t, d) => saveWorkToGallery(t, 'Slide trình bày', d)} />}
        {activeModule === 'poster' && <ToolSafetyPoster onSave={(t, d) => saveWorkToGallery(t, 'Poster an toàn', d)} />}
        {activeModule === 'gallery' && <CreativeGallery works={gallery} onDelete={deleteWork} />}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODULE 1: Vẽ Tranh Tự Do
// -------------------------------------------------------------
function ToolFreePaint({ onSave }) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#8b5cf6');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState('brush'); // 'brush', 'eraser', 'stamp'
  const [stampIcon, setStampIcon] = useState('🤖');
  const [title, setTitle] = useState('Bức Tranh Mùa Hè');
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = ['#A78BFA', '#F9A8D4', '#86EFAC', '#93C5FD', '#FDE68A', '#FFFFFF', '#334155'];

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

    if (tool === 'stamp') {
      const ctx = canvas.getContext('2d');
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stampIcon, x, y);
      return;
    }

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || tool === 'stamp') return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? 24 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(title, dataUrl);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${title || 'Buc_Tranh'}.png`;
    a.click();
  };

  return (
    <div>
      {/* Control bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '16px', background: '#f8fafc', padding: '12px 18px', borderRadius: '16px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tên bức tranh..."
          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 'bold' }}
        />

        {/* Tools */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setTool('brush')}
            style={{ background: tool === 'brush' ? '#8b5cf6' : '#ffffff', color: tool === 'brush' ? '#ffffff' : '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            ✏️ Bút vẽ
          </button>
          <button
            onClick={() => setTool('eraser')}
            style={{ background: tool === 'eraser' ? '#8b5cf6' : '#ffffff', color: tool === 'eraser' ? '#ffffff' : '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            🧹 Tẩy trắng
          </button>
          <button
            onClick={() => setTool('stamp')}
            style={{ background: tool === 'stamp' ? '#8b5cf6' : '#ffffff', color: tool === 'stamp' ? '#ffffff' : '#475569', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            🏷️ Con dấu
          </button>
        </div>

        {tool === 'stamp' && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {['🤖', '⭐', '❤️', '🏆', '🌸', '🚀'].map((s) => (
              <button
                key={s}
                onClick={() => setStampIcon(s)}
                style={{ background: stampIcon === s ? '#ede9fe' : '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '18px', cursor: 'pointer', padding: '4px 6px' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Colors */}
        {tool !== 'stamp' && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: c,
                  border: color === c ? '3px solid #1e293b' : '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={clearCanvas}
            style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', color: '#ef4444' }}
          >
            Xóa hết
          </button>
          <button
            onClick={handleDownload}
            style={{ background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Download size={14} /> Tải PNG
          </button>
          <button
            onClick={handleSave}
            style={{ background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Save size={14} /> Lưu Triển Lãm
          </button>
        </div>
      </div>

      <div style={{ border: '2px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: '#ffffff' }}>
        <canvas
          ref={canvasRef}
          width={760}
          height={380}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ cursor: tool === 'stamp' ? 'copy' : tool === 'eraser' ? 'cell' : 'crosshair' }}
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODULE 2: Xếp Hình Robot Thông Minh (Tangram)
// -------------------------------------------------------------
function ToolTangramRobot({ onSave }) {
  const [shapes, setShapes] = useState([
    { id: 1, type: 'head', label: 'Đầu robot', x: 200, y: 30, w: 90, h: 70, color: '#a78bfa' },
    { id: 2, type: 'body', label: 'Thân robot', x: 180, y: 110, w: 130, h: 110, color: '#f472b6' },
    { id: 3, type: 'armL', label: 'Tay trái', x: 120, y: 120, w: 40, h: 80, color: '#60a5fa' },
    { id: 4, type: 'armR', label: 'Tay phải', x: 330, y: 120, w: 40, h: 80, color: '#60a5fa' },
    { id: 5, type: 'legL', label: 'Chân trái', x: 195, y: 230, w: 40, h: 70, color: '#34d399' },
    { id: 6, type: 'legR', label: 'Chân phải', x: 255, y: 230, w: 40, h: 70, color: '#34d399' },
  ]);

  const [activeShapeId, setActiveShapeId] = useState(null);

  const moveShape = (id, dx, dy) => {
    setShapes(shapes.map((s) => (s.id === id ? { ...s, x: s.x + dx, y: s.y + dy } : s)));
  };

  const changeColor = (id, newColor) => {
    setShapes(shapes.map((s) => (s.id === id ? { ...s, color: newColor } : s)));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          Nhấp chọn một bộ phận hình học để điều chỉnh vị trí hoặc màu sắc cho chú Robot:
        </p>
        <button
          onClick={() => onSave('Mô Hình Robot Pastel', 'Ghép hình')}
          style={{ background: '#ec4899', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Save size={16} /> Lưu vào Triển lãm
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px' }}>
        {/* Canvas Area */}
        <div
          style={{
            minHeight: '340px',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 100%)',
            border: '2px solid #ddd6fe',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {shapes.map((s) => {
            const isSelected = activeShapeId === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setActiveShapeId(s.id)}
                style={{
                  position: 'absolute',
                  left: `${s.x}px`,
                  top: `${s.y}px`,
                  width: `${s.w}px`,
                  height: `${s.h}px`,
                  background: s.color,
                  borderRadius: s.type === 'head' ? '18px' : '10px',
                  border: isSelected ? '3px solid #1e293b' : '2px solid rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '11px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  userSelect: 'none',
                }}
              >
                {s.label}
              </div>
            );
          })}
        </div>

        {/* Shape Settings */}
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#1e293b' }}>
            Điều khiển bộ phận đã chọn:
          </h4>

          {activeShapeId ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '14px' }}>
                <div />
                <button onClick={() => moveShape(activeShapeId, 0, -10)} style={{ padding: '6px', borderRadius: '6px', background: '#ffffff', border: '1px solid #cbd5e1', cursor: 'pointer' }}>▲</button>
                <div />
                <button onClick={() => moveShape(activeShapeId, -10, 0)} style={{ padding: '6px', borderRadius: '6px', background: '#ffffff', border: '1px solid #cbd5e1', cursor: 'pointer' }}>◀</button>
                <div />
                <button onClick={() => moveShape(activeShapeId, 10, 0)} style={{ padding: '6px', borderRadius: '6px', background: '#ffffff', border: '1px solid #cbd5e1', cursor: 'pointer' }}>▶</button>
                <div />
                <button onClick={() => moveShape(activeShapeId, 0, 10)} style={{ padding: '6px', borderRadius: '6px', background: '#ffffff', border: '1px solid #cbd5e1', cursor: 'pointer' }}>▼</button>
                <div />
              </div>

              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>Đổi màu sắc:</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#f87171'].map((c) => (
                  <button
                    key={c}
                    onClick={() => changeColor(activeShapeId, c)}
                    style={{ width: '28px', height: '28px', borderRadius: '6px', background: c, border: 'none', cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Hãy nhấp vào một hình chữ nhật trên bảng vẽ để di chuyển hoặc đổi màu!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODULE 3: Thiết Kế Sơ Đồ Cây (Cây thư mục / Cây gia đình)
// -------------------------------------------------------------
function ToolTreeDiagram({ onSave }) {
  const [tree, setTree] = useState({
    root: 'Ổ đĩa Học Tập (D:)',
    branches: [
      { id: 1, name: 'Toán Lớp 3', children: ['Bai_Tap_Tuan_1', 'Bai_Tap_Tuan_2'] },
      { id: 2, name: 'Tiếng Việt 3', children: ['Tap_Doc', 'Chinh_Ta'] },
      { id: 3, name: 'Tin Học 3', children: ['Tranh_Ve', 'Chuong_Trinh_Robot'] },
    ],
  });

  const [newNodeName, setNewNodeName] = useState('');

  const addBranch = () => {
    if (newNodeName.trim()) {
      setTree({
        ...tree,
        branches: [
          ...tree.branches,
          { id: Date.now(), name: newNodeName.trim(), children: ['Tệp_Mẫu'] },
        ],
      });
      setNewNodeName('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          Sơ đồ cây giúp tổ chức và quản lý thông tin một cách khoa học, ngăn nắp:
        </p>
        <button
          onClick={() => onSave('Sơ Đồ Cây Thư Mục Học Tập', 'Sơ đồ')}
          style={{ background: '#06b6d4', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Save size={16} /> Lưu sơ đồ
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nhập tên nhánh thư mục mới..."
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          style={{ flex: 1, padding: '8px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        />
        <button
          onClick={addBranch}
          style={{ background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 18px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + Thêm nhánh
        </button>
      </div>

      {/* Visual Tree */}
      <div
        style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)',
          border: '2px solid #bae6fd',
          borderRadius: '20px',
          padding: '28px',
        }}
      >
        {/* Root Node */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span
            style={{
              background: '#0284c7',
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: '999px',
              fontWeight: '900',
              fontSize: '15px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
            }}
          >
            💻 {tree.root}
          </span>
        </div>

        {/* Branches */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {tree.branches.map((b) => (
            <div
              key={b.id}
              style={{
                background: '#ffffff',
                border: '2px solid #7dd3fc',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#0369a1', fontSize: '14px', marginBottom: '10px', borderBottom: '1px solid #e0f2fe', paddingBottom: '6px' }}>
                📁 {b.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {b.children.map((c, i) => (
                  <div key={i} style={{ fontSize: '12px', color: '#475569', padding: '4px 8px', background: '#f8fafc', borderRadius: '6px' }}>
                    📄 {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODULE 4: Thiệp Chúc Mừng 20/11 & Thầy Cô
// -------------------------------------------------------------
function ToolGreetingCard({ onSave }) {
  const [recipient, setRecipient] = useState('Thầy Cô Yêu Quý');
  const [message, setMessage] = useState('Em kính chúc thầy cô luôn mạnh khỏe, vui vẻ và đồng hành cùng chúng em khám phá thế giới Tin học kỳ diệu!');
  const [sender, setSender] = useState('Học sinh lớp 3');
  const [frame, setFrame] = useState('lavender');

  const frames = {
    lavender: { bg: 'linear-gradient(135deg, #ede9fe, #fce7f3)', border: '#c4b5fd', color: '#5b21b6' },
    flower: { bg: 'linear-gradient(135deg, #fce7f3, #fed7aa)', border: '#f472b6', color: '#9d174d' },
    mint: { bg: 'linear-gradient(135deg, #dcfce7, #e0f2fe)', border: '#86efac', color: '#166534' },
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Card Preview */}
        <div
          style={{
            aspectRatio: '4 / 3',
            background: frames[frame].bg,
            border: `6px double ${frames[frame].border}`,
            borderRadius: '24px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '32px', textAlign: 'center' }}>🌸 🌸 🌸</div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: frames[frame].color, marginBottom: '14px' }}>
              Kính gửi: {recipient}
            </h3>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>
              "{message}"
            </p>
          </div>

          <div style={{ textAlign: 'right', fontWeight: 'bold', color: frames[frame].color, fontSize: '14px' }}>
            Kính tặng: {sender} ❤️
          </div>
        </div>

        {/* Card Editor */}
        <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1e293b' }}>Nội dung thiệp:</h4>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Người nhận:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Lời chúc:</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Người gửi:</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Khung thiệp:</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['lavender', 'flower', 'mint'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFrame(f)}
                  style={{ flex: 1, padding: '6px', borderRadius: '6px', background: frames[f].bg, border: frame === f ? '2px solid #831843' : '1px solid #cbd5e1', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSave(`Thiệp: ${recipient}`, 'Thiệp')}
            style={{ width: '100%', background: '#f43f5e', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ✓ Lưu vào Triển lãm
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODULE 5: Thiết Kế Slide Mini
// -------------------------------------------------------------
function ToolMiniSlide({ onSave }) {
  const [topic, setTopic] = useState('Chuyến Du Hành Vào Thế Giới Máy Tính');
  const [bullets, setBullets] = useState([
    'Máy tính gồm 4 thành phần chính',
    'Chuột và bàn phím giúp em nhập lệnh',
    'Màn hình hiển thị hình ảnh sinh động',
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          Tập làm quen với kỹ năng chuẩn bị bài thuyết trình bằng trang chiếu PowerPoint:
        </p>
        <button
          onClick={() => onSave(`Slide: ${topic}`, 'Trang chiếu')}
          style={{ background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Save size={16} /> Lưu slide
        </button>
      </div>

      <div
        style={{
          aspectRatio: '16 / 9',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: '#ffffff',
          boxShadow: '0 12px 28px rgba(16, 185, 129, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '20px', borderBottom: '2px solid rgba(255,255,255,0.4)', paddingBottom: '12px' }}>
          📊 {topic}
        </h2>
        <ul style={{ fontSize: '17px', lineHeight: '2', margin: 0, paddingLeft: '24px' }}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODULE 6: Poster An Toàn Số
// -------------------------------------------------------------
function ToolSafetyPoster({ onSave }) {
  const [slogan, setSlogan] = useState('KHÔNG CHIA SẺ MẬT KHẨU CHO NGƯỜI LẠ');
  const [tip, setTip] = useState('Mật khẩu của em như chìa khóa nhà – hãy giữ kín để bảo vệ thông tin cá nhân trên mạng!');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
          Thiết kế áp phích tuyên truyền văn hóa an toàn và thông minh trên không gian mạng:
        </p>
        <button
          onClick={() => onSave(`Poster: ${slogan}`, 'Poster')}
          style={{ background: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Save size={16} /> Lưu poster
        </button>
      </div>

      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fee2e2 100%)',
          border: '4px solid #f59e0b',
          borderRadius: '24px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 12px 28px rgba(245, 158, 11, 0.15)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛡️</div>
        <div style={{ display: 'inline-block', background: '#f59e0b', color: '#ffffff', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', marginBottom: '12px' }}>
          THÔNG ĐIỆP AN TOÀN SỐ LỚP 3
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#92400e', marginBottom: '16px' }}>
          {slogan}
        </h2>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          {tip}
        </p>
        <div style={{ borderTop: '2px dashed #fde68a', paddingTop: '12px', fontSize: '12px', fontWeight: 'bold', color: '#b45309' }}>
          Đại sứ nhí Bé Bít đồng hành cùng em 🚀
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// GALLERY: Triển Lãm Sáng Tạo Của Em
// -------------------------------------------------------------
function CreativeGallery({ works, onDelete }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
            Triển Lãm Tác Phẩm Của Em ({works.length})
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
            Nơi lưu giữ các bức tranh, poster và sản phẩm sáng tạo em đã hoàn thành.
          </p>
        </div>
      </div>

      {works.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <BeBitRobot mood="thinking" size={90} speech="Em chưa lưu tác phẩm nào. Hãy qua tab Vẽ Tranh hoặc Xếp Hình để tạo tác phẩm đầu tiên nhé!" />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {works.map((w) => (
            <div
              key={w.id}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', background: '#ede9fe', color: '#7c3aed', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    {w.type}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{w.date}</span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 12px 0' }}>
                  {w.title}
                </h4>

                {w.type === 'Tranh vẽ' && typeof w.data === 'string' && (
                  <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #cbd5e1', marginBottom: '12px' }}>
                    <img src={w.data} alt={w.title} style={{ width: '100%', display: 'block', height: '120px', objectFit: 'contain', background: '#f8fafc' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>✓ Đã lưu</span>
                <button
                  onClick={() => onDelete(w.id)}
                  style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '6px 8px', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
