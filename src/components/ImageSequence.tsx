import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

      // Draw image with "contain" behavior
      const canvasAspect = rect.width / rect.height;
      const imgAspect = img.width / img.height;
      
      let renderWidth, renderHeight;

      if (canvasAspect > imgAspect) {
        renderHeight = rect.height * 0.8; // Use 80% of height
        renderWidth = renderHeight * imgAspect;
      } else {
        renderWidth = rect.width * 0.8; // Use 80% of width
        renderHeight = renderWidth / imgAspect;
      }
      
      const offsetX = (rect.width - renderWidth) / 2;
      const offsetY = (rect.height - renderHeight) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const playhead = { frame: 0 };

    const ctx = gsap.context(() => {
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
    }, targetRef); // Scope to component

    // Initial render
    render(0);

    // Handle resize
    const handleResize = () => render(playhead.frame);
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert(); // Cleanup GSAP
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images]);

  return (
    <div ref={targetRef} className="h-[300vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/50 text-sm animate-pulse">Initializing Sequence...</div>
            </div>
        )}
      </div>
    </div>
  );
};
