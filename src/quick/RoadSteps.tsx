import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { steps } from './content';
import { Stickman, type StickmanHandle } from './Stickman';

// "How it works" as a winding road. Each step is a banner on a post planted beside the road.
// Desktop: the road runs left to right. Phones: it runs top to bottom.

const W = 1200, H = 560;
const ROAD = 'M -40 330 C 140 330, 200 170, 380 190 S 560 410, 740 380 S 920 160, 1060 210 S 1200 300, 1260 290';
// Same road, extended far past both edges so it runs off screen. Stops are measured on ROAD.
const ROAD_FULL = 'M -1200 330 L -40 330 C 140 330, 200 170, 380 190 S 560 410, 740 380 S 920 160, 1060 210 S 1200 300, 1260 290 L 2400 290';
const STOPS = [0.15, 0.38, 0.62, 0.85];

// Walker timing. Progress runs from START to END along the road, pausing at each banner.
const START = 0.015, END = 0.975, SPEED = 0.065, HOLD = 1.2, CELEBRATE = 3.2;

const useInView = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
};

const Banner = ({ s, tone }: { s: typeof steps[number]; tone: 'paper' | 'gold' }) => (
  <div className={`q-banner ${tone === 'gold' ? 'q-banner-gold' : ''}`}>
    <div className="flex items-baseline gap-3 mb-2">
      <span className="q-num text-[34px] leading-none text-[var(--q-banner-num)]">{s.n}</span>
      <h3 className="text-[24px] leading-tight">{s.title}</h3>
    </div>
    <p className="q-ui text-[14px] leading-relaxed opacity-80">{s.body}</p>
  </div>
);

export const RoadSteps = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [wrapRef, seen] = useInView<HTMLDivElement>();

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    setPts(STOPS.map(t => { const q = p.getPointAtLength(len * t); return { x: q.x, y: q.y }; }));
  }, []);

  // The walker: one loop drives whichever road (desktop or phone) is showing.
  const deskMan = useRef<StickmanHandle>(null);
  const deskPos = useRef<SVGGElement>(null);
  const mobMan = useRef<StickmanHandle>(null);
  const mobPos = useRef<HTMLDivElement>(null);
  const olRef = useRef<HTMLOListElement>(null);
  const seenRef = useRef(false);
  useEffect(() => { seenRef.current = seen; }, [seen]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desk = window.matchMedia('(min-width: 1024px)');
    let p = START, hold = 0, passed = 0, phase = 0, done = 0, visible = false, raf = 0, last = performance.now();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (wrapRef.current) io.observe(wrapRef.current);

    const mobileStops = () => {
      const ol = olRef.current;
      if (!ol || !ol.offsetHeight) return STOPS;
      return Array.from(ol.querySelectorAll('li')).map(li => (li.offsetTop + 37) / ol.offsetHeight);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      const isDesk = desk.matches;
      const stops = isDesk ? STOPS : mobileStops();
      let moving = false;
      if (reduce) { p = END; passed = stops.length; }
      else if (seenRef.current && visible) {
        if (hold > 0) hold -= dt;
        else if (p < END) {
          p = Math.min(END, p + SPEED * dt);
          moving = true;
          phase += dt * 9;
          if (passed < stops.length && p >= stops[passed]) { passed++; hold = HOLD; }
        } else {
          done += dt;
          if (done > CELEBRATE) { p = START; passed = 0; done = 0; }
        }
      }
      const fade = done > CELEBRATE - 0.6 ? Math.max(0, (CELEBRATE - done) / 0.6) : Math.min(1, (p - START) / 0.02 + 0.15);
      const opacity = String(reduce ? 1 : fade);

      if (isDesk) {
        const path = pathRef.current, g = deskPos.current;
        if (path && g) {
          const pt = path.getPointAtLength(path.getTotalLength() * p);
          g.setAttribute('transform', `translate(${pt.x} ${pt.y + 14}) scale(1.75)`);
          g.setAttribute('opacity', opacity);
          deskMan.current?.pose(passed, phase, moving, t);
        }
      } else if (olRef.current && mobPos.current) {
        mobPos.current.style.transform = `translateY(${p * olRef.current.offsetHeight - 70}px)`;
        mobPos.current.style.opacity = opacity;
        mobMan.current?.pose(passed, phase, moving, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [wrapRef]);

  return (
    <div ref={wrapRef} className={`q-road ${seen ? 'q-road-in' : ''}`}>
      {/* Desktop road */}
      <div className="relative hidden lg:block mt-32 mb-10" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="q-road-svg absolute inset-0 w-full h-full overflow-visible" aria-hidden>
          <path ref={pathRef} d={ROAD} fill="none" stroke="none" />
          <path d={ROAD_FULL} fill="none" stroke="#0b1110" strokeWidth="100" />
          <path d={ROAD_FULL} fill="none" stroke="rgba(244,239,230,0.22)" strokeWidth="88" />
          <path d={ROAD_FULL} fill="none" stroke="#26322f" strokeWidth="82" />
          <path d={ROAD_FULL} fill="none" stroke="#e8b04a" strokeWidth="3" strokeDasharray="22 20" />
          {pts.map((p, i) => (
            <g key={i}>
              <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + (i % 2 ? 120 : -120)} stroke="#e8b04a" strokeWidth="2" />
              <circle cx={p.x} cy={p.y} r="15" fill="#111817" stroke="#e8b04a" strokeWidth="3" />
              <circle cx={p.x} cy={p.y} r="5" fill="#e8b04a" />
            </g>
          ))}
          <g ref={deskPos} opacity="0"><Stickman ref={deskMan} /></g>
        </svg>
        {pts.map((p, i) => (
          <div
            key={steps[i].n}
            className="q-road-stop absolute w-[25%] max-w-[290px]"
            style={{
              left: `${(p.x / W) * 100}%`,
              top: `${((p.y + (i % 2 ? 120 : -120)) / H) * 100}%`,
              transform: `translate(-50%, ${i % 2 ? '0' : '-100%'})`,
              transitionDelay: `${0.6 + i * 0.25}s`,
            }}
          >
            <Banner s={steps[i]} tone={i === steps.length - 1 ? 'gold' : 'paper'} />
          </div>
        ))}
      </div>

      {/* Phone and tablet road */}
      <ol ref={olRef} className="relative lg:hidden">
        <svg className="absolute left-0 top-0 h-full w-[64px]" preserveAspectRatio="none" viewBox="0 0 64 100" aria-hidden>
          <rect x="6" y="0" width="52" height="100" fill="#26322f" />
          <line x1="32" y1="0" x2="32" y2="100" stroke="#e8b04a" strokeWidth="2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        </svg>
        <div ref={mobPos} className="absolute left-0 top-0 w-[64px] h-[80px] z-10 pointer-events-none" style={{ opacity: 0 }} aria-hidden>
          <svg viewBox="-32 -70 64 80" className="w-full h-full overflow-visible"><Stickman ref={mobMan} /></svg>
        </div>
        {steps.map((s, i) => (
          <li key={s.n} className="q-reveal relative pl-[88px] pb-8 last:pb-0">
            <span className="absolute left-[19px] top-6 w-[26px] h-[26px] rounded-full bg-[#111817] border-[3px] border-[#e8b04a] flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-[#e8b04a]" /></span>
            <span className="absolute left-[45px] top-[37px] w-[43px] h-[2px] bg-[#e8b04a]" />
            <Banner s={s} tone={i === steps.length - 1 ? 'gold' : 'paper'} />
          </li>
        ))}
      </ol>
    </div>
  );
};
