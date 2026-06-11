import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Timeline, stagger } from 'animejs';
import { AnimatedShaderBackground } from './ui/animated-shader-background';


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


  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center hero-section">
      {/* SHADER BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedShaderBackground className="w-full h-full object-cover" />
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
              text-[clamp(4.5rem,5vw,5rem)]
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
text-[clamp(4.5rem,4vw,4.5rem)]            "
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