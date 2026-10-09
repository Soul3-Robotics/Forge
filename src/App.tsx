import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavBar } from './components/NavBar';
import { SideNav } from './components/SideNav';
import { SceneController } from './components/SceneController';
import logo from './assets/brand-mark.webp';
import heroBackground from './assets/background.webp';
import heroFloor from './assets/floor.webp';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Reveal the first section as soon as its own artwork is ready. The globe
    // is prepared later, when visitors approach it in the scroll timeline.
    Promise.all([heroBackground, heroFloor, logo].map(src => {
      const image = new Image();
      image.src = src;
      return image.decode().catch(() => undefined);
    })).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => { cancelled = true; };
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
    <div className={`w-full min-h-screen font-sans bg-black transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <NavBar />
      <SideNav />
      <SceneController />
    </div>
  );
}

export default App;
