'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react'; // 'framer-motion'으로 설치하셨다면 이름을 맞춰주세요.
import { usePathname } from 'next/navigation';

export const FullPageScroll = ({ children }: { children: React.ReactNode }) => {
  const [currentY, setCurrentY] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // [추가] 모바일 여부 상태

  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const pathname = usePathname();

  /* -------------------------------
   * 화면 크기 체크 (모바일 여부 확인)
   * ------------------------------- */
  useEffect(() => {
    const checkMobile = () => {
      // 768px 미만을 보통 모바일/태블릿 기준으로 잡습니다.
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* -------------------------------
   * Route 변경 시 초기화
   * ------------------------------- */
  useEffect(() => {
    setIsChanging(true);
    setCurrentY(0);
    isAnimating.current = false;

    const timer = setTimeout(() => {
      setIsChanging(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  const scrollToNext = (direction: 1 | -1) => {
    if (!containerRef.current || isMobile) return; // [수정] 모바일이면 로직 실행 안함

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
    if (isMobile || isAnimating.current || isChanging) return; // [수정] 모바일 제외
    if (Math.abs(e.deltaY) < 20) return;
    scrollToNext(e.deltaY > 0 ? 1 : -1);
  };

  // 터치 이벤트는 모바일에서 브라우저 기본 스크롤을 사용해야 하므로 비활성화하거나 조건부 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMobile || isAnimating.current || isChanging || touchStartY.current === null) return;
    const endY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - endY;
    if (Math.abs(deltaY) < 50) return;
    scrollToNext(deltaY > 0 ? 1 : -1);
    touchStartY.current = null;
  };

  return (
    <div
      className={`inset-0 overflow-hidden ${isMobile ? 'relative overflow-y-auto' : 'fixed overscroll-none'} touch-pan-y`}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
  );
};
