import Image from 'next/image';
import { Project } from 'entities/project';
import { AppStore, WebLink, GooglePlay } from 'entities/link';

export const MainSection = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images);

  return (
    <section className="flex flex-col gap-4 py-30 sm:h-screen sm:py-50">
      <div className="flex h-full flex-col-reverse gap-4 sm:flex-row sm:gap-0">
        <div className="flex flex-1 flex-col justify-between sm:w-140">
          <div>
            {data.isActive ? (
              <div className="my-2 flex flex-row items-center gap-1 sm:mb-4 sm:gap-2">
                <div className="bg-brand-secondary-light text-background rounded-full px-2 py-1 text-[0.625rem]/2.5 whitespace-nowrap sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[1rem]/4">
                  서비스 이용 가능
                </div>
                {data.websiteLink && (
                  <div className="text-brand-secondary-light border-brand-secondary-light/60 sm:border-brand-secondary-light rounded-full border px-2 py-1 text-[0.625rem]/2.5 sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[1rem]/4">
                    Web
                  </div>
                )}
                {data.androidStoreLink && (
                  <div className="text-brand-secondary-light border-brand-secondary-light/60 sm:border-brand-secondary-light rounded-full border px-2 py-1 text-[0.625rem]/2.5 sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[1rem]/4">
                    Android
                  </div>
                )}
                {data.appleStoreLink && (
                  <div className="text-brand-secondary-light border-brand-secondary-light/60 sm:border-brand-secondary-light rounded-full border px-2 py-1 text-[0.625rem]/2.5 sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[1rem]/4">
                    iOS
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-custom-gray-500 mb-4 w-fit rounded-full px-2 py-1 text-[0.625rem]/2.5 sm:rounded-4xl sm:px-2.5 sm:py-1.5 sm:text-[1rem]/4">서비스 종료</div>
            )}
            <h1 className="text-custom-gray-100 text-xl font-bold sm:mb-29 sm:text-[72px]">{data.title}</h1>
          </div>
          <div className="mt-2 flex flex-col items-start gap-9">
            <p className="text-custom-gray-100 text-base/6 sm:text-xl/7">{data.subTitle}</p>
            {data.isActive && (
              <div className="flex gap-1 sm:gap-3">
                {data.androidStoreLink && <GooglePlay className="h-6 sm:h-12" href={data.androidStoreLink} />}
                {data.appleStoreLink && <AppStore className="h-6 sm:h-12" href={data.appleStoreLink} />}
                {data.websiteLink && <WebLink className="h-6 sm:h-12" href={data.websiteLink} />}
              </div>
            )}
          </div>
        </div>
        <div className="relative flex flex-1 justify-start sm:ml-10 sm:justify-end">
          <Image
            src={imageUrls[1] ? imageUrls[1] : '/images/dummyMockup.png'}
            alt="Main Section Image"
            width={1200}
            height={600}
            className="h-auto w-auto max-w-full rounded-xl object-contain"
            quality={75}
          />
        </div>
      </div>
    </section>
  );
};
