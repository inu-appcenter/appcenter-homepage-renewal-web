'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ListButton, SectionDetailTitle, SectionTitle } from './Components';
import { MoveRight } from 'lucide-react';
import { useActivities } from 'entities/activity';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { Carousel } from 'shared/ui/carousel';

export const ActivitiesSection = () => {
  return (
    <section id="activity" className="mt-16 flex flex-col justify-center sm:mt-0 sm:h-screen sm:gap-8">
      <div className="relative mb-16 flex flex-col justify-center sm:mb-0">
        <SectionTitle title="activity" />
      </div>
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="활동" subtitle="Activities" />
        <ListButton href="/activitylist" className="hidden sm:flex" />
      </div>
      <AsyncBoundary>
        <ActivitiesCarousel />
      </AsyncBoundary>
    </section>
  );
};

const ActivitiesCarousel = () => {
  const { data } = useActivities();
  const sortedData = [...data].slice().sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  return (
    <Carousel
      data={sortedData}
      autoScroll={true}
      pauseOnIntersection={false}
      className="gap-3 sm:gap-11.5"
      trackClassName="gap-4 px-4"
      renderItem={(item) => (
        <div className="group relative h-20 w-36 cursor-pointer overflow-hidden rounded-sm bg-gray-900 sm:h-66.75 sm:w-119.5 sm:rounded-xl">
          <Image draggable={false} loading="lazy" src={item.thumbnail} alt={item.title} fill className="object-cover" />
          <Link draggable={false} href={`/activity/${item.id}`} className="absolute inset-0 z-10">
            <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-end gap-0.5 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-2 sm:p-7">
              <span className="text-custom-gray-200 text-[1rem]/4 font-medium sm:text-[1.75rem]/7">{item.title}</span>
              <span className="text-custom-gray-500 ml-1 text-[0.75rem]/3 sm:text-[1rem]/4">{item.createdDate.slice(0, 10)}</span>
              <MoveRight className="text-custom-gray-500 animate-wiggle-right absolute right-3 bottom-0 w-2 origin-right scale-x-[1.5] sm:right-6 sm:bottom-6 sm:w-10" />
            </div>
          </Link>
        </div>
      )}
    />
  );
};
