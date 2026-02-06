'use client';
import Image from 'next/image';
import { Carousel, SectionDetailTitle } from './Components';
import { motion } from 'motion/react';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { useWorkShop } from 'entities/workshop';

export const WorkshopSection = () => {
  return (
    <section className="flex h-[40vh] flex-col justify-center sm:h-screen sm:gap-16">
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="정기워크샵" subtitle="Workshop" />
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-custom-gray-200 max-w-40 flex-1 text-end text-[10px]/4 sm:max-w-150 sm:text-xl/7"
        >
          일할 땐 열정적으로, 놀 땐 누구보다 진심으로!
        </motion.p>
      </div>
      <AsyncBoundary>
        <WorkshopCarousel />
      </AsyncBoundary>
    </section>
  );
};

const WorkshopCarousel = () => {
  const { data } = useWorkShop();
  return (
    <Carousel
      data={data}
      className="gap-3 sm:gap-11.5"
      renderItem={(item) => (
        <div className="group relative h-30 w-44 overflow-hidden rounded-sm bg-gray-900 sm:h-95 sm:w-171.5 sm:rounded-xl">
          <Image draggable={false} loading="lazy" src={item.imageUrl} alt={item.title} fill className="object-cover" />
          <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-0.5 px-3 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-2 sm:px-6.75 sm:py-3.25">
            <span className="text-custom-gray-100 text-[9px] sm:text-[36px]">{item.title}</span>
            <span className="text-custom-gray-500 text-[4.5px] sm:text-lg">{item.eventDate}</span>
          </div>
        </div>
      )}
    />
  );
};
