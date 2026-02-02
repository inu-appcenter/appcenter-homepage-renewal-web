'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export const BackgroundAnimation = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.duration - video.currentTime < 1.0) {
      setIsEnding(true);
    } else {
      setIsEnding(false);
    }
  };

  const maskImage = useTransform([smoothX, smoothY], ([x, y]) => `radial-gradient(circle 450px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 100%)`);

  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-screen w-screen -translate-x-1/2 overflow-hidden bg-black">
      <div className="absolute inset-0 hidden opacity-10 sm:block">
        <Image src="/images/landing.png" alt="Background Dark" fill className="object-cover" />
      </div>

      <motion.div
        className="absolute inset-0 z-10 hidden sm:block"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage
        }}
      >
        <Image src="/images/landing.png" alt="Background Spotlight" fill className="object-cover" />
      </motion.div>

      <video ref={videoRef} autoPlay muted loop playsInline onTimeUpdate={handleTimeUpdate} className="inline-block h-full w-full object-cover sm:hidden">
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isEnding ? 1 : 0 }} className="pointer-events-none absolute inset-0 bg-black" />

      <div className="to-background absolute inset-0 bg-linear-to-b from-transparent via-transparent" />
    </div>
  );
};
