import React, { useRef, useState, useEffect } from 'react';
import { sounds } from '../../utils/audio';
import { Palette, Download, Trash2, Square, Circle, Minus, Edit3, Eraser, Sparkles, Check } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const PASTEL_COLORS = [
  { name: 'Tím Pastel', hex: '#8b5cf6' },
  { name: 'Hồng Pastel', hex: '#ec4899' },
  { name: 'Xanh Ngọc', hex: '#06b6d4' },
  { name: 'Xanh Lá', hex: '#10b981' },
  { name: 'Vàng Chanh', hex: '#f59e0b' },
  { name: 'Đỏ Tươi', hex: '#ef4444' },
  { name: 'Cam Đào', hex: '#f97316' },
  { name: 'Đen', hex: '#1e293b' },
  { name: 'Trắng', hex: '#ffffff' },
];

export default function PaintGame({ onComplete }) {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pencil'); // pencil, eraser, rect, circle, line
  const [color, setColor] = useState('#8b5cf6');
  const [lineWidth, setLineWidth] = useState(6);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Fill white background initially
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setIsDrawing(true);
    setStartPos(coords);
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    setHasDrawn(true);

    if (tool === 'pencil' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    if (tool === 'pencil' || tool === 'eraser') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (snapshot) {
      // Restore previous state before drawing preview shape
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      if (tool === 'rect') {
        ctx.strokeRect(startPos.x, startPos.y, coords.x - startPos.x, coords.y - startPos.y);
      } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(coords.x - startPos.x, 2) + Math.pow(coords.y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (tool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    }
  };

  const stopDraw = (e) => {
    if (!isDrawing) return;
    e?.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArt = () => {
    sounds.playStar();
    const canvas = canvasRef.current;
    const imageURI = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'tranh_ve_be_bit_lop3.png';
    link.href = imageURI;
    link.click();
    if (onComplete) onComplete(100);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '16px' }}>
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
          <div style={{ background: '#d1fae5', padding: '10px', borderRadius: '12px', color: '#10b981' }}>
            <Palette size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 5: Xưởng vẽ Bé Bít (Thực hành Đồ họa Paint)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6387' }}>
              Bài học 12, 13: Làm quen với phần mềm đồ họa, vẽ hình khối, cọ vẽ và lưu tranh PNG
            </p>
          </div>
        </div>

        <button
          className="btn-bouncy"
          onClick={downloadArt}
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
          }}
        >
          <Download size={16} /> Tải tranh về máy (.PNG)
        </button>
      </div>

      {/* Main Studio Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px', alignItems: 'start' }}>
        {/* Toolbar Left */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '12px',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '140px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b6387', display: 'block', marginBottom: '6px' }}>
              CÔNG CỤ
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                className="btn-bouncy"
                onClick={() => setTool('pencil')}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tool === 'pencil' ? '#ede9fe' : '#f8fafc',
                  color: tool === 'pencil' ? '#8b5cf6' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Bút vẽ tự do"
              >
                <Edit3 size={16} /> Bút vẽ
              </button>

              <button
                className="btn-bouncy"
                onClick={() => setTool('eraser')}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tool === 'eraser' ? '#fce7f3' : '#f8fafc',
                  color: tool === 'eraser' ? '#ec4899' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Tẩy nét vẽ"
              >
                <Eraser size={16} /> Tẩy
              </button>

              <button
                className="btn-bouncy"
                onClick={() => setTool('rect')}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tool === 'rect' ? '#e0f2fe' : '#f8fafc',
                  color: tool === 'rect' ? '#06b6d4' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Hình chữ nhật"
              >
                <Square size={16} /> Chữ nhật
              </button>

              <button
                className="btn-bouncy"
                onClick={() => setTool('circle')}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tool === 'circle' ? '#fef3c7' : '#f8fafc',
                  color: tool === 'circle' ? '#f59e0b' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                title="Hình tròn"
              >
                <Circle size={16} /> Hình tròn
              </button>

              <button
                className="btn-bouncy"
                onClick={() => setTool('line')}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tool === 'line' ? '#ede9fe' : '#f8fafc',
                  color: tool === 'line' ? '#8b5cf6' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  gridColumn: 'span 2',
                }}
                title="Đường thẳng"
              >
                <Minus size={16} /> Đoạn thẳng
              </button>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b6387', display: 'block', marginBottom: '6px' }}>
              NÉT CỌ: {lineWidth}px
            </span>
            <input
              type="range"
              min="2"
              max="24"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#8b5cf6' }}
            />
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b6387', display: 'block', marginBottom: '6px' }}>
              BẢNG MÀU
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {PASTEL_COLORS.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  title={c.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: c.hex,
                    cursor: 'pointer',
                    border: color === c.hex ? '3px solid #332d4b' : '1px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.1s',
                  }}
                >
                  {color === c.hex && (
                    <Check size={14} color={c.hex === '#ffffff' ? '#000000' : '#ffffff'} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn-bouncy"
            onClick={clearCanvas}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: 'none',
              background: '#fee2e2',
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <Trash2 size={14} /> Xóa trang
          </button>
        </div>

        {/* Canvas Workspace */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '12px',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
            <canvas
              ref={canvasRef}
              width={640}
              height={420}
              className="paint-canvas"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
              style={{
                width: '100%',
                maxWidth: '640px',
                height: 'auto',
                aspectRatio: '640/420',
                border: '2px solid #e2e8f0',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BeBitRobot mood="happy" size="small" screenText="🎨" />
              <span style={{ fontSize: '13px', color: '#6b6387' }}>
                💡 Gợi ý: Em thử vẽ ngôi nhà mái đỏ, cây xanh và chú Robot Bé Bít nhé!
              </span>
            </div>
            {hasDrawn && (
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>
                ✓ Đã có tác phẩm
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
