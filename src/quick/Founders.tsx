import { ArrowUpRight } from 'lucide-react';
import { founders } from './content';

// Photos go here once supplied, e.g.
//   import founder1 from '../assets/team/founder1.webp';
//   const FOUNDER_PHOTOS = { founder1, ... };
const FOUNDER_PHOTOS: Record<string, string | undefined> = {};

const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

// Editorial portrait wall: three tall portraits, the middle one set lower, with names beneath.
export const Founders = () => (
  <section id="team" className="py-24 md:py-36 scroll-mt-16">
    <div className="q-wrap">
      <div className="q-reveal grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-20 items-end mb-14 md:mb-20">
        <div>
          <p className="q-kicker mb-5">{founders.kicker}</p>
          <h2 className="text-[40px] md:text-6xl leading-[1.04] tracking-[-0.025em]">{founders.title[0]} <em className="text-[var(--q-teal)]">{founders.title[1]}</em></h2>
        </div>
        <p className="q-ui text-lg text-[var(--q-soft)] leading-relaxed max-w-md lg:justify-self-end">{founders.body}</p>
      </div>

      <ul className="grid sm:grid-cols-3 gap-10 sm:gap-5 lg:gap-8">
        {founders.people.map((p, i) => {
          const photo = FOUNDER_PHOTOS[p.id];
          return (
            <li key={p.id} className={`q-reveal group ${i === 1 ? 'sm:mt-16 lg:mt-24' : ''}`} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className={`q-portrait relative aspect-[4/5] rounded-[28px] overflow-hidden ${i === 0 ? 'bg-[#113d3b]' : i === 1 ? 'bg-[#e3a737]' : 'bg-[#14211f]'}`}>
                {photo ? (
                  <img src={photo} alt={p.name} loading="lazy" className="w-full h-full object-cover grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-[1.03] transition duration-700" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`q-num text-[88px] md:text-[110px] leading-none ${i === 1 ? 'text-[#14211f]' : 'text-[#f4efe6]'} opacity-90`}>{p.placeholder ? `0${i + 1}` : initials(p.name)}</span>
                    {p.placeholder && <span className={`q-ui text-xs mt-3 ${i === 1 ? 'text-[#14211f]' : 'text-[#f4efe6]'} opacity-60`}>Photo coming soon</span>}
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between gap-4 mt-5">
                <div>
                  <h3 className={`text-[26px] md:text-[30px] leading-tight ${p.placeholder ? 'text-[var(--q-mute)]' : ''}`}>{p.name}</h3>
                  <p className="q-ui text-[12px] uppercase tracking-[0.16em] text-[var(--q-gold)] mt-1.5">{p.role}</p>
                </div>
                {p.linkedin && (
                  <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`${p.name} on LinkedIn`} className="shrink-0 w-11 h-11 rounded-full border border-[var(--q-line-2)] inline-flex items-center justify-center hover:bg-[var(--q-ink)] hover:text-[var(--q-bg)] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className={`q-ui text-[15px] leading-relaxed mt-3 max-w-xs ${p.placeholder ? 'text-[var(--q-mute)]' : 'text-[var(--q-soft)]'}`}>{p.bio}</p>
            </li>
          );
        })}
      </ul>

      <Mentor />
    </div>
  </section>
);

// Mentor strip: a wide row under the founders, portrait on the left, details on the right.
const Mentor = () => {
  const m = founders.mentor;
  const photo = FOUNDER_PHOTOS[m.id];
  return (
    <div className="q-reveal mt-20 md:mt-28 grid sm:grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] gap-6 md:gap-10 items-center rounded-[32px] p-5 md:p-6 pr-6 md:pr-12 bg-[#fffdf8] border border-[var(--q-line)] shadow-[0_24px_60px_-36px_rgba(20,33,31,0.45)]">
      <div className="relative aspect-square rounded-[24px] overflow-hidden bg-[#1f5a55]">
        {photo ? (
          <img src={photo} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="q-num text-[64px] leading-none text-[#f4efe6]">Dr</span>
            {m.placeholder && <span className="q-ui text-xs mt-2 text-[#f4efe6] opacity-60">Photo coming soon</span>}
          </div>
        )}
      </div>
      <div>
        <span className="q-ui inline-block text-[11px] uppercase tracking-[0.14em] text-[var(--q-gold)] border border-[var(--q-line-2)] rounded-full px-3 py-1">{m.title}</span>
        <h3 className={`text-[30px] md:text-[40px] leading-tight mt-4 ${m.placeholder ? 'text-[var(--q-mute)]' : ''}`}>{m.name}</h3>
        <p className={`q-ui text-[13px] uppercase tracking-[0.14em] mt-1.5 ${m.placeholder ? 'text-[var(--q-mute)]' : 'text-[var(--q-teal)]'}`}>{m.specialty}</p>
        <p className={`q-ui text-base md:text-lg leading-relaxed mt-4 max-w-2xl ${m.placeholder ? 'text-[var(--q-mute)]' : 'text-[var(--q-soft)]'}`}>{m.bio}</p>
        {m.linkedin && (
          <a href={m.linkedin} target="_blank" rel="noreferrer" className="q-ui inline-flex items-center gap-2 mt-5 text-sm text-[var(--q-ink)] hover:text-[var(--q-teal)]">View profile <ArrowUpRight className="w-4 h-4" /></a>
        )}
      </div>
    </div>
  );
};
