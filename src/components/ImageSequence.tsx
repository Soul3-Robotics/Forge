import React, { useRef } from 'react';
import videoSource from '../assets/video.mp4';

interface ImageSequenceProps {}

export const ImageSequence: React.FC<ImageSequenceProps> = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={targetRef}
      className="relative z-10 w-full"
      style={{ height: '600vh' }}
    >
      {/* STICKY FULLSCREEN SECTION */}
      <div className="sticky top-0 h-screen w-full overflow-visible">
        {/* BACKGROUND VIDEO */}
        <video
          autoPlay
          muted
          loop
          src={videoSource}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};