import { RecruitmentList } from 'entities/recruitment';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from 'shared/icon/Logo';

export function RecruitmentCard({ data }: { data: RecruitmentList }) {
  return (
    <Link
      href={`/joinus/${data.id}`}
      className="group border-custom-gray-600 hover:border-brand-primary-cta bg-background relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border-2 p-8 transition-all duration-500 hover:shadow-[0px_0px_20px_0px_#57FF8544]"
    >
      {data.thumbnail ? (
        <Image
          src={data.thumbnail || '/images/default-recruitment-thumb.png'}
          alt="Recruitment Thumbnail"
          width={1920}
          height={1020}
          quality={100}
          className="h-90 w-full rounded-[28px] object-cover"
        />
      ) : (
        <div className="bg-background flex h-90 w-full items-center justify-center rounded-xl p-4">
          <Logo />
        </div>
      )}
      {data.isRecruiting ? (
        <div className="flex items-center gap-4">
          <div className="bg-brand-primary-cta text-background rounded-[28px] px-3 py-2 text-[16px]">모집중</div>
          <span className="text-[18px] font-semibold">D-{data.dday}</span>
        </div>
      ) : (
        <div className="bg-custom-gray-500 w-fit rounded-[28px] px-3 py-2 text-[16px] text-black">모집완료</div>
      )}
      <div className="text-brand-primary-cta line-clamp-2 text-[28px] font-semibold">{data.title}</div>
      <hr className="border-white" />
      <div className="mb-10 text-xl font-semibold text-white">{data.fieldNames.join(', ')}</div>
      {!data.isRecruiting && <div className="absolute inset-0 z-20 bg-black/30" />}
    </Link>
  );
}
