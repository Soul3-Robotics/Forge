import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Timeline, stagger } from 'animejs';
import gsap from 'gsap';
import logo from '../assets/favicon.png';

const ColoredTextWrapper = ({
  segments,
  className = "",
}: {
  segments: Array<{ text: string; color: string }>;
  className?: string;
}) => (
  <span className={`inline-block ${className}`}>
    {segments.map((segment, segIdx) => {
      const words = segment.text.split(/(\s+)/);
      return words.map((word, wordIdx) => {
        if (!word) return null;
        if (word.trim() === '') {
          return <span key={`${segIdx}-${wordIdx}`} style={{ whiteSpace: 'pre' }}>{word}</span>;
        }
        return (
          <span
            key={`${segIdx}-${wordIdx}`}
            className="word inline-block"
            style={{
              opacity: 0,
              transform: 'translateZ(-800px) rotateX(-90deg) translateY(-100px)',
              color: segment.color,
            }}
          >
            {word}
          </span>
        );
      });
    })}
  </span>
);

interface HeroSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollContainerRef,
}) => {
  const [scrollY, setScrollY] = useState(0);

  const handleAutoScroll = () => {
    const scrollObj = { y: window.scrollY };
    gsap.to(scrollObj, {
      y: 5500, // Exact scroll depth where "About Us" settles on the new 12-second timeline
      duration: 8, // Cinematic slow scroll scaled up for the longer gap
      ease: 'power2.inOut',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      }
    });
  };

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
    tl.add('.welcome-text .word', {
      translateZ: [-800, 0],   // Fly forward from deep background
      translateY: [-100, 0],   // Drop down slightly
      rotateX: [-90, 0],       // Flip forward on the X axis
      opacity: [0, 1],
      delay: stagger(150, { start: 200 }), // Smooth, paced cascade
      duration: 1600,
      ease: 'easeOutElastic(1, .8)', // Gentle bouncy landing, like floating
    })

      // @ts-ignore
      .add('.welcome-text .word', {
        translateZ: [0, 800],   // Fly past the camera towards the viewer
        rotateX: [0, 90],       // Flip away
        opacity: [1, 0],
        delay: stagger(100),
        duration: 1000,
        ease: 'easeInQuint',
      }, '+=1500')

      // @ts-ignore
      .add('.headline-text .word', {
        translateZ: [-800, 0],
        translateY: [-100, 0],
        rotateX: [-90, 0],
        opacity: [0, 1],
        delay: stagger(150),
        duration: 1600,
        ease: 'easeOutElastic(1, .8)',
      }, '-=600')

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

      {/* Cinematic Auto-Scroll Button */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 transition-all duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollY / 200),
          pointerEvents: scrollY > 200 ? 'none' : 'auto'
        }}
      >
        <button
          onClick={handleAutoScroll}
          className="w-32 h-32 rounded-full border-0 bg-transparent text-[#00CFC8] flex items-center justify-center hover:text-[#F4B942] hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,207,200,0.5)] group relative cursor-pointer"
        >
          {/* Spinning Curved Text */}
          <div className="relative w-full h-full animate-[spin_12s_linear_infinite] text-[11px] font-bold tracking-widest uppercase">
            {"click for immersive experience • ".split("").map((char, i, arr) => (
              <span
                key={i}
                className="absolute left-1/2 top-0"
                style={{
                  transformOrigin: '50% 64px',
                  transform: `translateX(-50%) rotate(${i * (360 / arr.length)}deg)`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* Central Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="SOUL3 Logo"
              className="w-12 h-12 object-contain group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(244,185,66,0.6)]"
            />
          </div>
        </button>
      </div>

    </div>
  );
};