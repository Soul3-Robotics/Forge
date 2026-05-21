import React from 'react';
import { HeroSection } from './components/HeroSection';
import { ImageSequence } from './components/ImageSequence';
import { NavBar } from './components/NavBar';


function App() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto font-sans relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Premium Cinematic Background Layers */}
      <div className="bg-cinematic"></div>
      <div className="volumetric-glow"></div>
      <div className="energy-ring energy-ring-1"></div>
      <div className="energy-ring energy-ring-2"></div>
      <div className="holographic-texture"></div>
      <div className="vignette-overlay"></div>
      <div className="ambient-light"></div>
      <div className="neon-diffusion"></div>
      <div className="digital-aura"></div>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="sticky top-0 z-0">
        <HeroSection scrollContainerRef={scrollContainerRef} />
      </div>

      {/* Image Sequence Section */}
      <div className="relative z-10">
        <ImageSequence containerRef={scrollContainerRef} />
      </div>

      {/* Footer */}
      <footer className="py-12" style={{ borderTopColor: '#F4B942', borderTopWidth: '1px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold" style={{ color: '#F4B942' }}>
              <span style={{ color: '#00CFC8' }}>SOUL</span><span style={{ color: '#F4B942' }}>3</span>
            </span>
            <p className="text-sm mt-2" style={{ color: '#F4B942', opacity: 0.7 }}>© 2025 SOUL3 Inc. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 transition-colors" style={{ color: '#F4B942', opacity: 0.7 }}>
            <a href="#" className="transition-colors" style={{ color: '#F4B942' }}>Privacy</a>
            <a href="#" className="transition-colors" style={{ color: '#F4B942' }}>Terms</a>
            <a href="#" className="transition-colors" style={{ color: '#F4B942' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
