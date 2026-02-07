'use client';
import { motion } from 'motion/react';

export const IntroduceSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative flex h-[20vh] w-full flex-col justify-between overflow-hidden sm:h-screen sm:px-10 sm:py-20"
    >
      <motion.p
        variants={{
          hidden: { x: -500, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-custom-gray-100 text-[15px]/5 font-bold sm:text-[60px]/21"
      >
        안녕하세요! <br />
        <span className="text-brand-primary-cta">앱센터</span>입니다.
      </motion.p>

      <motion.p
        variants={{
          hidden: { x: 500, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-custom-gray-100 self-end text-right text-[15px]/5 font-bold sm:text-[60px]/21"
      >
        앱센터의 각 <span className="text-brand-secondary-light">파트</span>를 소개합니다.
      </motion.p>
    </motion.section>
  );
};
