import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, Menu, Phone, Play, Plus, X } from 'lucide-react';
import logo from '../assets/logo.webp';
import heroImg from '../assets/background.webp';
import visionImg from '../assets/our-mission.webp';
import { Mockup } from './Mockups';
import { RoadSteps } from './RoadSteps';
import { INDIA_PATH, INDIA_VIEWBOX, MUMBAI } from './indiaMap';
import { contact, faqs, hero, impact, modules, modulesIntro, overview, problem, sources, vision } from './content';
import { CINEMATIC_URL } from '../viewMode';
import './quick.css';

// Fades sections in once as they enter the viewport.
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.q-reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('q-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const nav = [
  { href: '#care', id: 'care', label: 'Services' },
  { href: '#problem', id: 'problem', label: 'Why SOUL3' },
  { href: '#how', id: 'how', label: 'How it works' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
];

// Floating pill navigation with the current section highlighted.
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', ...nav.map(n => n.id), 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', on); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  return (
    <>
      <header className={`fixed inset-x-0 z-50 transition-[top] duration-500 ${scrolled ? 'top-3' : 'top-4 md:top-6'}`}>
        <div className="q-wrap">
          <div className={`q-nav ${scrolled ? 'q-nav-solid' : ''}`}>
            <a href="#top" className="flex items-center gap-2.5 pl-1.5 shrink-0" aria-label="SOUL3 home">
              <img src={logo} alt="SOUL3" className="h-10 sm:h-12 md:h-14 w-auto" />
            </a>

            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" aria-label="Sections">
              {nav.map(n => (
                <a key={n.href} href={n.href} className={`q-nav-link ${active === n.id ? 'q-nav-link-active' : ''}`}>{n.label}</a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <a href={CINEMATIC_URL} className="q-nav-link hidden md:inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--q-ink)] inline-flex items-center justify-center"><Play className="w-2.5 h-2.5 text-[#f4efe6] fill-[#f4efe6] ml-px" /></span>
                Watch the story
              </a>
              <a href="#contact" className="q-nav-cta">Book a consult</a>
              <button className="q-nav-burger lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu"><Menu className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </header>

      <div className={`q-menu lg:hidden ${menu ? 'q-menu-open' : ''}`} aria-hidden={!menu}>
        <div className="q-wrap flex items-center justify-between h-20">
          <img src={logo} alt="SOUL3" className="h-10 w-auto" />
          <button className="q-nav-burger !bg-[#f4efe6] !text-[#14211f]" onClick={() => setMenu(false)} aria-label="Close menu"><X className="w-5 h-5" /></button>
        </div>
        <nav className="q-wrap flex flex-col mt-6">
          {[...nav, { href: '#contact', id: 'contact', label: 'Contact' }].map((n, i) => (
            <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="flex items-baseline gap-4 py-4 border-b border-[rgba(244,239,230,0.12)]">
              <span className="q-ui text-xs text-[#e8b04a]">0{i + 1}</span>
              <span className="text-[40px] leading-none tracking-[-0.02em]">{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="q-wrap mt-10 flex flex-col gap-3">
          <a href="#contact" onClick={() => setMenu(false)} className="q-btn justify-center bg-[#e3a737] text-[#14211f]">Book a consult <ArrowRight className="w-4 h-4" /></a>
          <a href={CINEMATIC_URL} className="q-btn justify-center border border-[rgba(244,239,230,0.3)]"><Play className="w-4 h-4" /> Watch the SOUL3 story</a>
        </div>
      </div>
    </>
  );
};

const SourceLink = ({ k }: { k: keyof typeof sources }) => (
  <a href={sources[k].url} target="_blank" rel="noreferrer" className="q-ui text-[11px] text-[var(--q-mute)] hover:text-[var(--q-ink)] underline underline-offset-2 decoration-[var(--q-line-2)]">{sources[k].label}</a>
);

// Visual stat tiles for the "Why SOUL3" section. Each tile pairs a figure with a tiny chart.
type Stat = typeof problem.stats[number];
const statBy = (id: string) => problem.stats.find(s => s.id === id)!;

const TileFoot = ({ s }: { s: Stat }) => (
  <div className="mt-auto pt-5">
    <p className="q-ui text-[13px] opacity-70">{s.note}</p>
    <a href={sources[s.source].url} target="_blank" rel="noreferrer" className="q-ui text-[10.5px] opacity-50 hover:opacity-90 underline underline-offset-2 mt-1.5 inline-block">{sources[s.source].label}</a>
  </div>
);

const StatTiles = () => {
  const strokes = statBy('strokes'), living = statBy('living'), physio = statBy('physio'), gap = statBy('gap'), psd = statBy('psd'), global = statBy('global');
  const r = 34, c = 2 * Math.PI * r;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Strokes: 1990 vs 2021 bars */}
      <div className="q-reveal q-tile q-tile-teal lg:col-span-2">
        <p className="q-ui q-tile-tag">Stroke in India</p>
        <div className="flex items-end justify-between gap-6 mt-4">
          <div>
            <p className="q-num text-5xl md:text-[56px]">{strokes.value}</p>
            <p className="text-xl leading-snug mt-2 max-w-[16rem]">{strokes.label}</p>
          </div>
          <div className="flex items-end gap-3 h-28 shrink-0" aria-hidden>
            {[['1990', 0.65], ['2021', 1.25]].map(([y, v]) => (
              <div key={y as string} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="q-ui text-[11px] opacity-80">{v}M</span>
                <span className={`w-10 rounded-lg ${y === '2021' ? 'bg-[#e8b04a]' : 'bg-[rgba(244,239,230,0.25)]'}`} style={{ height: `${((v as number) / 1.25) * 72}%` }} />
                <span className="q-ui text-[11px] opacity-60">{y}</span>
              </div>
            ))}
          </div>
        </div>
        <TileFoot s={strokes} />
      </div>

      {/* Mental health gap: ring */}
      <div className="q-reveal q-tile q-tile-paper">
        <p className="q-ui q-tile-tag">Mental health</p>
        <div className="relative w-24 h-24 my-4" aria-hidden>
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="var(--q-surface-3)" strokeWidth="9" />
            <circle cx="40" cy="40" r={r} fill="none" stroke="var(--q-teal)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c * 0.845} ${c}`} />
          </svg>
        </div>
        <p className="q-num text-[44px] text-[var(--q-teal)]">{gap.value}</p>
        <p className="text-lg leading-snug mt-1">{gap.label}</p>
        <TileFoot s={gap} />
      </div>

      {/* Post stroke depression: 1 of 4 figures */}
      <div className="q-reveal q-tile q-tile-gold">
        <p className="q-ui q-tile-tag">After a stroke</p>
        <div className="flex gap-2 my-5" aria-hidden>
          {[0, 1, 2, 3].map(i => (
            <span key={i} className={`flex flex-col items-center gap-1 ${i === 0 ? '' : 'opacity-30'}`}>
              <span className="w-5 h-5 rounded-full bg-[#14211f]" />
              <span className="w-9 h-10 rounded-t-full bg-[#14211f]" />
            </span>
          ))}
        </div>
        <p className="q-num text-[44px]">{psd.value}</p>
        <p className="text-lg leading-snug mt-1">{psd.label}</p>
        <TileFoot s={psd} />
      </div>

      {/* Physio shortage: comparison bars */}
      <div className="q-reveal q-tile q-tile-paper lg:col-span-2">
        <p className="q-ui q-tile-tag">Physiotherapists per 10,000 people</p>
        <div className="space-y-4 my-6" aria-hidden>
          {[['India today', 0.36, 'var(--q-gold)'], ['WHO benchmark', 1, 'var(--q-ink)']].map(([k, v, col]) => (
            <div key={k as string} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3">
              <span className="q-ui text-[13px] text-[var(--q-soft)]">{k}</span>
              <span className="h-3 rounded-full bg-[var(--q-surface-3)] overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${(v as number) * 100}%`, background: col as string }} /></span>
              <span className="q-ui text-sm text-right">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-xl leading-snug"><span className="q-num text-[var(--q-gold)] text-[28px]">{physio.value}</span> {physio.label}, about a third of what is needed.</p>
        <TileFoot s={physio} />
      </div>

      {/* Living with stroke */}
      <div className="q-reveal q-tile q-tile-paper">
        <p className="q-ui q-tile-tag">Living with stroke</p>
        <div className="grid grid-cols-10 gap-1 my-5 w-fit" aria-hidden>
          {Array.from({ length: 40 }, (_, i) => <span key={i} className={`w-2.5 h-2.5 rounded-full ${i < 20 ? 'bg-[var(--q-surface-3)]' : 'bg-[var(--q-teal)]'}`} />)}
        </div>
        <p className="q-num text-[44px] text-[var(--q-teal)]">{living.value}</p>
        <p className="text-lg leading-snug mt-1">{living.label}</p>
        <TileFoot s={living} />
      </div>

      {/* Global need */}
      <div className="q-reveal q-tile q-tile-night">
        <p className="q-ui q-tile-tag">Worldwide</p>
        <svg viewBox="0 0 80 80" className="w-20 h-20 my-4" aria-hidden>
          <circle cx="40" cy="40" r="34" fill="none" stroke="#e8b04a" strokeWidth="1.5" />
          <ellipse cx="40" cy="40" rx="15" ry="34" fill="none" stroke="#e8b04a" strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="6" y1="40" x2="74" y2="40" stroke="#e8b04a" strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="12" y1="24" x2="68" y2="24" stroke="#e8b04a" strokeOpacity="0.35" strokeWidth="1" />
          <line x1="12" y1="56" x2="68" y2="56" stroke="#e8b04a" strokeOpacity="0.35" strokeWidth="1" />
        </svg>
        <p className="q-num text-[44px] text-[#e8b04a]">{global.value}</p>
        <p className="text-lg leading-snug mt-1">{global.label}</p>
        <TileFoot s={global} />
      </div>
    </div>
  );
};

// Continuously drifting card rail. Pauses on hover, while a card is open,
// while dragging and when off screen. Arrows and drag nudge it.
const SPEED = 38; // px per second
const CareCarousel = () => {
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const state = useRef({ offset: 0, hover: false, drag: null as null | { x: number; start: number; moved: boolean }, tween: null as null | { from: number; to: number; t0: number }, visible: false });
  const openRef = useRef<string | null>(null);
  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => { state.current.visible = e.isIntersecting; });
    io.observe(el);
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const s = state.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const half = el.scrollWidth / 2;
      if (s.tween) {
        const p = Math.min(1, (now - s.tween.t0) / 700);
        const ease = 1 - Math.pow(1 - p, 3);
        s.offset = s.tween.from + (s.tween.to - s.tween.from) * ease;
        if (p === 1) s.tween = null;
      } else if (!reduce && s.visible && !s.hover && !s.drag && !openRef.current) {
        s.offset += SPEED * dt;
      }
      if (half > 0) {
        if (s.offset >= half) { s.offset -= half; if (s.tween) { s.tween.from -= half; s.tween.to -= half; } if (s.drag) s.drag.start -= half; }
        if (s.offset < 0) { s.offset += half; if (s.tween) { s.tween.from += half; s.tween.to += half; } if (s.drag) s.drag.start += half; }
      }
      el.style.transform = `translate3d(${-s.offset}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const go = (dir: 1 | -1) => {
    const card = rail.current?.querySelector<HTMLElement>('.q-card');
    if (!card) return;
    const s = state.current;
    const step = card.offsetWidth + parseFloat(getComputedStyle(rail.current!).columnGap || '24');
    s.tween = { from: s.offset, to: s.offset + dir * step, t0: performance.now() };
  };

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    state.current.tween = null;
    state.current.drag = { x: e.clientX, start: state.current.offset, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = state.current.drag;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) { d.moved = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }
    if (d.moved) state.current.offset = d.start - dx;
  };
  const onUp = () => { state.current.drag = null; };

  const arrows = (small?: boolean) => (
    <>
      <button className={`q-arrow ${small ? '!w-14 !h-14' : ''}`} onClick={() => go(-1)} aria-label="Previous"><ArrowLeft className="w-6 h-6" strokeWidth={2.5} /></button>
      <button className={`q-arrow ${small ? '!w-14 !h-14' : ''}`} onClick={() => go(1)} aria-label="Next"><ArrowRight className="w-6 h-6" strokeWidth={2.5} /></button>
    </>
  );

  return (
    <section id="care" className="q-dark py-20 md:py-32 scroll-mt-16 overflow-hidden">
      <div className="q-wrap flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <div className="q-reveal max-w-2xl">
          <p className="q-kicker mb-5">{modulesIntro.kicker}</p>
          <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.02em]">{modulesIntro.title}</h2>
          <p className="q-ui text-lg text-[var(--q-soft)] mt-6 leading-relaxed">{modulesIntro.body}</p>
        </div>
        <div className="q-reveal hidden md:flex gap-4 shrink-0">{arrows()}</div>
      </div>

      <div
        className="q-viewport"
        onMouseEnter={() => { state.current.hover = true; }}
        onMouseLeave={() => { state.current.hover = false; state.current.drag = null; }}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      >
        <div ref={rail} className="q-rail">
          {[0, 1].map(copy => modules.map((m, i) => {
            const key = `${m.id}-${copy}`;
            const isOpen = open === key;
            return (
              <article key={key} className="q-card q-light" data-open={isOpen} aria-hidden={copy === 1 || undefined}>
                <div className="q-card-stage">
                  <div className="q-mock"><Mockup id={m.id} /></div>
                  <div className="q-chip"><span className="w-2 h-2 rounded-full bg-[#1f8f86]" />{m.chip}</div>
                </div>
                <div className="relative px-7 md:px-8 pt-8 pb-7 flex items-end justify-between gap-5 flex-1">
                  <div>
                    <p className="q-ui text-[11px] tracking-[0.14em] uppercase text-[var(--q-gold)] mb-2.5">0{i + 1} · {m.tag}</p>
                    <h3 className="text-[28px] md:text-[32px] leading-[1.04] tracking-[-0.02em] text-[var(--q-ink)]">{m.title}</h3>
                    <p className="q-ui text-[14px] text-[var(--q-soft)] mt-3 leading-relaxed">{m.body}</p>
                  </div>
                  <button className="q-plus-btn" tabIndex={copy === 1 ? -1 : 0} onClick={() => setOpen(isOpen ? null : key)} aria-expanded={isOpen} aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${m.tag}`}>
                    <Plus className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="q-detail" aria-hidden={!isOpen}>
                  <p className="q-ui text-[11px] tracking-[0.14em] uppercase text-[#e8b04a] mb-4">What's included</p>
                  <ul>
                    {m.points.map(p => (
                      <li key={p} className="text-[22px] md:text-2xl leading-snug py-3.5 border-b border-[rgba(244,239,230,0.14)]">{p}</li>
                    ))}
                  </ul>
                  <a href="#contact" tabIndex={isOpen ? 0 : -1} onClick={() => setOpen(null)} className="q-ui mt-7 inline-flex items-center gap-2 text-[#e8b04a] text-sm">Ask about {m.tag.toLowerCase()} <ArrowRight className="w-4 h-4" /></a>
                </div>
              </article>
            );
          }))}
        </div>
      </div>

      <div className="q-wrap flex md:hidden gap-3 mt-8">{arrows(true)}</div>
    </section>
  );
};

export const QuickMode = () => {
  useReveal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'SOUL3 · Rehabilitation for body, brain and mind';
    window.scrollTo(0, 0);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\nFrom: ${name}${email ? ` (${email})` : ''}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="q-root" id="top">
      <Header />

      {/* Hero over the Mumbai sunrise artwork */}
      <section className="relative min-h-[100svh] flex items-start lg:items-center overflow-hidden">
        <img src={heroImg} alt="" className="q-hero-img" fetchPriority="high" />
        <div className="relative q-wrap pt-32 pb-16 md:pt-36">
          <div className="q-reveal max-w-3xl">
            <p className="q-kicker !text-[#7a520c] mb-6">{hero.kicker}</p>
            <h1 className="text-[46px] leading-[1.0] md:text-7xl lg:text-[72px] xl:text-[82px] tracking-[-0.025em] text-[#14211f]">
              {hero.title[0]}<br /><em className="text-[#1a6f68]">{hero.title[1]}</em>
            </h1>
            <p className="q-ui text-[17px] md:text-lg leading-relaxed text-[#2c3a37] mt-7 max-w-xl">{hero.body}</p>
            <div className="flex flex-wrap gap-3 mt-9">
              <a href="#contact" className="q-btn q-btn-primary">{hero.primary} <ArrowRight className="w-4 h-4" /></a>
              <a href="#care" className="q-btn q-btn-ghost bg-[rgba(255,253,248,0.6)] backdrop-blur-sm">{hero.secondary}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview line */}
      <section className="py-24 md:py-36">
        <div className="q-wrap q-reveal">
          <h2 className="text-[40px] md:text-7xl leading-[1.04] tracking-[-0.025em] max-w-5xl">{overview.line} <em className="text-[var(--q-teal)]">{overview.accent}</em></h2>
          <p className="q-ui text-lg md:text-xl text-[var(--q-soft)] mt-8 max-w-2xl leading-relaxed">{overview.body}</p>
        </div>
      </section>

      <CareCarousel />

      {/* Problem in numbers */}
      <section id="problem" className="relative overflow-hidden py-24 md:py-32 scroll-mt-16">
        <svg className="q-india" viewBox={INDIA_VIEWBOX} aria-hidden>
          <defs>
            <pattern id="q-india-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="2.6" fill="#1f8f86" />
            </pattern>
          </defs>
          <path d={INDIA_PATH} fill="url(#q-india-dots)" />
          <path d={INDIA_PATH} fill="none" stroke="#1f8f86" strokeWidth="3" strokeLinejoin="round" />
          <circle className="q-india-pulse" cx={MUMBAI.x} cy={MUMBAI.y} r="22" fill="none" stroke="#c0841a" strokeWidth="4" />
          <circle cx={MUMBAI.x} cy={MUMBAI.y} r="12" fill="#c0841a" />
        </svg>
        <div className="relative q-wrap">
          <div className="q-reveal max-w-3xl mb-12 md:mb-16">
            <p className="q-kicker mb-5">{problem.kicker}</p>
            <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.025em]">{problem.title}</h2>
          </div>
          <StatTiles />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="q-night py-24 md:py-32 scroll-mt-16 overflow-hidden">
        <div className="q-wrap">
          <div className="q-reveal mb-12 md:mb-4 max-w-2xl">
            <p className="q-kicker mb-5">How it works</p>
            <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.025em]">From first visit to <em className="text-[var(--q-gold)]">walking out.</em></h2>
          </div>
          <RoadSteps />
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 md:py-32">
        <div className="q-wrap">
          <div className="q-reveal mb-12">
            <p className="q-kicker mb-5">{impact.kicker}</p>
            <h2 className="text-[40px] md:text-6xl tracking-[-0.025em]">{impact.title}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 border-t border-[var(--q-line-2)] pt-10">
            {impact.stats.map(s => (
              <div key={s.label} className="q-reveal pr-6">
                <p className={`q-num text-6xl md:text-[88px] ${s.placeholder ? 'q-placeholder inline-block text-[var(--q-mute)]' : 'text-[var(--q-teal)]'}`} title={s.placeholder ? 'Placeholder: SOUL3 figure to be added' : undefined}>{s.value}</p>
                <p className="q-ui text-sm text-[var(--q-soft)] mt-4">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision over the mission artwork */}
      <section className="q-night relative overflow-hidden">
        <img src={visionImg} alt="" loading="lazy" className="q-hero-img !object-center" />
        <div className="q-scrim" />
        <div className="relative q-wrap py-28 md:py-44 grid lg:grid-cols-[1.25fr_0.75fr] gap-14 lg:gap-24">
          <div className="q-reveal">
            <p className="q-kicker mb-6">{vision.kicker}</p>
            <h2 className="text-[42px] md:text-7xl leading-[1.02] tracking-[-0.025em]">{vision.title}</h2>
            <p className="q-ui text-lg text-[var(--q-soft)] mt-8 max-w-xl leading-relaxed">{vision.body}</p>
          </div>
          <ul className="q-reveal self-end border-t border-[var(--q-line-2)]">
            {vision.roadmap.map(r => (
              <li key={r.when} className="grid grid-cols-[5rem_1fr] gap-4 py-6 border-b border-[var(--q-line-2)]">
                <span className="q-ui text-[13px] text-[var(--q-gold)] uppercase tracking-[0.14em] pt-1">{r.when}</span>
                <span className="text-xl md:text-2xl leading-snug">{r.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-36 scroll-mt-16">
        <div className="q-wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">
          <div className="q-reveal">
            <p className="q-kicker mb-5">Questions</p>
            <h2 className="text-[40px] md:text-6xl tracking-[-0.025em]">Good to know.</h2>
          </div>
          <div className="border-t border-[var(--q-line-2)]">
            {faqs.map(f => (
              <details key={f.q} className="q-faq q-reveal border-b border-[var(--q-line-2)]">
                <summary className="flex items-center justify-between gap-6 py-7">
                  <span className="text-2xl md:text-[28px]">{f.q}</span>
                  <span className="q-plus w-11 h-11 rounded-2xl bg-[#e3a737] text-[#14211f] inline-flex items-center justify-center shrink-0"><Plus className="w-5 h-5" strokeWidth={2.5} /></span>
                </summary>
                <p className="q-ui text-base text-[var(--q-soft)] leading-relaxed pb-8 max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="q-dark py-24 md:py-36 scroll-mt-16">
        <div className="q-wrap grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="q-reveal">
            <p className="q-kicker mb-6">Contact</p>
            <h2 className="text-5xl md:text-7xl leading-[1.0] tracking-[-0.025em]">Start the <em className="text-[var(--q-gold)]">road home.</em></h2>
            <p className="q-ui text-lg text-[var(--q-soft)] mt-6 max-w-md leading-relaxed">For yourself, a family member, a patient you refer, or a physio centre that wants to partner with us. We usually reply within a working day.</p>
            <ul className="mt-12 border-t border-[var(--q-line)]">
              {[
                { icon: Mail, k: 'Email', v: contact.email, href: `mailto:${contact.email}` },
                { icon: Phone, k: 'Phone', v: contact.phone, href: contact.phoneHref },
                { icon: MapPin, k: 'Visit', v: contact.address },
              ].map(({ icon: Icon, k, v, href }) => (
                <li key={k} className="flex items-center gap-5 py-5 border-b border-[var(--q-line)]">
                  <Icon className="w-4 h-4 text-[var(--q-gold)] shrink-0" />
                  <span className="q-ui text-[13px] text-[var(--q-mute)] w-14 shrink-0">{k}</span>
                  {href ? <a href={href} className="q-ui text-[15px] hover:text-[var(--q-gold)] transition-colors">{v}</a> : <span className="q-ui text-[15px]">{v}</span>}
                </li>
              ))}
            </ul>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="q-btn q-btn-ghost mt-8">Join our WhatsApp community <ArrowUpRight className="w-4 h-4" /></a>
          </div>
          <form onSubmit={submit} className="q-reveal q-light bg-[#f6f1e7] text-[var(--q-ink)] rounded-[32px] p-8 md:p-11 self-start shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]">
            <h3 className="text-[34px] mb-8">Send us a message</h3>
            <label className="block mb-6"><span className="q-ui q-label">Name</span><input className="q-input" required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></label>
            <label className="block mb-6"><span className="q-ui q-label">Email</span><input className="q-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
            <label className="block mb-10"><span className="q-ui q-label">How can we help?</span><textarea className="q-input resize-none" rows={3} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us a little about the recovery" /></label>
            <button type="submit" className="q-btn q-btn-primary w-full justify-center">Send message <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>

      {/* Experience band */}
      <a href={CINEMATIC_URL} className="group block q-gold-band">
        <div className="q-wrap py-16 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="q-ui text-[12px] tracking-[0.18em] uppercase mb-4 text-[#5c3d06]">Have a few minutes?</p>
            <p className="text-[40px] md:text-7xl tracking-[-0.025em] leading-[1.02]">Experience the SOUL3 story.</p>
          </div>
          <span className="w-20 h-20 md:w-28 md:h-28 rounded-[28px] bg-[#14211f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Play className="w-7 h-7 text-[#e3a737] fill-[#e3a737]" />
          </span>
        </div>
      </a>

      {/* Footer */}
      <footer className="q-night pt-16 pb-10">
        <div className="q-wrap">
          <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="SOUL3" className="h-12 w-auto mb-5" />
              <p className="q-ui text-sm text-[var(--q-mute)] max-w-xs leading-relaxed">Seva Of Uplifting Life. Physiotherapy, neuro-rehab and mental health, as one recovery.</p>
            </div>
            <div>
              <p className="q-ui q-label mb-4">Care</p>
              <ul className="space-y-2.5">{modules.slice(0, 3).map(m => <li key={m.id}><a href="#care" className="q-link">{m.tag}</a></li>)}</ul>
            </div>
            <div>
              <p className="q-ui q-label mb-4">SOUL3</p>
              <ul className="space-y-2.5">
                {nav.map(n => <li key={n.href}><a href={n.href} className="q-link">{n.label}</a></li>)}
                <li><a href={CINEMATIC_URL} className="q-link">The experience</a></li>
              </ul>
            </div>
            <div>
              <p className="q-ui q-label mb-4">Contact</p>
              <ul className="space-y-2.5">
                <li><a href={`mailto:${contact.email}`} className="q-link">{contact.email}</a></li>
                <li><a href={contact.phoneHref} className="q-link">{contact.phone}</a></li>
                <li><a href={contact.whatsapp} target="_blank" rel="noreferrer" className="q-link">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--q-line)] pt-8">
            <p className="q-ui q-label mb-3">Sources</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {(Object.keys(sources) as (keyof typeof sources)[]).map(k => <li key={k}><SourceLink k={k} /></li>)}
            </ul>
            <div className="flex flex-col md:flex-row justify-between gap-3 q-ui text-xs text-[var(--q-mute)]">
              <span>© 2026 SOUL3. Built at Riidl, Somaiya Vidyavihar University.</span>
              <span>Patient screens show illustrative data.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuickMode;
