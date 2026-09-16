import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animate, random, stagger } from 'animejs';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection } from './HeroSection';
import { AboutUs } from './AboutUs';
import { OurMission } from './OurMission';
import missionBg from '../assets/our-mission.png';
import contactBg from '../assets/background.png';
//import { OurProduct } from './OurProduct';
import { ContactUs } from './ContactUs';

gsap.registerPlugin(ScrollTrigger);

export const SceneController: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const missionBgRef = useRef<HTMLDivElement>(null);
  const contactBgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;

    const sectionConfigs = [
      { z: 0, startTime: 0, flyDuration: 1.5, pauseDuration: 1.0 }, // Hero
      { z: -2000, startTime: 2.5, flyDuration: 2.0, pauseDuration: 4.0 }, // About Us (halts to read & expand)
      { z: -4500, startTime: 8.5, flyDuration: 2.0, pauseDuration: 1.0 }, // Mission
      // { z: -7000, startTime: 11.5, flyDuration: 2.0, pauseDuration: 1.0 }, // Product (Temporarily removed)
      { z: -7000, startTime: 11.5, flyDuration: 0, pauseDuration: 1.0 } // Contact Us
    ];

    // Setup initial positions
    sectionsRef.current.forEach((section, index) => {
      if (section && sectionConfigs[index]) {
        gsap.set(section, {
          z: sectionConfigs[index].z,
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
        end: "+=7500", // Shorter scroll distance so users don't have to scroll multiple times
        scrub: 1,
        pin: true
      }
    });

    if (whiteBgRef.current) {
      // INSTANTLY snap the white background on exactly as the camera pushes through the Hero section
      tl.set(whiteBgRef.current, { opacity: 1 }, 1.3);
    }

    if (missionBgRef.current) {
      // Crossfade the global mission background as the camera starts flying towards the Mission section
      tl.to(missionBgRef.current, { opacity: 1, duration: 1.5 }, 6.5);
      // Fade it out as the camera leaves the Mission section to reveal the next theme
      tl.to(missionBgRef.current, { opacity: 0, duration: 1.5 }, 9.5);
    }

    if (contactBgRef.current) {
      // Fade in the Contact Us background as the camera flies towards the final section
      tl.to(contactBgRef.current, { opacity: 1, duration: 1.5 }, 9.5);
    }



    // Master Loop: Architect a perfect, unified Z-fly sequence for every section
    sectionsRef.current.forEach((section, index) => {
      if (!section || !sectionConfigs[index]) return;

      const conf = sectionConfigs[index];

      // 1. Move camera forward to the next section
      if (index < totalSections - 1) {
        tl.to(cameraRef.current, {
          z: Math.abs(sectionConfigs[index + 1].z),
          ease: "power2.inOut",
          duration: conf.flyDuration
        }, conf.startTime + conf.pauseDuration);
      }

      // 2. Fade IN section as camera approaches
      if (index > 0) {
        tl.to(section, {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out"
        }, conf.startTime - 0.5);
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
                    duration: 1500,
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
            }, conf.startTime + 0.5);
          }
        } else if (index === 1) {
          // Video Expansion Effect natively via GSAP!
          const videoContainer = section.querySelector('.video-container');
          const videoOverlay = section.querySelector('.video-overlay');
          const titleLeft = section.querySelector('.title-left');
          const titleRight = section.querySelector('.title-right');
          const aboutBg = section.querySelector('.about-bg');

          if (videoContainer && titleLeft && titleRight) {
            tl.to(videoContainer, {
              width: '100vw',
              height: '100vh',
              borderRadius: '0px',
              ease: "power2.inOut",
              duration: 1.5
            }, conf.startTime + 0.5);

            tl.to(titleLeft, {
              x: '-100vw',
              ease: "power2.inOut",
              duration: 1.5
            }, conf.startTime + 0.5);

            tl.to(titleRight, {
              x: '100vw',
              ease: "power2.inOut",
              duration: 1.5
            }, conf.startTime + 0.5);

            if (videoOverlay) {
              tl.to(videoOverlay, { opacity: 0, duration: 1.0 }, conf.startTime + 0.5);
            }
            if (aboutBg) {
              tl.to(aboutBg, { opacity: 0, duration: 1.5 }, conf.startTime + 0.5);
            }
          }

          const aboutContentBox = section.querySelector('.about-content-box');
          if (aboutContentBox) {
            tl.to(aboutContentBox, {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power2.out"
            }, conf.startTime + 1.5);
          }
        }

        // Only fade out the entire section if it's NOT the expanding video, 
        // OR fade it out extremely late so the video expansion completes first.
        tl.to(section, {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.in"
        }, conf.startTime + (index === 0 ? 1.0 : (index === 1 ? conf.pauseDuration - 0.5 : 1.5)));
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black">
      {/* Base Dark/Transparent Background for Hero */}
      <div className="absolute inset-0 z-0 bg-transparent"></div>

      {/* White Background for About Us */}
      <div ref={whiteBgRef} className="absolute inset-0 z-1 bg-[#dcdad8] opacity-0 pointer-events-none transition-colors"></div>

      {/* Mission Background Crossfade Layer */}
      <div ref={missionBgRef} className="absolute inset-0 z-1 opacity-0 pointer-events-none transition-colors">
        <img src={missionBg} alt="Mission Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contact Background Crossfade Layer */}
      <div ref={contactBgRef} className="absolute inset-0 z-2 opacity-0 pointer-events-none transition-colors">
        <img src={contactBg} alt="Contact Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

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

          {/* 
          <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <OurProduct />
          </div> 
          */}

          <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
};
