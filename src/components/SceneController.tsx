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
  
  const shaderRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [bgClass, setBgClass] = useState('bg-black');

  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;

    const totalZDistance = 10000; 
    const sectionSpacing = 2000; 

    // Setup initial positions
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.set(section, {
          z: -index * sectionSpacing,
          opacity: index === 0 ? 1 : 0.2
        });
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
          // Calculate camera Z based on progress
          const currentZ = self.progress * totalZDistance;
          
          // Switch dynamic backgrounds based on depth
          if (currentZ < 1000) setBgClass('bg-black');
          else if (currentZ < 3000) setBgClass('bg-about');
          else if (currentZ < 5000) setBgClass('bg-mission');
          else setBgClass('bg-product');
        }
      }
    });

    // Move the "camera" forward
    tl.to(cameraRef.current, {
      z: totalZDistance,
      ease: "none",
      duration: 10
    }, 0);

    // Cloud Transition Effect
    if (cloudRef.current) {
      tl.to(cloudRef.current, {
        opacity: 1,
        scale: 4,
        duration: 1,
        ease: "power2.in"
      }, 0.5); // Start as shader fades

      tl.to(cloudRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 1.5); // Fade out as we enter About Us
    }

    // Handle section opacities
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const sectionZ = index * sectionSpacing;
      
      if (index > 0) {
        const appearTime = Math.max(0, (sectionZ - 1500) / 1000);
        tl.to(section, {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut"
        }, appearTime);
      }

      const disappearTime = sectionZ / 1000;
      tl.to(section, {
        opacity: 0,
        scale: 2,
        duration: 0.5,
        ease: "power2.in"
      }, disappearTime);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative">
      {/* 1. Base Dynamic Background */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${bgClass}`}></div>

      {/* 3. Cloud Transition Layer */}
      <div ref={cloudRef} className="absolute inset-0 cloud-layer origin-center"></div>

      {/* 3D Viewport */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ perspective: '800px' }}
      >
        <div 
          ref={cameraRef} 
          className="w-full h-full absolute top-0 left-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div ref={el => { sectionsRef.current[0] = el; }} className="absolute inset-0 flex items-center justify-center">
            <HeroSection scrollContainerRef={{ current: null }} />
          </div>

          <div ref={el => { sectionsRef.current[1] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AboutUs />
          </div>

          <div ref={el => { sectionsRef.current[2] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <OurMission />
          </div>

          <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <OurProduct />
          </div>
        </div>
      </div>
    </div>
  );
};
