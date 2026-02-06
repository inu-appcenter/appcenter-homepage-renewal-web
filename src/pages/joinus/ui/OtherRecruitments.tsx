'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useRecruitment } from 'entities/recruitment';
import { RecruitmentCard } from './Component';

const VISIBLE_ITEMS = 3;

export function OtherRecruitments() {
  const { data } = useRecruitment();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gap, setGap] = useState(32);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGap(12);
      } else {
        setGap(32);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, data.length - VISIBLE_ITEMS);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="group/section relative mt-32 flex flex-col gap-3 sm:gap-12">
      <div className="flex flex-row items-start justify-between gap-6">
        <h2 className="text-brand-primary-cta text-[16px] leading-none font-bold sm:text-[64px]">Other Recruits</h2>

        <Link
          href="/joinus//#list"
          className="text-brand-primary-cta border-brand-primary-cta bg-surface-elevated flex items-center gap-2 rounded-full border px-2 py-1 text-[9px] font-medium shadow-[0px_0px_4px_0px_#57FF8566] transition-transform hover:scale-105 active:scale-95 sm:px-6 sm:py-3 sm:text-[16px] sm:shadow-[0px_0px_16px_0px_#57FF8566]"
        >
          <Menu strokeWidth={1.5} className="h-2 w-2 sm:h-5 sm:w-5" />
          목록으로
        </Link>
      </div>

      <div className="relative w-full">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`text-brand-primary-cta disabled:text-custom-gray-800 border-custom-gray-800 bg-custom-black absolute top-1/2 -left-3 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-[0px_0px_16px_0px_#00000040] backdrop-blur-md transition-all hover:bg-white/20 disabled:pointer-events-none sm:-left-10`}
        >
          <ChevronLeft className="h-4 w-4 sm:h-8 sm:w-8" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className={`text-brand-primary-cta disabled:text-custom-gray-800 border-custom-gray-800 bg-custom-black absolute top-1/2 -right-3 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-[0px_0px_16px_0px_#00000040] backdrop-blur-md transition-all hover:bg-white/20 disabled:pointer-events-none sm:-right-10`}
        >
          <ChevronRight className="h-4 w-4 sm:h-8 sm:w-8" />
        </button>

        <div className="overflow-hidden py-4">
          <motion.div
            className="flex gap-8"
            initial={false}
            animate={{
              x: `calc(-${currentIndex} * ((100% - ${(VISIBLE_ITEMS - 1) * gap}px) / ${VISIBLE_ITEMS} + ${gap}px))`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {data.map((item) => (
              <motion.div
                key={item.id}
                className="shrink-0"
                style={{
                  width: `calc((100% - ${(VISIBLE_ITEMS - 1) * gap}px) / ${VISIBLE_ITEMS})`
                }}
              >
                <RecruitmentCard data={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
