import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Timeline, stagger } from 'animejs';
import roboHand from '../assets/Robo hand.jpg';
import robo2 from '../assets/robo 2.jpg';


const TextWrapper = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`inline-block ${className}`}>
    {text.split('').map((char, index) => (
      <span 
        key={index} 
        className="letter inline-block" 
        style={{ opacity: 0, transform: 'translateY(100px)', color: '#F4B942' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

const ColoredTextWrapper = ({ 
  segments, 
  className = "" 
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
          style={{ opacity: 0, transform: 'translateY(100px)', color: segment.color }}
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

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollContainerRef }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        // Use requestAnimationFrame for smoother updates
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

  useEffect(() => {
    // Initial setup
    const tl = new Timeline({
      duration: 1000,
      defaults: {
        ease: 'outExpo'
      }
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
      ease: 'outQuad'
    }, '-=800');

  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center hero-section">

      {/* Robotic Hands */}
      {/* Top Right Hand */}
      <div 
        className="absolute top-0 right-0 w-3/4 md:w-1/2  z-10 pointer-events-none"
        style={{ 
          willChange: 'transform',
          transform: `translate(${scrollY * 1.2}px, -${scrollY * 0.8}px)` 
        }}
      >
        <div className="w-full h-full animate-slide-in-right opacity-0 slide-in-right-with-delay">
          <img 
            src={robo2} 
            alt="Exoskeleton Detail" 
            className="w-full h-full object-cover mask-[linear-gradient(to_bottom_left,black_50%,transparent_100%)] golden-glow" 
          />
        </div>
      </div>

      {/* Bottom Left Hand */}
      <div 
        className="absolute bottom-0 left-0 w-3/4 md:w-1/2 z-10 pointer-events-none"
        style={{ 
          willChange: 'transform',
          transform: `translate(-${scrollY * 1.2}px, ${scrollY * 0.8}px)`
        }}
      >
         <div className="w-full h-full animate-slide-in-left opacity-0 slide-in-left-with-delay">
          <img 
            src={roboHand} 
            alt="Robotic Hand" 
            className="w-full h-full object-cover mask-[linear-gradient(to_top_right,black_50%,transparent_100%)] golden-glow" 
          />
         </div>
      </div>

      {/* Content Overlay */}
      <div 
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center h-[200px] justify-center transition-opacity duration-300 ease-out"
        style={{ 
          opacity: Math.max(0, 1 - scrollY / 500), // Slower fade out
          transform: `translateY(${scrollY * 0.5}px)` // Reduced parallax speed for better continuity
        }} 
      >
          <div className="relative w-full">
              {/* Welcome Text */}
              <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight pb-4 leading-normal">
                  <ColoredTextWrapper 
                    segments={[
                      { text: 'Welcome to ', color: '#F4B942' },
                      { text: 'Soul', color: '#00CFC8' },
                      { text: '3', color: '#F4B942' }
                    ]}
                    className="welcome-text" 
                  />
              </h1>

              {/* Main Headline */}
              <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-2xl sm:text-5xl md:text-7xl font-extrabold tracking-tight whitespace-nowrap pb-4 leading-normal">
                  <ColoredTextWrapper 
                    segments={[
                      { text: 'Seva', color: '#00CFC8' },
                      { text: ' ', color: '#F4B942' },
                      { text: 'Of Uplifting', color: '#F4B942' },
                      { text: ' ', color: '#F4B942' },
                      { text: 'Life', color: '#00CFC8' }
                    ]}
                    className="headline-text" 
                  />
              </h1>
          </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10"></div>
    </div>
  );
};
