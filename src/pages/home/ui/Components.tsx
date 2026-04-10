'use client';
import { motion } from 'motion/react';
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
      className="bg-surface-elevated group border-custom-gray-200 hover:border-brand-primary-cta flex flex-1 cursor-default flex-col items-center gap-1 rounded-sm border py-3 drop-shadow-[0_0_4px_#EDEDED66] transition-colors duration-500 hover:drop-shadow-[0_0_4px_#57ff8566] sm:gap-6 sm:rounded-2xl sm:py-11.75 sm:drop-shadow-[0_0_16px_#EDEDED66] sm:hover:drop-shadow-[0_0_16px_#57ff8566]"
    >
      <span className="text-custom-gray-100 group-hover:text-brand-primary-cta line-clamp-1 text-[0.75rem]/3 duration-500 sm:text-[1.75rem]/7">{title}</span>
      <span className="text-custom-gray-100 group-hover:text-brand-primary-cta line-clamp-1 flex items-end text-[1.125rem]/4.5 leading-none font-medium duration-500 sm:items-center sm:text-[4.125rem]/16.5">
        <RandomShuffleNumber value={subNumber} />
        {smallSubtitle && <small className="ml-0.5 text-[0.5rem]/2 font-medium sm:ml-1 sm:text-[2.5rem]/10">{smallSubtitle}</small>}
      </span>
    </motion.li>
  );
};

export const SectionDetailTitle = ({ title, subtitle, className = '' }: { title: string; subtitle: string; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex flex-col items-baseline gap-2 sm:gap-7 ${className}`}
    >
      <h2 className="text-brand-primary-cta text-[1.5rem]/6 font-bold sm:text-[4rem]/16">{title}</h2>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-custom-gray-400 text-[0.875rem]/3.5 font-medium sm:text-[2.25rem]/9"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export const SectionTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`text-custom-gray-200 font-product-design text-[2rem]/8 uppercase sm:text-[2.5rem]/10 ${className}`}
    >
      <span className="text-brand-primary-cta">{title.charAt(0)}</span>
      {title.slice(1)}
    </motion.h2>
  );
};

export const ListButton = ({ href, text, className }: { href: string; text?: string; className?: string }) => {
  return (
    <Link
      href={href}
      className={`text-brand-primary-cta border-brand-primary-cta bg-surface-elevated flex h-fit cursor-pointer items-center gap-1.5 rounded-4xl border px-3 py-1.5 text-[0.875rem]/3.5 shadow-[0px_0px_8px_0px_#57FF8566] sm:px-4 sm:py-2 sm:text-lg sm:shadow-[0px_0px_12px_0px_#57FF8566] ${className}`}
    >
      <Menu strokeWidth={1.25} className="h-4 w-4 sm:h-6 sm:w-6" />
      <span>{text || '목록으로'}</span>
    </Link>
  );
};

export const ScrollIndicator = () => (
  <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
    <div style={{ position: 'relative', width: 3, height: 90 }}>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          x: '-50%',
          width: 3,
          borderRadius: 2,
          background: 'linear-gradient(to bottom, transparent 0%, #0C4A28 40%, #0FE56E 100%)'
        }}
        initial={{ y: 0, height: 0, opacity: 0 }}
        animate={{
          y: [0, 30, 90],
          height: [0, 60, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          ease: ['easeIn', 'easeOut'],
          repeat: Infinity,
          repeatDelay: 0.2
        }}
      />
    </div>

    <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}>
      <motion.span className="text-brand-primary-cta text-lg uppercase sm:text-2xl">Scroll</motion.span>
    </motion.span>
  </div>
);
