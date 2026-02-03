import Image from 'next/image';
import { Activity } from 'entities/activity';

export const MainSection = ({ data }: { data: Activity }) => {
  return (
    <section className="relative flex h-screen flex-row justify-between pt-87">
      <div className="bg-surface/50 pointer-events-none absolute top-0 left-1/2 -z-10 h-screen w-screen -translate-x-1/2 overflow-hidden blur-sm">
        <Image src={data.thumbnail} alt="메인 이미지" fill className="object-cover opacity-10" />
      </div>
      <div className="flex flex-col gap-40">
        <div className="flex flex-col gap-10">
          <h1 className="text-brand-primary-cta text-[100px]/25 font-bold">{data.title}</h1>
          <h2 className="text-custom-gray-400 pl-2.5 text-[40px]/7">{data.titleEng}</h2>
        </div>
        <p className="text-custom-gray-100 w-135 text-xl/7">{data.body}</p>
      </div>
      <div className="flex min-w-fit flex-col items-end gap-3">
        <Item title="Date" subTitle={new Date(data.createdDate).toLocaleDateString()} />
        <Item title="작성자" subTitle={data.author} />
      </div>
    </section>
  );
};

const Item = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="flex flex-row gap-5">
      <p className="text-brand-primary-cta text-xl/7">{title}</p>
      <p className="text-custom-gray-100 text-xl/7">{subTitle}</p>
    </div>
  );
};
