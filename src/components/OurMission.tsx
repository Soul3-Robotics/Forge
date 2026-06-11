import React from 'react';

export const OurMission: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 glow-gold">
          Our Mission
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
          To build intelligent ecosystems that do not just assist humans, but become an extension of them. We believe the future is symbiotic—where machine perception and human intuition operate as one.
        </p>
      </div>
    </div>
  );
};
