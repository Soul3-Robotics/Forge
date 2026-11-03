import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import customSkyBg from '../../assets/background.webp';
import customFloorBg from '../../assets/floor.webp';

interface ParallaxLayer {
  src: string;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width: string;
  scale?: number;
}

interface ParallaxHeroProps {
  active?: boolean;
  layers?: ParallaxLayer[];
  children?: React.ReactNode;
  className?: string;
}

const defaultLayers: ParallaxLayer[] = [
  {
    src: customSkyBg,
    alt: 'background',
    speedX: 0.03,
    speedY: 0.038,
    speedZ: 0,
    rotation: 0,
    distance: -200,
    zIndex: 1,
    initialTop: 'calc(50% - 50px)',
    initialLeft: 'calc(50% + 0px)',
    width: '3200px',
    scale: 1.1,
  },
  {
    src: customFloorBg,
    alt: 'foreground-floor',
    speedX: 0.05,
    speedY: 0.03,
    speedZ: 0.03,
    rotation: 0.1,
    distance: 4500,
    zIndex: 50,
    initialTop: 'calc(27% + 250px)',
    initialLeft: '50%',
    width: '3500px',
    scale: 1.15,
  },
];

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  active = true,
  layers = defaultLayers,
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          const newXValue = pointerX - window.innerWidth / 2;
          const newYValue = pointerY - window.innerHeight / 2;
          const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;

          updateLayers(pointerX, newXValue, newYValue, newRotateDegree);
          frame = 0;
        });
      }
    };

  const updateLayers = (
    cursorPosition: number,
    xVal: number,
    yVal: number,
    rotateDeg: number
  ) => {
    layerRefs.current.forEach((el, index) => {
      if (!el) return;

      const layer = layers[index];
      const { speedX, speedY, speedZ, rotation } = layer;

      const computedLeft = window.innerWidth / 2;
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      el.style.transform = `perspective(2300px) translateZ(${zValue * speedZ
        }px) rotateY(${rotateDeg * rotation}deg) translateX(calc(-50% + ${-xVal * speedX
        }px)) translateY(calc(-50% + ${yVal * speedY}px)) scale(${layer.scale || 1})`;
    });

    if (textRef.current) {
      const textSpeedX = 0.07;
      const textSpeedY = 0.05;
      const textSpeedZ = 0.08;
      const textRotation = 0.04;

      const computedLeft = window.innerWidth / 2;
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      textRef.current.style.transform = `perspective(2300px) translateZ(${zValue * textSpeedZ
        }px) rotateY(${rotateDeg * textRotation}deg) translateX(calc(-50% + ${-xVal * textSpeedX
        }px)) translateY(calc(-50% + ${yVal * textSpeedY}px))`;
    }
  };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [active, layers]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800',
        className
      )}
    >
      <div className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_65%,rgba(0,0,0,0.7))]" />

      {layers.map((layer, index) => (
        <img
          key={index}
          ref={(el) => {
            if (el) layerRefs.current[index] = el;
          }}
          src={layer.src}
          alt={layer.alt}
          fetchPriority="high"
          decoding="async"
          className={cn(
            'absolute pointer-events-none transition-transform duration-[450ms] ease-out',
            layer.className
          )}
          style={{
            width: layer.width,
            top: layer.initialTop,
            left: layer.initialLeft,
            zIndex: layer.zIndex,
            transform: `translate(-50%, -50%) scale(${layer.scale || 1})`,
          }}
        />
      ))}

      <div
        ref={textRef}
        className="absolute z-[30] pointer-events-auto transition-transform duration-[450ms] ease-out flex flex-col items-center justify-center w-full"
        style={{
          top: 'calc(50% - 0px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxHero;
