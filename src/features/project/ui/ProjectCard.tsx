import { Project } from 'entities/project';
import Link from 'next/link';
import { Logo } from 'shared/icon/Logo';
import Image from 'next/image';

export function ProjectCard({ data, className, isActive }: { data: Project; className?: string; isActive?: boolean }) {
  const imageArray = data.images ? Object.values(data.images) : [];

  return (
    <Link
      href={`/project/${data.id}`}
      className={`group bg-background relative flex h-full flex-col gap-1 overflow-hidden rounded-lg border p-2 transition-all duration-500 sm:gap-4 sm:rounded-xl sm:border-2 sm:px-6 sm:py-5 ${
        isActive
          ? 'border-brand-primary-cta bg-custom-black -translate-y-2 shadow-[0px_0px_20px_0px_#57FF8544]'
          : 'border-custom-gray-600 hover:border-brand-primary-cta hover:bg-custom-black hover:-translate-y-2 hover:shadow-[0px_0px_20px_0px_#57FF8544]'
      } ${className}`}
    >
      {data.images ? (
        <Image src={imageArray[0]} alt="Recruitment Thumbnail" width={1920} height={1020} quality={100} className="h-auto w-full rounded-md object-cover sm:rounded-xl" />
      ) : (
        <div className="bg-background flex h-90 w-full items-center justify-center rounded-xl p-4">
          <Logo />
        </div>
      )}
      <div className="mt-3 flex flex-row items-center justify-between gap-2">
        <p className="text-brand-primary-cta line-clamp-1 flex-1 text-[0.75rem]/3 font-semibold whitespace-normal sm:text-[1.375rem]/5.5">{data.title}</p>
        <div className="flex justify-end">
          {data.isActive ? (
            <div
              className={`border-brand-primary-cta text-brand-primary-cta w-fit rounded-[1.75rem] border px-2 py-1 text-[0.5rem]/2 font-semibold whitespace-nowrap transition-all duration-300 sm:border-[1.6px] sm:text-[1rem]/4 ${isActive ? 'bg-brand-primary-cta text-custom-black' : 'group-hover:bg-brand-primary-cta group-hover:text-custom-black'}`}
            >
              서비스 이용 가능
            </div>
          ) : (
            <div
              className={`border-custom-gray-500 w-fit rounded-[1.75rem] border-[1.6px] px-2 py-1 text-[0.5rem]/2 whitespace-nowrap transition-all duration-300 sm:text-[1rem]/4 ${isActive ? 'bg-custom-gray-500 text-custom-black' : 'text-custom-gray-500 group-hover:bg-custom-gray-500 group-hover:text-custom-black'}`}
            >
              서비스 종료
            </div>
          )}
        </div>
      </div>
      <p className="mb-4 line-clamp-3 text-[0.625rem]/2.5 font-semibold whitespace-normal text-white sm:mb-10 sm:text-[1.25rem]/5">{data.subTitle}</p>
    </Link>
  );
}
