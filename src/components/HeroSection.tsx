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
        className="letter inline-block bg-linear-to-r from-red-700 to-orange-500 bg-clip-text text-transparent" 
        style={{ opacity: 0, transform: 'translateY(100px)' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
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
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-zinc-950">
      

      {/* Corner Images */}
      {/* Top Right Hand */}
      <div 
        className="absolute top-0 right-0 w-3/4 md:w-1/2  z-10 pointer-events-none"
        style={{ 
          willChange: 'transform',
          transform: `translate(${scrollY * 1.2}px, -${scrollY * 0.8}px)` 
        }}
      >
        <div className="w-full h-full animate-slide-in-right opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <img 
            src={robo2} 
            alt="Exoskeleton Detail" 
            className="w-full h-full object-cover mask-[linear-gradient(to_bottom_left,black_50%,transparent_100%)]" 
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
         <div className="w-full h-full animate-slide-in-left opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <img 
            src={roboHand} 
            alt="Robotic Hand" 
            className="w-full h-full object-cover mask-[linear-gradient(to_top_right,black_50%,transparent_100%)]" 
          />
         </div>
      </div>

      {/* Content Overlay */}
      <div 
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center h-[200px] justify-center transition-opacity duration-300 ease-out"
        style={{ 
          opacity: Math.max(0, 1 - scrollY / 300),
          transform: `translateY(${scrollY * 1.2}px)` // Parallax effect
        }} 
      >
          <div className="relative w-full">
              {/* Welcome Text */}
              <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight pb-4 leading-normal">
                  <TextWrapper text="Welcome to Forge" className="welcome-text" />
              </h1>

              {/* Main Headline */}
              <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-2xl sm:text-5xl md:text-7xl font-extrabold tracking-tight whitespace-nowrap pb-4 leading-normal">
                  <TextWrapper text="Human Strength. Engineered." className="headline-text" />
              </h1>
          </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10"></div>
    </div>
  );
};
