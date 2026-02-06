'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const subtitleSteps = ['', 'ㅍ', '파', '파트', '파트ㅂ', '파트벼', '파트별', '파트별 ', '파트별 ㅅ', '파트별 소', '파트별 소ㄱ', '파트별 소개'];

const titleText = 'OUR TEAM';

export const MainSection = () => {
  const [displayTitle, setDisplayTitle] = useState('');
  const [displaySubtitle, setDisplaySubtitle] = useState('');
  const [phase, setPhase] = useState<'title' | 'subtitle' | 'done'>('title');

  useEffect(() => {
    let currentTitleIndex = 0;
    const titleInterval = setInterval(() => {
      if (currentTitleIndex <= titleText.length) {
        setDisplayTitle(titleText.slice(0, currentTitleIndex));
        currentTitleIndex++;
      } else {
        clearInterval(titleInterval);
        setPhase('subtitle');
      }
    }, 80);

    return () => clearInterval(titleInterval);
  }, []);

  useEffect(() => {
    if (phase === 'subtitle') {
      let currentSubIndex = 0;
      const subInterval = setInterval(() => {
        if (currentSubIndex < subtitleSteps.length) {
          setDisplaySubtitle(subtitleSteps[currentSubIndex]);
          currentSubIndex++;
        } else {
          clearInterval(subInterval);
          setPhase('done');
        }
      }, 120);

      return () => clearInterval(subInterval);
    }
  }, [phase]);

  return (
    <section className="flex h-screen w-full flex-col items-start justify-center">
      <div className="flex flex-col gap-1.5 sm:gap-6">
        <div className="flex items-center">
          <h1 className="text-brand-primary-cta text-[24px]/6 font-bold sm:text-[100px]/25">
            {displayTitle}
            {phase === 'title' && (
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="bg-brand-primary-cta ml-2 inline-block h-8 w-1 align-middle sm:h-20 sm:w-2" />
            )}
          </h1>
        </div>

        <div className="flex items-center">
          <p className="text-[10px]/2 text-white sm:text-[32px]/16">
            {displaySubtitle}
            {(phase === 'subtitle' || phase === 'done') && (
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block h-4 w-0.5 bg-white align-middle sm:h-7 sm:w-1.5" />
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
