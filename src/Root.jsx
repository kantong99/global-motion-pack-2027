import React from 'react';
import { Composition } from 'remotion';
import { DURATION, FPS } from './components/Transitions.jsx';
import { G01_ZeroWaste } from './projects/G01_ZeroWaste.jsx';
import { G02_Telehealth } from './projects/G02_Telehealth.jsx';
import { G03_SaleTag } from './projects/G03_SaleTag.jsx';
import { G04_VideoCall } from './projects/G04_VideoCall.jsx';
import { G05_Growth } from './projects/G05_Growth.jsx';
import { G06_Travel } from './projects/G06_Travel.jsx';
import { G07_Learn } from './projects/G07_Learn.jsx';
import { G08_Coffee } from './projects/G08_Coffee.jsx';
import { G09_Fitness } from './projects/G09_Fitness.jsx';
import { G10_ThankYou } from './projects/G10_ThankYou.jsx';

// Final 4K composition. Preview mode overrides --width/--height at render time.
const WIDTH = 3840;
const HEIGHT = 2160;

// IDs may only contain a-z, A-Z, 0-9 and hyphens (-)
export const COMPOSITIONS = [
  { id: 'G01-ZeroWaste', component: G01_ZeroWaste },
  { id: 'G02-Telehealth', component: G02_Telehealth },
  { id: 'G03-SaleTag', component: G03_SaleTag },
  { id: 'G04-VideoCall', component: G04_VideoCall },
  { id: 'G05-Growth', component: G05_Growth },
  { id: 'G06-Travel', component: G06_Travel },
  { id: 'G07-Learn', component: G07_Learn },
  { id: 'G08-Coffee', component: G08_Coffee },
  { id: 'G09-Fitness', component: G09_Fitness },
  { id: 'G10-ThankYou', component: G10_ThankYou },
];

export const RemotionRoot = () => (
  <>
    {COMPOSITIONS.map(({ id, component }) => (
      <Composition
        key={id}
        id={id}
        component={component}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    ))}
  </>
);
