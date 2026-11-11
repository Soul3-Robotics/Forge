import type { ReactNode } from 'react';
import type { ModuleId } from './content';

// Small product style screens built in HTML so they stay sharp and light.
// All values are illustrative sample data.

const Frame = ({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) => (
  <div className="q-screen">
    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--q-line)]">
      <div className="flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--q-teal)]" />
        <span className="q-ui text-[13px] font-medium text-[var(--q-ink)]">{title}</span>
      </div>
      {meta && <span className="q-ui text-[11px] text-[var(--q-mute)]">{meta}</span>}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Avatar = ({ i, tone = 'teal' }: { i: string; tone?: 'teal' | 'gold' | 'mute' }) => (
  <span className={`q-avatar q-avatar-${tone}`}>{i}</span>
);

const Physio = () => {
  const weeks = [45, 52, 61, 70, 82, 95, 104, 110];
  return (
    <Frame title="Ravi K. · Right shoulder" meta="Week 8 of 10">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="q-ui q-label">Flexion range</p>
          <p className="q-num text-4xl text-[var(--q-ink)]">110°<span className="text-[var(--q-teal)] text-base ml-2 q-ui">+65°</span></p>
        </div>
        <span className="q-pill">On track</span>
      </div>
      <div className="flex items-end gap-2 h-20 mb-2">
        {weeks.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <div className={`rounded-sm ${i === weeks.length - 1 ? 'bg-[var(--q-teal)]' : 'bg-[var(--q-surface-3)]'}`} style={{ height: `${(v / 120) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between q-ui text-[10px] text-[var(--q-mute)] mb-5"><span>W1</span><span>W8</span></div>
      <div className="grid grid-cols-2 gap-px bg-[var(--q-line)] rounded-xl overflow-hidden">
        {[['Grip strength', '22 kg'], ['Balance score', '48 / 56'], ['Sessions', '24 of 30'], ['Pain', '2 / 10']].map(([k, v]) => (
          <div key={k} className="bg-[var(--q-surface-2)] px-4 py-3">
            <p className="q-ui q-label">{k}</p>
            <p className="q-ui text-sm text-[var(--q-ink)] mt-0.5">{v}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
};

const Neuro = () => {
  const items = [
    { k: 'Sitting balance', s: 'done' }, { k: 'Speech, short sentences', s: 'done' }, { k: 'Grip a cup', s: 'done' },
    { k: 'Walking with support', s: 'now', p: 70 }, { k: 'Writing name', s: 'next' }, { k: 'Climbing stairs', s: 'next' },
  ];
  return (
    <Frame title="Stroke recovery · Meena S." meta="Day 46">
      <ul className="space-y-1">
        {items.map(it => (
          <li key={it.k} className={`flex items-center gap-4 px-3 py-3 rounded-xl ${it.s === 'now' ? 'bg-[var(--q-surface-2)]' : ''}`}>
            <span className={`q-check q-check-${it.s}`}>{it.s === 'done' ? '✓' : ''}</span>
            <span className={`q-ui text-sm flex-1 ${it.s === 'next' ? 'text-[var(--q-mute)]' : 'text-[var(--q-ink)]'}`}>{it.k}</span>
            {it.s === 'now' && (
              <span className="flex items-center gap-3">
                <span className="w-20 h-1 rounded-full bg-[var(--q-surface-3)] overflow-hidden"><span className="block h-full bg-[var(--q-gold)]" style={{ width: `${it.p}%` }} /></span>
                <span className="q-ui text-xs text-[var(--q-gold)]">{it.p}%</span>
              </span>
            )}
            {it.s === 'done' && <span className="q-ui text-[11px] text-[var(--q-mute)]">Reached</span>}
          </li>
        ))}
      </ul>
    </Frame>
  );
};

const Mind = () => {
  const pts = [3, 2.6, 3.2, 3.8, 3.5, 4.2, 4.4, 4.8];
  const w = 300, h = 90;
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * w},${h - ((p - 1) / 4) * h}`).join(' ');
  return (
    <Frame title="Weekly check in" meta="Last 8 weeks">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="q-ui q-label">Mood today</p>
          <p className="q-num text-3xl text-[var(--q-ink)]">Hopeful</p>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map(n => <span key={n} className={`w-6 h-6 rounded-full border ${n === 4 ? 'bg-[var(--q-mint)] border-[var(--q-mint)]' : 'border-[var(--q-line-2)]'}`} />)}
        </div>
      </div>
      <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className="w-full h-24 mb-5" aria-hidden>
        {[0, 1, 2].map(i => <line key={i} x1="0" x2={w} y1={(i * h) / 2} y2={(i * h) / 2} stroke="var(--q-line)" strokeWidth="1" />)}
        <path d={path} fill="none" stroke="var(--q-mint)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={w} cy={h - ((pts[pts.length - 1] - 1) / 4) * h} r="4" fill="var(--q-mint)" />
      </svg>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--q-surface-2)]">
        <Avatar i="DP" tone="gold" />
        <div className="flex-1">
          <p className="q-ui text-sm text-[var(--q-ink)]">Counselling with Dr. Priya</p>
          <p className="q-ui text-[11px] text-[var(--q-mute)]">Thursday, 5:30 pm · Video</p>
        </div>
        <span className="q-pill">Booked</span>
      </div>
    </Frame>
  );
};

const Sensor = () => (
  <Frame title="Live session · Knee extension" meta="● Recording">
    <div className="grid grid-cols-3 gap-px bg-[var(--q-line)] rounded-xl overflow-hidden mb-5">
      {[['Reps', '12 / 15'], ['Angle', '84°'], ['Tempo', '3.1 s']].map(([k, v]) => (
        <div key={k} className="bg-[var(--q-surface-2)] px-3 py-3">
          <p className="q-ui q-label">{k}</p>
          <p className="q-num text-2xl text-[var(--q-ink)]">{v}</p>
        </div>
      ))}
    </div>
    <p className="q-ui q-label mb-2">Left and right symmetry</p>
    {[['Left', 78, 'var(--q-gold)'], ['Right', 92, 'var(--q-teal)']].map(([k, v, c]) => (
      <div key={k as string} className="flex items-center gap-3 mb-2">
        <span className="q-ui text-xs w-10 text-[var(--q-mute)]">{k}</span>
        <span className="flex-1 h-1.5 rounded-full bg-[var(--q-surface-3)] overflow-hidden"><span className="block h-full" style={{ width: `${v}%`, background: c as string }} /></span>
        <span className="q-ui text-xs w-9 text-right text-[var(--q-ink)]">{v}%</span>
      </div>
    ))}
    <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--q-line)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--q-gold)]" />
      <p className="q-ui text-xs text-[var(--q-ink)] flex-1">Therapist note: slow the lowering phase on the left.</p>
    </div>
  </Frame>
);

const Family = () => (
  <Frame title="Meena's family" meta="WhatsApp">
    <div className="space-y-3">
      <div className="q-bubble q-bubble-in"><p>How did today's session go?</p><span>Anil (son) · 6:02 pm</span></div>
      <div className="q-bubble q-bubble-out"><p>Really well. She walked 20 metres with support, her best yet. Practice list for tomorrow is in the app.</p><span>SOUL3 care team · 6:10 pm</span></div>
      <div className="q-bubble q-bubble-in"><p>That's wonderful. Thank you, we'll practise after dinner.</p><span>Anil (son) · 6:12 pm</span></div>
    </div>
  </Frame>
);

const Report = () => (
  <Frame title="Monthly report · October" meta="PDF">
    <div className="flex items-center gap-3 mb-5">
      <Avatar i="MS" />
      <div>
        <p className="q-ui text-sm text-[var(--q-ink)]">Meena S.</p>
        <p className="q-ui text-[11px] text-[var(--q-mute)]">Shared with Dr. Rao, Neurology</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-px bg-[var(--q-line)] rounded-xl overflow-hidden mb-5">
      {[['Mobility', '+38%'], ['Sessions', '22'], ['Mood', '4.4 / 5']].map(([k, v]) => (
        <div key={k} className="bg-[var(--q-surface-2)] px-3 py-3">
          <p className="q-ui q-label">{k}</p>
          <p className="q-num text-2xl text-[var(--q-ink)]">{v}</p>
        </div>
      ))}
    </div>
    <p className="q-ui text-[13px] leading-relaxed text-[var(--q-soft)]">Walking with support improved from 5 to 20 metres. Speech is now in full sentences. Next month: independent standing and writing practice.</p>
  </Frame>
);

const map: Record<ModuleId, () => ReactNode> = { physio: Physio, neuro: Neuro, mind: Mind, sensor: Sensor, family: Family, report: Report };

export const Mockup = ({ id }: { id: ModuleId }) => {
  const C = map[id];
  return <C />;
};

export const HeroPanel = () => (
  <div className="q-screen">
    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--q-line)]">
      <div className="flex items-center gap-3">
        <Avatar i="MS" />
        <div>
          <p className="q-ui text-[13px] font-medium text-[var(--q-ink)]">Meena S. · Recovery plan</p>
          <p className="q-ui text-[11px] text-[var(--q-mute)]">Ischaemic stroke · Day 46</p>
        </div>
      </div>
      <span className="q-pill">Improving</span>
    </div>
    <div className="divide-y divide-[var(--q-line)]">
      {[
        { k: 'Body', d: 'Physiotherapy', v: 72, c: 'var(--q-teal)', n: 'Walking 20 m with support' },
        { k: 'Brain', d: 'Neuro-rehab', v: 58, c: 'var(--q-gold)', n: 'Speech in full sentences' },
        { k: 'Mind', d: 'Mental health', v: 81, c: 'var(--q-mint)', n: 'Mood up 4 weeks running' },
      ].map(r => (
        <div key={r.k} className="px-5 py-4">
          <div className="flex items-baseline justify-between mb-2">
            <p className="q-ui text-sm text-[var(--q-ink)]">{r.k} <span className="text-[var(--q-mute)]">· {r.d}</span></p>
            <p className="q-ui text-xs text-[var(--q-ink)]">{r.v}%</p>
          </div>
          <span className="block h-1 rounded-full bg-[var(--q-surface-3)] overflow-hidden mb-2"><span className="block h-full" style={{ width: `${r.v}%`, background: r.c }} /></span>
          <p className="q-ui text-[11px] text-[var(--q-mute)]">{r.n}</p>
        </div>
      ))}
    </div>
  </div>
);
