import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import customSkyBg from '../../assets/background.png';
import customFloorBg from '../../assets/floor.png';

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
  /*
    {
      src: 'https://cdn.21st.dev/assets/mirror/e9/e94a2247aa54feee12cd1580a7c3abf97d6f55bbe7e50006d8dda6e4dffbe921.png',
      alt: 'mountain-10',
      speedX: 0.095,
      speedY: 0.005,
      speedZ: 0,
      rotation: 0,
      distance: 1110,
      zIndex: 3,
      initialTop: 'calc(50% + 169px)',
      initialLeft: 'calc(50% + 330px)',
      width: '1200px',
    },
  
    {
      src: 'https://cdn.21st.dev/assets/mirror/dd/dd999609be149c46fcb65fce4d267cad8d5651b0c31901b399054da5146cb46e.png',
      alt: 'mountain-9',
      speedX: 0.125,
      speedY: 0.155,
      speedZ: 0.15,
      rotation: 0.02,
      distance: 1700,
      zIndex: 51,
      initialTop: 'calc(50% + 313px)',
      initialLeft: 'calc(50% - 557px)',
      width: '670px',
    },
  
    {
      src: 'https://cdn.21st.dev/assets/mirror/b7/b74be54427fd5b9568571ba97684bc8a4334d366a3f3b32c353d31fd1501c09b.png',
      alt: 'mountain-7',
      speedX: 0.1,
      speedY: 0.1,
      speedZ: 0,
      rotation: 0.09,
      distance: 2000,
      zIndex: 19,
      initialTop: 'calc(50% + 223px)',
      initialLeft: 'calc(50% + 495px)',
      width: '738px',
    },
    {
      src: 'https://cdn.21st.dev/assets/mirror/ed/edf306a4225b6188283aa94ecec1553b2e0855038a3acaed402001f38c64af1d.png',
      alt: 'mountain-6',
      speedX: 0.065,
      speedY: 0.05,
      speedZ: 0.05,
      rotation: 0.12,
      distance: 2300,
      zIndex: 18,
      initialTop: 'calc(50% + 120px)',
      initialLeft: 'calc(50% + 590px)',
      width: '408px',
    },
  
    {
      src: 'https://cdn.21st.dev/assets/mirror/9c/9c1a1b7f4b165011788c27d440d920e407d70f148cbc9a01eacfecb49126efcb.png',
      alt: 'mountain-5',
      speedX: 0.08,
      speedY: 0.05,
      speedZ: 0.13,
      rotation: 0.1,
      distance: 2550,
      zIndex: 12,
      initialTop: 'calc(50% + 320px)',
      initialLeft: 'calc(50% + 230px)',
      width: '725px',
    },
  
    {
      src: 'https://cdn.21st.dev/assets/mirror/fa/fa0946f924ad025b207616cfe20ce022bcccd22ac9db4038a584ace23b7d9721.png',
      alt: 'mountain-4',
      speedX: 0.059,
      speedY: 0.024,
      speedZ: 0.35,
      rotation: 0.14,
      distance: 3200,
      zIndex: 15,
      initialTop: 'calc(50% + 196px)',
      initialLeft: 'calc(50% - 698px)',
      width: '1100px',
    },
    {
      src: 'https://cdn.21st.dev/assets/mirror/90/90863919566208c1eb7a78136d1dd493dd402f4d5a5efe2fc890a288a6b07449.png',
      alt: 'mountain-3',
      speedX: 0.04,
      speedY: 0.018,
      speedZ: 0.32,
      rotation: 0.05,
      distance: 3400,
      zIndex: 20,
      initialTop: 'calc(50% - 20px)',
      initialLeft: 'calc(50% + 750px)',
      width: '630px',
    },
  
    {
      src: 'https://cdn.21st.dev/assets/mirror/c4/c4ae700b3a0070eae9f3c005a17572ae68fcb8373d322f279d28c5bf19cd501d.png',
      alt: 'mountain-2',
      speedX: 0.0235,
      speedY: 0.013,
      speedZ: 0.42,
      rotation: 0.15,
      distance: 3800,
      zIndex: 17,
      initialTop: 'calc(50% + 256px)',
      initialLeft: 'calc(50% + 528px)',
      width: '800px',
    },
    {
      src: 'https://cdn.21st.dev/assets/mirror/41/414097ad4507410ac1dc884afcc92bb3f4f45763fd17b2986bf82dd43c31da97.png',
      alt: 'mountain-1',
      speedX: 0.027,
      speedY: 0.018,
      speedZ: 0.53,
      rotation: 0.2,
      distance: 4000,
      zIndex: 18,
      initialTop: 'calc(50% + 196px)',
      initialLeft: 'calc(50% - 728px)',
      width: '1100px',
    },
  */
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
  layers = defaultLayers,
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const newXValue = e.clientX - window.innerWidth / 2;
          const newYValue = e.clientY - window.innerHeight / 2;
          const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;

          updateLayers(e.clientX, newXValue, newYValue, newRotateDegree);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
