import { BackgroundAnimation } from 'entities/background';
import { AnimationButton } from 'shared/ui/animation-button';
import { ScrambleText } from 'shared/animation/ScrambleText';
import { MoveDown } from 'lucide-react';

export const LandingSection = () => {
  return (
    <>
      <section id="home" className="relative flex h-screen flex-col items-center justify-center gap-4 sm:gap-8 md:items-start">
        <BackgroundAnimation />
        <h1 className="text-custom-gray-100 font-product-design pl-2 text-[40px] whitespace-nowrap uppercase sm:text-[120px]">
          <ScrambleText text="APP " />
          <span className="text-brand-primary-light">
            <ScrambleText text="CENTER" />
          </span>
        </h1>

        <p className="text-custom-gray-200 text-center text-[13px] font-semibold whitespace-pre-line sm:text-left sm:text-xl">
          {`오랫동안 사용되어 온 앱센터가 정보전산원 산하의 AI 빅데이터 센터에 소속된 IT 이노베이션 랩으로 명칭 정식 변경되었습니다.`}
        </p>
        <p className="text-custom-gray-200 mb-4 hidden text-center text-[13px] font-semibold whitespace-pre-line sm:inline-block sm:text-left sm:text-xl">
          {'인천대학교 학생들이 애플리케이션과 서비스를 직접 만드는 공간입니다.\n활동에 필요한 비용의 일부를 소속 기관으로부터 지원받고 있습니다.'}
        </p>

        {/** 데스크탑인 경우 */}
        <div className="hidden sm:inline-block">
          <AnimationButton href="/joinus">
            <span className="text-custom-gray-200 text-[8px] font-semibold sm:text-[20px]">앱센터 모집 지원하러 가기</span>
          </AnimationButton>
        </div>
        {/** 모바일인 경우 */}
        <div className="bg-brand-primary-cta border-custom-gray-100 text-custom-black rounded-[60px] border px-8 py-4 text-xl font-semibold drop-shadow-[0_0_48px_#00FFBF66] sm:hidden">
          앱센터 모집 지원하러 가기
        </div>

        <MoveDown className="text-custom-gray-200 absolute bottom-20 animate-bounce sm:hidden" />
      </section>
    </>
  );
};
