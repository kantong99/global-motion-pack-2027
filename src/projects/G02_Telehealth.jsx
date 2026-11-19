import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, clampTween } from '../components/Transitions.jsx';

// Vitals monitor with a scrolling ECG trace, plus a rotating capsule
const PANEL = { x: 260, y: 300, w: 980, h: 500 };

const ecgY = (x, shift) => {
  // One heartbeat every 150 px, shifted over time
  const p = (((x + shift) % 150) + 150) % 150 / 150;
  const spike = -150 * Math.exp(-Math.pow((p - 0.42) / 0.015, 2)) + 40 * Math.exp(-Math.pow((p - 0.5) / 0.04, 2));
  return PANEL.y + PANEL.h / 2 + spike * 0.7;
};

const trace = (shift) => {
  const pts = [];
  for (let x = PANEL.x + 20; x <= PANEL.x + PANEL.w - 20; x += 5) {
    pts.push(`${x},${ecgY(x, shift).toFixed(1)}`);
  }
  return pts.join(' ');
};

export const G02_Telehealth = () => {
  const frame = useCurrentFrame();
  const panelIn = clampTween(frame, [0, 40], [0, 1]);
  const bpm = Math.round(clampTween(frame, [30, 150], [40, 72]));
  const spo2 = Math.round(clampTween(frame, [60, 180], [88, 98]));
  const shift = frame * 6;
  const capsuleRot = frame * 1.2;

  return (
    <CameraStage background="#031825" zoom={[0.97, 1.05]} rotateY={[-4, 4]} perspective={2200}>
      <Background base="#031825" glowA="rgba(45,212,191,0.2)" glowB="rgba(56,189,248,0.16)" gridColor="rgba(45,212,191,0.05)" />

      <div
        style={{
          position: 'absolute',
          left: PANEL.x,
          top: PANEL.y,
          width: PANEL.w,
          height: PANEL.h,
          borderRadius: 28,
          background: 'rgba(2,20,30,0.85)',
          border: '2px solid rgba(45,212,191,0.4)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          opacity: panelIn,
          overflow: 'hidden',
        }}
      >
        <svg style={{ position: 'absolute', left: 0, top: 0 }} width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
          <polyline points={trace(shift)} fill="none" stroke="#5eead4" strokeWidth={6} strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', left: PANEL.x + 40, top: PANEL.y + 30, fontFamily: 'Arial, sans-serif', color: '#99f6e4', fontSize: 30, letterSpacing: 4, opacity: panelIn }}>
        HEART RATE
      </div>
      <div style={{ position: 'absolute', left: PANEL.x + 40, top: PANEL.y + 70, fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 120, color: '#f0fdfa', opacity: panelIn }}>
        {bpm} <span style={{ fontSize: 40, color: '#5eead4' }}>BPM</span>
      </div>
      <div style={{ position: 'absolute', left: PANEL.x + PANEL.w - 360, top: PANEL.y + 70, fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 120, color: '#7dd3fc', opacity: panelIn }}>
        {spo2}<span style={{ fontSize: 40 }}>%</span>
      </div>

      {/* Capsule that rotates slowly */}
      <div
        style={{
          position: 'absolute',
          left: 1520,
          top: 380,
          width: 260,
          height: 110,
          borderRadius: 60,
          overflow: 'hidden',
          transform: `rotate(${capsuleRot}deg)`,
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          opacity: clampTween(frame, [60, 100], [0, 1]),
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', background: 'linear-gradient(135deg,#2dd4bf,#0f766e)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, width: '50%', height: '100%', background: '#f8fafc' }} />
      </div>

      <Caption title="TELEHEALTH" subtitle="Care from home · Real-time vitals" accent="#2dd4bf" x={140} y={100} />
    </CameraStage>
  );
};
