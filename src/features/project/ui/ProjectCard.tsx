import { Project } from 'entities/project';
import Link from 'next/link';
import { Logo } from 'shared/icon/Logo';
import Image from 'next/image';

export function ProjectCard({ data }: { data: Project }) {
  const imageArray = data.images ? Object.values(data.images) : [];

  return (
    <Link
      href={`/project/${data.id}`}
      className="group border-custom-gray-600 hover:border-brand-primary-cta hover:bg-custom-black bg-background relative flex h-full w-36 flex-col gap-1 overflow-hidden rounded-lg border p-2 transition-all duration-500 hover:shadow-[0px_0px_20px_0px_#57FF8544] sm:w-90 sm:gap-4 sm:rounded-xl sm:border-2 sm:px-6 sm:py-5"
    >
      {data.images ? (
        <Image src={imageArray[0]} alt="Recruitment Thumbnail" width={1920} height={1020} quality={100} className="h-auto w-full rounded-md object-cover sm:rounded-xl" />
      ) : (
        <div className="bg-background flex h-90 w-full items-center justify-center rounded-xl p-4">
          <Logo />
        </div>
      )}
      <div className="mt-3 flex flex-row items-center justify-between gap-2">
        <p className="text-brand-primary-cta line-clamp-1 flex-1 text-[12px]/3 font-semibold whitespace-normal sm:text-[1.375rem]/5.5">{data.title}</p>
        <div className="flex justify-end">
          {data.isActive ? (
            <div className="border-brand-primary-cta text-brand-primary-cta group-hover:bg-brand-primary-cta group-hover:text-custom-black w-fit rounded-[28px] border px-1 py-0.5 text-[8px] font-semibold whitespace-nowrap transition-all duration-300 sm:border-[1.6px] sm:px-2 sm:py-1 sm:text-[16px]">
              서비스 이용 가능
            </div>
          ) : (
            <div className="border-custom-gray-500 text-custom-gray-500 group-hover:bg-custom-gray-500 group-hover:text-custom-black w-fit rounded-[28px] border-[1.6px] px-1 py-0.5 text-[8px] whitespace-nowrap transition-all duration-300 sm:px-2 sm:py-1 sm:text-[16px]">
              서비스 종료
            </div>
          )}
        </div>
      </div>
      <p className="mb-4 line-clamp-3 text-[10px]/3 font-semibold whitespace-normal text-white sm:text-[1.25rem]/5">{data.subTitle}</p>
    </Link>
  );
}
