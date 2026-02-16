'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, ListButton, SectionDetailTitle, SectionTitle } from './Components';
import { MoveRight } from 'lucide-react';
import { useActivities } from 'entities/activity';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

export const ActivitiesSection = () => {
  return (
    <section className="flex flex-col justify-center sm:h-screen sm:gap-8">
      <div className="relative flex h-96 flex-col justify-center gap-17 sm:hidden">
        <SectionTitle title="activity" description="다양한 시각이 모여 하나의 목표를 향합니다" />
      </div>
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="활동" subtitle="Activity" />
        <ListButton href="/activitylist" />
      </div>
      <AsyncBoundary>
        <ActivitiesCarousel />
      </AsyncBoundary>
    </section>
  );
};

const ActivitiesCarousel = () => {
  const { data } = useActivities();
  const sortedData = data.slice().sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  return (
    <Carousel
      data={sortedData}
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
