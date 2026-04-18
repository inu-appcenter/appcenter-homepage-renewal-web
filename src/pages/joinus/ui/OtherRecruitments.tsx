'use client';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRecruitment } from 'entities/recruitment';
import { RecruitmentCard } from './Component';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { Carousel } from 'shared/ui/carousel';

export function OtherRecruitments() {
  return (
    <AsyncBoundary>
      <OtherRecruitmentsContent />
    </AsyncBoundary>
  );
}
function OtherRecruitmentsContent() {
  const { data } = useRecruitment();

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

      <Carousel
        data={data}
        autoPlay={true}
        showTrackButton={false}
        autoPlayOptions={{
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true
        }}
        options={{
          align: 'center',
          dragFree: true,
          loop: true
        }}
        className="py-0"
        trackClassName="gap-3 sm:gap-8"
        slideClassName="min-w-0 shrink-0 basis-[calc(33.333%-0.5rem)] sm:basis-[calc(33.333%-1.333rem)]"
        renderItem={(item) => <RecruitmentCard data={item} />}
      />
    </section>
  );
}
