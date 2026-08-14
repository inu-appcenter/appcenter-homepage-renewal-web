'use client';
import Link from 'next/link';
import Image from 'next/image';
import { RecruitmentList } from 'entities/recruitment';
import { Logo } from 'shared/icon/Logo';
import { BLUR_DATA_URL } from 'shared/constants/blur';
import { AnimationButton } from 'shared/ui/animation-button';
import { Mixpanel } from 'shared/utils/mixpanel';
import { MIXPANEL_EVENTS, RecruitmentCardSource } from 'shared/constants/mixpanelEvents';

export function RecruitmentCard({ data, isActive, source }: { data: RecruitmentList; isActive?: boolean; source?: RecruitmentCardSource }) {
  return (
    <Link
      href={`/joinus/${data.id}`}
      onClick={() => Mixpanel.track(MIXPANEL_EVENTS.RECRUITMENT_CARD_CLICK, { recruitmentId: data.id, title: data.title, status: data.status, source })}
      className={`bg-background relative flex h-full flex-col gap-1 overflow-hidden rounded-lg border p-4 transition-all duration-500 sm:gap-4 sm:rounded-xl sm:border-2 sm:px-6 sm:py-5 ${
        isActive
          ? 'border-brand-primary-cta bg-custom-black -translate-y-2 shadow-[0px_0px_20px_0px_#57FF8544]'
          : 'border-custom-gray-600 hover:border-brand-primary-cta hover:bg-custom-black hover:-translate-y-2 hover:shadow-[0px_0px_20px_0px_#57FF8544]'
      } `}
    >
      {data.thumbnail ? (
        <Image
          src={data.thumbnail}
          alt={`${data.title} thumbnail`}
          width={1920}
          height={1020}
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="aspect-square w-full rounded-md object-cover object-top sm:aspect-square sm:rounded-xl"
        />
      ) : (
        <div className="bg-background flex aspect-square w-full items-center justify-center rounded-md p-4 sm:rounded-xl">
          <Logo />
        </div>
      )}
      <div className="mt-1 flex items-center gap-4">
        <StatusBadge status={data.status} />
        {data.status === 'RECRUITING' && <span className="hidden text-sm/3.5 font-semibold text-white sm:block sm:text-xl/8">D-{data.dday}</span>}
      </div>
      <div className="text-brand-primary-cta line-clamp-2 text-sm font-semibold sm:text-[28px]">{data.title}</div>
      <hr className="border-white" />
      <div className="line-clamp-2 text-sm text-white sm:mb-10 sm:text-xl">{data.fieldNames.join(', ')}</div>
      {data.status !== 'RECRUITING' && <div className="absolute inset-0 z-20 bg-black/30" />}
    </Link>
  );
}

export function ApplyButton({ recruitmentId, title, capacity, applyLink }: { recruitmentId: number; title: string; capacity: number; applyLink: string }) {
  const handleClick = () => {
    Mixpanel.track(MIXPANEL_EVENTS.RECRUITMENT_APPLY_CLICK, { recruitmentId, title, capacity });
  };

  return (
    <AnimationButton target="_blank" rel="noopener noreferrer" href={applyLink} onClick={handleClick}>
      <div className="text-white sm:text-2xl/6">지원하러 가기</div>
    </AnimationButton>
  );
}

export function StatusBadge({ status }: { status: RecruitmentList['status'] }) {
  switch (status) {
    case 'RECRUITING':
      return <div className="bg-brand-primary-cta text-background w-fit rounded-[28px] px-2 py-1.5 text-sm/3.5 whitespace-nowrap sm:px-3 sm:py-2 sm:text-[1rem]/4">모집중</div>;
    case 'CLOSED':
      return <div className="bg-custom-gray-500 w-fit rounded-[28px] px-2 py-1.5 text-sm/3.5 whitespace-nowrap text-black sm:px-3 sm:py-2 sm:text-[1rem]/4">모집완료</div>;
    case 'WAITING':
      return <div className="bg-custom-gray-500 w-fit rounded-[28px] px-2 py-1.5 text-sm/3.5 whitespace-nowrap text-black sm:px-3 sm:py-2 sm:text-[1rem]/4">모집 대기중</div>;
    default:
      return null;
  }
}
