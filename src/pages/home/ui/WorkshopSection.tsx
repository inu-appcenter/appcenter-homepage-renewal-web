'use client';
import Image from 'next/image';
import { Carousel, ListButton, SectionDetailTitle } from './Components';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { useWorkShop } from 'entities/workshop';

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
  const sortedData = data.slice().sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  return (
    <Carousel
      data={sortedData}
      className="gap-3 sm:gap-11.5"
      renderItem={(item) => (
        <div className="group relative h-16 w-30 overflow-hidden rounded-sm bg-gray-900 sm:h-66.75 sm:w-119.5 sm:rounded-xl">
          <Image draggable={false} loading="lazy" src={item.imageUrl} alt={item.title} fill className="object-cover" />
          <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-0.5 px-3 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-2 sm:px-6.75 sm:py-3.25">
            <span className="text-custom-gray-100 text-[12px] sm:text-[36px]">{item.title}</span>
            <span className="text-custom-gray-500 text-[8px] sm:text-lg">{item.eventDate}</span>
          </div>
        </div>
      )}
    />
  );
};
