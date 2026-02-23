import { recruitmentApi } from 'entities/recruitment';
import { CarouselSection } from './CarouselSection';
import { EmptyRecruit } from './EmptyRecruit';
import { ListSection } from './ListSection';
import { MainSection } from './MainSection';

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
