import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, clampTween } from '../components/Transitions.jsx';

// Candlestick chart that draws left to right, with an upward trend arrow and a counter
const CANDLES = 26;
const X0 = 220;
const X1 = 1500;
const BASE_Y = 880;
const TOP_Y = 360;
const CW = 28;

// Deterministic price path: rising trend with wiggles
const candles = Array.from({ length: CANDLES }, (_, i) => {
  const trend = i * 3.2;
  const wig = Math.sin(i * 1.7) * 9 + Math.sin(i * 0.6) * 6;
  const open = 30 + trend + wig;
  const close = open + Math.sin(i * 2.3) * 7 + 4;
  const high = Math.max(open, close) + 5 + Math.abs(Math.sin(i * 3.1)) * 6;
  const low = Math.min(open, close) - 5 - Math.abs(Math.cos(i * 2.9)) * 6;
  return { open, close, high, low };
});

const minV = Math.min(...candles.map((c) => c.low));
const maxV = Math.max(...candles.map((c) => c.high));
const yOf = (v) => BASE_Y - ((v - minV) / (maxV - minV)) * (BASE_Y - TOP_Y);
const xOf = (i) => X0 + (i / (CANDLES - 1)) * (X1 - X0);

export const G05_Growth = () => {
  const frame = useCurrentFrame();
  const drawn = clampTween(frame, [30, 300], [0, CANDLES]);
  const pct = Math.round(clampTween(frame, [240, 420], [0, 128]));
  const arrowP = clampTween(frame, [300, 420], [0, 1]);

  return (
    <CameraStage background="#041109" zoom={[0.97, 1.04]} rotateY={[-4, 4]} perspective={2400}>
      <Background base="#041109" glowA="rgba(34,197,94,0.2)" glowB="rgba(250,204,21,0.1)" gridColor="rgba(34,197,94,0.05)" />

      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`}>
        {/* Horizontal guides */}
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1={X0 - 40} x2={X1 + 40} y1={BASE_Y - g * ((BASE_Y - TOP_Y) / 3)} y2={BASE_Y - g * ((BASE_Y - TOP_Y) / 3)} stroke="rgba(148,163,184,0.12)" strokeWidth={2} />
        ))}

        {candles.map((c, i) => {
          const vis = Math.max(0, Math.min(1, drawn - i));
          if (vis <= 0) return null;
          const up = c.close >= c.open;
          const color = up ? '#22c55e' : '#ef4444';
          const top = yOf(Math.max(c.open, c.close));
          const bottom = yOf(Math.min(c.open, c.close));
          const h = Math.max(6, bottom - top);
          return (
            <g key={i} opacity={vis}>
              <line x1={xOf(i)} x2={xOf(i)} y1={yOf(c.high)} y2={yOf(c.low)} stroke={color} strokeWidth={4} />
              <rect x={xOf(i) - CW / 2} y={top} width={CW} height={h * vis} rx={4} fill={color} />
            </g>
          );
        })}

        {/* Trend arrow rising across the chart */}
        <path
          d={`M ${X0} ${BASE_Y - 40} L ${X1 - 40} ${TOP_Y + 80}`}
          fill="none"
          stroke="#facc15"
          strokeWidth={8}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${arrowP * 100} 100`}
        />
        {arrowP > 0.95 && <polygon points={`${X1 - 40},${TOP_Y + 80} ${X1 - 80},${TOP_Y + 84} ${X1 - 64},${TOP_Y + 120}`} fill="#facc15" />}
      </svg>

      <div style={{ position: 'absolute', left: 1480, top: 240, fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 130, color: '#4ade80' }}>
        +{pct}%
      </div>

      <Particles color="#bbf7d0" count={40} seed={61} speed={0.6} minSize={2} maxSize={5} />

      <Caption title="STEADY GROWTH" subtitle="Consistent results, quarter after quarter" accent="#22c55e" x={140} y={100} />
    </CameraStage>
  );
};
