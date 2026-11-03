import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animate, random, stagger } from 'animejs';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection } from './HeroSection';
import { AboutUs } from './AboutUs';
import type { AboutUsHandle } from './AboutUs';
import { SoulThree } from './SoulThree';
import { OurVision } from './OurVision';
import { SCENE_DURATION, SCENE_SCROLL } from './sceneTimeline';
import missionBg from '../assets/our-mission.webp';
import contactBg from '../assets/background.webp';
import { ContactUs } from './ContactUs';

gsap.registerPlugin(ScrollTrigger);

export const SceneController: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const missionBgRef = useRef<HTMLDivElement>(null);
  const soulBgRef = useRef<HTMLDivElement>(null);
  const contactBgRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<AboutUsHandle>(null);
  const [heroActive, setHeroActive] = useState(true);
  const [missionRequested, setMissionRequested] = useState(false);
  const [contactRequested, setContactRequested] = useState(false);
  // Build the globe while visitors read the hero, so its WebGL setup and
  // shader compilation don't stall frames during the scroll sequence.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    let handle: number | undefined;
    const timer = setTimeout(() => {
      handle = idle(() => globeRef.current?.preload(), { timeout: 2000 });
    }, 1200);
    return () => {
      clearTimeout(timer);
      if (handle !== undefined) (window.cancelIdleCallback ?? clearTimeout)(handle);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;

    const context = gsap.context(() => {
      let crumbleAnim: ReturnType<typeof animate> | null = null;
      let heroWasActive = true;
      let globeRequested = false;
      let missionPrepared = false;
      let contactPrepared = false;
    const sectionConfigs = [
      { z: 0, startTime: 0, flyDuration: 1.5, pauseDuration: 1.0 }, // Hero
      { z: -2000, startTime: 2.5, flyDuration: 2.0, pauseDuration: 12.5 }, // About Us (expand, globe zoom, then dive into Mumbai)
      { z: -4500, startTime: 17.0, flyDuration: 2.0, pauseDuration: 9.0 }, // SOUL3 story: three chapters of rehab
      { z: -7000, startTime: 28.0, flyDuration: 2.0, pauseDuration: 3.5 }, // Our Vision
      { z: -9500, startTime: 33.5, flyDuration: 0, pauseDuration: 1.0 } // Contact Us
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
      const globeStart = sectionConfigs[1].startTime + 1.5;
      const globeEnd = sectionConfigs[1].startTime + sectionConfigs[1].pauseDuration + 0.5;

    const tl = gsap.timeline({
        onUpdate: () => {
          const time = tl.time();
          // Start preparing 3D during the hero exit, well before its reveal.
          if (!globeRequested && time > 0.5) {
            globeRequested = true;
            globeRef.current?.preload();
          }
          if (!missionPrepared && time > 24) {
            missionPrepared = true;
            setMissionRequested(true);
          }
          if (!contactPrepared && time > 28) {
            contactPrepared = true;
            setContactRequested(true);
          }
          globeRef.current?.setActive(time > globeStart && time < globeEnd);
          const heroIsActive = time < 2;
          if (heroIsActive !== heroWasActive) {
            heroWasActive = heroIsActive;
            setHeroActive(heroIsActive);
          }
        },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${SCENE_SCROLL}`,
        scrub: 1,
        pin: true
      }
    });

    if (whiteBgRef.current) {
      // INSTANTLY snap the white background on exactly as the camera pushes through the Hero section
      tl.set(whiteBgRef.current, { opacity: 1 }, 1.3);
    }

    // Keep the timeline length fixed so scroll positions stay predictable.
    tl.set({}, {}, SCENE_DURATION);

    if (soulBgRef.current) {
      // Deep Mumbai night sits behind the globe dive and carries into SOUL3
      tl.to(soulBgRef.current, { opacity: 1, duration: 1.0 }, 13.0);
      tl.to(soulBgRef.current, { opacity: 0, duration: 1.5 }, 26.5);
    }

    if (missionBgRef.current) {
      // Crossfade the mission artwork in as the camera flies towards Our Vision
      tl.to(missionBgRef.current, { opacity: 1, duration: 1.5 }, 26.5);
      tl.to(missionBgRef.current, { opacity: 0, duration: 1.5 }, 31.5);
    }

    if (contactBgRef.current) {
      // Fade in the Contact Us background as the camera flies towards the final section
      tl.to(contactBgRef.current, { opacity: 1, duration: 1.5 }, 31.5);
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
                      delay: stagger(30),
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
          const titleLeft = section.querySelector('.title-left');
          const titleRight = section.querySelector('.title-right');

          if (videoContainer) {
            tl.to(videoContainer, {
              width: '100vw',
              height: '100vh',
              borderRadius: '0px',
              ease: "power2.inOut",
              duration: 1.5
            }, conf.startTime + 0.5);
          }

          if (titleLeft && titleRight) {
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
          }

          const globeWrapper = section.querySelector('.globe-wrapper');
          if (globeWrapper) {
            tl.to(globeWrapper, {
              opacity: 1,
              duration: 1.0,
              ease: "power2.out"
            }, conf.startTime + 1.5);
          }

          // Recovery Globe Scroll progress
          tl.to({ val: 0 }, {
            val: 1,
            duration: 3.5,
            ease: "power1.in",
            onUpdate: function() {
              if (globeRef.current) {
                globeRef.current.setProgress(this.targets()[0].val);
              }
            }
          }, conf.startTime + 4.5);

          // Hold on India, then let the globe roll away before flying onward
          tl.to({ val: 0 }, {
            val: 1,
            duration: 3.5,
            ease: "power1.in",
            onUpdate: function() {
              globeRef.current?.setDive(this.targets()[0].val);
            }
          }, conf.startTime + 8.5);
        } else if (index === 2) {
          // SOUL3 story: one chapter on stage at a time, each drawing a ring of care
          const S = conf.startTime;
          const beats = section.querySelectorAll('.s3-beat');
          const beatTimes: [number, number | null][] = [[S - 0.6, S + 1.3], [S + 1.6, S + 3.4], [S + 3.7, S + 5.5], [S + 5.8, S + 7.6], [S + 7.8, null]];
          beats.forEach((beat, i) => {
            const [inAt, outAt] = beatTimes[i];
            tl.fromTo(beat, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, inAt);
            if (outAt !== null) tl.to(beat, { autoAlpha: 0, y: -40, duration: 0.6, ease: "power2.in" }, outAt);
          });
          [0, 1, 2].forEach(i => {
            const at = beatTimes[i + 1][0];
            tl.to(section.querySelector(`.s3-ring-${i}`), { attr: { 'stroke-dashoffset': 0 }, duration: 1.4, ease: "power2.inOut" }, at);
            tl.fromTo(section.querySelector(`.s3-chip-${i}`), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, at + 0.9);
          });
          // All three rings close: the Mumbai beacon becomes SOUL3
          tl.to(section.querySelector('.s3-beacon'), { scale: 4, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, S + 7.8);
          tl.fromTo(section.querySelector('.s3-mark'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(1.6)" }, S + 8.1);
          tl.to(section.querySelector('.s3-stage'), { rotate: 8, scale: 1.04, duration: 1.2, ease: "power1.inOut" }, S + 7.8);
          tl.fromTo(section.querySelector('.s3-acronym'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, S + 8.4);
        } else if (index === 3) {
          // Vision: an "imagine" beat resolves into the vision card
          const V = conf.startTime;
          const imagine = section.querySelector('.vision-imagine');
          tl.fromTo(imagine, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, V - 0.6);
          tl.to(imagine, { autoAlpha: 0, scale: 1.15, duration: 0.6, ease: "power2.in" }, V + 0.8);
          tl.fromTo(section.querySelector('.vision-card'), { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" }, V + 1.2);
          tl.fromTo(section.querySelectorAll('.vision-line'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, V + 1.3);
          tl.fromTo(section.querySelectorAll('.vision-point'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, V + 2.1);
        }

        // Only fade out the entire section if it's NOT the expanding video, 
        // OR fade it out extremely late so the video expansion completes first.
        tl.to(section, {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.in"
        }, conf.startTime + (index === 0 ? 1.0 : (index === 1 ? conf.pauseDuration - 0.5 : conf.pauseDuration + 0.5)));
      }
    });

      return () => crumbleAnim?.revert();
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black">
      {/* Base Dark/Transparent Background for Hero */}
      <div className="absolute inset-0 z-0 bg-transparent"></div>

      {/* White Background for About Us */}
      <div ref={whiteBgRef} className="absolute inset-0 z-1 bg-[#dcdad8] opacity-0 pointer-events-none transition-colors"></div>

      {/* SOUL3 Background: Mumbai night glow behind the dive and the three pillars */}
      <div ref={soulBgRef} className="absolute inset-0 z-1 opacity-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, #0b3a3a 0%, #05171c 45%, #020608 100%)' }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#7ce4d4 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
      </div>

      {/* Mission Background Crossfade Layer */}
      <div ref={missionBgRef} className="absolute inset-0 z-1 opacity-0 pointer-events-none transition-colors">
        <img src={missionRequested ? missionBg : undefined} alt="Mission Background" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
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
            <HeroSection active={heroActive} />
          </div>

          <div ref={el => { sectionsRef.current[1] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ visibility: 'hidden', opacity: 0 }}>
            <AboutUs ref={globeRef} />
          </div>

          <div ref={el => { sectionsRef.current[2] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <SoulThree />
          </div>

          <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <OurVision />
          </div>

          <div ref={el => { sectionsRef.current[4] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <ContactUs loadMap={contactRequested} />
          </div>
        </div>
      </div>
    </div>
  );
};
