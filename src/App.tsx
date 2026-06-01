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
      <div className="w-full h-screen relative z-10">
        <ImageSequence />
      </div>
    </div>
  );
}

export default App;
