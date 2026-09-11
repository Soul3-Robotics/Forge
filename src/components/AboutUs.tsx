import React from 'react';
import { Brain, Activity, Network, Gamepad2, Cpu, Zap } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 relative z-10">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Vision & Meaning */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#00CFC8]/30 bg-[#00CFC8]/10 w-fit mb-6">
              <span className="text-[#00CFC8] text-sm font-semibold tracking-wider uppercase">Decoding SOUL3</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Advanced<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B942] to-[#00CFC8]">Rehab Robotics.</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              We are redefining recovery. The "3" in SOUL3 represents the absolute convergence of the three critical pillars of rehabilitation. By treating the patient as a holistic system, we unlock unprecedented healing potential.
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/10">
             <h4 className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-6">Powered by Emerging Tech</h4>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="flex flex-col items-start space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                 <Cpu className="w-6 h-6 text-[#00CFC8]"/> 
                 <span className="text-gray-300 text-sm font-medium">Kinematic Robotics</span>
               </div>
               <div className="flex flex-col items-start space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                 <Gamepad2 className="w-6 h-6 text-[#F4B942]"/> 
                 <span className="text-gray-300 text-sm font-medium">Gamified Therapy</span>
               </div>
               <div className="flex flex-col items-start space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                 <Zap className="w-6 h-6 text-[#00CFC8]"/> 
                 <span className="text-gray-300 text-sm font-medium">Targeted Stimulation</span>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: The 3 Pillars (Staggered Layout) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6 pl-0 lg:pl-12">
           {/* Pillar 1 */}
           <div className="glass-card p-8 rounded-3xl border border-[#00CFC8]/20 bg-gradient-to-b from-black/80 to-[#00CFC8]/[0.05] hover:border-[#00CFC8]/40 transition-all transform hover:-translate-y-2 duration-500 relative overflow-hidden shadow-lg">
             <div className="w-14 h-14 rounded-2xl bg-[#00CFC8]/10 flex items-center justify-center mb-8 border border-[#00CFC8]/20 relative z-10">
               <Activity className="w-7 h-7 text-[#00CFC8]" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Physical</h3>
             <p className="text-gray-400 text-sm leading-relaxed relative z-10">
               Restoring biomechanical function through adaptive exoskeletons that intelligently learn and assist human movement.
             </p>
           </div>
           
           {/* Pillar 2 */}
           <div className="glass-card p-8 rounded-3xl border border-[#F4B942]/20 bg-gradient-to-b from-black/80 to-[#F4B942]/[0.05] hover:border-[#F4B942]/40 transition-all transform hover:-translate-y-2 duration-500 mt-0 md:mt-16 relative overflow-hidden shadow-lg">
             <div className="w-14 h-14 rounded-2xl bg-[#F4B942]/10 flex items-center justify-center mb-8 border border-[#F4B942]/20 relative z-10">
               <Brain className="w-7 h-7 text-[#F4B942]" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Mental</h3>
             <p className="text-gray-400 text-sm leading-relaxed relative z-10">
               Engaging cognitive resilience through immersive, gamified therapy environments that make recovery inherently rewarding.
             </p>
           </div>

           {/* Pillar 3 */}
           <div className="glass-card p-8 rounded-3xl border border-[#00CFC8]/20 bg-gradient-to-b from-black/80 to-[#00CFC8]/[0.05] hover:border-[#00CFC8]/40 transition-all transform hover:-translate-y-2 duration-500 mt-0 md:mt-32 relative overflow-hidden shadow-lg">
             <div className="w-14 h-14 rounded-2xl bg-[#00CFC8]/10 flex items-center justify-center mb-8 border border-[#00CFC8]/20 relative z-10">
               <Network className="w-7 h-7 text-[#00CFC8]" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Neurological</h3>
             <p className="text-gray-400 text-sm leading-relaxed relative z-10">
               Rebuilding synaptic pathways using targeted neuro-stimulation synchronized perfectly with robotic kinematics.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};