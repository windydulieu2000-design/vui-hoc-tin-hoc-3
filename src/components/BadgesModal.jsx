import React from 'react';
import { BADGES } from '../data';
import { sounds } from '../utils/audio';
import { Trophy, X, Star, CheckCircle, Lock } from 'lucide-react';
import BeBitRobot from './BeBitRobot';

export default function BadgesModal({ progress, onClose }) {
  const unlockedCount = BADGES.filter(b => b.requirement(progress)).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(51, 45, 75, 0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="card-3d"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', borderBottom: '2px dashed #ede9fe', paddingBottom: '16px' }}>
          <BeBitRobot mood="proud" size="small" screenText="🏆" />
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#4c1d95', margin: 0 }}>
              Bộ Sưu Tập Huy Hiệu Danh Giá
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              Đã mở khóa: <strong>{unlockedCount} / {BADGES.length}</strong> huy hiệu vinh danh học tập
            </p>
          </div>
        </div>

        {/* Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {BADGES.map((badge) => {
            const isUnlocked = badge.requirement(progress);

            return (
              <div
                key={badge.id}
                style={{
                  background: isUnlocked ? '#ffffff' : '#f8fafc',
                  border: isUnlocked ? `2px solid ${badge.color}` : '2px dashed #cbd5e1',
                  borderRadius: '18px',
                  padding: '16px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  opacity: isUnlocked ? 1 : 0.65,
                  boxShadow: isUnlocked ? `0 6px 16px ${badge.color}22` : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: isUnlocked ? '#fdf4ff' : '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {badge.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: isUnlocked ? '#1e293b' : '#64748b' }}>
                      {badge.name}
                    </h3>
                    {isUnlocked ? (
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <CheckCircle size={12} /> Đạt được
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Lock size={12} /> Chưa mở
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', marginBottom: '6px' }}>
                    {badge.desc}
                  </p>

                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: badge.color }}>
                    +{badge.xp} Điểm kinh nghiệm XP
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            className="btn-bouncy"
            onClick={onClose}
            style={{
              background: '#8b5cf6',
              color: '#ffffff',
              border: 'none',
              padding: '10px 28px',
              borderRadius: '14px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
