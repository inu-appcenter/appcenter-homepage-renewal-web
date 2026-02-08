'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, SectionDetailTitle, SectionTitle } from './Components';
import { MoveRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useActivities } from 'entities/activity';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

export const ActivitiesSection = () => {
  return (
    <section className="flex flex-col justify-center sm:h-screen sm:gap-16">
      <div className="relative flex h-96 flex-col justify-center gap-17 sm:hidden">
        <SectionTitle title="activity" description="다양한 시각이 모여 하나의 목표를 향합니다" />
      </div>
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="활동" subtitle="Activity" />
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-custom-gray-200 line-clamp-3 max-w-40 flex-1 text-end text-[10px]/4 sm:max-w-150 sm:text-xl/7"
        >
          단순히 서비스를 만드는 것을 넘어 인사이트를 나누고 함께 성장합니다.
        </motion.p>
      </div>
      <AsyncBoundary>
        <ActivitiesCarousel />
      </AsyncBoundary>
    </section>
  );
};

const ActivitiesCarousel = () => {
  const { data } = useActivities();
  return (
    <Carousel
      data={data}
      className="gap-3 sm:gap-11.5"
      renderItem={(item) => (
        <div className="group relative h-16 w-30 cursor-pointer overflow-hidden rounded-sm bg-gray-900 sm:h-66.75 sm:w-119.5 sm:rounded-xl">
          <Image draggable={false} loading="lazy" src={item.thumbnail} alt={item.title} fill className="object-cover" />
          <Link draggable={false} href={`/activity/${item.id}`} className="absolute inset-0 z-10">
            <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-0.5 px-3 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-2 sm:px-6.75 sm:py-3.25">
              <span className="text-custom-gray-200 text-[12px] sm:text-[36px]">{item.title}</span>
              <span className="text-custom-gray-500 text-[8px] sm:text-lg">{new Date(item.createdDate).toLocaleDateString()}</span>
              <MoveRight className="text-custom-gray-500 animate-wiggle-right absolute right-4 bottom-1 w-4 sm:right-6 sm:bottom-6 sm:w-10" />
            </div>
          </Link>
        </div>
      )}
    />
  );
};
