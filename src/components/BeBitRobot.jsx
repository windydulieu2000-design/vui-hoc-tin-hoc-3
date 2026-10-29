import React from 'react';
import { sounds } from '../utils/audio';

export default function BeBitRobot({
  mood = 'welcome', // 'welcome' | 'thinking' | 'celebrating' | 'encouraging' | 'surprised' | 'proud' | 'happy' | 'sad'
  bubble = null,
  size = 'medium',
  screenText = null,
  onClick = null,
}) {
  const scale = size === 'small' ? 0.75 : size === 'large' ? 1.25 : size === 'xl' ? 1.5 : 1;

  // Default chest screen text based on emotional mood
  const defaultScreen = {
    welcome: '✨',
    happy: '❤️',
    thinking: '❓',
    celebrating: '🎉',
    encouraging: '💪',
    sad: '💧',
    surprised: '⚡',
    proud: '⭐',
  }[mood] || '❤️';

  const displayScreen = screenText !== null ? screenText : defaultScreen;

  const handleClick = () => {
    sounds.playClick();
    if (onClick) onClick();
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        margin: '8px',
      }}
    >
      {/* Speech bubble */}
      {bubble && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '2px solid #c4b5fd',
            borderRadius: '16px',
            padding: '8px 14px',
            color: '#4c1d95',
            fontSize: size === 'small' ? '12px' : '14px',
            fontWeight: '600',
            maxWidth: '260px',
            textAlign: 'center',
            marginBottom: '10px',
            boxShadow: '0 6px 18px rgba(139, 92, 246, 0.12)',
            position: 'relative',
            animation: 'fadeIn 0.25s ease-out',
            zIndex: 10,
          }}
        >
          {bubble}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '8px solid #ffffff',
            }}
          />
        </div>
      )}

      {/* Robot container */}
      <div
        className={`be-bit-robot ${mood}`}
        style={{
          transform: `scale(${scale})`,
          cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={handleClick}
        title="Bé Bít - Bạn đồng hành Tin học 3"
      >
        {/* Antenna */}
        <div className="be-bit-antenna">
          <div className="be-bit-antenna-ball" />
        </div>

        {/* Head */}
        <div className="be-bit-head">
          <div className="be-bit-ear left" />
          <div className="be-bit-ear right" />

          {/* Face screen */}
          <div className="be-bit-face">
            <div className="be-bit-eyes">
              <div className="be-bit-eye" />
              <div className="be-bit-eye" />
            </div>
            <div className="be-bit-mouth" />
            <div className="be-bit-cheeks">
              <div className="be-bit-cheek" />
              <div className="be-bit-cheek" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="be-bit-body">
          <div className="be-bit-arm left" />
          <div className="be-bit-arm right" />
          <div className="be-bit-screen">
            <span>{displayScreen}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
