import { projectApi } from 'entities/project';
import { GridSection } from './GridSection';
import { IntroduceSection } from './IntroduceSection';
import { MainSection } from './MainSection';

export async function ProjectDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const data = await projectApi.getById(id);

  return (
    <>
      <MainSection data={data} />
      <IntroduceSection data={data} />
      <GridSection data={data} />
    </>
  );
}
