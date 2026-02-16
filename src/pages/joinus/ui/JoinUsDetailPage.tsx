import { AnimationButton } from 'shared/ui/animation-button';
import { OtherRecruitments } from './OtherRecruitments';
import { recruitmentApi } from 'entities/recruitment';
import { Logo } from 'shared/icon/Logo';
import Image from 'next/image';

export async function JoinUsDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const recruitmentData = await recruitmentApi.getById(id);

  const statusBadge = (status: string) => {
    switch (status) {
      case 'RECRUITING':
        return (
          <span role="status" className="bg-brand-primary-cta text-background mb-3 inline-block rounded-full px-2 py-1 text-[14px]/6 font-semibold sm:mb-4 sm:px-3 sm:py-2 sm:text-2xl">
            모집중
          </span>
        );
      case 'CLOSED':
        return (
          <span role="status" className="bg-custom-gray-500 text-background mb-3 inline-block rounded-full px-2 py-1 text-[14px]/6 font-semibold sm:mb-4 sm:px-3 sm:py-2 sm:text-2xl">
            모집완료
          </span>
        );
      case 'WAITING':
        return (
          <span role="status" className="bg-custom-gray-500 text-background mb-3 inline-block rounded-full px-2 py-1 text-[14px]/6 font-semibold sm:mb-4 sm:px-3 sm:py-2 sm:text-2xl">
            모집 대기중
          </span>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <section className="flex flex-col justify-center pt-35">
        <div className="mb-10 sm:mb-12">
          {statusBadge(recruitmentData.status)}
          <h1 className="mt-0.5 text-xl/5 font-bold text-white sm:mt-2 sm:text-[40px]">{recruitmentData.title}</h1>
        </div>

        <div className="flex flex-row gap-3 sm:items-start sm:gap-40">
          <div className="relative flex-1">
            {recruitmentData.thumbnail ? (
              <Image src={recruitmentData.thumbnail} alt={`${recruitmentData.title} 포스터 이미지`} width={1920} height={1020} quality={100} className="h-auto w-full object-contain" />
            ) : (
              <div className="bg-background flex aspect-video w-full items-center justify-center rounded-2xl p-4">
                <Logo />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-5 sm:gap-8" tabIndex={0}>
            <div className="grid grid-cols-[40px_1fr] gap-x-2.5 gap-y-2 text-white sm:grid-cols-[120px_1fr] sm:gap-x-6 sm:gap-y-8">
              <div className="text-[10px] font-semibold sm:text-2xl">모집 분야</div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {recruitmentData.fields.map((role, index) => (
                  <span key={index} className="border-brand-primary-cta text-brand-primary-cta rounded-full border px-1.5 py-1 text-[8px] font-medium sm:px-4 sm:py-1.5 sm:text-sm">
                    {role.name}
                  </span>
                ))}
              </div>

              <div className="text-[10px] font-semibold sm:text-2xl">모집 기한</div>
              <div className="flex flex-col space-y-1 text-[10px] font-medium sm:text-2xl">
                <span>
                  시작일 <span className="mx-2 text-gray-500">|</span> {recruitmentData.startDate}
                </span>
                <span>
                  마감일 <span className="mx-2 text-gray-500">|</span> {recruitmentData.endDate}
                </span>
              </div>

              <div className="text-[10px] font-semibold sm:text-2xl">모집 인원</div>
              <div className="text-[10px] font-medium sm:text-2xl">{recruitmentData.capacity}명</div>

              <div className="text-[10px] font-semibold sm:text-2xl">모집 대상</div>
              <div className="text-[10px] leading-relaxed font-medium sm:text-2xl">{recruitmentData.targetAudience}</div>
            </div>
            {recruitmentData.status === 'RECRUITING' ? (
              <AnimationButton href={recruitmentData.applyLink} target="_blank" rel="noopener noreferrer">
                <div className="text-[10px] text-white sm:text-2xl">지원하러 가기</div>
              </AnimationButton>
            ) : (
              <div className="w-fit rounded-[60px] border border-white/40 px-3.5 py-2 text-[10px] text-white/40 sm:text-2xl">
                {recruitmentData.status === 'CLOSED' ? '모집이 종료되었습니다' : '모집 대기중입니다'}
              </div>
            )}
          </div>
        </div>
      </section>
      <section
        id="main-content"
        tabIndex={0}
        aria-label={recruitmentData.body}
        className="bg-surface-elevated mt-10 rounded-2xl px-4 py-8 text-[16px] wrap-break-word whitespace-pre-line text-white sm:mt-20 sm:px-20 sm:py-15 sm:text-xl"
      >
        {recruitmentData.body}
      </section>
      <OtherRecruitments />
    </>
  );
}
