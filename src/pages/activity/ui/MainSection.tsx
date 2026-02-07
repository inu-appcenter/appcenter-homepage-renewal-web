import Image from 'next/image';
import { Activity } from 'entities/activity';

export const MainSection = ({ data }: { data: Activity }) => {
  return (
    <section className="relative flex h-screen flex-col gap-10 pt-87 sm:gap-20">
      <div className="flex justify-between">
        <div className="bg-surface/50 pointer-events-none absolute top-0 left-1/2 -z-10 h-screen w-screen -translate-x-1/2 overflow-hidden blur-sm">
          <Image src={data.thumbnail} alt="메인 이미지" fill className="object-cover opacity-10" />
        </div>
        <div className="flex flex-col gap-10 sm:gap-40">
          <div className="flex flex-col gap-2 sm:gap-10">
            <h1 className="text-brand-primary-cta text-[20px] font-bold sm:text-[100px]/25">{data.title}</h1>
            <h2 className="text-custom-gray-400 pl-2.5 sm:text-[40px]/7">{data.titleEng}</h2>
          </div>
        </div>
        <div className="flex min-w-fit flex-col items-end gap-1 sm:gap-3">
          <Item title="Date" subTitle={new Date(data.createdDate).toLocaleDateString()} />
          <Item title="작성자" subTitle={data.author} />
        </div>
      </div>
      <p className="text-custom-gray-100 text-[10px] sm:w-135 sm:text-xl/7">{data.body}</p>
    </section>
  );
};

const Item = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="flex flex-row gap-2 sm:gap-5">
      <p className="text-brand-primary-cta text-[12px] sm:text-xl/7">{title}</p>
      <p className="text-custom-gray-100 text-[12px] sm:text-xl/7">{subTitle}</p>
    </div>
  );
};
