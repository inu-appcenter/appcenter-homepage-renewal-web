'use client';
import { BackgroundAnimation } from 'entities/background';
import { AnimationButton } from 'shared/ui/animation-button';
import { ScrambleText } from 'shared/animation/ScrambleText';
import Link from 'next/link';
import { ScrollIndicator } from './Components';

export const LandingSection = () => {
  return (
    <>
      <section id="home" className="relative flex h-screen flex-col items-center justify-end gap-7 pb-60 sm:items-start sm:justify-center sm:gap-5 sm:pb-0">
        <BackgroundAnimation />
        <h1 aria-label="APP CENTER" className="text-custom-gray-100 font-product-design pl-2 text-[2.5rem]/10 whitespace-nowrap uppercase sm:text-[7.5rem]/30">
          <ScrambleText text="APP " />
          <span className="text-brand-primary-light">
            <ScrambleText text="CENTER" />
          </span>
        </h1>
        <p className="text-custom-gray-200 text-center text-[14px] whitespace-nowrap sm:text-left sm:text-xl/8">
          {`오랫동안 운영되어 온 앱센터가 정보전산원 산하의`}
          <br className="sm:hidden" />
          {`AI 빅데이터 센터에 소속의 IT 이노베이션 랩으로 `}
          <br className="sm:hidden" />
          {`공식 명칭이 변경되었습니다.`}
        </p>
        <div className="text-custom-gray-200 hidden text-[1.875rem]/7.5 sm:inline-block">
          <span className="text-brand-primary-cta">앱센터</span>는 인천대학교 IT동아리로,
        </div>
        <p className="text-custom-gray-200 mb-6 hidden text-center whitespace-pre-line sm:inline-block sm:text-left sm:text-xl/8">
          {'인천대학교 학생들이 애플리케이션과 서비스를 직접 만드는 공간입니다.\n활동에 필요한 비용의 일부를 소속 기관으로부터 지원받고 있습니다.'}
        </p>

        {/** 데스크탑인 경우 */}
        <div className="hidden sm:inline-block">
          <AnimationButton href="/joinus">
            <span className="text-custom-gray-200 text-[1rem]/4 font-semibold">앱센터 모집 지원하러 가기</span>
          </AnimationButton>
        </div>
        {/** 모바일인 경우 */}
        <Link
          href="/joinus"
          prefetch={true}
          className="bg-brand-primary-cta border-custom-gray-100 text-custom-black mt-10 rounded-[60px] border px-8 py-4 text-xl/8 font-semibold whitespace-nowrap drop-shadow-[0_0_48px_#00FFBF66] sm:hidden"
        >
          앱센터 모집 지원하러 가기
        </Link>

        <ScrollIndicator />
      </section>
    </>
  );
};
