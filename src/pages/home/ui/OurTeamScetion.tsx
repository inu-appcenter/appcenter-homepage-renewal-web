'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { SectionTitle, SectionDetailTitle } from './Components';
import { motion } from 'motion/react';

export const OurTeamSection = () => {
  return (
    <section className="relative flex h-screen flex-col">
      <div className="relative flex h-96 flex-col justify-center gap-17">
        <SectionTitle title="activities" description="다양한 시각이 모여 하나의 목표를 향합니다" />
      </div>
      <div className="relative flex h-full flex-row items-center justify-between">
        <SectionDetailTitle title="파트별 소개" subtitle="Our Team" />
        <Image src="/videos/joinus.png" fill alt="Main Illustration" className="absolute -z-10 sm:hidden" />
        <Link href="/ourteam" className="text-text-primary" aria-label="파트별 소개로 이동">
          <motion.div
            animate={{ x: [0, 12, 0] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              repeat: Infinity
            }}
          >
            <MoveRight className="text-custom-gray-600 sm:h-24 sm:w-24" style={{ transform: 'scaleX(1.4)' }} strokeWidth={1} />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};
