import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import logo from '../assets/favicon.png';
import ParallaxHero from './ui/wilderness';

const ColoredTextWrapper = React.memo<{
  segments: { text: string; color: string }[];
  className?: string;
}>(({ segments, className }) => (
  <span className={`inline-block ${className || ''}`}>
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
                style={{ opacity: 0, display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      });
    })}
  </span>
));

const WELCOME_SEGMENTS = [
  { text: 'Welcome to ', color: '#c38c25ff' },
  { text: 'Soul', color: '#008B87' },
  { text: '3', color: '#c38c25ff' },
];

const HEADLINE_SEGMENTS = [
  { text: 'Seva', color: '#008B87' },
  { text: ' ', color: '#c38c25ff' },
  { text: 'Of Uplifting', color: '#c38c25ff' },
  { text: ' ', color: '#c38c25ff' },
  { text: 'Life', color: '#008B87' },
];

export const HeroSection: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We already have our text split perfectly by ColoredTextWrapper into .letter spans!
    // So we don't need to call text.splitText() and risk overwriting our gold/teal colors.
    // Instead, we directly apply text.scrambleText() and standard animations to our .letter spans!

    const animations: ReturnType<typeof animate>[] = [];
    const timer = setTimeout(() => {
      if (!heroRef.current) return;
      // 1. Typing animation for Welcome text
      animations.push(animate(heroRef.current.querySelectorAll('.welcome-text .letter'), {
        opacity: [0, 1],
        duration: 10,
        delay: stagger(50, { start: 200 })
      }));

      // 2. Typing animation for Main Headline
      animations.push(animate(heroRef.current.querySelectorAll('.headline-text .letter'), {
        opacity: [0, 1],
        duration: 10,
        delay: stagger(40, { start: 1000 })
      }));
    }, 100);

    return () => {
      clearTimeout(timer);
      animations.forEach(animation => animation.revert());
    };
  }, []);



  useEffect(() => {
    if (!active) return;
    const handleScroll = () => {
      const button = scrollButtonRef.current;
      if (!button) return;
      const scrollY = window.scrollY;
      button.style.opacity = String(Math.max(0, 1 - scrollY / 200));
      button.style.pointerEvents = scrollY > 200 ? 'none' : 'auto';
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active]);

  const handleAutoScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={heroRef} className="w-full h-screen relative flex flex-col justify-center overflow-hidden bg-black hero-section">

      {/* 3D Parallax Background taking full height/width */}
      <div className="absolute inset-0 z-0">
        <ParallaxHero active={active}>
          <div className="relative z-20 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 pointer-events-none mt-[-100px]">


            {/* Massive 3D Text Container */}
            <div className="relative perspective-1000 w-full flex flex-col items-center justify-center mb-16 gap-6">

              {/* WELCOME TEXT */}
              <h1
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  text-center
                  font-extrabold
                  tracking-tight
                  leading-tight
                  px-4
                  text-[clamp(4.5rem,4vw,4.5rem)]
                "
              >
                <ColoredTextWrapper
                  segments={WELCOME_SEGMENTS}
                  className="welcome-text"
                />
              </h1>

              {/* The actual sharp text */}
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
                    text-[clamp(2.5rem,3vw,3rem)]
                  "
              >
                <ColoredTextWrapper
                  segments={HEADLINE_SEGMENTS}
                  className="headline-text"
                />
              </h1>
            </div>
          </div>
        </ParallaxHero>
      </div>

      {/* Cinematic Auto-Scroll Button */}
      <div
        ref={scrollButtonRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 transition-all duration-300"
      >
        <button
          onClick={handleAutoScroll}
          className="w-32 h-32 rounded-full border-0 bg-transparent text-[#008B87] flex items-center justify-center hover:text-[#D99C2A] hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,207,200,0.5)] group relative cursor-pointer"
        >
          {/* Spinning Curved Text */}
          <div className="relative w-full h-full animate-[spin_12s_linear_infinite] text-[11px] font-black tracking-widest uppercase" style={{ animationPlayState: active ? 'running' : 'paused' }}>
            {"explore soul 3 technology • ".split("").map((char, i, arr) => (
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