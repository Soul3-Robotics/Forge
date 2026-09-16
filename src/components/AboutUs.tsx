import React from 'react';
import { Cpu, Gamepad2, Zap } from 'lucide-react';
import aboutImg from '../assets/about.png';

export const AboutUs: React.FC = () => {
  return (
    <div className="w-full h-screen relative z-10 overflow-hidden flex items-center justify-center pointer-events-none">

      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">

        {/* Expanding Video Container */}
        <div
          className="video-container absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0px_0px_50px_rgba(0,0,0,0.5)]"
          style={{
            width: '300px',
            height: '400px',
            borderRadius: '16px' // 2xl
          }}
        >
          <img
            src={aboutImg}
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="video-overlay absolute inset-0 bg-black/50" />
        </div>

        {/* Text Layer */}
        <div className="flex items-center justify-center flex-col w-full relative z-10 pointer-events-none">
          <h2 className="title-left text-5xl md:text-7xl lg:text-8xl font-bold text-[#008B87] text-center uppercase tracking-tight drop-shadow-md">
            Decoding
          </h2>
          <h2 className="title-right text-5xl md:text-7xl lg:text-8xl font-bold text-[#c38c25ff] text-center uppercase tracking-tight drop-shadow-md">
            SOUL3
          </h2>
        </div>

        {/* Glassmorphism Content Box (Fades in during halt) */}
        <div className="absolute inset-0 flex items-center justify-start pl-12 md:pl-57 pointer-events-none z-20">
          <div className="about-content-box max-w-2xl p-8 rounded-3xl border border-[#008B87]/30 bg-[#008B87]/30 backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] opacity-0 transform translate-y-8 pointer-events-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-md whitespace-nowrap">
              <span className="text-[#c38c25ff]">Advanced Rehab </span>
              <span className="text-[#008B87]">Robotics.</span>
            </h2>
            <p className="text-xl text-white/90 leading-relaxed font-bold mb-8 drop-shadow-sm">
              SOUL3 brings physical, mental, and neurological rehabilitation together to create a smarter path to recovery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-black/10 border border-[#008B87]/30 backdrop-blur-md">
                <Cpu className="w-10 h-10 text-[gold] drop-shadow-md" />
                <span className="text-white text-lg font-bold tracking-wide">Kinematic Robotics</span>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-black/10 border border-[#008B87]/30 backdrop-blur-md">
                <Gamepad2 className="w-10 h-10 text-[#008B87] drop-shadow-md" />
                <span className="text-[white] text-lg font-bold tracking-wide">Gamified Therapy</span>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-black/10 border border-[#008B87]/30 backdrop-blur-md">
                <Zap className="w-10 h-10 text-[gold] drop-shadow-md" />
                <span className="text-[white] text-lg font-bold tracking-wide">Targeted Stimulation</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};