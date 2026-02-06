import Link from 'next/link';
import Image from 'next/image';
import { Logo } from 'shared/icon/Logo';
import { Project } from 'entities/project';

export function ProjectCard({ data }: { data: Project }) {
  const imageArray = data.images ? Object.values(data.images) : [];

  return (
    <Link
      href={`/project/${data.id}`}
      className="group border-custom-gray-600 hover:border-brand-primary-cta bg-background relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border-2 p-8 transition-all duration-500 hover:shadow-[0px_0px_20px_0px_#57FF8544]"
    >
      {data.images ? (
        <Image
          src={imageArray[0] || '/images/default-recruitment-thumb.png'}
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
      <div className="text-brand-primary-cta mt-8 line-clamp-1 text-[28px] font-semibold">{data.title}</div>
      <div className="flex gap-2">
        {data.androidStoreLink && <div className="text-xl font-semibold text-white">Android</div>}
        {data.websiteLink && <div className="text-xl font-semibold text-white">Website</div>}
        {data.appleStoreLink && <div className="text-xl font-semibold text-white">iOS</div>}
      </div>
      <div className="flex w-full justify-end">
        {data.isActive ? (
          <div className="border-brand-primary-cta text-brand-primary-cta w-fit rounded-[28px] border-[1.8px] px-4 py-2">서비스 이용 가능</div>
        ) : (
          <div className="border-custom-gray-500 text-custom-gray-500 w-fit rounded-[28px] border-[1.8px] px-4 py-2">서비스 종료</div>
        )}
      </div>
    </Link>
  );
}
