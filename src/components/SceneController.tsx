import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection } from './HeroSection';
import { AboutUs } from './AboutUs';
import { OurMission } from './OurMission';
import { OurProduct } from './OurProduct';

gsap.registerPlugin(ScrollTrigger);

export const SceneController: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const brownBgRef = useRef<HTMLDivElement>(null);

  const [bgClass, setBgClass] = useState('bg-black');

  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;

    // Setup initial positions
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        if (index === 0) {
          gsap.set(section, { z: 0, xPercent: 0, opacity: 1 });
        } else if (index === 1) {
          gsap.set(section, { z: 0, y: 50, opacity: 0 }); // Fade/slide up instead of slide left
        } else {
          gsap.set(section, { z: -(index - 1) * 2000, xPercent: 0, opacity: 0 });
        }
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=10000",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const t = self.progress * 10; // 10 seconds total timeline
          if (t < 2.5) setBgClass('bg-black');
          else setBgClass('bg-[#2c1a10]'); // Blank brown color background for everything after zoom
        }
      }
    });

    // 1. Hero slides out (t=0 to t=1.5)
    tl.to(sectionsRef.current[0], { xPercent: -100, duration: 1.5, ease: "power1.inOut" }, 0);

    if (brownBgRef.current) {
      // Fade in the brown void smoothly
      tl.to(brownBgRef.current, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 2.5);
    }

    // 3. About Us fades up into the blank brown void (t=2.5 to t=4.0)
    // Use autoAlpha so it's fully hidden beforehand
    tl.to(sectionsRef.current[1], { y: 0, autoAlpha: 1, duration: 1.5, ease: "power2.out" }, 2.5);

    // FIX "STUCK" FEELING: Apply a continuous, slow Z-translate to About Us while the user reads it (t=2.5 to t=5.0)
    // We use z instead of scale because scale forces GPU rasterization recalculation on complex DOM elements, causing severe lag.
    tl.to(sectionsRef.current[1], { z: 500, duration: 2.5, ease: "none" }, 2.5);

    // GAP 2: User reads About Us (t=4.0 to t=5.0)

    // 4. Camera Z Fly (About Us -> Deep sections) from t=5.0 to t=9.0
    tl.to(cameraRef.current, {
      z: 4000,
      ease: "none",
      duration: 4
    }, 5.0);

    // 5. Handle section opacities during the Z fly
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      if (index === 0) {
        // Hero is already off-screen to the left, but fade it out so it's not taking up rendering layers
        tl.to(section, { opacity: 0, duration: 0.1 }, 1.5);
      }
      else if (index === 1) {
        // About Us vanishes behind the camera as we fly forward (t=5.0 to t=6.0)
        tl.to(section, { autoAlpha: 0, z: 2000, duration: 1.0, ease: "power2.in" }, 5.0);
      }
      else {
        // Mission (index=2) is reached at t=7. Product (index=3) is reached at t=9.
        const reachTime = index * 2 + 3;

        // Fade in as we approach
        tl.to(section, {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out"
        }, reachTime - 1.0);

        // Fade out as we pass through
        tl.to(section, {
          opacity: 0,
          duration: 1.0,
          ease: "power2.in"
        }, reachTime);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
      {/* 1. Base Dynamic Backgrounds */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${bgClass}`}></div>
      <div ref={brownBgRef} className="absolute inset-0 z-0 bg-[#2a1708] opacity-0 pointer-events-none"></div>

      {/* 3D Viewport for HTML DOM Sections */}
      <div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{ perspective: '800px' }}
      >
        <div
          ref={cameraRef}
          className="w-full h-full absolute top-0 left-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div ref={el => { sectionsRef.current[0] = el; }} className="absolute inset-0">
            <HeroSection />
          </div>

          <div ref={el => { sectionsRef.current[1] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ visibility: 'hidden', opacity: 0 }}>
            <AboutUs />
          </div>

          <div ref={el => { sectionsRef.current[2] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <OurMission />
          </div>

          <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <OurProduct />
          </div>
        </div>
      </div>
    </div>
  );
};
