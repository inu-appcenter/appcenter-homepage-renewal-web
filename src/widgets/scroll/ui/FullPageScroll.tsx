'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ScrollContext } from 'entities/scroll';

interface FullPageScrollProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}
export const FullPageScroll = ({ children, header }: FullPageScrollProps) => {
  const [currentY, setCurrentY] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 페이지 변경 시 초기화
  useEffect(() => {
    setIsChanging(true);
    isAnimating.current = false;

    const handleHashScroll = () => {
      const hash = window.location.hash;

      if (hash) {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
          const windowHeight = window.innerHeight;
          const sectionIndex = Math.round(element.offsetTop / windowHeight);
          const exactY = sectionIndex * windowHeight;

          setCurrentY(exactY);
        }
      } else {
        setCurrentY(0);
      }

      setTimeout(() => {
        setIsChanging(false);
      }, 100);
    };

    const timer = setTimeout(handleHashScroll, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  const scrollToId = (id: string) => {
    if (isMobile) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (!containerRef.current) return;
    const element = document.getElementById(id);

    if (element) {
      const targetY = element.offsetTop;

      if (targetY !== currentY) {
        isAnimating.current = true;
        setCurrentY(targetY);
      }
    }
  };

  const scrollToNext = (direction: 1 | -1) => {
    if (!containerRef.current || isMobile) return;

    const viewHeight = window.innerHeight;
    const contentHeight = containerRef.current.scrollHeight;
    const maxScroll = contentHeight - viewHeight;

    let nextY = currentY;

    if (direction > 0) {
      nextY = Math.ceil((currentY + 1) / viewHeight) * viewHeight;
      if (nextY > maxScroll) nextY = maxScroll;
    } else {
      nextY = Math.floor((currentY - 1) / viewHeight) * viewHeight;
      if (nextY < 0) nextY = 0;
    }

    if (nextY !== currentY) {
      isAnimating.current = true;
      setCurrentY(nextY);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile || isAnimating.current || isChanging) return;
    if (Math.abs(e.deltaY) < 20) return;
    scrollToNext(e.deltaY > 0 ? 1 : -1);
  };

  return (
    <ScrollContext.Provider value={{ scrollToId }}>
      {header}
      <div
        className={`inset-0 overflow-hidden ${isMobile ? 'relative overflow-y-auto' : 'fixed overscroll-none'} touch-pan-y`}
        onWheel={handleWheel}
        style={{ visibility: isChanging ? 'hidden' : 'visible' }}
      >
        <motion.div
          ref={containerRef}
          className="flex w-full flex-col"
          animate={{ y: isMobile ? 0 : -currentY }}
          transition={isChanging || isMobile ? { duration: 0 } : { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          onAnimationComplete={() => {
            isAnimating.current = false;
          }}
        >
          {children}
        </motion.div>
      </div>
    </ScrollContext.Provider>
  );
};
