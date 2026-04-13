import { Metadata } from 'next';
import { projectApi } from 'entities/project';
import { GridSection } from './GridSection';
import { IntroduceSection } from './IntroduceSection';
import { MainSection } from './MainSection';
import { OtherProjects } from './OtherProject';
import { ImageSection } from './ImageSection';

export async function generateMetadata({ params }: { params: Promise<{ id: number }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await projectApi.getById(id);
    const imageUrls = Object.values(data.images);

    return {
      title: `${data.title} | 인천대학교 앱센터`,
      description: data.subTitle,
      icons: {
        icon: imageUrls[0] || '/favicon.ico'
      },
      openGraph: {
        title: data.title,
        description: data.subTitle
      },
      twitter: {
        title: data.title,
        description: data.subTitle
      }
    };
  } catch {
    return {
      title: '프로젝트 상세 | 인천대학교 앱센터'
    };
  }
}

export async function ProjectDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await projectApi.getById(id);

  return (
    <>
      <MainSection data={data} />
      <IntroduceSection data={data} />
      <GridSection data={data} />
      <ImageSection data={data} />
      <OtherProjects />
    </>
  );
}
