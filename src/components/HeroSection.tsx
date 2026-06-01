import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Timeline, stagger } from 'animejs';

import roboHand from '../assets/Robo hand.webp';
import robo2 from '../assets/robo 2.webp';

const ColoredTextWrapper = ({
  segments,
  className = "",
}: {
  segments: Array<{ text: string; color: string }>;
  className?: string;
}) => (
  <span className={`inline-block ${className}`}>
    {segments.map((segment, segIdx) =>
      segment.text.split('').map((char, charIdx) => (
        <span
          key={`${segIdx}-${charIdx}`}
          className="letter inline-block"
          style={{
            opacity: 0,
            transform: 'translateY(100px)',
            color: segment.color,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    )}
  </span>
);

interface HeroSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollContainerRef,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Preload hero images
  useEffect(() => {
    const preloadImages = [roboHand, robo2];
    preloadImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            setScrollY(scrollContainerRef.current.scrollTop);
          }
        });
      }
    };

    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  // Anime.js text animation
  useEffect(() => {
    const tl = new Timeline({
      duration: 1000,
      defaults: {
        ease: 'outExpo',
      },
    });

    // @ts-ignore
    tl.add('.welcome-text .letter', {
      translateY: [100, 0],
      opacity: [0, 1],
      delay: stagger(50, { start: 500 }),
    })

      // @ts-ignore
      .add('.welcome-text .letter', {
        translateY: [0, -100],
        opacity: [1, 0],
        delay: stagger(50),
        ease: 'inExpo',
      }, '+=1500')

      // @ts-ignore
      .add('.headline-text .letter', {
        translateY: [100, 0],
        opacity: [0, 1],
        delay: stagger(30),
      }, '-=500')

      // @ts-ignore
      .add('.subtitle', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        ease: 'outQuad',
      }, '-=800');

  }, []);

  // Dynamic spacing
  const leftHandOffset = isMobile ? -110 : -130;
  const rightHandOffset = isMobile ? 35 : 35;

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center hero-section">

      {/* TOP RIGHT HAND */}
      <div
        className="
          absolute
          top-[5%]
          left-1/2
          w-[clamp(250px,38vw,750px)]
          z-10
          pointer-events-none
        "
        style={{
          willChange: 'transform',
          transform: `
            translate(
              calc(${rightHandOffset}% + ${scrollY * 1.2}px),
              calc(-10% - ${scrollY * 0.8}px)
            )
          `,
        }}
      >
        <div className="w-full h-full animate-slide-in-right opacity-0 slide-in-right-with-delay">
          <img
            src={robo2}
            alt="Robotic Hand"
            className="
              w-full
              h-full
              object-contain
              golden-glow
            "
          />
        </div>
      </div>

      {/* BOTTOM LEFT HAND */}
      <div
        className="
          absolute
          bottom-[2%]
          left-1/2
          w-[clamp(250px,38vw,750px)]
          z-10
          pointer-events-none
        "
        style={{
          willChange: 'transform',
          transform: `
            translate(
              calc(${leftHandOffset}% - ${scrollY * 1.2}px),
              calc(10% + ${scrollY * 0.8}px)
            )
          `,
        }}
      >
        <div className="w-full h-full animate-slide-in-left opacity-0 slide-in-left-with-delay">
          <img
            src={roboHand}
            alt="Robotic Hand"
            className="
              w-full
              h-full
              object-contain
              golden-glow
            "
          />
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div
        className="
          relative
          z-20
          w-full
          max-w-7xl
          mx-auto
          px-4
          text-center
          flex
          flex-col
          items-center
          justify-center
          transition-all
          duration-300
          ease-out
        "
        style={{
          opacity: Math.max(0, 1 - scrollY / 500),
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >

        <div className="relative w-full min-h-[180px] flex items-center justify-center">

          {/* WELCOME TEXT */}
          <h1
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              font-extrabold
              tracking-tight
              leading-tight
              text-[clamp(1rem,5vw,5rem)]
            "
          >
            <ColoredTextWrapper
              segments={[
                { text: 'Welcome to ', color: '#F4B942' },
                { text: 'Soul', color: '#00CFC8' },
                { text: '3', color: '#F4B942' },
              ]}
              className="welcome-text"
            />
          </h1>

          {/* MAIN HEADLINE */}
          <h1
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-center
              font-extrabold
              tracking-tight
              leading-tight
              px-4
              max-w-[95vw]
              mx-auto
text-[clamp(1.5rem,4vw,4.5rem)]            "
          >
            <ColoredTextWrapper
              segments={[
                { text: 'Seva', color: '#00CFC8' },
                { text: ' ', color: '#F4B942' },
                { text: 'Of Uplifting', color: '#F4B942' },
                { text: ' ', color: '#F4B942' },
                { text: 'Life', color: '#00CFC8' },
              ]}
              className="headline-text"
            />
          </h1>

        </div>
      </div>

      {/* CENTER GLOW */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
          z-0
        "
      >
        <div
          className="
            w-[70vw]
            h-[70vw]
            max-w-[900px]
            max-h-[900px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10"></div>

    </div>
  );
};