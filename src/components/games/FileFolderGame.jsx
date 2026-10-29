import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { Folder, FileText, Image as ImageIcon, Music, Video, Trophy, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const INITIAL_FILES = [
  { id: 'f1', name: 'chu_robot_be_bit.png', type: 'image', icon: '🖼️', category: 'image', label: 'Tệp hình ảnh' },
  { id: 'f2', name: 'bai_hat_lop_3.mp3', type: 'audio', icon: '🎵', category: 'audio', label: 'Tệp âm thanh' },
  { id: 'f3', name: 'bai_van_ta_me.docx', type: 'doc', icon: '📄', category: 'doc', label: 'Tệp văn bản' },
  { id: 'f4', name: 'hoat_hinh_vui_nhon.mp4', type: 'video', icon: '🎬', category: 'video', label: 'Tệp video' },
  { id: 'f5', name: 'anh_gia_dinh.jpg', type: 'image', icon: '🖼️', category: 'image', label: 'Tệp hình ảnh' },
  { id: 'f6', name: 'tieng_dan_piano.mp3', type: 'audio', icon: '🎵', category: 'audio', label: 'Tệp âm thanh' },
  { id: 'f7', name: 'thoi_khoa_bieu.txt', type: 'doc', icon: '📄', category: 'doc', label: 'Tệp văn bản' },
  { id: 'f8', name: 'kham_pha_vu_tru.mp4', type: 'video', icon: '🎬', category: 'video', label: 'Tệp video' },
];

const FOLDERS = [
  { id: 'image', name: 'Thư mục: HÌNH ẢNH', icon: '🖼️', color: '#8b5cf6', bgColor: '#f3e8ff' },
  { id: 'audio', name: 'Thư mục: ÂM NHẠC', icon: '🎵', color: '#ec4899', bgColor: '#fce7f3' },
  { id: 'doc', name: 'Thư mục: VĂN BẢN', icon: '📄', color: '#06b6d4', bgColor: '#e0f2fe' },
  { id: 'video', name: 'Thư mục: VIDEO', icon: '🎬', color: '#10b981', bgColor: '#d1fae5' },
];

export default function FileFolderGame({ onComplete }) {
  const [remainingFiles, setRemainingFiles] = useState(INITIAL_FILES);
  const [selectedFile, setSelectedFile] = useState(INITIAL_FILES[0]);
  const [sortedCounts, setSortedCounts] = useState({ image: 0, audio: 0, doc: 0, video: 0 });
  const [feedback, setFeedback] = useState('Hãy chọn hoặc kéo thả tệp vào đúng thư mục phù hợp!');
  const [robotMood, setRobotMood] = useState('normal');
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const handleSortIntoFolder = (folderId) => {
    if (!selectedFile) return;

    if (selectedFile.category === folderId) {
      sounds.playCorrect();
      setScore(s => s + 15);
      setRobotMood('happy');
      setFeedback(`Chính xác! Tệp [${selectedFile.name}] đã được lưu vào đúng thư mục!`);

      setSortedCounts(prev => ({
        ...prev,
        [folderId]: prev[folderId] + 1
      }));

      const newRemaining = remainingFiles.filter(f => f.id !== selectedFile.id);
      setRemainingFiles(newRemaining);

      if (newRemaining.length > 0) {
        setSelectedFile(newRemaining[0]);
      } else {
        sounds.playStar();
        setIsWon(true);
        setFeedback('Hoan hô! Em đã sắp xếp gọn gàng toàn bộ các tệp vào đúng thư mục!');
        if (onComplete) onComplete(100);
      }
    } else {
      sounds.playWrong();
      setRobotMood('sad');
      setFeedback(`Chưa đúng rồi! Tệp [${selectedFile.name}] không thuộc thư mục này.`);
    }
  };

  const handleReset = () => {
    setRemainingFiles(INITIAL_FILES);
    setSelectedFile(INITIAL_FILES[0]);
    setSortedCounts({ image: 0, audio: 0, doc: 0, video: 0 });
    setScore(0);
    setIsWon(false);
    setRobotMood('normal');
    setFeedback('Hãy phân loại các tệp ngăn nắp nhé!');
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
          <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '12px', color: '#06b6d4' }}>
            <Folder size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 3: Siêu thủ kho Bé Bít (Phân loại Tệp & Thư mục)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6387' }}>
              Bài học 8, 9, 10: Sắp xếp ngăn nắp dữ liệu dạng hình ảnh, văn bản, âm thanh và video
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#6b6387', display: 'block' }}>Điểm số</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>{score}đ</span>
        </div>
      </div>

      {!isWon ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '16px' }}>
          {/* Left: Files Queue */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <BeBitRobot mood={robotMood} size="small" screenText="📁" />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#4c1d95' }}>
                  Danh sách tệp chờ sắp xếp ({remainingFiles.length})
                </h3>
                <p style={{ fontSize: '12px', color: '#6b6387' }}>Nhấp chọn tệp cần đưa vào thư mục</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
              {remainingFiles.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    draggable
                    onDragStart={() => setSelectedFile(file)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: isSelected ? '#ede9fe' : '#f8fafc',
                      border: isSelected ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                      cursor: 'grab',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{file.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#332d4b' }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6b6387' }}>{file.label}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 'bold', background: '#ffffff', padding: '2px 8px', borderRadius: '6px' }}>
                        Đang chọn
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Folders Destination */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ background: '#fdf4ff', padding: '10px 14px', borderRadius: '12px', marginBottom: '14px', border: '1px solid #f5d0fe' }}>
                <p style={{ fontSize: '13px', color: '#86198f', fontWeight: '600' }}>
                  📢 {feedback}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {FOLDERS.map((folder) => (
                  <div
                    key={folder.id}
                    className="btn-bouncy"
                    onClick={() => handleSortIntoFolder(folder.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleSortIntoFolder(folder.id)}
                    style={{
                      background: folder.bgColor,
                      border: `2px dashed ${folder.color}`,
                      borderRadius: '16px',
                      padding: '16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '130px',
                    }}
                  >
                    <span style={{ fontSize: '32px', marginBottom: '6px' }}>{folder.icon}</span>
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: folder.color }}>
                      {folder.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#6b6387', marginTop: '4px' }}>
                      Đã chứa: {sortedCounts[folder.id]} tệp
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '14px' }}>
              💡 Mẹo: Nhấp chọn một tệp bên trái rồi nhấp vào Thư mục bên phải tương ứng
            </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px 20px',
            textAlign: 'center',
            boxShadow: '0 6px 24px rgba(139, 92, 246, 0.12)',
          }}
        >
          <Trophy size={56} style={{ color: '#f59e0b', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4c1d95', marginBottom: '8px' }}>
            Xuất sắc! Bậc thầy Quản lý Tệp & Thư mục!
          </h3>
          <p style={{ color: '#6b6387', fontSize: '15px', marginBottom: '16px' }}>
            Em đã phân loại toàn bộ tệp hình ảnh, âm nhạc, văn bản và video vào các thư mục ngăn nắp.
          </p>
          <div style={{ display: 'inline-block', background: '#fef3c7', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy"
              onClick={handleReset}
              style={{
                background: '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <RefreshCw size={18} /> Chơi lại lần nữa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
