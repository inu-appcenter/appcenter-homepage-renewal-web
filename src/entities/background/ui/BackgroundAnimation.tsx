'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export const BackgroundAnimation = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  // 브라우저 렌더링 완료 및 모바일 여부 체크용 상태
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  // 1. 화면 크기를 감지하여 모바일 여부 설정
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind의 sm 기준(640px)
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. 데스크탑 마우스 효과
  useEffect(() => {
    if (isMobile) return; // 모바일이면 마우스 이벤트 리스너 불필요

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

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
      {/* 데스크탑 뷰 (모바일이 아닐 때만 렌더링) */}
      {(!isMounted || !isMobile) && (
        <>
          <div className="absolute inset-0 opacity-10">
            <Image src="/images/landing.png" alt="검은 배경에 네온 초록색 윤곽선으로 그려진 키보드 자판 이미지" fill className="object-cover" />
          </div>

          <motion.div
            className="absolute inset-0 z-10"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage
            }}
          >
            <Image src="/images/landing.png" alt="검은 배경에 네온 초록색 윤곽선으로 그려진 키보드 자판 이미지" fill className="object-cover" />
          </motion.div>
        </>
      )}

      {/* 모바일 뷰 (마운트 이후 모바일일 때만 비디오 태그 생성 = 데스크탑에선 영상 다운로드 안 함) */}
      {isMounted && isMobile && (
        <video ref={videoRef} poster="/images/landing.png" autoPlay muted loop playsInline onTimeUpdate={handleTimeUpdate} className="inline-block h-full w-full object-cover">
          <source src="/videos/landing.mp4" type="video/mp4" />
        </video>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isEnding ? 1 : 0 }} className="pointer-events-none absolute inset-0 bg-black" />

      <div className="to-background absolute inset-0 bg-linear-to-b from-transparent via-transparent" />
    </div>
  );
};
