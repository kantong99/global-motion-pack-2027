import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, Label, clampTween } from '../components/Transitions.jsx';

// A coffee cup that fills from the bottom, with steam curling upward
const CUP = { x: 960, y: 560, w: 420, h: 380 };
const CUP_TOP = CUP.y - CUP.h / 2;
const CUP_BOTTOM = CUP.y + CUP.h / 2;

const steamPath = (offset, phase) => {
  const pts = [];
  for (let k = 0; k <= 40; k++) {
    const t = k / 40;
    const y = CUP_TOP - 30 - t * 260;
    const x = CUP.x + offset + Math.sin(t * 6 + phase) * (30 + t * 30);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M ${pts.join(' L ')}`;
};

export const G08_Coffee = () => {
  const frame = useCurrentFrame();
  const fill = clampTween(frame, [30, 180], [0, 1]);
  const liquidTop = CUP_BOTTOM - fill * (CUP.h - 40);
  const steamOpacity = clampTween(frame, [150, 200], [0, 1]);

  return (
    <CameraStage background="#120a06" zoom={[0.96, 1.05]} rotateY={[-4, 4]} perspective={2200}>
      <Background base="#120a06" glowA="rgba(251,146,60,0.2)" glowB="rgba(180,83,9,0.18)" gridColor="rgba(251,146,60,0.04)" />

      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
        <defs>
          <clipPath id="cupClip">
            <path d={`M ${CUP.x - CUP.w / 2} ${CUP_TOP} L ${CUP.x + CUP.w / 2} ${CUP_TOP} L ${CUP.x + CUP.w / 2 - 50} ${CUP_BOTTOM} L ${CUP.x - CUP.w / 2 + 50} ${CUP_BOTTOM} Z`} />
          </clipPath>
          <linearGradient id="coffeeG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>

        {/* Saucer */}
        <ellipse cx={CUP.x} cy={CUP_BOTTOM + 14} rx={CUP.w / 2 + 40} ry={26} fill="#f5f5f4" />

        {/* Cup body with coffee filling it */}
        <path d={`M ${CUP.x - CUP.w / 2} ${CUP_TOP} L ${CUP.x + CUP.w / 2} ${CUP_TOP} L ${CUP.x + CUP.w / 2 - 50} ${CUP_BOTTOM} L ${CUP.x - CUP.w / 2 + 50} ${CUP_BOTTOM} Z`} fill="#fafaf9" />
        <g clipPath="url(#cupClip)">
          <rect x={CUP.x - CUP.w / 2} y={liquidTop} width={CUP.w} height={CUP_BOTTOM - liquidTop} fill="url(#coffeeG)" />
          <ellipse cx={CUP.x} cy={liquidTop} rx={CUP.w / 2 - 6} ry={14} fill="#b45309" opacity={fill} />
        </g>

        {/* Handle */}
        <path d={`M ${CUP.x + CUP.w / 2 - 10} ${CUP.y - 90} C ${CUP.x + CUP.w / 2 + 120} ${CUP.y - 110}, ${CUP.x + CUP.w / 2 + 120} ${CUP.y + 100}, ${CUP.x + CUP.w / 2 - 20} ${CUP.y + 80}`} fill="none" stroke="#fafaf9" strokeWidth={34} strokeLinecap="round" />

        {/* Steam */}
        {[-90, 0, 90].map((o, i) => (
          <path key={o} d={steamPath(o, frame / 14 + i)} fill="none" stroke="rgba(254,243,199,0.55)" strokeWidth={12} strokeLinecap="round" opacity={steamOpacity} />
        ))}
      </svg>

      <Label text="ESPRESSO" x={CUP.x + 280} y={CUP.y - 40} color="#fed7aa" delay={60} width={140} />

      <Particles color="#fde68a" count={30} seed={101} speed={0.4} minSize={2} maxSize={5} />

      <Caption title="COFFEE BREAK" subtitle="A small pause, brewed fresh" accent="#fb923c" x={140} y={100} />
    </CameraStage>
  );
};
