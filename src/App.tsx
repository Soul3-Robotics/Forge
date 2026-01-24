import React from 'react';
import { HeroSection } from './components/HeroSection';
import { ImageSequence } from './components/ImageSequence';
import { NavBar } from './components/NavBar';

function App() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto bg-black text-white font-sans selection:bg-red-600 selection:text-black"
    >
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
      <footer className="bg-zinc-950 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold bg-linear-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
              FORGE
            </span>
            <p className="text-gray-500 text-sm mt-2">© 2025 Forge Inc. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
