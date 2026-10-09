import { forwardRef } from 'react';
import { RecoveryGlobe } from './RecoveryGlobe';
import type { RecoveryGlobeHandle } from './RecoveryGlobe';

export const AboutUs = forwardRef<RecoveryGlobeHandle>((_, ref) => {
  return (
    <div className="w-full h-screen relative z-10 overflow-hidden flex items-center justify-center pointer-events-none">

      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">

        {/* Expanding Black Container */}
        <div
          className="video-container absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0px_0px_50px_rgba(0,0,0,0.5)] bg-black will-change-[width,height]"
          style={{
            width: '300px',
            height: '400px',
            borderRadius: '16px'
          }}
        ></div>

        {/* Text Layer */}
        <div className="flex items-center justify-center flex-col w-full relative z-10 pointer-events-none">
          <h2 className="title-left text-5xl md:text-7xl lg:text-8xl font-extralight text-white text-center tracking-widest mb-[-10px] will-change-transform">
            decoding
          </h2>
          <h2 className="title-right text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c38c25] to-[#f5dca1] text-center uppercase tracking-tighter will-change-transform">
            SOUL3
          </h2>
        </div>

        {/* Globe Content Box (Fades in during halt) */}
        <div className="globe-wrapper absolute inset-0 pointer-events-auto opacity-0 z-20">
          <RecoveryGlobe ref={ref} />
        </div>

      </div>
    </div>
  );
});