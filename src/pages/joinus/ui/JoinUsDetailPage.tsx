import { AnimationButton } from 'shared/ui/animation-button';
import { OtherRecruitments } from './OtherRecruitments';
import { recruitmentApi } from 'entities/recruitment';
import { Logo } from 'shared/icon/Logo';
import Image from 'next/image';

export async function JoinUsDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const recruitmentData = await recruitmentApi.getById(id);

  return (
    <>
      <section className="flex min-h-screen flex-col justify-center">
        <div className="mb-12">
          {recruitmentData.isRecruiting ? (
            <span className="bg-brand-primary-cta text-background mb-4 inline-block rounded-full px-3 py-2 text-2xl font-semibold">모집중</span>
          ) : (
            <span className="bg-custom-gray-500 text-background mb-4 inline-block rounded-full px-3 py-2 text-2xl font-semibold">모집완료</span>
          )}
          <h1 className="text-[40px] font-bold text-white">{recruitmentData.title}</h1>
        </div>

        <div className="flex flex-col items-stretch gap-12 sm:flex-row sm:items-start sm:gap-40">
          {recruitmentData.thumbnail ? (
            <Image src={recruitmentData.thumbnail} alt="Recruitment Thumbnail" width={1920} height={1020} quality={100} className="w-full flex-1 rounded-2xl object-cover sm:aspect-auto sm:h-125" />
          ) : (
            <div className="bg-background flex w-full flex-1 items-center justify-center rounded-2xl p-4 sm:aspect-auto sm:h-125">
              <Logo />
            </div>
          )}

          <div className="flex flex-1 flex-col gap-8">
            <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-8 text-white">
              <div className="text-2xl font-semibold">모집 분야</div>
              <div className="flex flex-wrap gap-2">
                {recruitmentData.fields.map((role, index) => (
                  <span key={index} className="border-brand-primary-cta text-brand-primary-cta rounded-full border px-4 py-1.5 text-sm font-medium">
                    {role.name}
                  </span>
                ))}
              </div>

              <div className="text-2xl font-semibold">모집 기한</div>
              <div className="flex flex-col space-y-1 text-2xl font-medium">
                <span>
                  시작일 <span className="mx-2 text-gray-500">|</span> {recruitmentData.startDate}
                </span>
                <span>
                  마감일 <span className="mx-2 text-gray-500">|</span> {recruitmentData.endDate}
                </span>
              </div>

              <div className="text-2xl font-semibold">모집 인원</div>
              <div className="text-2xl font-medium">{recruitmentData.capacity}명</div>

              <div className="text-2xl font-semibold">모집 대상</div>
              <div className="text-2xl leading-relaxed font-medium">{recruitmentData.targetAudience}</div>
            </div>
            <AnimationButton href="#">
              <div className="text-2xl">지원하러 가기</div>
            </AnimationButton>
          </div>
        </div>
      </section>
      <section className="bg-surface-elevated rounded-2xl px-20 py-15 text-xl whitespace-pre-line text-white">{recruitmentData.body}</section>
      <OtherRecruitments />
    </>
  );
}
