import React, { useState, useRef } from 'react';
import { sounds } from '../utils/audio';
import { LESSONS, BADGES, LANDS } from '../data';
import { extractDriveFileId, getDriveEmbedUrl } from '../data/videoLibrary';
import {
  Printer,
  Download,
  Upload,
  RotateCcw,
  Unlock,
  Lock,
  Star,
  Award,
  CheckCircle,
  FileSpreadsheet,
  Eye,
  Film,
  FileQuestion,
  Sparkles,
  Edit2,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function TeacherCorner({
  progress,
  onUpdateProgress,
  onResetProgress,
  videos = [],
  onUpdateVideos,
}) {
  const [activeTab, setActiveTab] = useState('report'); // 'report', 'videos', 'exam'
  const fileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  // Exam Generator state
  const [examTheme, setExamTheme] = useState('all');
  const [examCount, setExamCount] = useState(10);
  const [examDuration, setExamDuration] = useState(15);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [generatedExam, setGeneratedExam] = useState(null);

  // Video editor state
  const [editingVideo, setEditingVideo] = useState(null);

  const completedCount = Object.values(progress.lessons || {}).filter((l) => l.completed).length;
  const accuracy = completedCount > 0 ? Math.round((progress.totalStars / (completedCount * 3)) * 100) : 0;
  const unlockedBadges = BADGES.filter((b) => b.requirement(progress));

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleExportJSON = () => {
    sounds.playStar();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bao_cao_tin_hoc_3_${(progress.studentName || 'hoc_sinh').replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    sounds.playStar();
    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
    csvContent += 'Ma Bai,Ten Bai Hoc,Trang Thai,So Sao,Diem Dung,Ngay\n';

    LESSONS.forEach((l) => {
      const lp = progress.lessons?.[l.id] || { completed: false, stars: 0, correct: 0 };
      const status = lp.completed ? 'Da hoan thanh' : 'Chua hoc';
      csvContent += `Bai ${l.id},"${l.title}",${status},${lp.stars || 0},${lp.correct || 0}/3,${new Date().toLocaleDateString('vi-VN')}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tien_do_tin_hoc_3_${(progress.studentName || 'hoc_sinh').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (importedData && typeof importedData.totalStars === 'number' && importedData.lessons) {
          sounds.playStar();
          onUpdateProgress(importedData);
          alert('Nhập dữ liệu hồ sơ học sinh thành công!');
        } else {
          alert('Tệp dữ liệu JSON không đúng định dạng của ứng dụng!');
        }
      } catch (err) {
        alert('Lỗi đọc tệp JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // Video Library Export/Import
  const handleExportVideosJSON = () => {
    sounds.playStar();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(videos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'videos.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportVideosJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedVideos = JSON.parse(event.target.result);
        if (Array.isArray(importedVideos) && importedVideos.length > 0) {
          sounds.playStar();
          if (onUpdateVideos) {
            onUpdateVideos(importedVideos);
          }
          alert(`Đã nạp thành công cấu hình cho ${importedVideos.length} video AI!`);
        } else {
          alert('Tệp JSON không chứa danh sách video hợp lệ!');
        }
      } catch (err) {
        alert('Lỗi đọc tệp videos.json: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveVideoEdit = (vid) => {
    if (!onUpdateVideos) return;
    const extractedId = extractDriveFileId(vid.driveUrl || vid.driveId);
    const updated = videos.map((v) =>
      v.id === vid.id
        ? {
            ...v,
            ...vid,
            driveId: extractedId,
            driveUrl: vid.driveUrl || (extractedId ? `https://drive.google.com/file/d/${extractedId}/preview` : ''),
          }
        : v
    );
    onUpdateVideos(updated);
    setEditingVideo(null);
  };

  const generateExam = () => {
    sounds.playClick();
    // Gather all questions from LESSONS
    let pool = [];
    LESSONS.forEach((l) => {
      if (examTheme === 'all' || l.themeId === Number(examTheme)) {
        l.quiz.forEach((q) => {
          pool.push({
            ...q,
            lessonId: l.id,
            lessonTitle: l.title,
            themeId: l.themeId,
          });
        });
      }
    });

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(examCount, shuffled.length));

    setGeneratedExam({
      id: Date.now(),
      createdDate: new Date().toLocaleDateString('vi-VN'),
      theme: examTheme === 'all' ? 'Tất cả 6 chủ đề' : `Chủ đề ${examTheme}`,
      duration: examDuration,
      questions: selected,
    });
  };

  const toggleUnlockAll = () => {
    sounds.playClick();
    onUpdateProgress({
      ...progress,
      unlockAll: !progress.unlockAll,
    });
  };

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '16px' }}>
      {/* Top Banner Navigation */}
      <div
        className="card-glass no-print"
        style={{
          padding: '16px 20px',
          borderRadius: '20px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ede9fe 0%, #f1f5f9 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { id: 'report', label: '📊 Báo Cáo Học Tập & TT 27', icon: <FileSpreadsheet size={16} /> },
            { id: 'videos', label: `🎬 Quản Lý 23 Video AI (${videos.length})`, icon: <Film size={16} /> },
            { id: 'exam', label: '📝 Tạo Đề Kiểm Tra & Phiếu Bài Tập', icon: <FileQuestion size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                border: activeTab === tab.id ? '2px solid #8b5cf6' : '1px solid #cbd5e1',
                background: activeTab === tab.id ? '#8b5cf6' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={toggleUnlockAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              border: progress.unlockAll ? '2px solid #10b981' : '1px solid #cbd5e1',
              background: progress.unlockAll ? '#dcfce7' : '#ffffff',
              color: progress.unlockAll ? '#15803d' : '#475569',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {progress.unlockAll ? <Unlock size={14} /> : <Lock size={14} />}
            <span>{progress.unlockAll ? 'Đã Mở Khóa Tất Cả Bài' : 'Mở Khóa Toàn Bộ (Dạy Học)'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Báo cáo học tập */}
      {activeTab === 'report' && (
        <div>
          {/* Action Toolbar */}
          <div className="no-print" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <button
              onClick={handlePrint}
              style={{ background: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Printer size={16} /> In Phiếu Báo Cáo
            </button>
            <button
              onClick={handleExportCSV}
              style={{ background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Download size={16} /> Xuất Bảng Điểm (CSV)
            </button>
            <button
              onClick={handleExportJSON}
              style={{ background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Download size={16} /> Sao Lưu Dữ Liệu (JSON)
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ background: '#f59e0b', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Upload size={16} /> Phục Hồi Dữ Liệu (JSON)
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />

            <button
              onClick={() => {
                if (window.confirm('Em có chắc chắn muốn làm mới toàn bộ tiến độ học tập về ban đầu?')) {
                  onResetProgress();
                }
              }}
              style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginLeft: 'auto' }}
            >
              <RotateCcw size={16} /> Đặt Lại Tiến Độ
            </button>
          </div>

          {/* Printable Report Card */}
          <div
            id="report-printable"
            className="card-glass"
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              border: '2px solid #e2e8f0',
              boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ textAlign: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: '#64748b', textTransform: 'uppercase' }}>
                BỘ GIÁO DỤC VÀ ĐÀO TẠO • CHƯƠNG TRÌNH GDPT 2018
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#4c1d95', margin: '8px 0 4px 0' }}>
                PHIẾU ĐÁNH GIÁ KẾT QUẢ HỌC TẬP TIN HỌC 3
              </h1>
              <div style={{ fontSize: '14px', color: '#ec4899', fontWeight: 'bold' }}>
                Bộ sách: Kết nối tri thức với cuộc sống
              </div>
            </div>

            {/* Student Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: '#f8fafc', padding: '18px', borderRadius: '16px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Họ và tên học sinh:</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b' }}>{progress.studentName || 'Bé Bít Nhí'}</div>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Lớp:</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b' }}>{progress.studentClass || 'Lớp 3A'}</div>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Tổng số bài hoàn thành:</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#15803d' }}>{completedCount} / 16 Bài ({Math.round((completedCount / 16) * 100)}%)</div>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Tổng số sao vàng:</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#f59e0b' }}>⭐ {progress.totalStars || 0} / 48 Sao</div>
              </div>
            </div>

            {/* TT27 Qualitative Assessment */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '18px', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '900', color: '#166534', textTransform: 'uppercase' }}>
                Đánh giá theo Thông tư 27/2020/TT-BGDĐT:
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#14532d', lineHeight: '1.6' }}>
                • <strong>Mức độ đạt được:</strong> {completedCount >= 14 ? 'Hoàn thành Tốt (T)' : completedCount >= 8 ? 'Hoàn thành (H)' : 'Chưa hoàn thành (C)'}<br />
                • <strong>Năng lực Tin học:</strong> Biết sử dụng chuột, bàn phím đúng cách; phân biệt được thông tin và dữ liệu; tổ chức lưu trữ tệp, thư mục ngăn nắp; có ý thức an toàn thông tin cá nhân và bước đầu làm quen với tư duy thuật toán.<br />
                • <strong>Phẩm chất:</strong> Chăm chỉ, kiên nhẫn khi thực hành và có trách nhiệm giữ gìn thiết bị phòng máy.
              </p>
            </div>

            {/* Table of 16 Lessons */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#ede9fe', color: '#4c1d95', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', borderRadius: '8px 0 0 8px' }}>Bài</th>
                    <th style={{ padding: '10px 12px' }}>Tên bài học SGK</th>
                    <th style={{ padding: '10px 12px' }}>Trạng thái</th>
                    <th style={{ padding: '10px 12px' }}>Số sao</th>
                    <th style={{ padding: '10px 12px', borderRadius: '0 8px 8px 0' }}>Trắc nghiệm</th>
                  </tr>
                </thead>
                <tbody>
                  {LESSONS.map((l) => {
                    const lp = progress.lessons?.[l.id] || { completed: false, stars: 0, correct: 0 };
                    return (
                      <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 'bold' }}>{l.id}</td>
                        <td style={{ padding: '10px 12px' }}>{l.title}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: lp.completed ? '#dcfce7' : '#f1f5f9', color: lp.completed ? '#15803d' : '#64748b', fontWeight: 'bold' }}>
                            {lp.completed ? 'Đã hoàn thành' : 'Chưa học'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: '#f59e0b', fontWeight: 'bold' }}>
                          {'⭐'.repeat(lp.stars || 0) || '-'}
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#475569' }}>
                          {lp.correct || 0} / 3 câu đúng
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Quản lý 23 Video AI */}
      {activeTab === 'videos' && (
        <div
          className="card-glass"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: '2px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
                Quản Lý Thư Viện 23 Video AI Google Drive 🎬
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                Thầy cô có thể dán đường link Google Drive, đổi tên video, chọn bài học tương ứng và xuất/nhập tệp <code>videos.json</code>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleExportVideosJSON}
                style={{ background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={14} /> Xuất cấu hình (videos.json)
              </button>
              <button
                onClick={() => videoFileInputRef.current?.click()}
                style={{ background: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Upload size={14} /> Nhập cấu hình (videos.json)
              </button>
              <input ref={videoFileInputRef} type="file" accept=".json" onChange={handleImportVideosJSON} style={{ display: 'none' }} />
            </div>
          </div>

          {/* Modal / Form to edit a video */}
          {editingVideo && (
            <div
              style={{
                background: '#f8fafc',
                border: '2px solid #8b5cf6',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#4c1d95', margin: '0 0 16px 0' }}>
                ✏️ Chỉnh sửa Video #{editingVideo.id}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Tên Video:</label>
                  <input
                    type="text"
                    value={editingVideo.title}
                    onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Đường dẫn Google Drive hoặc File ID:</label>
                  <input
                    type="text"
                    placeholder="https://drive.google.com/file/d/FILE_ID/view hoặc FILE_ID..."
                    value={editingVideo.driveUrl || editingVideo.driveId || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, driveUrl: e.target.value, driveId: extractDriveFileId(e.target.value) })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Phân loại vào Bài học:</label>
                  <select
                    value={editingVideo.lessonId || ''}
                    onChange={(e) => {
                      const lid = Number(e.target.value);
                      const targetLesson = LESSONS.find((l) => l.id === lid);
                      setEditingVideo({
                        ...editingVideo,
                        lessonId: lid,
                        themeId: targetLesson?.themeId || 1,
                        badge: lid ? `Bài ${lid}` : 'Chờ phân loại',
                      });
                    }}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    <option value={0}>-- Video chờ phân loại --</option>
                    {LESSONS.map((l) => (
                      <option key={l.id} value={l.id}>
                        Bài {l.id}: {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Mục tiêu học tập:</label>
                  <input
                    type="text"
                    value={editingVideo.objectives || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, objectives: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleSaveVideoEdit(editingVideo)}
                  style={{ background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 18px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  ✓ Lưu thay đổi
                </button>
                <button
                  onClick={() => setEditingVideo(null)}
                  style={{ background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer' }}
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* Videos Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#ede9fe', color: '#4c1d95', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>STT</th>
                  <th style={{ padding: '10px 12px' }}>Tên Video AI</th>
                  <th style={{ padding: '10px 12px' }}>Phân loại bài</th>
                  <th style={{ padding: '10px 12px' }}>Google Drive File ID</th>
                  <th style={{ padding: '10px 12px' }}>Trạng thái</th>
                  <th style={{ padding: '10px 12px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v) => {
                  const driveId = extractDriveFileId(v.driveUrl || v.driveId);
                  const hasLink = !!driveId;

                  return (
                    <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 'bold' }}>#{v.id}</td>
                      <td style={{ padding: '10px 12px', fontWeight: '700', color: '#1e293b' }}>
                        {v.title}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                          {v.lessonId ? `Bài ${v.lessonId}` : 'Chờ phân loại'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>
                        {driveId || '(Chưa gắn link)'}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: hasLink ? '#dcfce7' : '#fee2e2', color: hasLink ? '#15803d' : '#b91c1c', fontWeight: 'bold' }}>
                          {hasLink ? '✓ Đã sẵn sàng' : 'Chờ gắn link'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <button
                          onClick={() => setEditingVideo(v)}
                          style={{ background: '#ede9fe', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 'bold', color: '#6d28d9', cursor: 'pointer' }}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Tạo Đề Kiểm Tra & Phiếu Bài Tập */}
      {activeTab === 'exam' && (
        <div
          className="card-glass"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: '2px solid #e2e8f0',
          }}
        >
          <div style={{ borderBottom: '2px dashed #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
              Công Cụ Tạo Đề Kiểm Tra & Phiếu Bài Tập Tự Động 📝
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              Trích xuất ngẫu nhiên câu hỏi từ ngân hàng 48 câu hỏi SGK Tin học 3, định dạng phiếu in A4 chuẩn.
            </p>
          </div>

          {/* Config Bar */}
          <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Chủ đề kiểm tra:</label>
              <select
                value={examTheme}
                onChange={(e) => setExamTheme(e.target.value)}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              >
                <option value="all">Tất cả 6 chủ đề</option>
                {LANDS.map((land) => (
                  <option key={land.id} value={land.id}>
                    Chủ đề {land.id}: {land.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Số câu hỏi:</label>
              <select
                value={examCount}
                onChange={(e) => setExamCount(Number(e.target.value))}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              >
                <option value={5}>5 câu (Kiểm tra 15 phút)</option>
                <option value={10}>10 câu (Kiểm tra giữa kỳ)</option>
                <option value={15}>15 câu (Đề thi cuối kỳ)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px' }}>Thời gian làm bài:</label>
              <select
                value={examDuration}
                onChange={(e) => setExamDuration(Number(e.target.value))}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              >
                <option value={15}>15 phút</option>
                <option value={20}>20 phút</option>
                <option value={35}>35 phút</option>
              </select>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <button
                onClick={generateExam}
                style={{ background: '#8b5cf6', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                ⚡ Tạo Đề Tự Động
              </button>
              {generatedExam && (
                <button
                  onClick={handlePrint}
                  style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Printer size={16} /> In Đề Ra Giấy
                </button>
              )}
            </div>
          </div>

          {/* Generated Exam Paper */}
          {generatedExam && (
            <div
              id="exam-print-paper"
              style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '16px',
                padding: '36px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1e293b', paddingBottom: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>TRƯỜNG TIỂU HỌC: ........................................</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>LỚP: 3...... &nbsp;&nbsp;&nbsp; HỌ VÀ TÊN: ........................................</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: '900', color: '#4c1d95', textTransform: 'uppercase' }}>
                    BÀI KIỂM TRA ĐỊNH KỲ TIN HỌC 3
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Thời gian làm bài: {generatedExam.duration} phút • {generatedExam.theme}
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {generatedExam.questions.map((q, idx) => (
                  <div key={idx} style={{ pageBreakInside: 'avoid' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                      Câu {idx + 1}: {q.question}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', paddingLeft: '16px' }}>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} style={{ fontSize: '13px', color: '#334155' }}>
                          <span style={{ fontWeight: 'bold', marginRight: '6px' }}>
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Answer Key Section */}
              <div className="no-print" style={{ marginTop: '30px', borderTop: '2px dashed #cbd5e1', paddingTop: '16px' }}>
                <button
                  onClick={() => setShowAnswerKey(!showAnswerKey)}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}
                >
                  {showAnswerKey ? 'Ẩn đáp án giáo viên' : '👁️ Xem đáp án giáo viên'}
                </button>

                {showAnswerKey && (
                  <div style={{ marginTop: '12px', background: '#f8fafc', padding: '14px', borderRadius: '10px', fontSize: '13px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#15803d' }}>BẢNG ĐÁP ÁN:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {generatedExam.questions.map((q, idx) => (
                        <span key={idx} style={{ background: '#dcfce7', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', color: '#166534' }}>
                          Câu {idx + 1}: {String.fromCharCode(65 + q.answer)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
