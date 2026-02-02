'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

const DUMMY_DATA = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 100,
  title: `2024년 ${i + 1}번째 모집 공고`,
  tags: '프론트엔드, 백엔드',
  dDay: `D-${10 + i}`,
  status: i < 5 ? '모집중' : '모집마감'
}));

export function CarouselSection() {
  return (
    <section id="list" className="flex h-screen flex-col items-center justify-center gap-16 overflow-hidden text-white">
      <AsyncBoundary>
        <RecruitmentCard />
      </AsyncBoundary>
    </section>
  );
}

const RecruitmentCard = () => {
  const [selected, setSelected] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(DUMMY_DATA.length / itemsPerPage);
  const currentItems = DUMMY_DATA.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  return (
    <>
      <div className="flex flex-row gap-40">
        {['전체', '모집중', '모집마감'].map((text, index) => (
          <SelectButton key={index} text={text} onClick={() => setSelected(index)} isSelected={selected === index} />
        ))}
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div className="flex w-full gap-6 overflow-hidden py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex w-full justify-between gap-6"
            >
              {currentItems.map((item) => (
                <div key={item.id} className="w-1/3">
                  <Link
                    href={`/joinus/100`}
                    className="group border-custom-gray-600 hover:border-brand-primary-cta flex h-full flex-col gap-5 rounded-2xl border-2 bg-[#0A0A0A] p-7 transition-all duration-500 hover:shadow-[0px_0px_20px_0px_#57FF8544]"
                  >
                    <div className="bg-custom-gray-300 h-64 w-full rounded-lg" />
                    <div className="flex items-center gap-4">
                      <div className="bg-brand-primary-cta rounded-[28px] px-4 py-1.5 text-[15px] font-bold text-black">{item.status}</div>
                      <span className="text-[18px] font-semibold">{item.dDay}</span>
                    </div>
                    <div className="text-brand-primary-cta line-clamp-2 text-[24px] leading-tight font-bold">{item.title}</div>
                    <hr className="border-white/10" />
                    <div className="mb-15 text-[18px] font-medium text-white">{item.tags}</div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i)} className="relative flex h-3 w-3 items-center justify-center">
            <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentPage === i ? 'bg-brand-primary-cta scale-110' : 'bg-custom-gray-700 hover:bg-custom-gray-500'}`} />
            {currentPage === i && <motion.div layoutId="active-dot" className="bg-brand-primary-cta absolute h-2.5 w-2.5 rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
          </button>
        ))}
      </div>
    </>
  );
};

const SelectButton = ({ text, onClick, isSelected }: { text: string; onClick: () => void; isSelected: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`group bg-background relative flex cursor-pointer items-center gap-2 rounded-[40px] px-6 py-3 text-2xl transition-colors duration-300 ${
        isSelected ? 'text-brand-primary-cta' : 'text-custom-gray-600 border-custom-gray-600 border'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="active-pill"
          className="border-brand-primary-cta absolute inset-0 rounded-[40px] border shadow-[0px_0px_16px_0px_#57FF8566]"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <motion.div animate={{ rotate: isSelected ? 45 : 0 }} transition={{ duration: 0.3 }}>
        <Plus className={isSelected ? 'text-brand-primary-cta' : 'text-custom-gray-600'} strokeWidth={1} size={28} />
      </motion.div>
      <span className="relative z-10 font-medium">{text}</span>
    </button>
  );
};
