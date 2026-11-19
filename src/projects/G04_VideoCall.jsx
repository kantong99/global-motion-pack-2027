import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption } from '../components/Transitions.jsx';

// Team video call grid: tiles appear in turn, one speaker glows, mics toggle
const PEOPLE = [
  { name: 'Ana', color: '#f472b6' },
  { name: 'Ben', color: '#60a5fa' },
  { name: 'Chloe', color: '#34d399' },
  { name: 'Dev', color: '#fbbf24' },
  { name: 'Eva', color: '#a78bfa' },
  { name: 'Finn', color: '#fb7185' },
];

const TILE_W = 480;
const TILE_H = 270;
const GAP = 30;
const GRID_W = 3 * TILE_W + 2 * GAP;
const GRID_X = (DESIGN_W - GRID_W) / 2;
const GRID_Y = 300;

export const G04_VideoCall = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const speaker = Math.floor(frame / 90) % PEOPLE.length;
  const muteFlip = Math.floor(frame / 75);

  return (
    <CameraStage background="#0b1020" zoom={[0.97, 1.03]} rotateX={[2, -2]} perspective={2400}>
      <Background base="#0b1020" glowA="rgba(96,165,250,0.18)" glowB="rgba(167,139,250,0.14)" gridColor="rgba(96,165,250,0.04)" />

      <div style={{ position: 'absolute', left: GRID_X, top: 230, width: GRID_W, height: 40, fontFamily: 'Arial, sans-serif', color: '#cbd5e1', fontSize: 30, letterSpacing: 3 }}>
        TEAM SYNC · 6 participants
      </div>

      {PEOPLE.map((p, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = GRID_X + col * (TILE_W + GAP);
        const y = GRID_Y + row * (TILE_H + GAP);
        const s = spring({ frame: Math.max(0, frame - i * 12), fps, config: { damping: 16 } });
        const active = i === speaker;
        const muted = (muteFlip + i) % 3 === 0;
        const ring = 0.5 + 0.5 * Math.sin(frame / 8);
        return (
          <div
            key={p.name}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: TILE_W,
              height: TILE_H,
              borderRadius: 24,
              background: 'linear-gradient(160deg,#1e293b,#0f172a)',
              border: `${active ? 6 : 2}px solid ${active ? '#38bdf8' : 'rgba(148,163,184,0.25)'}`,
              boxShadow: active ? `0 0 ${40 + ring * 30}px rgba(56,189,248,0.5)` : 'none',
              opacity: s,
              transform: `scale(${0.9 + 0.1 * s})`,
              overflow: 'hidden',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {/* Abstract avatar: head and shoulders */}
            <div style={{ position: 'absolute', left: TILE_W / 2 - 60, top: 40, width: 120, height: 120, borderRadius: '50%', background: p.color }} />
            <div style={{ position: 'absolute', left: TILE_W / 2 - 110, top: 175, width: 220, height: 130, borderRadius: '110px 110px 0 0', background: p.color, opacity: 0.8 }} />
            <div style={{ position: 'absolute', left: 20, bottom: 16, color: '#f8fafc', fontSize: 30, fontWeight: 700 }}>{p.name}</div>
            <div
              style={{
                position: 'absolute',
                right: 16,
                bottom: 14,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: muted ? '#7f1d1d' : '#14532d',
                color: '#fff',
                fontSize: 22,
                lineHeight: '40px',
                textAlign: 'center',
              }}
            >
              {muted ? 'x' : 'on'}
            </div>
          </div>
        );
      })}

      <Caption title="STAY CONNECTED" subtitle="Meetings that feel close, from anywhere" accent="#60a5fa" x={140} y={100} />
    </CameraStage>
  );
};
