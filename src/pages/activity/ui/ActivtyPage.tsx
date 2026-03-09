import { activityApi } from 'entities/activity';
import { ImageSection } from './ImageSection';
import { MainSection } from './MainSection';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: number }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await activityApi.getById(id);

    return {
      title: `${data.title} | 인천대학교 앱센터`,
      description: data.body,
      openGraph: {
        title: data.title,
        description: data.body,
        images: Object.values(data.thumbnail).map((url) => ({ url }))
      }
    };
  } catch {
    return {
      title: '활동 상세 | 인천대학교 앱센터'
    };
  }
}

export async function ActivityPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await activityApi.getById(id);

  return (
    <>
      <MainSection data={data} />
      {data.contents.map((content, index) => (
        <ImageSection key={index} data={content} />
      ))}
    </>
  );
}
