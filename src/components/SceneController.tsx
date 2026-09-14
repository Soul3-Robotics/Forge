import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animate, random, stagger } from 'animejs';
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

    // Setup initial positions: Stack ALL sections perfectly in Z-space
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.set(section, {
          z: -index * 2500,
          xPercent: 0,
          y: 0,
          autoAlpha: index === 0 ? 1 : 0
        });
      }
    });

    const totalSections = sectionsRef.current.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=12000", // Extra long scroll distance for the unified 3D track
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const t = self.progress * 12;
          if (t < 1) setBgClass('bg-black');
          else setBgClass('bg-[#2c1a10]');
        }
      }
    });

    if (brownBgRef.current) {
      // Fade in the dark void background as we leave the Hero section
      tl.to(brownBgRef.current, { opacity: 1, duration: 1.0, ease: "power1.inOut" }, 1.0);
    }

    // Master Loop: Architect a perfect, unified Z-fly sequence for every section
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const sectionZ = index * 2500;
      const startTime = index * 3;

      // 1. Move camera forward to the next section
      if (index < totalSections - 1) {
        tl.to(cameraRef.current, {
          z: sectionZ + 2500,
          ease: "power2.inOut",
          duration: 2
        }, startTime + 1);
      }

      // 2. Fade IN section as camera approaches
      if (index > 0) {
        tl.to(section, {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out"
        }, startTime - 0.5);
      }

      // 3. Fade OUT section as camera passes through
      if (index < totalSections - 1) {
        if (index === 0) {
          // Thanos Snap Effect powered natively by Anime.js!
          const letters = Array.from(section.querySelectorAll('.letter'));
          if (letters.length > 0) {
            let crumbleAnim: any = null;

            // Use GSAP as a proxy to scrub the Anime.js engine perfectly with the scroll wheel
            tl.to({ progress: 0 }, {
              progress: 1,
              duration: 2.0,
              ease: "none",
              onStart: () => {
                if (!crumbleAnim) {
                  // Build the Anime.js physics engine timeline (paused) ONLY when scroll reaches here
                  crumbleAnim = animate(letters, {
                    translateX: [0, () => random(-2000, 2000)],
                    translateY: [0, () => random(-1000, -2500)],
                    translateZ: [0, () => random(500, 2000)],
                    rotateX: [0, () => random(-1080, 1080)],
                    rotateY: [0, () => random(-1080, 1080)],
                    rotateZ: [0, () => random(-1080, 1080)],
                    scale: [1, 0],
                    opacity: [1, 0],
                    filter: ["blur(0px)", "blur(25px)"],
                    duration: 2000,
                    delay: stagger(30 as any),
                    easing: 'easeInQuad',
                    autoplay: false
                  });
                }
              },
              onUpdate: function () {
                if (crumbleAnim) {
                  crumbleAnim.seek(this.targets()[0].progress * crumbleAnim.duration);
                }
              }
            }, startTime + 0.5);
          }
        }

        tl.to(section, {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.in"
        }, startTime + 1.5);
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
