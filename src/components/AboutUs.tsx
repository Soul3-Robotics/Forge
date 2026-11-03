import { forwardRef, lazy, Suspense, useCallback, useImperativeHandle, useRef, useState } from 'react';
import type { RecoveryGlobeHandle } from './RecoveryGlobe';

const RecoveryGlobe = lazy(() => import('./RecoveryGlobe').then(module => ({ default: module.RecoveryGlobe })));

export interface AboutUsHandle extends RecoveryGlobeHandle {
  preload: () => void;
}

export const AboutUs = forwardRef<AboutUsHandle>((_, ref) => {
  const [requested, setRequested] = useState(false);
  const instance = useRef<RecoveryGlobeHandle | null>(null);
  const progress = useRef(0);
  const active = useRef(false);
  const dive = useRef(0);

  // Preserve navigation that happens while the separate 3D bundle is loading.
  const attachGlobe = useCallback((globe: RecoveryGlobeHandle | null) => {
    instance.current = globe;
    globe?.setProgress(progress.current);
    globe?.setActive(active.current);
    globe?.setDive(dive.current);
  }, []);

  useImperativeHandle(ref, () => ({
    preload: () => setRequested(true),
    setProgress: value => {
      progress.current = value;
      instance.current?.setProgress(value);
    },
    setDive: value => {
      dive.current = value;
      instance.current?.setDive(value);
    },
    setActive: value => {
      active.current = value;
      if (value) setRequested(true);
      instance.current?.setActive(value);
    }
  }), []);

  return (
    <div className="w-full h-screen relative z-10 overflow-hidden flex items-center justify-center pointer-events-none">

      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">

        {/* Expanding Black Container */}
        <div
          className="video-container absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0px_0px_50px_rgba(0,0,0,0.5)] bg-black will-change-[width,height]"
          style={{
            width: '300px',
            height: '400px',
            borderRadius: '16px'
          }}
        ></div>

        {/* Text Layer */}
        <div className="flex items-center justify-center flex-col w-full relative z-10 pointer-events-none">
          <h2 className="title-left text-5xl md:text-7xl lg:text-8xl font-extralight text-white text-center tracking-widest mb-[-10px] will-change-transform">
            decoding
          </h2>
          <h2 className="title-right text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c38c25] to-[#f5dca1] text-center uppercase tracking-tighter will-change-transform">
            SOUL3
          </h2>
        </div>

        {/* Globe Content Box (Fades in during halt) */}
        <div className="globe-wrapper absolute inset-0 pointer-events-auto opacity-0 z-20">
          {requested && <Suspense fallback={null}>
            <RecoveryGlobe ref={attachGlobe} />
          </Suspense>}
        </div>

      </div>
    </div>
  );
});
