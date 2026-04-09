import { projectApi } from 'entities/project';
import { ScrollToBottomButton } from 'entities/scroll';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '프로젝트 | 인천대학교 앱센터',
    description: '인천대학교 앱센터에서 진행한 프로젝트들을 소개합니다.',
    openGraph: {
      title: '프로젝트 | 인천대학교 앱센터',
      description: '인천대학교 앱센터에서 진행한 프로젝트들을 소개합니다.'
    }
  };
}

export async function ProjectListPage() {
  const data = await projectApi.getAll();
  const sortedData = data.sort((a, b) => {
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  return (
    <section className="flex flex-col items-center py-30 sm:py-40">
      <h1 className="font-product-design text-[24px] text-white sm:text-[64px]">
        <span className="text-brand-primary-cta">P</span>roject
      </h1>

      <ul className="mt-8 grid grid-cols-2 gap-2 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {sortedData.map((item) => (
          <Item key={item.id} data={item} />
        ))}
      </ul>
      <ScrollToBottomButton />
    </section>
  );
}

const Item = ({ data }: { data: Awaited<ReturnType<typeof projectApi.getAll>>[number] }) => {
  const appIcon = Object.values(data.images)[0];

  return (
    <Link href={`/project/${data.id}`}>
      <li className="group border-custom-gray-600/30 sm:border-custom-gray-600 hover:bg-custom-black flex flex-col rounded-lg border p-2 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-lg sm:rounded-2xl sm:p-8">
        <div className="w-full overflow-hidden rounded-sm sm:rounded-2xl">
          <Image src={appIcon} alt={data.title} width={0} height={0} sizes="100vw" className="h-auto w-full" />
        </div>
        <div className="mt-2 flex flex-col gap-1 sm:mt-11 sm:gap-3">
          <h2 className="text-brand-primary-cta line-clamp-1 text-[14px]/3.5 font-semibold sm:text-[28px]">{data.title}</h2>
          <div className="flex flex-1 flex-col justify-between gap-4">
            <div className="line-clamp-2 min-h-4 text-[12px]/3.5 text-white sm:min-h-7 sm:text-xl">{data.subTitle}</div>
          </div>

          <div className="mt-3 flex justify-end sm:mt-0">
            {data.isActive ? (
              <div className="text-brand-primary-cta border-brand-primary-cta/60 sm:border-brand-primary-cta group-hover:bg-brand-primary-cta group-hover:text-custom-black w-fit rounded-full border px-1 py-0.5 text-[8px] font-semibold transition-colors duration-300 sm:border-[1.7px] sm:px-3 sm:py-2 sm:text-[16px]">
                서비스 이용 가능
              </div>
            ) : (
              <div className="text-custom-gray-500 border-custom-gray-500/60 sm:border-custom-gray-500 group-hover:bg-custom-gray-500 group-hover:text-custom-black w-fit rounded-full border px-1 py-0.5 text-[8px] font-semibold transition-colors duration-300 sm:border-[1.7px] sm:px-3 sm:py-2 sm:text-[16px]">
                서비스 종료
              </div>
            )}
          </div>
        </div>
      </li>
    </Link>
  );
};
