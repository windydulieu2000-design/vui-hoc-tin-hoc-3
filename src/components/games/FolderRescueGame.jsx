import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { FolderTree, Folder, FileText, CheckCircle2, RotateCcw, Trophy, ArrowRight, FolderPlus } from 'lucide-react';
import BeBitRobot from '../BeBitRobot';

const STRAY_FILES = [
  { id: 'f1', name: 'bang_nhan_3_toan.docx', icon: '📄', targetParent: 'hoc_tap', targetFolder: 'toan', label: 'Bảng nhân 3 môn Toán' },
  { id: 'f2', name: 'bai_van_ta_me_yeu.docx', icon: '📝', targetParent: 'hoc_tap', targetFolder: 'tieng_viet', label: 'Bài văn tả mẹ' },
  { id: 'f3', name: 'thao_tac_chuot_va_phim.docx', icon: '💻', targetParent: 'hoc_tap', targetFolder: 'tin_hoc', label: 'Bài học Tin học 3' },
  { id: 'f4', name: 'anh_gia_dinh_di_bien.png', icon: '🖼️', targetParent: 'giai_tri', targetFolder: 'hinh_anh', label: 'Ảnh gia đình đi biển' },
  { id: 'f5', name: 'bai_ca_di_hoc_lop_3.mp3', icon: '🎵', targetParent: 'giai_tri', targetFolder: 'am_nhac', label: 'Bài hát Em yêu trường em' },
  { id: 'f6', name: 'phep_chia_co_du.docx', icon: '📄', targetParent: 'hoc_tap', targetFolder: 'toan', label: 'Bài tập Phép chia' },
];

const FOLDER_TREE = [
  {
    id: 'hoc_tap',
    name: '📁 THƯ MỤC MẸ: [HỌC TẬP]',
    subFolders: [
      { id: 'toan', name: '📂 Thư mục con: [Toán 3]', icon: '📐' },
      { id: 'tieng_viet', name: '📂 Thư mục con: [Tiếng Việt 3]', icon: '📚' },
      { id: 'tin_hoc', name: '📂 Thư mục con: [Tin học 3]', icon: '💻' },
    ],
  },
  {
    id: 'giai_tri',
    name: '📁 THƯ MỤC MẸ: [GIẢI TRÍ]',
    subFolders: [
      { id: 'hinh_anh', name: '📂 Thư mục con: [Hình ảnh]', icon: '🖼️' },
      { id: 'am_nhac', name: '📂 Thư mục con: [Âm nhạc]', icon: '🎵' },
    ],
  },
];

export default function FolderRescueGame({ onComplete }) {
  const [filesLeft, setFilesLeft] = useState(STRAY_FILES);
  const [selectedFile, setSelectedFile] = useState(STRAY_FILES[0]);
  const [rescuedStats, setRescuedStats] = useState({});
  const [feedback, setFeedback] = useState('Hãy chọn một tệp thất lạc và đưa vào đúng thư mục con phù hợp!');
  const [robotMood, setRobotMood] = useState('welcome');
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const handleRescueTo = (parentFolderId, subFolderId) => {
    if (!selectedFile) return;

    if (selectedFile.targetParent === parentFolderId && selectedFile.targetFolder === subFolderId) {
      sounds.playCorrect();
      setScore(s => s + 20);
      setRobotMood('celebrating');
      setFeedback(`Xuất sắc! Tệp [${selectedFile.name}] đã được giải cứu về đúng thư mục!`);

      const key = `${parentFolderId}-${subFolderId}`;
      setRescuedStats(prev => ({
        ...prev,
        [key]: (prev[key] || 0) + 1,
      }));

      const remaining = filesLeft.filter(f => f.id !== selectedFile.id);
      setFilesLeft(remaining);

      if (remaining.length > 0) {
        setSelectedFile(remaining[0]);
      } else {
        sounds.playStar();
        setIsWon(true);
        setRobotMood('proud');
        if (onComplete) onComplete(120);
      }
    } else {
      sounds.playWrong();
      setRobotMood('encouraging');
      setFeedback(`Chưa đúng rồi! Tệp [${selectedFile.name}] (${selectedFile.label}) không thuộc thư mục này.`);
    }
  };

  const handleReset = () => {
    setFilesLeft(STRAY_FILES);
    setSelectedFile(STRAY_FILES[0]);
    setRescuedStats({});
    setScore(0);
    setIsWon(false);
    setRobotMood('welcome');
    setFeedback('Hãy chọn một tệp thất lạc và đưa vào đúng thư mục con phù hợp!');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div
        className="card-glass"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderRadius: '20px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#dbeafe', padding: '10px', borderRadius: '14px', color: '#2563eb' }}>
            <FolderTree size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#332d4b' }}>
              Trò chơi 9: Giải Cứu Tệp và Thư Mục
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Bài học 8, 9, 10: Tổ chức thông tin theo sơ đồ cây (Thư mục mẹ & Thư mục con)
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 'bold' }}>ĐIỂM SỐ</span>
          <span style={{ fontSize: '18px', fontWeight: '900', color: '#f59e0b' }}>{score}đ</span>
        </div>
      </div>

      {!isWon ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '16px' }}>
          {/* Left: Stray Files Queue */}
          <div
            className="card-3d"
            style={{
              padding: '18px',
              borderRadius: '22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <BeBitRobot mood={robotMood} size="small" screenText="📂" />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#4c1d95' }}>
                  Tệp thất lạc cần giải cứu ({filesLeft.length})
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Nhấp chọn tệp cần sắp xếp</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filesLeft.map((file) => {
                const isSelected = selectedFile?.id === file.id;

                return (
                  <div
                    key={file.id}
                    className="btn-bouncy"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedFile(file);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: isSelected ? '#ede9fe' : '#f8fafc',
                      border: isSelected ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(139, 92, 246, 0.15)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{file.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{file.label}</div>
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

          {/* Right: Hierarchical Folder Tree */}
          <div
            className="card-3d"
            style={{
              padding: '18px',
              borderRadius: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '10px 14px', borderRadius: '12px', marginBottom: '14px' }}>
                <p style={{ fontSize: '13px', color: '#4c1d95', fontWeight: 'bold', margin: 0 }}>
                  📢 {feedback}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {FOLDER_TREE.map((parent) => (
                  <div
                    key={parent.id}
                    style={{
                      background: '#f8fafc',
                      border: '2px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '14px',
                    }}
                  >
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '10px' }}>
                      {parent.name}
                    </h4>

                    {/* Subfolders Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', paddingLeft: '14px', borderLeft: '3px solid #cbd5e1' }}>
                      {parent.subFolders.map((sub) => {
                        const key = `${parent.id}-${sub.id}`;
                        const count = rescuedStats[key] || 0;

                        return (
                          <button
                            key={sub.id}
                            className="btn-bouncy"
                            onClick={() => handleRescueTo(parent.id, sub.id)}
                            style={{
                              background: '#ffffff',
                              border: '2px solid #c4b5fd',
                              borderRadius: '12px',
                              padding: '10px 14px',
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '18px' }}>{sub.icon}</span>
                              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
                                {sub.name}
                              </span>
                            </div>

                            <span style={{ fontSize: '11px', background: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: '8px', fontWeight: 'bold' }}>
                              Đã chứa: {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '14px' }}>
              💡 Mẹo: Nhấp chọn một tệp bên trái rồi nhấp vào Thư mục con phù hợp bên phải
            </p>
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <div
          className="card-3d"
          style={{
            padding: '40px 24px',
            borderRadius: '26px',
            textAlign: 'center',
          }}
        >
          <Trophy size={60} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4c1d95', marginBottom: '8px' }}>
            Xuất Sắc! Bậc Thầy Sắp Xếp Cây Thư Mục!
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Em đã giải cứu toàn bộ tệp học tập và giải trí vào đúng các nhánh thư mục con theo sơ đồ hình cây!
          </p>
          <div style={{ background: '#fef3c7', display: 'inline-block', padding: '10px 24px', borderRadius: '16px', color: '#b45309', fontWeight: 'bold', fontSize: '18px', marginBottom: '24px' }}>
            Tổng điểm đạt được: {score} điểm ⭐⭐⭐
          </div>
          <div>
            <button
              className="btn-bouncy btn-primary-3d"
              onClick={handleReset}
            >
              <RotateCcw size={18} />
              <span>Chơi lại lần nữa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
