import React from 'react';

export const OurMission: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-start pl-12 md:pl-115 pointer-events-none z-20">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D99C2A] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#008B87] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">

          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D99C2A] to-[#D99C2A]">Mission</span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light mb-12 max-w-4xl">
            Our mission is to give <span className="text-[#D99C2A] font-semibold">seva</span> to people who have endured life-altering injuries. We provide a clear, engaging pathway to get better—keeping patients motivated and experiencing joy throughout their entire journey.
            <br /><br />
            By combining a dedicated space for healing with advanced technology, we aim to uplift lives, restore physical strength, and help people become their old selves once again.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <h4 className="text-[#008B87] text-3xl font-black">Seva</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Selfless Service</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <h4 className="text-white text-3xl font-black">Joy</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Motivated Journey</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <h4 className="text-[#D99C2A] text-3xl font-black">Recovery</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Space & Tech</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
