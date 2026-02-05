import { recruitmentApi } from 'entities/recruitment';
import { CarouselSection } from './CarouselSection';
import { EmptyRecruit } from './EmptyRecruit';
import { ListSection } from './ListSection';
import { MainSection } from './MainSection';

export async function JoinUsPage() {
  const data = await recruitmentApi.getAll();

  return (
    <>
      <MainSection />
      {data && data.length > 0 ? (
        <>
          <CarouselSection data={data} />
          <ListSection data={data} />
        </>
      ) : (
        <EmptyRecruit />
      )}
    </>
  );
}
