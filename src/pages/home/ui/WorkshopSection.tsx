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
        <ListButton href="/workshoplist" className="hidden sm:flex" />
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
        <div className="group relative h-24 w-40 overflow-hidden rounded-sm bg-gray-900 sm:h-90 sm:w-164 sm:rounded-xl">
          <Image draggable={false} loading="lazy" src={item.imageUrl} alt={item.title} fill className="object-cover" />
          <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-1 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-3 sm:p-11">
            <span className="text-custom-gray-100 text-[1rem]/4 font-medium sm:text-[2.625rem]/10.5">{item.title}</span>
            <span className="text-custom-gray-500 text-[0.75rem]/3 sm:text-[1.625rem]/6.5">{item.eventDate}</span>
          </div>
        </div>
      )}
    />
  );
};
