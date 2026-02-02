import { AnimationButton } from 'shared/ui/animation-button';
import { OtherRecruitments } from './OtherRecruitments';

export async function JoinUsDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  console.log('Recruitment ID:', id);

  return (
    <>
      <section className="flex min-h-screen flex-col justify-center">
        <div className="mb-12">
          <span className="bg-brand-primary-cta text-background mb-4 inline-block rounded-full px-3 py-2 text-2xl font-semibold">모집중</span>
          <h1 className="text-[40px] font-bold text-white">[BE] 새로운 프로젝트 팀원 모집</h1>
        </div>

        <div className="flex flex-col items-stretch gap-12 sm:flex-row sm:items-start sm:gap-40">
          <div className="bg-custom-gray-500 aspect-square w-full flex-1 rounded-2xl sm:aspect-auto sm:h-125" />

          <div className="flex flex-1 flex-col gap-8">
            <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-8 text-white">
              <div className="text-2xl font-semibold">모집 분야</div>
              <div className="flex flex-wrap gap-2">
                {['프론트엔드', '백엔드', '풀스택'].map((role, index) => (
                  <span key={index} className="border-brand-primary-cta text-brand-primary-cta rounded-full border px-4 py-1.5 text-sm font-medium">
                    {role}
                  </span>
                ))}
              </div>

              <div className="text-2xl font-semibold">모집 기한</div>
              <div className="flex flex-col space-y-1 text-2xl font-medium">
                <span>
                  시작일 <span className="mx-2 text-gray-500">|</span> 2026.01.30
                </span>
                <span>
                  마감일 <span className="mx-2 text-gray-500">|</span> 2026.02.28
                </span>
              </div>

              <div className="text-2xl font-semibold">모집 인원</div>
              <div className="text-2xl font-medium">2명</div>

              <div className="text-2xl font-semibold">모집 대상</div>
              <div className="text-2xl leading-relaxed font-medium">
                열정적인 개발자라면 누구나 환영합니다.
                <br />주 1회 오프라인 회의 참석 가능하신 분.
              </div>
            </div>
            <AnimationButton href="#">
              <div className="text-2xl">지원하러 가기</div>
            </AnimationButton>
          </div>
        </div>
      </section>
      <section className="bg-surface-elevated rounded-2xl px-20 py-15 text-xl whitespace-pre-line text-white">
        {`
        🧩 서비스 & 팀 소개 
        피스(Piece)는 남성 성소수자를 위한 진정성 있는 소개팅 플랫폼입니다. 
        단순 스와이프형 서비스가 아니라, 프로필 심사 + 가치관 기반 매칭으로 겉모습이 아닌 “진짜 마음”과 연결되는
        경험을 지향하고 있습니다. 

        📌 이미 Android/iOS 정식 출시 되었고, 
        📌 유료 기능까지 운영 중인 실서비스로 유저들이 실제로 사용하고 있습니다. 현재 누적 가입자도 500+를 넘어섰으며(자세한 수치는
        커피챗때 공유), 당장 ‘만들어보는 프로젝트’가 아닌 실제 유저와 수익 구조가 존재하는 서비스 단계입니다.
        
        ✨ 한눈에 보는 요약
        📌 포지션 iOS 개발자 (1명) Server 개발자 (1명)
        📌 이 팀이 특별한 이유 
        ✔ 실 서비스 기반 포트폴리오 작성 가능 
        ✔ 대기업 출신 PM 리드 + 1년 이상 운영 중인 팀 
        ✔ 실 유저 트래픽/결제/운영 이슈를 다루는 “진짜 서비스” 개발 경험 

        📍 왜 이 기회가 흔치 않을까? 대부분
        사이드 프로젝트는 베타/MVP 단계에서 끝나지만, 피스는 이미 출시 + 유료 기능 + 실 사용자 흐름이 존재합니다. 신규 기능 개발이 실제 서비스 사이클에 반영되어, 수치적인 성과를 얻을 수 있습니다.
        🔗 자세한 구인글은 아래 노션에서 확인해주세요 👉https://brassy-client-c0a.notion.site/2f42f1c4b96680d8805afd67027f1036?source=copy_link
        `}
      </section>
      <OtherRecruitments />
    </>
  );
}
