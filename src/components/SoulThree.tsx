import React from 'react';
import { Activity, Brain, HeartHandshake } from 'lucide-react';

// One chapter per beat of the story. SceneController plays them in order:
// each .s3-beat fades through, and .s3-ring-N draws as its chapter speaks.
const beats = [
  {
    kicker: 'Mumbai · tonight',
    line: <>Somewhere in this city,<br /><em className="text-gold-grad">a life changes in a moment.</em></>,
    sub: 'A stroke. A fall. An injury no one saw coming. And the long road back begins.',
  },
  {
    kicker: 'Chapter 01 · Physiotherapy',
    line: <>First, the body<br /><em className="text-teal-grad">forgets how to move.</em></>,
    sub: 'We rebuild movement, strength and independence, one guided, measurable step at a time.',
  },
  {
    kicker: 'Chapter 02 · Neuro-rehab',
    line: <>Then, the brain must<br /><em className="text-gold-grad">find new paths.</em></>,
    sub: 'After stroke or neurological injury, we help the brain relearn what it once knew by heart.',
  },
  {
    kicker: 'Chapter 03 · Mental health',
    line: <>And the mind carries<br /><em className="text-mint-grad">the weight of it all.</em></>,
    sub: 'Fear, frustration, hope. We care for the mind so no one walks this road alone.',
  },
  {
    kicker: 'This is SOUL3',
    line: <>Three ways of rehab.<br /><em className="text-gold-grad">One journey home.</em></>,
    sub: null,
  },
];

const rings = [
  { r: 92, color: '#008B87', label: 'Physiotherapy', Icon: Activity, angle: -90 },
  { r: 142, color: '#c38c25', label: 'Neuro-rehab', Icon: Brain, angle: 30 },
  { r: 192, color: '#7ce4d4', label: 'Mental health', Icon: HeartHandshake, angle: 150 },
];

export const SoulThree: React.FC = () => (
  <div className="w-full h-screen relative flex items-center justify-center px-6 md:px-12">
    <div className="w-full max-w-7xl h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 pt-20">

      {/* Narrative: one chapter on stage at a time */}
      <div className="relative h-[260px] md:h-[340px] order-2 md:order-1">
        {beats.map((b, i) => (
          <div key={i} className="s3-beat absolute inset-0 flex flex-col justify-center opacity-0 invisible">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-[#c38c25]"></span>
              <span className="text-xs font-bold text-[#c38c25] uppercase tracking-[0.3em]">{b.kicker}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white leading-[1.1] mb-5">{b.line}</h2>
            {b.sub && <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl">{b.sub}</p>}
            {i === beats.length - 1 && (
              <p className="s3-acronym text-lg md:text-xl text-gray-300 font-light opacity-0">
                <span className="text-[#7ce4d4] font-semibold">S</span>eva <span className="text-[#7ce4d4] font-semibold">O</span>f <span className="text-[#7ce4d4] font-semibold">U</span>plifting <span className="text-[#7ce4d4] font-semibold">L</span>ife, multiplied by <span className="text-[#f5dca1] font-semibold">3</span>.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* The person at the centre, and the three rings of care that form around them */}
      <div className="relative order-1 md:order-2 flex items-center justify-center">
        <div className="s3-stage relative w-[300px] h-[300px] md:w-[440px] md:h-[440px]">
          <svg viewBox="-220 -220 440 440" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <radialGradient id="s3-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(60)">
                <stop offset="0" stopColor="#f5dca1" stopOpacity="0.5" />
                <stop offset="1" stopColor="#f5dca1" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle r="60" fill="url(#s3-core)" className="s3-core-glow" />
            {rings.map((ring, i) => (
              <g key={ring.label}>
                <circle r={ring.r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <circle
                  className={`s3-ring s3-ring-${i}`}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset="1"
                  transform="rotate(-90)"
                  style={{ filter: `drop-shadow(0 0 6px ${ring.color})` }}
                />
              </g>
            ))}
          </svg>

          {/* Ring labels sit on each orbit */}
          {rings.map(({ r, color, label, Icon, angle }, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <div
                key={label}
                className={`s3-chip s3-chip-${i} absolute flex items-center gap-2 rounded-full border bg-[#040f16]/90 px-3 py-1.5 opacity-0 whitespace-nowrap`}
                style={{
                  left: `${50 + (Math.cos(rad) * r * 100) / 440}%`,
                  top: `${50 + (Math.sin(rad) * r * 100) / 440}%`,
                  transform: 'translate(-50%, -50%)',
                  borderColor: `${color}66`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
                <span className="text-xs md:text-sm text-white font-medium">{label}</span>
              </div>
            );
          })}

          {/* The Mumbai beacon from the globe, carried into the story */}
          <div className="s3-beacon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="block w-4 h-4 rounded-full bg-[#f5dca1] shadow-[0_0_40px_12px_rgba(245,220,161,0.45)]"></span>
          </div>

          {/* What the beacon becomes once all three rings close */}
          <div className="s3-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end leading-none opacity-0">
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white">SOUL</span>
            <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c38c25] to-[#f5dca1] drop-shadow-[0_0_20px_rgba(245,220,161,0.5)]">3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
