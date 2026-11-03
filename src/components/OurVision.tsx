import React from 'react';

const points = [
  { title: 'Close to home', body: 'Quality rehab in every neighbourhood, not just big hospitals.', color: '#008B87' },
  { title: 'Whole person', body: 'Body, brain and mind recovering together, as one journey.', color: '#f5dca1' },
  { title: 'Joyful', body: 'Therapy people look forward to, keeping them motivated to the finish.', color: '#D99C2A' },
];

// The story's resolution. SceneController plays the "imagine" line first,
// then settles into the vision card.
export const OurVision: React.FC = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center px-6 pt-20 relative">
    <h2 className="vision-imagine absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-4xl md:text-6xl font-light text-white leading-[1.15] opacity-0 invisible">
      Now imagine that road home<br />
      <em className="text-teal-grad">starts next door.</em>
    </h2>

    <div className="vision-card max-w-5xl w-full p-8 md:p-12 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-center opacity-0 invisible">
      <div className="vision-line flex items-center justify-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-[#D99C2A]"></span>
        <span className="text-xs font-bold text-[#D99C2A] uppercase tracking-[0.3em]">Our Vision</span>
        <span className="w-8 h-[1px] bg-[#D99C2A]"></span>
      </div>

      <h2 className="vision-line text-4xl md:text-6xl font-light text-white leading-[1.15] mb-6">
        A world where everyone can <em className="text-teal-grad">become their old selves</em> again.
      </h2>
      <p className="vision-line text-lg md:text-2xl text-gray-200 font-light leading-relaxed mb-10">
        Starting in Mumbai and reaching across India, we want <span className="text-[#D99C2A] font-semibold">seva</span>-driven, technology-powered rehabilitation to be close to everyone who needs it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10">
        {points.map(p => (
          <div key={p.title} className="vision-point flex flex-col items-center space-y-2">
            <h4 className="text-2xl md:text-3xl font-black" style={{ color: p.color }}>{p.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[16rem]">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
