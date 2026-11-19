import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background.jsx';
import { Particles } from '../components/Particles.jsx';
import { CameraStage, DESIGN_W, DESIGN_H } from '../components/Camera.jsx';
import { Caption, clampTween } from '../components/Transitions.jsx';

// An open book whose pages turn, with floating letters and a graduation cap that drops in
const FLOATERS = ['A', 'B', 'C', '1', '2', '3', 'ABC', '∑', 'π', 'Hi!'];

export const G07_Learn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bookIn = spring({ frame, fps, config: { damping: 18 } });
  const flip = clampTween(frame, [90, 210], [0, 180]);
  const capIn = spring({ frame: Math.max(0, frame - 240), fps, config: { damping: 9, stiffness: 110 } });

  return (
    <CameraStage background="#0f0a1f" zoom={[0.95, 1.05]} rotateY={[-6, 6]} perspective={2000}>
      <Background base="#0f0a1f" glowA="rgba(129,140,248,0.22)" glowB="rgba(250,204,21,0.12)" gridColor="rgba(129,140,248,0.05)" />

      {/* Floating symbols */}
      {FLOATERS.map((t, i) => {
        const x = 200 + ((i * 173) % 1500);
        const y = 200 + ((i * 97) % 700);
        const bob = Math.sin(frame / 25 + i) * 18;
        return (
          <div
            key={t + i}
            style={{
              position: 'absolute',
              left: x,
              top: y + bob,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 800,
              fontSize: 64 + (i % 3) * 16,
              color: i % 2 ? '#c4b5fd' : '#fde68a',
              opacity: 0.35 * bookIn,
            }}
          >
            {t}
          </div>
        );
      })}

      {/* Open book: left page stays, right page turns over */}
      <div style={{ position: 'absolute', left: DESIGN_W / 2 - 520, top: 330, width: 1040, height: 460, opacity: bookIn, transform: `scale(${0.9 + 0.1 * bookIn})` }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 520, height: 460, borderRadius: '24px 0 0 24px', background: 'linear-gradient(135deg,#f5f3ff,#ddd6fe)' }} />
        <div style={{ position: 'absolute', left: 520, top: 0, width: 520, height: 460, borderRadius: '0 24px 24px 0', background: '#ede9fe' }} />
        <div style={{ position: 'absolute', left: 520 - 6, top: 0, width: 12, height: 460, background: '#6d28d9' }} />
        {/* Turning page */}
        <div
          style={{
            position: 'absolute',
            left: 520,
            top: 0,
            width: 520,
            height: 460,
            borderRadius: '0 24px 24px 0',
            background: 'linear-gradient(135deg,#faf5ff,#e9d5ff)',
            transformOrigin: 'left center',
            transform: `rotateY(${-flip}deg)`,
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Text lines on the left page */}
        {[0, 1, 2, 3, 4].map((k) => (
          <div key={k} style={{ position: 'absolute', left: 80, top: 90 + k * 60, width: 360 - (k % 2) * 80, height: 14, borderRadius: 7, background: 'rgba(109,40,217,0.35)' }} />
        ))}
      </div>

      {/* Graduation cap drops in */}
      <div style={{ position: 'absolute', left: DESIGN_W / 2 - 170, top: 180 + (1 - capIn) * -160, transform: `rotate(${-8 * (1 - capIn)}deg)`, opacity: clampTween(capIn, [0, 1], [0, 1]) }}>
        <div style={{ width: 340, height: 110, background: '#1e1b4b', clipPath: 'polygon(0 40%, 50% 0, 100% 40%, 50% 80%)', borderRadius: 6 }} />
        <div style={{ width: 200, height: 90, margin: '-40px auto 0', background: '#312e81', borderRadius: '0 0 40px 40px' }} />
        <div style={{ position: 'absolute', left: 300, top: 60, width: 4, height: 110, background: '#facc15' }} />
        <div style={{ position: 'absolute', left: 292, top: 166, width: 20, height: 20, borderRadius: '50%', background: '#facc15' }} />
      </div>

      <Particles color="#c4b5fd" count={45} seed={91} speed={0.6} minSize={2} maxSize={6} />

      <Caption title="LEARN ANYTHING" subtitle="Courses, skills and certificates for everyone" accent="#a78bfa" x={140} y={100} />
    </CameraStage>
  );
};
