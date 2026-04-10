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

const STATUSPRIORITY: Record<string, number> = {
  RECRUITING: 1,
  WAITING: 2,
  CLOSED: 3
};

export async function JoinUsPage() {
  const data = await recruitmentApi.getAll();

  const sortedData = [...data].sort((a, b) => {
    const statusDiff = (STATUSPRIORITY[a.status] || 99) - (STATUSPRIORITY[b.status] || 99);

    if (statusDiff !== 0) {
      return statusDiff;
    }

    return b.id - a.id;
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
