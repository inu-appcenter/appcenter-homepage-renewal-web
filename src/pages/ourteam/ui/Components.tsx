'use client';
import { motion, useInView, Variants } from 'motion/react';
import { useRef } from 'react';
import { Hello } from 'shared/icon/Hello';
import { OurTeam } from '../types/ourteam';
import { AnimationButton } from 'shared/ui/animation-button';

export const PartDescriptionSection = ({
  title,
  partName,
  description,
  techStack,
  icon,
  motionProps: { x = ['0%', '10%'], y = ['20px', '800px'], scale = [1, 0.6], rotate = [0, 0] } = {}
}: OurTeam) => {
  const containerRef = useRef(null);
  const bottomCardRef = useRef(null);

  const isSectionInView = useInView(containerRef, { once: false, amount: 0.3 });
  const isBottomVisible = useInView(bottomCardRef, { once: false, amount: 0.01 });

  const iconVariants: Variants = {
    initial: {
      x: x[0],
      y: y[0],
      scale: scale[0],
      rotate: rotate[0],
      opacity: 0
    },
    animate: {
      x: isBottomVisible ? x[1] : x[0],
      y: isBottomVisible ? y[1] : y[0],
      scale: isBottomVisible ? scale[1] : scale[0],
      rotate: isBottomVisible ? rotate[1] : rotate[0],
      opacity: isSectionInView ? 1 : 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.1
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" id={title}>
      <section className="flex flex-col overflow-hidden">
        {/* 상단 섹션 */}
        <div className="flex h-screen w-full flex-row items-center justify-between gap-20">
          <div className="flex flex-none flex-col gap-9">
            <motion.h2
              className="text-brand-primary-cta text-[100px]/[100px] font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {title}
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <AnimationButton href="joinus">
                <span className="text-custom-gray-100 text-[28px] font-bold">바로 지원하러 가기</span>
              </AnimationButton>
            </motion.div>
          </div>

          <motion.div variants={iconVariants} initial="initial" animate="animate" className="z-50 shrink-0">
            {icon}
          </motion.div>
        </div>

        <div className="relative flex h-[50vh] items-end">
          <div className="from-background-surface/60 to-background-surface/0 pointer-events-none absolute inset-0 z-50 bg-linear-to-t to-47%" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isBottomVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-elevated flex w-full rounded-2xl px-12 py-10"
          >
            <div className="z-10 space-y-20 pt-10">
              <motion.div
                style={{
                  display: 'inline-block',
                  fontSize: '2rem',
                  originX: 0.7,
                  originY: 0.9
                }}
                animate={
                  isBottomVisible
                    ? {
                        rotate: [0, 20, -10, 20, -10, 0]
                      }
                    : { rotate: 0 }
                }
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: 'easeInOut'
                }}
              >
                <Hello />
              </motion.div>
              <p className="text-custom-gray-100 text-[56px]/17 font-bold">
                안녕하세요! <br />
                <span className="text-brand-primary-cta">{partName} 파트</span>입니다.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={bottomCardRef} className="relative -mt-[50vh] flex h-screen items-end gap-12 pb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isBottomVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-surface-elevated flex h-79 flex-1 flex-col justify-end rounded-2xl px-12 py-10"
        >
          <p className="text-custom-gray-100 text-[44px]/15 font-medium whitespace-pre-line">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isBottomVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-surface-elevated flex h-79 w-90 flex-col rounded-2xl px-8 py-9.5"
        >
          <p className="text-brand-secondary-light text-[20px]/6">이런 기술 스택을 주로 이용합니다.</p>
          <div className="flex flex-1 flex-col justify-end gap-4">
            {techStack.map((tech, index) => (
              <StackItem key={tech} number={`${index + 1}`} title={tech} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StackItem = ({ number, title }: { number: string; title: string }) => (
  <div className="space-y-1">
    <div className="text-brand-secondary-light border-brand-secondary-light flex h-6 w-6 items-center justify-center rounded-full border text-sm">{number}</div>
    <p className="text-custom-gray-100 text-[42px]/14.5 font-semibold">{title}</p>
  </div>
);
