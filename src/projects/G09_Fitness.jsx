import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, clampTween } from '../components/Transitions.jsx';

// Three activity rings fill in turn, with step and calorie counters ticking up
const CX = 760;
const CY = 560;
const RINGS = [
  { r: 260, color: '#f43f5e', label: 'MOVE', target: 82 },
  { r: 200, color: '#84cc16', label: 'EXERCISE', target: 64 },
  { r: 140, color: '#38bdf8', label: 'STAND', target: 90 },
];

export const G09_Fitness = () => {
  const frame = useCurrentFrame();
  const steps = Math.round(clampTween(frame, [30, 300], [0, 8421]));
  const kcal = Math.round(clampTween(frame, [30, 300], [0, 612]));

  return (
    <CameraStage background="#0a0a0f" zoom={[0.96, 1.04]} rotateX={[3, -3]} perspective={2400}>
      <Background base="#0a0a0f" glowA="rgba(244,63,94,0.16)" glowB="rgba(132,204,22,0.12)" gridColor="rgba(255,255,255,0.03)" />

      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
        {RINGS.map((ring, i) => {
          const p = clampTween(frame, [30 + i * 40, 150 + i * 40], [0, ring.target]);
          return (
            <g key={ring.label} transform={`rotate(-90 ${CX} ${CY})`}>
              <circle cx={CX} cy={CY} r={ring.r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={46} />
              <circle
                cx={CX}
                cy={CY}
                r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth={46}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={`${p} 100`}
              />
            </g>
          );
        })}
      </svg>

      {/* Ring legend */}
      {RINGS.map((ring, i) => (
        <div key={ring.label} style={{ position: 'absolute', left: 1180, top: 330 + i * 110, fontFamily: 'Arial, sans-serif', color: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: ring.color }} />
            <div style={{ fontSize: 40, fontWeight: 800 }}>{ring.label}</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: ring.color }}>{ring.target}%</div>
          </div>
        </div>
      ))}

      <div style={{ position: 'absolute', left: 1180, top: 700, fontFamily: 'Arial, sans-serif', color: '#f8fafc' }}>
        <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: 2 }}>{steps.toLocaleString('en-US')}</div>
        <div style={{ fontSize: 40, color: '#94a3b8', letterSpacing: 3 }}>STEPS TODAY · {kcal} KCAL</div>
      </div>

      <Particles color="#fda4af" count={40} seed={111} speed={0.6} minSize={2} maxSize={5} />

      <Caption title="ACTIVE EVERY DAY" subtitle="Track your move, exercise and stand goals" accent="#f43f5e" x={140} y={100} />
    </CameraStage>
  );
};
