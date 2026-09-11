import React, { useEffect, useState } from 'react';
import * as anime from 'animejs';
import logo from '../assets/favicon.png';
import ParallaxHero from './ui/wilderness';

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
              color: segment.color,
              marginRight: wordIdx < words.length - 1 ? '0.25em' : '0'
            }}
          >
            {word.split('').map((char, charIdx) => (
              <span
                key={`${segIdx}-${wordIdx}-${charIdx}`}
                className="letter inline-block"
                style={{
                  opacity: 0,
                  transform: 'translateY(100px)'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      });
    })}
  </span>
);

export const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 1) Set up text animations via anime.js
    let tl: any;

    const timer = setTimeout(() => {
      const letters = document.querySelectorAll('.headline-text .letter');
      if (letters.length > 0) {
        tl = (anime as any).timeline({ loop: false })
          .add({
            targets: '.headline-text .letter',
            translateY: [100, 0],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutQuint",
            duration: 2000,
            delay: (anime as any).stagger(40, { start: 500 })
          });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tl) tl.pause();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAutoScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full h-screen relative flex flex-col justify-center overflow-hidden bg-black hero-section">

      {/* 3D Parallax Background taking full height/width */}
      <div className="absolute inset-0 z-0">
        <ParallaxHero>
          <div className="relative z-20 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 pointer-events-none mt-[-100px]">

            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00CFC8]/30 bg-[#00CFC8]/10 mb-8 mt-16 sm:mt-0 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards] transform translate-y-4"
            >
              <div className="w-2 h-2 rounded-full bg-[#F4B942] animate-pulse"></div>
              <span className="text-[#00CFC8] text-sm font-semibold tracking-wider uppercase">Project Alpha</span>
            </div>

            {/* Massive 3D Text Container */}
            <div className="relative perspective-1000 w-full flex justify-center mb-16">

              {/* Layer 1: The glowing backdrop shadow (simulating 3D depth lighting) */}
              <h1
                className="
                  absolute
                  w-full
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  text-center
                  font-extrabold
                  tracking-tight
                  leading-tight
                  px-4
                  max-w-[95vw]
                  mx-auto
                  blur-[20px]
                  opacity-40
                  text-[clamp(4.5rem,4vw,4.5rem)]
                "
                style={{
                  transform: "translateZ(-50px) scale(1.05)",
                }}
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

              {/* Layer 2: The actual sharp text */}
              <h1
                className="
                  relative
                  z-10
                  w-full
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  text-center
                  font-extrabold
                  tracking-tight
                  leading-tight
                  px-4
                  max-w-[95vw]
                  mx-auto
                  text-[clamp(4.5rem,4vw,4.5rem)]
                "
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
        </ParallaxHero>
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