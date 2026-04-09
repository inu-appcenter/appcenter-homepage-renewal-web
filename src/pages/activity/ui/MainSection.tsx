import Image from 'next/image';
import { Activity } from 'entities/activity';

export const MainSection = ({ data }: { data: Activity }) => {
  return (
    <section className="relative flex h-screen flex-col justify-between gap-10 pt-50 pb-30 sm:justify-center sm:gap-20 sm:pt-87">
      <div className="flex justify-between">
        <div className="bg-surface/50 pointer-events-none absolute top-0 left-1/2 -z-10 h-screen w-screen -translate-x-1/2 overflow-hidden blur-sm">
          <Image src={data.thumbnail} alt="메인 이미지" fill className="object-cover opacity-10" />
        </div>
        <div className="flex flex-col gap-10 sm:gap-40">
          <div className="flex flex-col gap-2 sm:gap-10">
            <h1 className="text-brand-primary-cta text-[2rem]/8 font-bold sm:text-[6rem]/24">{data.title}</h1>
            <h2 className="text-custom-gray-100 text-[1rem]/4 font-bold sm:pl-2.5 sm:text-[1.5rem]/6">{data.titleEng}</h2>
          </div>
        </div>
        <div className="flex min-w-fit flex-col items-end gap-1 sm:gap-3">
          <Item title="Date" subTitle={new Date(data.createdDate).toLocaleDateString()} />
          <Item title="작성자" subTitle={data.author} />
        </div>
      </div>
      <p className="text-custom-gray-100 sm:w-135 sm:text-[1rem]/6">{data.body}</p>
    </section>
  );
};

const Item = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="flex flex-row gap-2 sm:gap-5">
      <p className="text-brand-primary-cta text-[0.625rem]/2.5 sm:text-xl/7">{title}</p>
      <p className="text-custom-gray-100 text-[0.625rem]/2.5 sm:text-xl/7">{subTitle}</p>
    </div>
  );
};
