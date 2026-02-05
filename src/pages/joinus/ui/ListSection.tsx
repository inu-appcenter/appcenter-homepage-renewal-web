'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from 'shared/icon/Logo';
import { RecruitmentList } from 'entities/recruitment';

export function ListSection({ data }: { data: RecruitmentList[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="flex h-screen flex-col items-center justify-start overflow-hidden py-10">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex w-full flex-col gap-9"
        >
          {currentItems.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-9 flex items-center justify-center gap-5 text-white">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:text-brand-primary-cta font-medium text-gray-400 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`group relative flex h-8 w-8 items-center justify-center text-lg font-semibold transition-colors ${currentPage === number ? 'text-brand-primary-cta' : 'hover:text-brand-primary-cta/80 text-white'} `}
          >
            {number}
            <div className={`bg-brand-primary-cta absolute right-0 bottom-0 left-0 mx-auto h-0.5 w-4 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100`} />
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:text-brand-primary-cta font-medium text-gray-400 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

const Item = ({ data }: { data: RecruitmentList }) => {
  return (
    <Link
      href={`/joinus/${data.id}`}
      className="bg-surface-elevated hover:border-brand-primary-cta border-background flex w-full cursor-pointer flex-row items-center gap-6 rounded-[18px] border px-6 py-4 transition-all duration-300 hover:shadow-[0px_0px_16px_0px_#57FF8566]"
    >
      {data.thumbnail ? (
        <img src={data.thumbnail} alt="thumb" className="h-27 w-27 rounded-xl object-cover" />
      ) : (
        <div className="bg-background flex h-27 w-27 items-center justify-center rounded-xl p-4">
          <Logo />
        </div>
      )}
      <div className="flex flex-1 flex-row items-start gap-8">
        {data.isRecruiting ? (
          <div className="bg-brand-primary-cta text-background rounded-[28px] px-3 py-2 text-[16px]">모집중</div>
        ) : (
          <div className="bg-custom-gray-500 text-background rounded-[28px] px-3 py-2 text-[16px]">모집완료</div>
        )}
        <div className="flex flex-col items-start gap-2">
          <span className="text-brand-primary-cta text-[28px]/7 font-semibold">{data.title}</span>
          <div className="flex gap-2 text-[20px] font-semibold text-white">
            {data.fieldNames.map((tag, index) => (
              <span key={index}>
                {tag}
                {index < data.fieldNames.length - 1 && ','}
              </span>
            ))}
          </div>
        </div>
      </div>
      {data.isRecruiting && <div className="bg-background rounded-[60px] px-10 py-4 text-xl font-semibold text-white">D-{data.dday}</div>}
    </Link>
  );
};
