import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, Label, clampTween } from '../components/Transitions.jsx';

// A recycling loop drawn as three arrow arcs that chase each other around a ring
const CX = DESIGN_W / 2;
const CY = DESIGN_H / 2;
const R = 250;

const LEAVES = Array.from({ length: 6 }, (_, i) => ({
  a: (i / 6) * Math.PI * 2,
  size: 26 + (i % 3) * 8,
}));

export const G01_ZeroWaste = () => {
  const frame = useCurrentFrame();
  const draw = clampTween(frame, [20, 110], [0, 1]);
  const spin = frame * 0.9;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 18);

  return (
    <CameraStage background="#041a14" zoom={[0.94, 1.06]} rotateY={[-5, 5]} perspective={2200}>
      <Background base="#041a14" glowA="rgba(74,222,128,0.22)" glowB="rgba(45,212,191,0.16)" gridColor="rgba(74,222,128,0.05)" />

      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
        <defs>
          <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>

        <g transform={`rotate(${spin} ${CX} ${CY})`}>
          {/* Three arc segments with gaps form the recycling loop */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="url(#loopGrad)"
              strokeWidth={34}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${28 * draw} 100`}
              strokeDashoffset={-i * 33.3}
              transform={`rotate(${i * 120} ${CX} ${CY})`}
            />
          ))}
        </g>

        {/* Leaves orbit the loop */}
        {LEAVES.map((l, i) => {
          const a = l.a + frame * 0.012;
          const x = CX + Math.cos(a) * (R + 110);
          const y = CY + Math.sin(a) * (R + 110);
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`} opacity={draw}>
              <path d={`M 0 ${-l.size} Q ${l.size} 0 0 ${l.size} Q ${-l.size} 0 0 ${-l.size} Z`} fill="#bbf7d0" opacity={0.85} />
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={140 + pulse * 6} fill="rgba(74,222,128,0.08)" />
      </svg>

      <div style={{ position: 'absolute', left: 0, top: 470, width: DESIGN_W, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 92, letterSpacing: 6, color: '#f0fdf4', opacity: draw }}>
        ZERO WASTE
      </div>

      <Particles color="#86efac" count={70} seed={11} speed={0.7} minSize={2} maxSize={7} />

      <Caption title="REDUCE · REUSE · RECYCLE" subtitle="A simple habit for a cleaner planet" accent="#4ade80" x={140} y={100} titleSize={72} />
      <Label text="RECYCLE" x={1280} y={840} color="#bbf7d0" delay={120} width={160} />
    </CameraStage>
  );
};
