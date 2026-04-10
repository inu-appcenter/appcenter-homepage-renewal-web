import { recruitmentApi } from 'entities/recruitment';
import { AnimationButton } from 'shared/ui/animation-button';
import Image from 'next/image';
import { Logo } from 'shared/icon/Logo';
import { OtherRecruitments } from './OtherRecruitments';
import { StatusBadge } from './Component';
import dayjs from 'dayjs';

export async function generateMetadata({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const recruitmentData = await recruitmentApi.getById(id);

  return {
    title: `${recruitmentData.title} | 인천대학교 앱센터`,
    description: recruitmentData.title,
    openGraph: {
      title: `${recruitmentData.title} | 인천대학교 앱센터`,
      description: recruitmentData.title,
      images: recruitmentData.thumbnail
    },
    twitter: {
      title: `${recruitmentData.title} | 인천대학교 앱센터`,
      description: recruitmentData.title,
      images: recruitmentData.thumbnail
    }
  };
}

export async function JoinUsDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const recruitmentData = await recruitmentApi.getById(id);

  return (
    <>
      <section className="flex flex-col justify-center pt-35">
        <div className="mb-10 sm:mb-12">
          <StatusBadge status={recruitmentData.status} />
          <h1 className="mt-2 text-xl/5 font-bold text-white sm:mt-2 sm:text-[2.5rem]/10">{recruitmentData.title}</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-40">
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
            <div className="grid grid-cols-[60px_1fr] gap-x-2.5 gap-y-2 text-white sm:grid-cols-[120px_1fr] sm:gap-x-6 sm:gap-y-7">
              <div className="text-base font-semibold sm:text-2xl/6">모집 분야</div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {recruitmentData.fields.map((role, index) => (
                  <span key={index} className="border-brand-primary-cta text-brand-primary-cta rounded-full border px-2 py-1 text-[0.875rem]/3.5 sm:px-4 sm:py-1.5 sm:text-sm">
                    {role.name}
                  </span>
                ))}
              </div>

              <div className="text-base/4 font-semibold sm:text-2xl/6">모집 기한</div>
              <div className="flex flex-col space-y-1 text-base/4 font-medium sm:text-2xl/6">
                <span>
                  시작일 <span className="mx-1">|</span> {dayjs(recruitmentData.startDate).format('YYYY. MM . DD')}
                </span>
                <span>
                  마감일 <span className="mx-1">|</span> {dayjs(recruitmentData.endDate).format('YYYY. MM . DD')}
                </span>
              </div>

              <div className="text-base/4 font-semibold sm:text-2xl/6">모집 인원</div>
              <div className="text-base/4 font-medium sm:text-2xl/6">{recruitmentData.capacity}명</div>

              <div className="text-base/4 font-semibold sm:text-2xl/6">모집 대상</div>
              <div className="text-base/4 font-medium sm:text-2xl/6">{recruitmentData.targetAudience ? recruitmentData.targetAudience : '-'}</div>
            </div>
            {recruitmentData.status === 'RECRUITING' ? (
              <AnimationButton target="_top" href={recruitmentData.applyLink}>
                <div className="text-base/4 text-white sm:text-2xl/6">지원하러 가기</div>
              </AnimationButton>
            ) : (
              <div className="w-fit rounded-[60px] border border-white/40 px-3.5 py-2 text-base/4 text-white/40 sm:text-2xl/6">
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
