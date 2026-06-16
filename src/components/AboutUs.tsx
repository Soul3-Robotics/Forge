import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 glow-teal">
          About Us
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
          We are pioneers in human augmentation and robotics. Our goal is to transcend biological limitations through seamless technological integration, forging a new era of capability and freedom for humanity.
        </p>
      </div>
    </div>
  );
};