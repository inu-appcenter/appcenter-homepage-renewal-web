'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecruitmentList } from 'entities/recruitment';
import { RecruitmentCard } from './Component';

export function CarouselSection({ data }: { data: RecruitmentList[] }) {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section id="list" className="flex flex-col items-center justify-center overflow-hidden text-white">
      <div className="relative flex w-full items-center justify-center">
        <div className="flex w-full gap-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex w-full justify-between gap-4 py-8 sm:gap-10"
            >
              {currentItems.map((item) => (
                <div key={item.id} className="w-1/3">
                  <RecruitmentCard data={item} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button aria-label={`리스트 ${i + 1}로 이동`} key={i} onClick={() => setCurrentPage(i)} className="relative flex h-3 w-3 items-center justify-center">
            <div
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${currentPage === i ? 'bg-brand-primary-cta scale-110' : 'bg-custom-gray-700 hover:bg-custom-gray-500'}`}
            />
            {currentPage === i && (
              <motion.div layoutId="active-dot" className="bg-brand-primary-cta absolute h-1.5 w-1.5 rounded-full sm:h-2.5 sm:w-2.5" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
