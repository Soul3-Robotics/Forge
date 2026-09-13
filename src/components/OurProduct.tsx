import React from 'react';
import { CheckCircle2, Hexagon, Layers, Activity } from 'lucide-react';

export const OurProduct: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Product Value Proposition */}
        <div className="flex flex-col space-y-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#008B87]/30 bg-[#008B87]/10 w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#008B87] animate-pulse"></span>
              <span className="text-[#008B87] text-sm font-bold tracking-widest uppercase">Flagship Hardware</span>
            </div>
            <h2 className="text-6xl font-black text-white leading-tight mb-6">
              Mark-1 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Exoskeleton</span>
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              A modular, lightweight carbon-titanium framework featuring zero-latency kinesthetic feedback. Engineered from the ground up for extreme industrial applications, emergency response, and advanced physical rehabilitation.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start space-x-4">
              <CheckCircle2 className="w-6 h-6 text-[#D99C2A] shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-lg">Load Amplification</h4>
                <p className="text-gray-400 text-sm">Multiplies the operator's physical lifting capacity by 400% while reducing metabolic strain by 65%.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <CheckCircle2 className="w-6 h-6 text-[#D99C2A] shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-lg">Swarm Connectivity</h4>
                <p className="text-gray-400 text-sm">Units communicate seamlessly via our proprietary low-orbit mesh network for coordinated team efforts.</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <CheckCircle2 className="w-6 h-6 text-[#D99C2A] shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-lg">All-Day Power Cell</h4>
                <p className="text-gray-400 text-sm">Next-generation solid-state battery architecture offering 14 hours of continuous peak operation.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: Technical Specifications UI */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
          {/* Abstract futuristic data UI replacing the 3D model */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#008B87]/5 to-transparent rounded-full border border-white/5 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute inset-8 bg-gradient-to-tl from-[#D99C2A]/5 to-transparent rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]"></div>
          
          <div className="relative z-10 glass-card p-8 rounded-2xl border border-[#008B87]/20 bg-black/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,207,200,0.1)] w-full max-w-md mx-auto">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center border-b border-white/10 pb-4">
              <Activity className="w-5 h-5 text-[#008B87] mr-3" />
              System Diagnostics
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Actuator Efficiency</span>
                  <span className="text-[#008B87] font-mono">98.4%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1.5">
                  <div className="bg-[#008B87] h-1.5 rounded-full w-[98%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Neural Sync Stability</span>
                  <span className="text-[#D99C2A] font-mono">99.9%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1.5">
                  <div className="bg-[#D99C2A] h-1.5 rounded-full w-[100%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Structural Integrity</span>
                  <span className="text-white font-mono">Nominal</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full w-[100%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                <Hexagon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <div className="text-xs text-gray-500 uppercase">Chassis</div>
                <div className="text-white font-mono text-sm">Carbon-Ti</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                <Layers className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <div className="text-xs text-gray-500 uppercase">Weight</div>
                <div className="text-white font-mono text-sm">18.4 kg</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
