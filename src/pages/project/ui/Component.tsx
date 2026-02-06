import Link from 'next/link';
import Image from 'next/image';
import { Logo } from 'shared/icon/Logo';
import { Project } from 'entities/project';

export function ProjectCard({ data }: { data: Project }) {
  const imageArray = data.images ? Object.values(data.images) : [];

  return (
    <Link
      href={`/project/${data.id}`}
      className="group border-custom-gray-600 hover:border-brand-primary-cta bg-background relative flex h-full flex-col gap-1 overflow-hidden rounded-lg border p-2 transition-all duration-500 hover:shadow-[0px_0px_20px_0px_#57FF8544] sm:gap-4 sm:rounded-2xl sm:border-2 sm:p-8"
    >
      {data.images ? (
        <Image src={imageArray[0]} alt="Recruitment Thumbnail" width={1920} height={1020} quality={100} className="h-auto w-full rounded-md object-cover sm:rounded-[28px]" />
      ) : (
        <div className="bg-background flex h-90 w-full items-center justify-center rounded-xl p-4">
          <Logo />
        </div>
      )}
      <div className="text-brand-primary-cta mt-3 line-clamp-1 text-[12px] font-semibold sm:mt-8 sm:text-[28px]">{data.title}</div>
      <div className="flex gap-0.5 sm:gap-2">
        {data.androidStoreLink && <div className="text-[8px] font-semibold text-white sm:text-xl">Android</div>}
        {data.websiteLink && <div className="text-[8px] font-semibold text-white sm:text-xl">Website</div>}
        {data.appleStoreLink && <div className="text-[8px] font-semibold text-white sm:text-xl">iOS</div>}
      </div>
      <div className="flex w-full justify-end">
        {data.isActive ? (
          <div className="border-brand-primary-cta text-brand-primary-cta w-fit rounded-[28px] border-[1.8px] px-1 py-0.5 text-[8px] sm:px-4 sm:py-2 sm:text-[16px]">서비스 이용 가능</div>
        ) : (
          <div className="border-custom-gray-500 text-custom-gray-500 w-fit rounded-[28px] border-[1.8px] px-1 py-0.5 text-[8px] sm:px-4 sm:py-2 sm:text-[16px]">서비스 종료</div>
        )}
      </div>
    </Link>
  );
}
