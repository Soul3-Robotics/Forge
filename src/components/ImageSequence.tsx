import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Import all frames eagerly
// @ts-ignore
const frameModules = import.meta.glob('../assets/frames/*.jpg', { eager: true });
const frames = Object.keys(frameModules)
  .sort()
  .map(path => (frameModules[path] as { default: string }).default);

interface ImageSequenceProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({ containerRef }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const desc1Ref = useRef<HTMLParagraphElement>(null);
  const desc2Ref = useRef<HTMLParagraphElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    if (frames.length === 0) {
      console.warn("No frames found for ImageSequence");
      setIsLoaded(true); // Prevent stuck loading state
      return;
    }

    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    frames.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frames.length) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
         console.error(`Failed to load frame: ${src}`);
         loadedCount++; // Count as handled to avoid blocking
         if (loadedCount === frames.length) {
          setIsLoaded(true);
        }
      };
      loadedImages[index] = img; // Ensure order
    });
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const render = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = images[Math.round(index)];
      if (!img) return;

      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas resolution to match display resolution
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale context to ensure correct drawing operations
      ctx.scale(dpr, dpr);
      
      // Apply scale and opacity from visualProps if available
      // @ts-ignore
      const currentOpacity = visualProps?.opacity ?? 1;

      ctx.globalAlpha = currentOpacity;
      
      // Draw image with "contain" behavior
      const canvasAspect = rect.width / rect.height;
      const imgAspect = img.width / img.height;
      
      let renderWidth, renderHeight;

      if (canvasAspect > imgAspect) {
        renderHeight = rect.height * 0.6; // Use 50% of height
        renderWidth = renderHeight * imgAspect;
      } else {
        renderWidth = rect.width * 0.6; // Use 50% of width
        renderHeight = renderWidth / imgAspect;
      }
      
      const offsetX = (rect.width - renderWidth) / 2;
      const offsetY = (rect.height - renderHeight) / 2; // Move up by 10% of screen height

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const playhead = { frame: 0 };
    
    // Animation object for opacity only
    const visualProps = { opacity: 0 };

    const ctx = gsap.context(() => {
      // 1. Scale/Fade In Animation (Entry)
      gsap.to(visualProps, {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: targetRef.current,
          scroller: containerRef?.current || window,
          start: "top 100%", // Start animation earlier for smoother overlap
          end: "top 20%",   // End animation when top of container hits 20% of viewport
          scrub: 1,         // Smooth scrubbing
        },
        onUpdate: () => {
             // Force re-render to apply new scale/opacity
             render(playhead.frame);
        }
      });

      // 2. Frame Sequence Animation (Scroll through frames)
      gsap.to(playhead, {
        frame: frames.length - 1,
        ease: "none", // Linear mapping to scroll
        scrollTrigger: {
          trigger: targetRef.current,
          scroller: containerRef?.current || window,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Smooth scrubbing
        },
        onUpdate: () => {
          render(playhead.frame);
        }
      });
      // 3. Text Animations (Vision of Forge)
      // Both texts appear together near the end (approx frame 28-30 of 32)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetRef.current,
          scroller: containerRef?.current || window,
          start: "65% center", // Start significantly later (when 85% of section hits center)
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Ensure elements are visible to GSAP by setting initial state immediately
      gsap.set([text1Ref.current, text2Ref.current], { opacity: 0, scale: 0.9, visibility: 'visible' });
      // Set text content to empty for typing effect
      const title1Text = "Independence";
      const desc1Text = "Empowering autonomy through neural connection.";
      const title2Text = "Strength & Rehabilitation";
      const desc2Text = "Restoring physical capability with adaptive engineering.";
      
      if (title1Ref.current) title1Ref.current.innerText = "";
      if (desc1Ref.current) desc1Ref.current.innerText = "";
      if (title2Ref.current) title2Ref.current.innerText = "";
      if (desc2Ref.current) desc2Ref.current.innerText = "";

      // Reveal containers
      tl.to([text1Ref.current, text2Ref.current], 
        { opacity: 1, scale: 1, duration: 0.5 }
      )
      // Typewriter effects - slower speed (increased duration)
      .to(title1Ref.current, { text: title1Text, duration: 2, ease: "none" }, "-=0.2")
      .to(desc1Ref.current, { text: desc1Text, duration: 3, ease: "none" }, "-=1")
      .to(title2Ref.current, { text: title2Text, duration: 2, ease: "none" }, "-=2") // Overlap
      .to(desc2Ref.current, { text: desc2Text, duration: 3, ease: "none" }, "-=1");
      
    }, targetRef); // Scope to component

    // Initial render
    // render(0); // Removing initial render to avoid flash of full opacity/scale before GSAP kicks in

    // Handle resize
    const handleResize = () => render(playhead.frame);
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert(); // Cleanup GSAP
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images]);

  return (
    <div ref={targetRef} className="h-[300vh] relative -mt-[30vh] z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-8 md:px-20 max-w-full mx-auto z-50 w-full">
          <div className="text-left flex items-center gap-4 pl-8 md:pl-24 lg:pl-10" ref={text1Ref} style={{ opacity: 0, visibility: 'hidden' }}>
             <div>
                <h3 ref={title1Ref} className="text-2xl md:text-3xl font-bold text-red-500 mb-2 font-mono tracking-tight min-h-12">Independence</h3>
                <p ref={desc1Ref} className="text-gray-300 max-w-[200px] md:max-w-xs text-sm md:text-base shadow-black drop-shadow-md bg-black/80 border border-red-500/20 p-4 rounded-lg backdrop-blur-md font-mono min-h-20">Empowering autonomy through neural connection.</p>
             </div>
          </div>
          <div className="text-right flex items-center gap-4 pr-8 md:pr-24 lg:pr-1" ref={text2Ref} style={{ opacity: 0, visibility: 'hidden' }}>
            <div>
                <h3 ref={title2Ref} className="text-2xl md:text-3xl font-bold text-orange-500 mb-2 font-mono tracking-tight min-h-12 md:min-h-18">Strength &<br/>Rehabilitation</h3>
                <p ref={desc2Ref} className="text-gray-300 max-w-[200px] md:max-w-xs ml-auto text-sm md:text-base shadow-black drop-shadow-md bg-black/80 border border-orange-500/20 p-4 rounded-lg backdrop-blur-md font-mono min-h-20">Restoring physical capability with adaptive engineering.</p>
            </div>
          </div>
        </div>

        {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/50 text-sm animate-pulse">Initializing Sequence...</div>
            </div>
        )}
      </div>
    </div>
  );
};
