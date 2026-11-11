import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Play, Plus } from 'lucide-react';
import logo from '../assets/logo.webp';
import heroImg from '../assets/background.webp';
import visionImg from '../assets/our-mission.webp';
import { HeroPanel, Mockup } from './Mockups';
import { contact, faqs, hero, impact, modules, modulesIntro, overview, problem, sources, steps, vision } from './content';
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
  { href: '#care', label: 'What we do' },
  { href: '#problem', label: 'Why it matters' },
  { href: '#how', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[rgba(244,239,230,0.92)] backdrop-blur-md border-b border-[var(--q-line)]' : 'border-b border-transparent'}`}>
      <div className="q-wrap flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center" aria-label="SOUL3 home"><img src={logo} alt="SOUL3" className="h-10 md:h-12 w-auto" /></a>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map(n => <a key={n.href} href={n.href} className="q-link !text-[var(--q-ink)] hover:!text-[var(--q-teal)]">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <a href={CINEMATIC_URL} className="q-link !text-[var(--q-ink)] hidden sm:inline-flex items-center gap-2 px-3"><Play className="w-3.5 h-3.5" /> Experience</a>
          <a href="#contact" className="q-btn q-btn-primary !h-10 !px-4 md:!px-5">Contact</a>
        </div>
      </div>
    </header>
  );
};

const SourceLink = ({ k }: { k: keyof typeof sources }) => (
  <a href={sources[k].url} target="_blank" rel="noreferrer" className="q-ui text-[11px] text-[var(--q-mute)] hover:text-[var(--q-ink)] underline underline-offset-2 decoration-[var(--q-line-2)]">{sources[k].label}</a>
);

// Wiro style card carousel: one paper card per part of the programme.
const CareCarousel = () => {
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const t = track.current;
    if (!t) return;
    setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth > t.scrollWidth - 8 });
  };
  useEffect(() => { update(); }, []);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    const card = t?.querySelector<HTMLElement>('.q-card');
    if (!t || !card) return;
    t.scrollBy({ left: dir * (card.offsetWidth + 28), behavior: 'smooth' });
  };

  return (
    <section id="care" className="q-dark py-20 md:py-32 scroll-mt-16 overflow-hidden">
      <div className="q-wrap flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
        <div className="q-reveal max-w-2xl">
          <p className="q-kicker mb-5">{modulesIntro.kicker}</p>
          <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.02em]">{modulesIntro.title}</h2>
          <p className="q-ui text-lg text-[var(--q-soft)] mt-6 leading-relaxed">{modulesIntro.body}</p>
        </div>
        <div className="q-reveal hidden md:flex gap-4 shrink-0">
          <button className="q-arrow" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous"><ArrowLeft className="w-6 h-6" strokeWidth={2.5} /></button>
          <button className="q-arrow" onClick={() => go(1)} disabled={edge.end} aria-label="Next"><ArrowRight className="w-6 h-6" strokeWidth={2.5} /></button>
        </div>
      </div>

      <div ref={track} onScroll={update} className="q-track">
        {modules.map((m, i) => {
          const isOpen = open === m.id;
          return (
            <article key={m.id} className="q-card q-light" data-open={isOpen}>
              <div className="q-card-stage">
                <div className="q-mock"><Mockup id={m.id} /></div>
                <div className="q-chip"><span className="w-2 h-2 rounded-full bg-[#1f8f86]" />{m.chip}</div>
              </div>
              <div className="relative px-8 md:px-10 pt-10 pb-9 flex items-end justify-between gap-6 flex-1">
                <div>
                  <p className="q-ui text-[12px] tracking-[0.14em] uppercase text-[var(--q-gold)] mb-3">0{i + 1} · {m.tag}</p>
                  <h3 className="text-[34px] md:text-[42px] leading-[1.02] tracking-[-0.02em] text-[var(--q-ink)]">{m.title}</h3>
                  <p className="q-ui text-[15px] md:text-base text-[var(--q-soft)] mt-4 leading-relaxed">{m.body}</p>
                </div>
                <button className="q-plus-btn" onClick={() => setOpen(isOpen ? null : m.id)} aria-expanded={isOpen} aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${m.tag}`}>
                  <Plus className="w-7 h-7" strokeWidth={2.5} />
                </button>
              </div>
              <div className="q-detail" aria-hidden={!isOpen}>
                <p className="q-ui text-[12px] tracking-[0.14em] uppercase text-[#e8b04a] mb-5">What's included</p>
                <ul>
                  {m.points.map(p => (
                    <li key={p} className="text-2xl md:text-3xl leading-snug py-4 border-b border-[rgba(244,239,230,0.14)]">{p}</li>
                  ))}
                </ul>
                <a href="#contact" onClick={() => setOpen(null)} className="q-ui mt-8 inline-flex items-center gap-2 text-[#e8b04a] text-sm">Ask about {m.tag.toLowerCase()} <ArrowRight className="w-4 h-4" /></a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="q-wrap flex md:hidden gap-3 mt-2">
        <button className="q-arrow !w-14 !h-14" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous"><ArrowLeft className="w-5 h-5" strokeWidth={2.5} /></button>
        <button className="q-arrow !w-14 !h-14" onClick={() => go(1)} disabled={edge.end} aria-label="Next"><ArrowRight className="w-5 h-5" strokeWidth={2.5} /></button>
      </div>
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
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <img src={heroImg} alt="" className="q-hero-img" fetchPriority="high" />
        <div className="relative q-wrap grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center pt-28 pb-16 md:pt-32">
          <div className="q-reveal">
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
          <div className="q-reveal lg:translate-y-16"><HeroPanel /></div>
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
      <section id="problem" className="py-24 md:py-36 scroll-mt-16">
        <div className="q-wrap">
          <div className="q-reveal max-w-3xl mb-14 md:mb-20">
            <p className="q-kicker mb-5">{problem.kicker}</p>
            <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.025em]">{problem.title}</h2>
          </div>
          <dl className="grid md:grid-cols-2 border-t border-[var(--q-line-2)]">
            {problem.stats.map((s, i) => (
              <div key={s.label} className={`q-reveal py-9 md:py-12 border-b border-[var(--q-line-2)] ${i % 2 ? 'md:pl-12 md:border-l' : 'md:pr-12'}`}>
                <dt className="q-num text-[64px] md:text-[96px] text-[var(--q-teal)]">{s.value}</dt>
                <dd className="mt-3">
                  <p className="text-2xl md:text-[28px] leading-snug">{s.label}</p>
                  <p className="q-ui text-sm text-[var(--q-soft)] mt-2">{s.note}</p>
                  <div className="mt-3"><SourceLink k={s.source} /></div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="q-night py-24 md:py-36 scroll-mt-16">
        <div className="q-wrap">
          <div className="q-reveal mb-14 md:mb-20 max-w-2xl">
            <p className="q-kicker mb-5">How it works</p>
            <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.025em]">From first visit to <em className="text-[var(--q-gold)]">walking out.</em></h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--q-line)] rounded-[28px] overflow-hidden">
            {steps.map(s => (
              <li key={s.n} className="q-reveal bg-[var(--q-bg)] p-8 md:p-10 lg:min-h-[340px] flex flex-col">
                <p className="q-num text-[72px] text-[var(--q-gold)]">{s.n}</p>
                <div className="mt-auto pt-10">
                  <h3 className="text-[28px] mb-3">{s.title}</h3>
                  <p className="q-ui text-[15px] text-[var(--q-soft)] leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
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
            <p className="q-ui text-lg text-[var(--q-soft)] mt-6 max-w-md leading-relaxed">For yourself, a family member or a patient you refer. We usually reply within a working day.</p>
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
