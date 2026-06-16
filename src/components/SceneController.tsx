import React, { useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection } from './HeroSection';
import { AboutUs } from './AboutUs';
import { OurMission } from './OurMission';
import { OurProduct } from './OurProduct';
import { AnimatedShaderBackground } from './ui/animated-shader-background';
import { Canvas } from '@react-three/fiber';
import { ExoskeletonModel } from './ExoskeletonModel';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export const SceneController: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const cinematicTextRef = useRef<HTMLDivElement>(null);
  const exoModelRef = useRef<THREE.Group>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  
  // Proxy object to guarantee GSAP always has a target synchronously, bypassing R3F async mount issues
  const exoProxy = useRef({ scale: 0, posX: 2, posY: -2, posZ: 0, rotY: 0 });
  
  const [bgClass, setBgClass] = useState('bg-black');

  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;

    // Setup initial positions
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        if (index === 0) {
          gsap.set(section, { z: 0, xPercent: 0, opacity: 1 });
        } else if (index === 1) {
          gsap.set(section, { z: 0, y: 50, opacity: 0 }); // Fade/slide up instead of slide left
        } else {
          gsap.set(section, { z: -(index - 1) * 2000, xPercent: 0, opacity: 0 });
        }
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=12000",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const t = self.progress * 12; // 12 seconds total timeline
          if (t < 4.5) setBgClass('bg-black');
          else setBgClass('bg-[#2c1a10]'); // Blank brown color background for everything after zoom
        }
      }
    });

    // 1. Hero slides out (t=0 to t=1.5)
    tl.to(sectionsRef.current[0], { xPercent: -100, duration: 1.5, ease: "power1.inOut" }, 0);

    // Fly the shooting stars out to the right as the Hero section leaves
    const shaderState = { starOffsetX: 0.0 };
    tl.to(shaderState, {
      starOffsetX: -2.5, // -2.5 shifts the UV space left, pushing the stars visually right
      duration: 1.5,
      ease: "power2.in", // Accelerate out of frame
      onUpdate: () => {
        if (shaderRef.current) {
          shaderRef.current.setAttribute('data-star-offset-x', shaderState.starOffsetX.toString());
        }
      }
    }, 0);

    // Accelerate the clouds seamlessly and change their color to a deep golden hue!
    const speedState = { cloudSpeed: 1.0, r: 0.02, g: 0.25, b: 0.25 };
    tl.to(speedState, {
      cloudSpeed: 20.0, // Major speed up for dramatic effect
      r: 0.12, // Reduced golden red to prevent white blowout
      g: 0.08, // Reduced golden green
      b: 0.02, // Reduced golden blue
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (shaderRef.current) {
          shaderRef.current.setAttribute('data-cloud-speed', speedState.cloudSpeed.toString());
          shaderRef.current.setAttribute('data-cloud-r', speedState.r.toString());
          shaderRef.current.setAttribute('data-cloud-g', speedState.g.toString());
          shaderRef.current.setAttribute('data-cloud-b', speedState.b.toString());
        }
      }
    }, 1.5);

    // Cinematic Text Overlay (Fades in during the hyper-speed gap, fades out before About Us)
    if (cinematicTextRef.current) {
      // Constant cinematic slow zoom
      tl.fromTo(cinematicTextRef.current, 
        { scale: 0.9 }, 
        { scale: 1.3, duration: 3.5, ease: "none" }, 
      1.5);

      // Fade in exactly as clouds speed up
      tl.to(cinematicTextRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.5);

      // Fade out right as About Us settles into place
      tl.to(cinematicTextRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" }, 4.5);
    }

    // GAP 1: t=1.5 to t=3.5 - Empty space, just the shader showing and the cinematic text
    // 2. Freeze clouds and Zoom massively deep into them (t=3.5 to t=5.0)
    const floatState = { cloudSpeed: 20.0 };
    tl.to(floatState, {
      cloudSpeed: 0.0,
      duration: 0.2, // Instantly freeze as zoom starts
      ease: "power2.inOut",
      onUpdate: () => {
        if (shaderRef.current) {
          shaderRef.current.setAttribute('data-cloud-speed', floatState.cloudSpeed.toString());
        }
      }
    }, 3.5);

    if (shaderRef.current) {
      tl.to(shaderRef.current, { scale: 15, duration: 1.5, ease: "power2.in" }, 3.5); // Zoom from 3.5 to 5.0
      tl.to(shaderRef.current, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 4.5); // Fade out fully at 5.0
    }

    // 3. About Us fades up into the blank brown void (t=4.5 to t=6.0)
    tl.to(sectionsRef.current[1], { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 4.5);

    // GAP 2: User reads About Us (t=6.0 to t=7.0)

    // 4. Camera Z Fly (About Us -> Deep sections) from t=7.0 to t=11.0
    tl.to(cameraRef.current, {
      z: 4000,
      ease: "none",
      duration: 4
    }, 7.0);

    // 5. Handle section opacities during the Z fly
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      if (index === 0) {
        // Hero is already off-screen to the left, but fade it out so it's not taking up rendering layers
        tl.to(section, { opacity: 0, duration: 0.1 }, 1.5);
      } 
      else if (index === 1) {
        // About Us vanishes behind the camera as we fly forward (t=7.0 to t=8.0)
        tl.to(section, { opacity: 0, scale: 3, duration: 1.0, ease: "power2.in" }, 7.0);
      } 
      else {
        // Mission (index=2) is reached at t=9. Product (index=3) is reached at t=11.
        const reachTime = index * 2 + 5; 
        
        // Fade in as we approach
        tl.to(section, {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out"
        }, reachTime - 1.0);

        // Fade out as we pass through
        tl.to(section, {
          opacity: 0,
          duration: 1.0,
          ease: "power2.in"
        }, reachTime);
      }
    });

    // 6. Exoskeleton 3D Animation for the Product Section (t=10 to t=12)
    const proxy = exoProxy.current;
    
    // Enable interaction only during the Product section
    if (canvasWrapperRef.current) {
      tl.set(canvasWrapperRef.current, { pointerEvents: "auto" }, 10.0);
    }
    
    // Massive cinematic scale up as the Product text fades in
    tl.to(proxy, {
      scale: 15.0, // Massively increased scale to account for GLB unit differences
      duration: 1.5,
      ease: "back.out(1.2)",
      onUpdate: () => {
        if (exoModelRef.current) {
          exoModelRef.current.scale.setScalar(proxy.scale);
        }
      }
    }, 10.0);

    // Float up into perfect dead center
    tl.to(proxy, {
      posX: 0, // Animate horizontal offset back to 0
      posY: 0, // Animate vertical offset to exact center
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (exoModelRef.current) {
          exoModelRef.current.position.x = proxy.posX;
          exoModelRef.current.position.y = proxy.posY;
        }
      }
    }, 10.0);

    // Graceful 360 degree rotation over the section
    tl.to(proxy, {
      rotY: Math.PI * 2,
      duration: 2.0,
      ease: "none",
      onUpdate: () => {
        if (exoModelRef.current) {
          exoModelRef.current.rotation.y = proxy.rotY;
        }
      }
    }, 10.0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
      {/* 1. Base Dynamic Background */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${bgClass}`}></div>

      {/* 2. Global Shader Background (fades out at depth) */}
      <div ref={shaderRef} className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedShaderBackground className="w-full h-full object-cover" />
      </div>

      {/* Cinematic Storytelling Overlay */}
      <div 
        ref={cinematicTextRef} 
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F4B942] to-[#00CFC8] tracking-tight text-center max-w-5xl px-8 drop-shadow-2xl filter drop-shadow-[0_0_30px_rgba(244,185,66,0.4)]">
          
        </h2>
      </div>

      {/* Global 3D Model Canvas (Z-index above shader but below DOM text) */}
      <div ref={canvasWrapperRef} className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          {/* Initialize scale to 0 and position out of view natively so it's guaranteed hidden on frame 1 */}
          <group ref={exoModelRef} scale={0} position={[2, -2, 0]}>
            <Suspense fallback={null}>
              <ExoskeletonModel />
            </Suspense>
          </group>
        </Canvas>
      </div>

      {/* 3D Viewport for HTML DOM Sections */}
      <div 
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{ perspective: '800px' }}
      >
        <div 
          ref={cameraRef} 
          className="w-full h-full absolute top-0 left-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div ref={el => { sectionsRef.current[0] = el; }} className="absolute inset-0 flex items-center justify-center">
            <HeroSection scrollContainerRef={{ current: null }} />
          </div>

          <div ref={el => { sectionsRef.current[1] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <AboutUs />
          </div>

          <div ref={el => { sectionsRef.current[2] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <OurMission />
          </div>

          <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
            <OurProduct />
          </div>
        </div>
      </div>
    </div>
  );
};
