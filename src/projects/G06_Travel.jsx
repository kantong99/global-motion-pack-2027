import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, Label, clampTween } from '../components/Transitions.jsx';

// A wireframe globe that turns while a flight arc draws between two cities
const CX = 960;
const CY = 620;
const R = 360;
const A = { x: CX - 230, y: CY - 130, label: 'TOKYO' };
const B = { x: CX + 250, y: CY + 60, label: 'LONDON' };
// Control point lifts the arc above the globe surface
const C = { x: (A.x + B.x) / 2, y: Math.min(A.y, B.y) - 320 };

const quad = (t) => {
  const u = 1 - t;
  return {
    x: u * u * A.x + 2 * u * t * C.x + t * t * B.x,
    y: u * u * A.y + 2 * u * t * C.y + t * t * B.y,
  };
};

export const G06_Travel = () => {
  const frame = useCurrentFrame();
  const rot = frame * 0.35;
  const arc = clampTween(frame, [60, 240], [0, 1]);
  const planeT = clampTween(frame, [60, 240], [0, 1]);
  const plane = quad(planeT);
  const planeAngle = (Math.atan2(2 * (1 - planeT) * (C.y - A.y) + 2 * planeT * (B.y - C.y), 2 * (1 - planeT) * (C.x - A.x) + 2 * planeT * (B.x - C.x)) * 180) / Math.PI;

  return (
    <CameraStage background="#020818" zoom={[0.96, 1.05]} rotateY={[-6, 6]} perspective={2400}>
      <Background base="#020818" glowA="rgba(56,189,248,0.2)" glowB="rgba(251,191,36,0.1)" gridColor="rgba(56,189,248,0.04)" />

      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
        <defs>
          <radialGradient id="globeFill" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.25)" />
            <stop offset="100%" stopColor="rgba(2,8,24,0.9)" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R} fill="url(#globeFill)" stroke="rgba(125,211,252,0.6)" strokeWidth={4} />

        {/* Meridians: ellipses whose width changes as the globe turns */}
        {[0, 1, 2, 3, 4].map((k) => {
          const a = (k / 5) * Math.PI + rot * (Math.PI / 180);
          const rx = Math.abs(Math.cos(a)) * R;
          return <ellipse key={`m-${k}`} cx={CX} cy={CY} rx={rx} ry={R} fill="none" stroke="rgba(125,211,252,0.35)" strokeWidth={2.5} />;
        })}
        {/* Parallels */}
        {[-0.5, 0, 0.5].map((f, k) => (
          <ellipse key={`p-${k}`} cx={CX} cy={CY + f * R} rx={Math.sqrt(1 - f * f) * R} ry={R * 0.12} fill="none" stroke="rgba(125,211,252,0.3)" strokeWidth={2} />
        ))}

        {/* Flight arc */}
        <path
          d={`M ${A.x} ${A.y} Q ${C.x} ${C.y} ${B.x} ${B.y}`}
          fill="none"
          stroke="#facc15"
          strokeWidth={6}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${arc * 100} 100`}
        />

        {/* City markers */}
        {[A, B].map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r={22} fill="rgba(250,204,21,0.2)" />
            <circle cx={c.x} cy={c.y} r={8} fill="#facc15" />
          </g>
        ))}

        {/* Plane that follows the arc and turns to match it */}
        <g transform={`translate(${plane.x} ${plane.y}) rotate(${planeAngle})`} opacity={clampTween(frame, [60, 80], [0, 1])}>
          <path d="M 16 0 L -12 -10 L -6 0 L -12 10 Z" fill="#fef9c3" />
        </g>
      </svg>

      <Label text={A.label} x={A.x - 170} y={A.y - 40} color="#fde68a" delay={20} width={80} />
      <Label text={B.label} x={B.x + 40} y={B.y - 40} color="#fde68a" delay={40} width={80} />

      <Particles color="#7dd3fc" count={60} seed={77} speed={0.5} minSize={2} maxSize={6} />

      <Caption title="ANYWHERE, EASILY" subtitle="Fly smarter with better routes" accent="#38bdf8" x={140} y={100} />
    </CameraStage>
  );
};
