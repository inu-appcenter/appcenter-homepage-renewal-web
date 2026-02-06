'use client';
import { motion } from 'motion/react';
import { RandomShuffleNumber } from '../animation/RandomShuffleNumber';
import { SectionTitle } from './Components';

export const AboutSection = () => {
  const aboutData = [
    { title: '창립 연도', subNumber: 2008 },
    { title: '누적 멤버 수', subNumber: 205, smallSubtitle: '+' },
    { title: '출시한 서비스 수', subNumber: 15, smallSubtitle: '+' },
    { title: '취업동아리 수상', subNumber: 3, smallSubtitle: '년 연속' }
  ];

  return (
    <section id="about" className="relative flex h-[45vh] flex-col justify-end gap-4 sm:h-screen sm:justify-center sm:gap-8">
      <SectionTitle title="about" description="서로의 영감이 되어주는 견고한 네트워크" />
      <ul className="grid grid-cols-2 justify-between gap-4 sm:mt-25 sm:flex sm:flex-row sm:gap-20">
        {aboutData.map((data, index) => (
          <Item key={index} title={data.title} subNumber={data.subNumber} smallSubtitle={data.smallSubtitle} index={index} />
        ))}
      </ul>
    </section>
  );
};
const Item = ({ title, subNumber, smallSubtitle, index }: { title: string; subNumber: number; smallSubtitle?: string; index: number }) => {
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
