'use client';
import { RecruitmentList } from 'entities/recruitment';
import { RecruitmentCard } from './Component';
import { Carousel } from 'shared/ui/carousel';
import { useMediaQuery } from 'shared/hooks/useMediaQuery';

const CAROUSEL_OPTIONS = { loop: true, align: 'center' as const };

export function CarouselSection({ data }: { data: RecruitmentList[] }) {
  const isMobile = useMediaQuery('(max-width: 639px)');

  if (!data || data.length === 0) return null;

  return (
    <section id="list" className="w-full text-white">
      <Carousel
        data={data}
        options={CAROUSEL_OPTIONS}
        trackClassName="px-10 gap-10 sm:gap-6 py-8"
        autoPlay={isMobile}
        slideClassName="min-w-0 flex-[0_0_70%] sm:flex-[0_0_calc(33.333%-16px)]"
        renderItem={(item, _, isActive) => <RecruitmentCard data={item} isActive={isMobile ? isActive : undefined} />}
      />
    </section>
  );
}
