import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({ 
  children, 
  offset = 50, 
  className = "", 
  containerRef 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};

export const FadeInElement = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollScaleElement = ({ 
  children, 
  className = "", 
  containerRef 
}: { 
  children: React.ReactNode; 
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], ["10px", "0px"]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity, filter: blur }}>
        {children}
      </motion.div>
    </div>
  );
};

export const ScaleRevealElement = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
      className={className}
    >
      {children}
    </motion.div>
  );
};
