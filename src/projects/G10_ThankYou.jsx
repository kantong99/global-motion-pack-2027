import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { clampTween } from '../components/Transitions.jsx';

// "THANK YOU" with letters that bounce in, and hearts rising through a warm glow
const WORD = 'THANK YOU'.split('');

const HEART = 'M 0 -18 C -18 -40, -52 -18, -52 8 C -52 36, -20 52, 0 66 C 20 52, 52 36, 52 8 C 52 -18, 18 -40, 0 -18 Z';

const HEARTS = Array.from({ length: 16 }, (_, i) => ({
  x: 120 + ((i * 113) % 1680),
  speed: 1.5 + (i % 5) * 0.4,
  offset: (i * 137) % 1200,
  size: 0.5 + (i % 4) * 0.25,
  sway: 18 + (i % 3) * 14,
}));

export const G10_ThankYou = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const subIn = clampTween(frame, [180, 240], [0, 1]);
  const outro = clampTween(frame, [630, 720], [1, 0]);

  return (
    <CameraStage background="#2a0b14" zoom={[0.95, 1.05]} rotateY={[-4, 4]} perspective={2200}>
      <Background base="#2a0b14" glowA="rgba(251,113,133,0.28)" glowB="rgba(251,191,36,0.14)" gridColor="rgba(251,113,133,0.04)" />

      {HEARTS.map((h, i) => {
        const y = 1200 - ((frame * h.speed + h.offset) % 1400);
        const x = h.x + Math.sin(frame / 40 + i) * h.sway;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${Math.sin(frame / 30 + i) * 20}) scale(${h.size})`} opacity={0.75 * outro}>
            <path d={HEART} fill={i % 2 ? '#fb7185' : '#fda4af'} />
          </g>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 380,
          width: DESIGN_W,
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 900,
          fontSize: 200,
          letterSpacing: 6,
          color: '#fef3c7',
          opacity: outro,
          textShadow: '0 0 80px rgba(251,191,36,0.5)',
        }}
      >
        {WORD.map((ch, i) => {
          const s = spring({ frame: Math.max(0, frame - 20 - i * 5), fps, config: { damping: 12, stiffness: 160 } });
          return (
            <span key={i} style={{ display: 'inline-block', transform: `translateY(${(1 - s) * -120}px) scale(${0.6 + 0.4 * s})`, opacity: s, whiteSpace: 'pre' }}>
              {ch}
            </span>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 650,
          width: DESIGN_W,
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: 56,
          letterSpacing: 6,
          color: '#fecdd3',
          opacity: subIn * outro,
        }}
      >
        For your trust, your time, and your support
      </div>
    </CameraStage>
  );
};
