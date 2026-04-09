import { SectionTitle } from './Components';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Script from 'next/script';
import { Logo } from 'shared/icon/Logo';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
const POSITION = { lat: 37.37658, lng: 126.6358 }; // 인천대학교 앱센터 위치

export const LocationSection = () => {
  return (
    <section id="location" className="flex flex-col gap-16 py-30 sm:h-screen">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />

      <SectionTitle title="Location" />
      <div className="flex flex-1 flex-col gap-10 overflow-hidden sm:flex-row sm:gap-16">
        <div className="relative h-70 w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl sm:h-full sm:flex-1 sm:rounded-3xl">
          <Map center={POSITION} style={{ width: '100%', height: '100%' }} level={3}>
            <CustomOverlayMap position={POSITION}>
              <div className="relative flex flex-col items-center">
                <div className="bg-background mb-2 rounded-lg px-4 py-2 shadow-lg ring-1 ring-black/5">
                  <span className="text-brand-primary-cta bg-background text-sm font-bold whitespace-nowrap">인천대학교 앱센터</span>
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="bg-brand-primary-cta absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></div>
                  <div className="bg-background relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-md">
                    <Logo className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          </Map>
        </div>

        <div className="flex flex-col justify-center gap-16">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-8">
            <div className="border-brand-secondary-light text-brand-secondary-light bg-surface-elevated flex justify-center rounded-[2.5rem] border px-4 py-2 text-[1rem]/4 font-bold whitespace-nowrap sm:px-8 sm:py-2.5 sm:text-[1.75rem]/7">
              주소
            </div>
            <div className="text-[1rem] text-white sm:text-xl">인천광역시 아카데미로119 4호관 정보전산원(BM컨텐츠관) 107호</div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-8">
            <div className="border-brand-secondary-light text-brand-secondary-light bg-surface-elevated flex justify-center rounded-[2.5rem] border px-4 py-2 text-[1rem]/4 font-bold whitespace-nowrap sm:px-12 sm:py-2.5 sm:text-[1.75rem]/7">
              오시는 길
            </div>
            <div className="mt-1 flex flex-col gap-2 text-[1rem] sm:mt-4 sm:text-xl">
              <div className="text-white">
                지하철 <span className="rounded-lg bg-sky-600 px-1">인천1</span> 인천대입구역 하차 후
              </div>
              <div className="text-white">- 도보로 약 10분 소요</div>
              <div className="text-white">
                - <span className="rounded-lg bg-blue-700 px-1.5">간선</span> 8, 58 인천대정문 하차
              </div>
              <div className="text-white">
                - <span className="rounded-lg bg-green-700 px-1.5">지선</span> 41, 46 인천대학교송도캠퍼스 하차
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
