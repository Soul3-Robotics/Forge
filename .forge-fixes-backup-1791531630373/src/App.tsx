import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavBar } from './components/NavBar';
import { SideNav } from './components/SideNav';
import { SceneController } from './components/SceneController';
import logo from './assets/favicon.png';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loaded) return;
    // Keep the existing fade, then remove its invisible infinite animations.
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    const handler = () => setLoaded(true);
    window.addEventListener('globeReady', handler);
    return () => window.removeEventListener('globeReady', handler);
  }, []);

  useEffect(() => {
    // Initialize Lenis for buttery smooth, slow scrolling
    const lenis = new Lenis({
      duration: 2.0, // Slow down the physical scrolling speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Elegant cinematic easing
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from trying to catch up on dropped frames

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <>
      {showLoader && <div
        className={`fixed inset-0 z-[100] bg-[#060d12] flex flex-col items-center justify-center transition-opacity duration-1000 pointer-events-none ${loaded ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-t-2 border-[#008B87] rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-[#c38c25] rounded-full animate-[spin_1.5s_reverse_infinite]"></div>
          <img src={logo} alt="SOUL3" className="w-12 h-12 object-contain animate-pulse" />
        </div>
        <div className="text-white font-light tracking-[0.3em] text-sm mb-2">INITIALIZING SOUL3</div>
        <div className="text-[#008B87] font-mono text-[10px] tracking-widest uppercase animate-pulse">Preloading Global Atlas...</div>
      </div>}

      <div className={`w-full min-h-screen font-sans bg-black transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <NavBar />
        <SideNav />
        <SceneController />
      </div>
    </>
  );
}

export default App;
