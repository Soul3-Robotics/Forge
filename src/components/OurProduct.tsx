import React from 'react';

export const OurProduct: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 glow-teal">
          Our Product
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-8">
          The SOUL3 Exoskeleton Framework. A modular, neural-linked enhancement suit designed for deep-space exploration, hazardous environment recovery, and everyday mobility assistance.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-[#00CFC8] to-[#028180] text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,207,200,0.4)]">
          Explore Architecture
        </button>
      </div>
    </div>
  );
};
