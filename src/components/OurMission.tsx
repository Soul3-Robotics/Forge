import React from 'react';

export const OurMission: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Wrapper to align the box */}
      <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none z-20">

        {/* Exact Glassmorphism Box from About Us */}
        <div className="mission-content-box max-w-5xl p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-auto relative overflow-hidden">

          {/* Background glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center">

            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008080] to-[#008080]">Mission</span>
            </h2>

            <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light mb-12">
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
    </div>
  );
};
