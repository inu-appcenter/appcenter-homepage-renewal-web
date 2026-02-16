import { RecruitmentList } from 'entities/recruitment';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from 'shared/icon/Logo';

export function RecruitmentCard({ data }: { data: RecruitmentList }) {
  return (
    <Link
      href={`/joinus/${data.id}`}
      className="group border-custom-gray-600 hover:border-brand-primary-cta bg-background relative flex h-full flex-col gap-1 overflow-hidden rounded-lg border p-3 transition-all duration-500 hover:shadow-[0px_0px_20px_0px_#57FF8544] sm:gap-4 sm:rounded-2xl sm:border-2 sm:p-8"
    >
      {data.thumbnail ? (
        <Image src={data.thumbnail} alt={`${data.title} thumbnail`} width={1920} height={1020} quality={100} className="h-25 w-full rounded-md object-cover sm:h-90 sm:rounded-[28px]" />
      ) : (
        <div className="bg-background flex h-90 w-full items-center justify-center rounded-xl p-4">
          <Logo />
        </div>
      )}
      {
        <div className="flex items-center gap-4">
          <StatusBadge status={data.status} />
        </div>
      }
      <div className="text-brand-primary-cta line-clamp-2 text-[12px] font-semibold sm:text-[28px]">{data.title}</div>
      <hr className="border-white" />
      <div className="line-clamp-2 text-[8px] font-semibold text-white sm:mb-10 sm:text-xl">{data.fieldNames.join(', ')}</div>
      {data.status !== 'RECRUITING' && <div className="absolute inset-0 z-20 bg-black/30" />}
    </Link>
  );
}

export function StatusBadge({ status }: { status: RecruitmentList['status'] }) {
  switch (status) {
    case 'RECRUITING':
      return <div className="bg-brand-primary-cta text-background rounded-[28px] px-1.5 py-1 text-[8px] whitespace-nowrap sm:px-3 sm:py-2 sm:text-[16px]">모집중</div>;
    case 'CLOSED':
      return <div className="bg-custom-gray-500 w-fit rounded-[28px] px-1.5 py-1 text-[8px] whitespace-nowrap text-black sm:px-3 sm:py-2 sm:text-[16px]">모집완료</div>;
    case 'WAITING':
      return <div className="bg-custom-gray-500 w-fit rounded-[28px] px-1.5 py-1 text-[8px] whitespace-nowrap text-black sm:px-3 sm:py-2 sm:text-[16px]">모집 대기중</div>;
    default:
      return null;
  }
}
