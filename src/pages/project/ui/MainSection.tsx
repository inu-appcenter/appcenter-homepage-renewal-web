import Image from 'next/image';
import { AppStore, WebLink, GooglePlay } from 'entities/link';
import { Project } from 'entities/project';

export const MainSection = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images);

  return (
    <section className="flex flex-col gap-4 py-30 sm:h-screen sm:py-50">
      <div className="flex h-full flex-row-reverse gap-4 sm:flex-row sm:gap-0">
        <div className="flex flex-1 flex-col justify-between sm:w-140">
          <div>
            {data.isActive ? (
              <div className="mb-4 flex flex-row items-center gap-0.5 sm:gap-2">
                <div className="bg-brand-secondary-light text-ba ckground rounded-lg px-0.5 py-0.5 text-[5px] whitespace-nowrap sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[16px]">
                  서비스 이용 가능
                </div>
                {data.websiteLink && (
                  <div className="text-brand-secondary-light border-brand-secondary-light/60 sm:border-brand-secondary-light rounded-lg border px-0.5 py-px text-[5px] sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[16px]">
                    Web
                  </div>
                )}
                {data.androidStoreLink && (
                  <div className="text-brand-secondary-light border-brand-secondary-light/60 sm:border-brand-secondary-light rounded-lg border px-0.5 py-px text-[5px] sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[16px]">
                    Android
                  </div>
                )}
                {data.appleStoreLink && (
                  <div className="text-brand-secondary-light border-brand-secondary-light/60 sm:border-brand-secondary-light rounded-lg border px-0.5 py-px text-[5px] sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[16px]">
                    iOS
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-custom-gray-500 mb-4 w-fit rounded-4xl px-2.5 py-1.5">서비스 종료</div>
            )}
            <h1 className="text-custom-gray-100 text-[16px] font-bold sm:mb-29 sm:text-[72px]">{data.title}</h1>
          </div>
          <p className="text-custom-gray-100 text-[10px] sm:text-xl/7">{data.subTitle}</p>
        </div>
        <div className="relative flex flex-1 justify-start sm:justify-end">
          <Image src={imageUrls[1]} alt="Main Section Image" width={2000} height={600} className="h-auto w-auto max-w-full object-contain" quality={100} unoptimized={true} />
        </div>
      </div>
      <div className="flex gap-1 sm:mt-9 sm:gap-3">
        {data.androidStoreLink && <GooglePlay className="h-5 sm:h-12" href={data.androidStoreLink} />}
        {data.appleStoreLink && <AppStore className="h-5 sm:h-12" href={data.appleStoreLink} />}
        {data.websiteLink && <WebLink className="h-5 sm:h-12" href={data.websiteLink} />}
      </div>
    </section>
  );
};
