'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import { ListButton, SectionDetailTitle } from './Components';
import { useWorkShop } from 'entities/workshop';
import { Carousel } from 'shared/ui/carousel';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { useMediaQuery } from 'shared/hooks/useMediaQuery';

export const WorkshopSection = () => {
  return (
    <section className="flex h-[40vh] flex-col justify-center sm:h-screen sm:gap-8">
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="정기워크샵" subtitle="Workshop" />
        <ListButton href="/workshoplist" />
      </div>
      <AsyncBoundary>
        <WorkshopCarousel />
      </AsyncBoundary>
    </section>
  );
};

const WorkshopCarousel = () => {
  const { data } = useWorkShop();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const sortedData = [...data].slice().sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  const scrollOptions = useMemo(
    () => ({
      speed: isMobile ? 0.6 : 1.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    }),
    [isMobile]
  );

  return (
    <Carousel
      data={sortedData}
      className="gap-3 sm:gap-11.5"
      autoScroll={true}
      autoScrollOptions={scrollOptions}
      pauseOnIntersection={false}
      trackClassName="gap-4 px-4 sm:gap-8 sm:px-8"
      renderItem={(item) => (
        <div className="group relative h-24 w-40 overflow-hidden rounded-sm bg-gray-900 sm:h-90 sm:w-164 sm:rounded-xl">
          <Image draggable={false} loading="eager" src={item.imageUrl} quality={75} alt={item.title} fill className="object-cover" />
          <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-1 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-3 sm:p-11">
            <span className="text-custom-gray-100 text-[1rem]/4 font-medium sm:text-[2.625rem]/10.5">{item.title}</span>
            <span className="text-custom-gray-500 ml-1.5 text-[0.75rem]/3 sm:text-[1.625rem]/6.5">{item.eventDate}</span>
          </div>
        </div>
      )}
    />
  );
};
