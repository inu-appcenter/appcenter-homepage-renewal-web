'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ProjectCard } from './Component';
import { useProject } from 'entities/project';

export function OtherProjects() {
  const { data } = useProject();
  const sortedDataByDate = data ? [...data].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, sortedDataByDate.length - visibleItems);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="group/section relative mt-32 flex flex-col gap-12">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <h2 className="text-brand-primary-cta text-[40px] leading-none font-bold lg:text-[64px]">Other Recruits</h2>

        <Link
          href="/joinus//#list"
          className="text-brand-primary-cta border-brand-primary-cta bg-surface-elevated flex items-center gap-2 rounded-full border px-6 py-3 text-[16px] font-medium shadow-[0px_0px_16px_0px_#57FF8566] transition-transform hover:scale-105 active:scale-95"
        >
          <Menu strokeWidth={1.5} size={20} />
          목록으로
        </Link>
      </div>

      <div className="relative w-full">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`text-brand-primary-cta disabled:text-custom-gray-800 border-custom-gray-800 bg-custom-black absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border p-3 shadow-[0px_0px_16px_0px_#00000040] backdrop-blur-md transition-all hover:bg-white/20 disabled:pointer-events-none md:-left-4 lg:-left-10`}
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className={`text-brand-primary-cta disabled:text-custom-gray-800 border-custom-gray-800 bg-custom-black absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border p-3 shadow-[0px_0px_16px_0px_#00000040] backdrop-blur-md transition-all hover:bg-white/20 disabled:pointer-events-none md:-right-4 lg:-right-10`}
        >
          <ChevronRight size={32} />
        </button>

        <div className="-my-4 overflow-hidden px-1 py-4">
          <motion.div
            className="flex gap-8"
            initial={false}
            animate={{
              x: `calc(-${currentIndex} * ((100% - ${(visibleItems - 1) * 32}px) / ${visibleItems} + 32px))`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {sortedDataByDate.map((item) => (
              <motion.div
                key={item.id}
                className="shrink-0"
                style={{
                  width: `calc((100% - ${(visibleItems - 1) * 32}px) / ${visibleItems})`
                }}
              >
                <ProjectCard data={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
