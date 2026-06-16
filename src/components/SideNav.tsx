import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Welcome', scrollPos: 0 },
  { id: 'about', label: 'About Us', scrollPos: 6000 },
  { id: 'mission', label: 'Our Mission', scrollPos: 9000 },
  { id: 'product', label: 'Our Product', scrollPos: 11000 }
];

export const SideNav = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Highlight the section the user is currently closest to
      let closestIdx = 0;
      let minDiff = Infinity;
      
      sections.forEach((section, idx) => {
        const diff = Math.abs(scrollY - section.scrollPos);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      
      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (scrollPos: number) => {
    window.scrollTo({
      top: scrollPos,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8">
      {sections.map((section, idx) => {
        const isActive = activeIdx === idx;
        return (
          <div key={section.id} className="relative group flex items-center">
            <button
              onClick={() => scrollToSection(section.scrollPos)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                isActive 
                  ? 'bg-[#00CFC8] scale-150 shadow-[0_0_15px_rgba(0,207,200,0.8)]' 
                  : 'bg-gray-600 hover:bg-gray-400 hover:scale-110'
              }`}
              aria-label={section.label}
            />
            {/* Section Label */}
            <span className={`
              absolute right-8 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-md 
              text-sm text-white font-medium whitespace-nowrap 
              transition-all duration-300 pointer-events-none border border-white/10
              ${isActive ? 'opacity-100 translate-x-0 shadow-lg' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}
            `}>
              {section.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
