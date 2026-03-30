import { ScrollToBottomButton } from 'entities/scroll';
import { workShopApi } from 'entities/workshop';
import Image from 'next/image';

export function generateMetadata() {
  return {
    title: '워크숍 | 인천대학교 앱센터',
    description: '앱센터에서 진행한 워크숍입니다.',
    openGraph: {
      title: '워크숍 | 인천대학교 앱센터',
      description: '앱센터에서 진행한 워크숍입니다.'
    }
  };
}
export async function WorkshopListPage() {
  const data = await workShopApi.getAll();
  const sortedData = data.sort((a, b) => {
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  return (
    <section className="flex flex-col items-center py-30 sm:py-40">
      <h1 className="font-product-design text-[16px] text-white sm:text-[64px]">
        <span className="text-brand-primary-cta">W</span>orkshop
      </h1>

      <ul className="mt-8 grid grid-cols-3 gap-2 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {sortedData.map((item) => (
          <Item key={item.id} data={item} />
        ))}
      </ul>
      <ScrollToBottomButton />
    </section>
  );
}

const Item = ({ data }: { data: Awaited<ReturnType<typeof workShopApi.getAll>>[number] }) => {
  return (
    <li className="group border-custom-gray-600/30 sm:border-custom-gray-600 hover:bg-custom-black flex flex-col rounded-lg border p-2 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-lg sm:rounded-2xl sm:p-8">
      <div className="w-full overflow-hidden rounded-sm sm:rounded-2xl">
        <Image src={data.imageUrl} alt={data.title} width={0} height={0} sizes="100vw" className="h-auto w-full" />
      </div>
      <div className="mt-2 flex flex-col gap-0 sm:my-11">
        <h2 className="text-brand-primary-cta line-clamp-1 text-[12px] font-semibold sm:text-[28px]">{data.title}</h2>
        <span className="text-[8px] font-semibold text-white sm:text-[20px]">{data.eventDate}</span>
      </div>
    </li>
  );
};
