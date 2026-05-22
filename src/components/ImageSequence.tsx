import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import all frames eagerly
// @ts-ignore
const frameModules = import.meta.glob('../assets/frames/*.png', {
  eager: true,
});

const frames = Object.keys(frameModules)
  .sort()
  .map(
    (path) => (frameModules[path] as { default: string }).default
  );

interface ImageSequenceProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({
  containerRef,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // PRELOAD IMAGES
  useEffect(() => {
    if (frames.length === 0) {
      console.warn('No frames found');
      setIsLoaded(true);
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

        loadedCount++;

        if (loadedCount === frames.length) {
          setIsLoaded(true);
        }
      };

      loadedImages[index] = img;
    });

    setImages(loadedImages);
  }, []);

  // MAIN EFFECT
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const playhead = { frame: 0 };

    const visualProps = {
      opacity: 0,
    };

    // FULLSCREEN CINEMATIC RENDER
    const render = (index: number) => {
      const img = images[Math.round(index)];

      if (!img) return;

      const dpr = window.devicePixelRatio || 1;

      const rect = canvas.getBoundingClientRect();

      // RESET SCALE EACH RENDER
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      // Enable high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.globalAlpha = visualProps.opacity;

      const canvasAspect = rect.width / rect.height;
      const imgAspect = img.width / img.height;

      let drawWidth;
      let drawHeight;

      let offsetX = 0;
      let offsetY = 0;

      // CONTAIN BEHAVIOR - No zoom, fit entire image
      if (imgAspect > canvasAspect) {
        drawWidth = rect.width;
        drawHeight = drawWidth / imgAspect;

        offsetY = (rect.height - drawHeight) / 2;
      } else {
        drawHeight = rect.height;
        drawWidth = drawHeight * imgAspect;

        offsetX = (rect.width - drawWidth) / 2;
      }

      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
    };

    const gsapContext = gsap.context(() => {

      // ENTRY FADE
      gsap.to(visualProps, {
        opacity: 1,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: targetRef.current,
          scroller: containerRef?.current || window,
          start: 'top 100%',
          end: 'top 20%',
          scrub: 0.8,
        },

        onUpdate: () => {
          render(playhead.frame);
        },
      });

      // FRAME SEQUENCE
      gsap.to(playhead, {
        frame: frames.length - 1,
        ease: 'none',

        scrollTrigger: {
          trigger: targetRef.current,
          scroller: containerRef?.current || window,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },

        onUpdate: () => {
          render(playhead.frame);
        },
      });

    }, targetRef);

    // INITIAL RENDER
    render(0);

    // RESIZE
    const handleResize = () => {
      render(playhead.frame);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      gsapContext.revert();

      window.removeEventListener(
        'resize',
        handleResize
      );
    };
  }, [isLoaded, images]);

  return (
    <div
      ref={targetRef}
      className="relative z-10 w-full"
      style={{ height: '400vh' }}
    >

      {/* STICKY FULLSCREEN CINEMATIC */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* FULLSCREEN CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* CINEMATIC DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* VIGNETTE */}
        <div
          className="
            absolute
            inset-0
            z-20
            pointer-events-none
            bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.75)_100%)]
          "
        />

        {/* LOADER */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="text-white/50 text-sm animate-pulse">
              Initializing Sequence...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};