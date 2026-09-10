import React from 'react';
import { Zap, Shield, Globe, Cpu } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 relative z-10">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Vision */}
        <div className="flex flex-col space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#F4B942]/30 bg-[#F4B942]/10 w-fit">
            <span className="text-[#F4B942] text-sm font-semibold tracking-wider uppercase">The SOUL3 Syndicate</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 leading-tight">
            Pioneering<br />Humanity's<br /><span className="text-[#00CFC8]">Next Epoch.</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed font-light max-w-lg">
            We are a deep-tech engineering coalition forged by industry veterans in robotics, biomechanics, and artificial intelligence. Our mandate is simple: transcend biological limitations.
          </p>
        </div>

        {/* Right Column: Stats & Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all">
            <Shield className="w-8 h-8 text-[#00CFC8] mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">Industrial Grade</h3>
            <p className="text-gray-400 text-sm">Military-spec titanium construction ensuring absolute durability in zero-G and extreme terrestrial environments.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all">
            <Zap className="w-8 h-8 text-[#F4B942] mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">Zero Latency</h3>
            <p className="text-gray-400 text-sm">Proprietary neuro-synaptic bridging allowing machine response times faster than human reflex.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all">
            <Globe className="w-8 h-8 text-[#00CFC8] mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">Global Scale</h3>
            <p className="text-gray-400 text-sm">Strategic deployment pipelines across 14 countries, ready for mass-market adoption.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all">
            <Cpu className="w-8 h-8 text-[#F4B942] mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">A.I. Core</h3>
            <p className="text-gray-400 text-sm">Self-learning kinematic algorithms that adapt to the operator's specific biomechanical signature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};