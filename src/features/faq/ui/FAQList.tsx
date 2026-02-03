'use client';
import { useState } from 'react';
import { ChevronDown, CornerDownRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Faq } from 'entities/faq';

import { PART } from 'shared/constants/part';
import { Part } from 'shared/types/part';

export const FAQList = ({ data }: { data: Faq[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Part>('Common');
  const filteredData = data.filter((item) => item.part === selectedCategory);

  return (
    <div className="flex flex-col gap-4 sm:gap-7">
      <div className="flex flex-row justify-between">
        {PART.map((category) => (
          <button
            key={category}
            className={`relative cursor-pointer rounded-2xl text-sm font-bold transition-all duration-300 sm:text-2xl ${
              selectedCategory === category ? 'text-brand-primary-cta' : 'text-custom-gray-200 hover:text-brand-primary-light'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
            {selectedCategory === category && (
              <motion.div layoutId="underline" className="bg-brand-primary-cta absolute -bottom-1 left-0 w-full sm:h-px" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedCategory}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="flex flex-col gap-2"
          >
            {filteredData.map((item, index) => (
              <FAQItem key={`${item.part}-${index}`} data={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredData.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 text-center text-[12px] text-white sm:text-xl/7">
            선택하신 카테고리에 해당하는 FAQ가 없습니다.
          </motion.p>
        )}
      </div>
    </div>
  );
};

const FAQItem = ({ data }: { data: Faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
      }}
      layout
      className="group flex cursor-pointer flex-col text-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="text-custom-gray-200 group-hover:text-brand-primary-light bg-surface-elevated flex flex-row items-center justify-between gap-2 rounded-2xl px-3 py-2 sm:px-5 sm:py-4">
        <h3 className="text-[12px] transition-colors sm:text-xl/7">
          <span className="text-[16px] font-bold sm:text-[28px]/7">Q.</span> {data.question}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="flex flex-row items-center gap-3 px-10 py-5 text-[12px] sm:px-14 sm:text-xl/7">
              <CornerDownRight className="w-6 sm:w-10" /> {data.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
