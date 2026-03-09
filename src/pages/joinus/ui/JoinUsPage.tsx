import { recruitmentApi } from 'entities/recruitment';
import { CarouselSection } from './CarouselSection';
import { EmptyRecruit } from './EmptyRecruit';
import { ListSection } from './ListSection';
import { MainSection } from './MainSection';

export function generateMetadata() {
  return {
    title: '모집공고 | 인천대학교 앱센터',
    description:
      '인천대학교 학생 개발자들의 성지, 앱센터 모집공고를 확인해 보세요. 실무 감각을 키우는 프로젝트부터 끈끈한 네트워킹까지! 개발과 창작에 대한 열정만 있다면 누구나 환영합니다. 우리와 함께 특별한 여정을 시작해봐요'
  };
}

export async function JoinUsPage() {
  const data = await recruitmentApi.getAll();

  // 모집공고 정렬 (모집중 > 대기중 > 마감)
  const statusPriority: Record<string, number> = {
    RECRUITING: 1,
    WAITING: 2,
    CLOSED: 3
  };

  const sortedData = [...data].sort((a, b) => {
    return (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99);
  });

  const isRecruiting = sortedData.filter((recruit) => recruit.status === 'RECRUITING');

  return (
    <>
      <MainSection />
      {data && data.length > 0 && (
        <>
          <CarouselSection data={sortedData} />
          <ListSection data={sortedData} />
        </>
      )}
      <>{isRecruiting.length === 0 && <EmptyRecruit />}</>
    </>
  );
}
