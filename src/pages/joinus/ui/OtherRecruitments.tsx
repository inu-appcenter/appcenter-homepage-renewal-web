'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useRecruitment } from 'entities/recruitment';
import { RecruitmentCard } from './Component';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

export function OtherRecruitments() {
  return (
    <AsyncBoundary>
      <OtherRecruitmentsContent />
    </AsyncBoundary>
  );
}

function OtherRecruitmentsContent() {
  const { data } = useRecruitment();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('init', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('init', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!data || data.length === 0) return null;

  return (
    <section className="group/section relative my-32 flex flex-col gap-3 sm:gap-12">
      <div className="flex flex-row items-start justify-between gap-6">
        <h2 className="text-brand-primary-cta text-base/4 font-bold sm:text-[4rem]/16">Other Recruits</h2>

        <Link
          href="/joinus//#list"
          aria-label="모집 공고 목록으로 이동"
          className="text-brand-primary-cta border-brand-primary-cta bg-surface-elevated flex items-center gap-2 rounded-full border px-2 py-1 text-[9px] font-medium shadow-[0px_0px_4px_0px_#57FF8566] transition-transform hover:scale-105 active:scale-95 sm:px-6 sm:py-3 sm:text-[1.125rem]/4.5 sm:shadow-[0px_0px_16px_0px_#57FF8566]"
        >
          <Menu strokeWidth={1.5} className="hidden scale-x-120 sm:inline-block sm:h-6 sm:w-7" />
          목록으로
        </Link>
      </div>

      <div className="relative w-full">
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={`text-brand-primary-cta disabled:text-custom-gray-800 border-custom-gray-800 bg-custom-black absolute top-1/2 -left-3 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-[0px_0px_16px_0px_#00000040] backdrop-blur-md transition-all hover:bg-white/20 disabled:pointer-events-none sm:-left-10`}
        >
          <ChevronLeft className="h-4 w-4 sm:h-8 sm:w-8" />
        </button>

        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={`text-brand-primary-cta disabled:text-custom-gray-800 border-custom-gray-800 bg-custom-black absolute top-1/2 -right-3 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-[0px_0px_16px_0px_#00000040] backdrop-blur-md transition-all hover:bg-white/20 disabled:pointer-events-none sm:-right-10`}
        >
          <ChevronRight className="h-4 w-4 sm:h-8 sm:w-8" />
        </button>

        <div className="overflow-hidden py-4" ref={emblaRef}>
          <div className="flex gap-3 sm:gap-8">
            {data.map((item) => (
              <div key={item.id} className="min-w-0 shrink-0 basis-[calc(33.333%-0.5rem)] sm:basis-[calc(33.333%-1.333rem)]">
                <RecruitmentCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
