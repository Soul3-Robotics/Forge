import React from 'react';
import { Target } from 'lucide-react';

export const OurMission: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-5xl mx-auto w-full glass-card p-12 md:p-16 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden shadow-2xl">

        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D99C2A] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#008B87] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D99C2A] to-[#008B87] flex items-center justify-center mb-8 shadow-lg">
            <Target className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D99C2A] to-[#008B87]">Symbiosis</span> Directive
          </h2>

          <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light mb-12 max-w-4xl">
            Our mission is to build intelligent ecosystems that do not just assist humans, but become a literal extension of their nervous system. We believe the future is symbiotic—where machine perception and human intuition operate flawlessly as one entity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <h4 className="text-[#008B87] text-4xl font-black">2026</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Alpha Prototype</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <h4 className="text-white text-4xl font-black">100k+</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Units Deployed</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <h4 className="text-[#D99C2A] text-4xl font-black">$2.4B</h4>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Addressable Market</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
