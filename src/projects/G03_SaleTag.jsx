import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage } from '../components/Camera.jsx';
import { Caption, clampTween } from '../components/Transitions.jsx';

// Product cards pop in one by one, a discount badge spins, and the cart counter ticks up
const PRODUCTS = [
  { name: 'Sneakers', price: 89, color: '#f97316' },
  { name: 'Headphones', price: 129, color: '#8b5cf6' },
  { name: 'Smart Watch', price: 199, color: '#06b6d4' },
];

export const G03_SaleTag = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 8, stiffness: 120 } });
  const cartCount = Math.min(3, Math.floor(clampTween(frame, [120, 360], [0, 3.99])));
  const cartBump = spring({ frame: Math.max(0, frame - 120 - cartCount * 40), fps, config: { damping: 10 } });

  return (
    <CameraStage background="#14080a" zoom={[0.96, 1.05]} rotateY={[-5, 5]} perspective={2200}>
      <Background base="#14080a" glowA="rgba(249,115,22,0.22)" glowB="rgba(168,85,247,0.14)" gridColor="rgba(249,115,22,0.05)" />

      {PRODUCTS.map((p, i) => {
        const s = spring({ frame: Math.max(0, frame - 30 - i * 25), fps, config: { damping: 14, stiffness: 120 } });
        const x = 230 + i * 520;
        return (
          <div
            key={p.name}
            style={{
              position: 'absolute',
              left: x,
              top: 360 + (1 - s) * 120,
              width: 440,
              height: 480,
              borderRadius: 36,
              background: 'linear-gradient(160deg, #1f1d24, #0f0e12)',
              border: `3px solid ${p.color}`,
              boxShadow: `0 30px 80px ${p.color}55`,
              opacity: s,
              transform: `scale(${0.85 + 0.15 * s})`,
              fontFamily: 'Arial, sans-serif',
              color: '#fafafa',
            }}
          >
            <div style={{ position: 'absolute', left: 60, top: 60, width: 320, height: 240, borderRadius: 28, background: p.color, opacity: 0.85 }} />
            <div style={{ position: 'absolute', left: 40, top: 330, fontSize: 52, fontWeight: 800 }}>{p.name}</div>
            <div style={{ position: 'absolute', left: 40, top: 395, fontSize: 44, fontWeight: 700, color: p.color }}>${p.price}</div>
          </div>
        );
      })}

      {/* Sale badge that spins in */}
      <div
        style={{
          position: 'absolute',
          left: 1420,
          top: 180,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fde68a, #f59e0b 60%, #b45309)',
          boxShadow: '0 20px 60px rgba(245,158,11,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 900,
          fontSize: 92,
          color: '#451a03',
          transform: `rotate(${(1 - badge) * -360}deg) scale(${badge})`,
        }}
      >
        -40%
      </div>

      {/* Cart counter */}
      <div
        style={{
          position: 'absolute',
          left: 1480,
          top: 820,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 800,
          fontSize: 56,
          color: '#fafafa',
          transform: `scale(${1 + 0.15 * cartBump})`,
        }}
      >
        CART ({cartCount})
      </div>

      <Particles color="#fdba74" count={50} seed={33} speed={0.8} minSize={2} maxSize={6} />

      <Caption title="SUMMER SALE" subtitle="Limited-time offers on top picks" accent="#f97316" x={140} y={100} />
    </CameraStage>
  );
};
