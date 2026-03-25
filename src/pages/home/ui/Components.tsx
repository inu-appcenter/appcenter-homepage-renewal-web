'use client';
import { useState, useRef, useEffect } from 'react';
import { useMotionValueEvent, useMotionValue, animate, motion } from 'motion/react';
import { cn } from 'shared/utils/cn';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { RandomShuffleNumber } from '../animation/RandomShuffleNumber';

export const ShuffleItem = ({ title, subNumber, smallSubtitle, index }: { title: string; subNumber: number; smallSubtitle?: string; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className="bg-surface-elevated group border-custom-gray-600 hover:border-brand-primary-cta flex flex-1 cursor-default flex-col items-center gap-1 rounded-sm border py-3 drop-shadow-[0_0_4px_#EDEDED66] transition-colors duration-500 hover:drop-shadow-[0_0_4px_#57ff8566] sm:gap-6 sm:rounded-2xl sm:py-11.75 sm:drop-shadow-[0_0_16px_#EDEDED66] sm:hover:drop-shadow-[0_0_16px_#57ff8566]"
    >
      <span className="text-custom-gray-100 group-hover:text-brand-primary-cta line-clamp-1 text-[8px] duration-500 sm:text-[28px]">{title}</span>
      <span className="text-custom-gray-100 group-hover:text-brand-primary-cta line-clamp-1 text-[18px] leading-none font-medium duration-500 sm:text-[66px]">
        <RandomShuffleNumber value={subNumber} />
        {smallSubtitle && <small className="ml-0.5 text-[8px] sm:ml-1 sm:text-[40px]">{smallSubtitle}</small>}
      </span>
    </motion.li>
  );
};

export const SectionDetailTitle = ({ title, subtitle, className = '' }: { title: string; subtitle: string; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex flex-col items-baseline ${className}`}
    >
      <h2 className="text-brand-primary-cta text-[20px] font-bold sm:text-[80px]">{title}</h2>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-custom-gray-400 text-[10px] font-medium opacity-60 sm:text-[40px]"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};
export const SectionTitle = ({ title, description, className = '' }: { title: string; description: string; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
      className={`flex flex-col gap-2 sm:gap-5 ${className}`}
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'circOut' } }
        }}
        className="text-custom-gray-200 font-product-design text-[32px] uppercase sm:text-[40px]"
      >
        <span className="text-brand-primary-cta">{title.charAt(0)}</span>
        {title.slice(1)}
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="text-custom-gray-200 text-[16px] sm:text-2xl"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export const ListButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="text-brand-primary-cta border-brand-primary-cta bg-surface-elevated h-fit cursor-pointer items-center gap-1.5 rounded-4xl border px-2 py-1 text-[9px] shadow-[0px_0px_12px_0px_#57FF8566] sm:flex sm:px-4 sm:py-2 sm:text-lg"
    >
      <Menu strokeWidth={1.25} className="hidden sm:inline-block" />
      <span>목록으로</span>
    </Link>
  );
};

// 무한 케로셀을 위해 데이터 3배로 복제 및 애니메이션 처리
// /3은 3배 복제된 데이터셋에서 현재 위치를 계산하기 위함
interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overflowHidden?: boolean;
}
export const Carousel = <T,>({ data, renderItem, className = '', overflowHidden = true }: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);
  const xTranslation = useMotionValue(0);
  const controlsRef = useRef<any>(null);
  const isDragging = useRef(false);

  // 애니메이션 실행 함수
  const startAnimation = (fromValue?: number) => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;
    const startX = fromValue ?? xTranslation.get();

    const remainingDistance = Math.abs(-singleSetWidth - startX);
    const totalDistance = singleSetWidth;
    const dynamicDuration = 40 * (remainingDistance / totalDistance);

    controlsRef.current = animate(xTranslation, [startX, -singleSetWidth], {
      ease: 'linear',
      duration: dynamicDuration > 0 ? dynamicDuration : 40,
      onComplete: () => {
        xTranslation.set(0); // 끝에 도달하면 0으로 리셋하여 무한 루프
        startAnimation(0);
      }
    });
  };

  useEffect(() => {
    startAnimation();
    return () => controlsRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(xTranslation, 'change', (latest) => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;

    const progress = (Math.abs(latest) % singleSetWidth) / singleSetWidth;
    const index = Math.round(progress * data.length) % data.length;

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const handleDotClick = (index: number) => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;
    const itemWidth = singleSetWidth / data.length;
    const targetX = -(index * itemWidth);

    animate(xTranslation, targetX, {
      type: 'spring',
      stiffness: 200,
      damping: 40,
      onComplete: () => {
        startAnimation(targetX);
      }
    });

    setActiveIndex(index);
  };

  return (
    <div className={cn`${className} flex flex-col gap-7 ${overflowHidden ? 'overflow-hidden' : ''} pt-12 pb-4`}>
      <motion.ul
        ref={containerRef}
        style={{ x: xTranslation }}
        className={cn`flex gap-8 whitespace-nowrap ${className} cursor-grab select-none active:cursor-grabbing`}
        drag="x"
        onDragStart={() => {
          isDragging.current = true;
          controlsRef.current?.stop();
        }}
        onDragEnd={() => {
          const contentWidth = containerRef.current?.scrollWidth || 0;
          const singleSetWidth = contentWidth / 3;
          let currentX = xTranslation.get();

          if (currentX > 0) {
            currentX -= singleSetWidth;
            xTranslation.set(currentX);
          } else if (currentX < -singleSetWidth) {
            currentX += singleSetWidth;
            xTranslation.set(currentX);
          }
          startAnimation(currentX);

          setTimeout(() => {
            isDragging.current = false;
          }, 50);
        }}
        onClickCapture={(e) => {
          if (isDragging.current) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        {[...data, ...data, ...data].map((item, index) => (
          <li key={index} className="shrink-0">
            {renderItem(item, index % data.length)}
          </li>
        ))}
      </motion.ul>

      <div className={`flex justify-center gap-2 sm:gap-5`}>
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1 w-1 rounded-full transition-all duration-300 focus:outline-none sm:h-3 sm:w-3 ${activeIndex === index ? 'bg-brand-primary-cta scale-125' : 'bg-custom-gray-700'}`}
            aria-label={`캐로셀 항목 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};
