import { forwardRef, useImperativeHandle, useRef } from 'react';

// A small stick figure drawn in SVG. Feet sit at (0, 0) and it faces right.
// Mood 0 is slumped with a cane and a frown; mood 4 is upright, arms raised, beaming.
export interface StickmanHandle {
  pose: (mood: number, phase: number, moving: boolean, t: number) => void;
}

const MOUTHS = [
  'M -4.5 5 Q 0 1 4.5 5',          // frown
  'M -4 3.5 L 4 3.5',              // flat
  'M -4.5 2.5 Q 0 5.5 4.5 2.5',    // small smile
  'M -5 2 Q 0 7 5 2',              // smile
  'M -5.5 1.5 Q 0 9 5.5 1.5 Z',    // big open smile
];
const LEAN = [20, 11, 5, 0, 0];      // degrees forward
const STRIDE = [16, 22, 26, 30, 30]; // leg swing in degrees

const limb = (len: number, deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: Math.sin(r) * len, y: Math.cos(r) * len };
};

export const Stickman = forwardRef<StickmanHandle, { className?: string }>(({ className }, ref) => {
  const upper = useRef<SVGGElement>(null);
  const legL = useRef<SVGLineElement>(null);
  const legR = useRef<SVGLineElement>(null);
  const armL = useRef<SVGLineElement>(null);
  const armR = useRef<SVGLineElement>(null);
  const mouth = useRef<SVGPathElement>(null);
  const cane = useRef<SVGLineElement>(null);
  const body = useRef<SVGGElement>(null);
  const brows = useRef<SVGGElement>(null);
  const last = useRef(-1);

  useImperativeHandle(ref, () => ({
    pose(mood, phase, moving, t) {
      const m = Math.max(0, Math.min(4, mood));
      const swing = moving ? Math.sin(phase) * STRIDE[m] : 0;
      const hipY = -24;
      const fl = limb(24, swing), fr = limb(24, -swing);
      legL.current?.setAttribute('x2', String(fl.x)); legL.current?.setAttribute('y2', String(hipY + fl.y));
      legR.current?.setAttribute('x2', String(fr.x)); legR.current?.setAttribute('y2', String(hipY + fr.y));

      const sh = -41;
      let al, ar;
      if (m === 4) {
        const wave = Math.sin(t * 6) * 10;
        al = limb(18, 205 + wave); ar = limb(18, 155 - wave);
      } else {
        al = limb(17, -swing * 1.1); ar = limb(17, swing * 1.1);
        if (m === 0) ar = limb(17, 28); // hand on the cane
      }
      armL.current?.setAttribute('x2', String(al.x)); armL.current?.setAttribute('y2', String(sh + al.y));
      armR.current?.setAttribute('x2', String(ar.x)); armR.current?.setAttribute('y2', String(sh + ar.y));

      upper.current?.setAttribute('transform', `rotate(${LEAN[m]} 0 ${hipY})`);
      const bob = moving ? Math.abs(Math.sin(phase)) * -2 : 0;
      const hop = m === 4 && !moving ? Math.max(0, Math.sin(t * 6)) * -7 : 0;
      body.current?.setAttribute('transform', `translate(0 ${bob + hop})`);

      if (last.current !== m) {
        last.current = m;
        mouth.current?.setAttribute('d', MOUTHS[m]);
        mouth.current?.setAttribute('fill', m === 4 ? '#14211f' : 'none');
        cane.current?.setAttribute('opacity', m === 0 ? '1' : '0');
        brows.current?.setAttribute('opacity', m === 0 ? '1' : '0');
      }
    },
  }), []);

  return (
    <g className={className}>
      <ellipse cx="0" cy="1" rx="14" ry="3.5" fill="#000" opacity="0.35" />
      <g ref={body}>
        <line ref={legL} x1="0" y1="-24" x2="0" y2="0" stroke="#f4efe6" strokeWidth="4.5" strokeLinecap="round" />
        <line ref={legR} x1="0" y1="-24" x2="0" y2="0" stroke="#f4efe6" strokeWidth="4.5" strokeLinecap="round" />
        <g ref={upper}>
          <line ref={cane} x1="7.5" y1="-27" x2="16" y2="0" stroke="#e8b04a" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="-24" x2="0" y2="-45" stroke="#f4efe6" strokeWidth="4.5" strokeLinecap="round" />
          <line ref={armL} x1="0" y1="-41" x2="0" y2="-24" stroke="#f4efe6" strokeWidth="4" strokeLinecap="round" />
          <line ref={armR} x1="0" y1="-41" x2="0" y2="-24" stroke="#f4efe6" strokeWidth="4" strokeLinecap="round" />
          <g transform="translate(0 -56)">
            <circle r="11" fill="#f4efe6" />
            <circle cx="-3.6" cy="-2" r="1.5" fill="#14211f" />
            <circle cx="4.4" cy="-2" r="1.5" fill="#14211f" />
            <g ref={brows} stroke="#14211f" strokeWidth="1.3" strokeLinecap="round">
              <line x1="-6" y1="-6.5" x2="-2" y2="-5" />
              <line x1="2.4" y1="-5" x2="6.6" y2="-6.5" />
            </g>
            <path ref={mouth} d={MOUTHS[0]} fill="none" stroke="#14211f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </g>
    </g>
  );
});
