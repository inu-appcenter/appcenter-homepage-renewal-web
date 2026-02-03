import Image from 'next/image';
import { AppStore, WebLink, GooglePlay } from 'entities/link';
import { Project } from 'entities/project';

export const MainSection = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images);

  return (
    <section className="flex h-screen flex-row justify-between py-50">
      <div className="flex w-140 flex-col justify-between">
        <div>
          {data.isActive ? (
            <div className="mb-4 flex flex-row items-center gap-2">
              <div className="bg-brand-secondary-light text-background rounded-4xl px-2.5 py-1.5">서비스이용가능</div>
              {data.websiteLink && <div className="text-brand-secondary-light border-brand-secondary-light rounded-4xl border px-2.5 py-1.5">WEB</div>}
              {data.androidStoreLink && <div className="text-brand-secondary-light border-brand-secondary-light rounded-4xl border px-2.5 py-1.5">APP</div>}
              {data.appleStoreLink && <div className="text-brand-secondary-light border-brand-secondary-light rounded-4xl border px-2.5 py-1.5">iOS</div>}
            </div>
          ) : (
            <div className="mb-4 w-fit rounded-4xl bg-gray-600 px-2.5 py-1.5">서비스종료</div>
          )}
          <h1 className="text-custom-gray-100 mb-29 text-[72px] font-bold">{data.title}</h1>
        </div>
        <div>
          <p className="text-custom-gray-100 text-xl/7">{data.subTitle}</p>
          <div className="mt-9 flex gap-3">
            {data.androidStoreLink && <GooglePlay href={data.androidStoreLink} />}
            {data.appleStoreLink && <AppStore href={data.appleStoreLink} />}
            {data.websiteLink && <WebLink href={data.websiteLink} />}
          </div>
        </div>
      </div>
      <div className="relative flex flex-1 justify-end">
        <Image src={imageUrls[1]} alt="Main Section Image" width={2000} height={600} className="h-auto w-auto max-w-full object-contain" quality={100} unoptimized={true} />
      </div>
    </section>
  );
};
