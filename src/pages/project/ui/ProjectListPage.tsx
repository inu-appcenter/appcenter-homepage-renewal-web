import { projectApi } from 'entities/project';
import { ScrollToBottomButton } from 'entities/scroll';
import { ProjectCard } from 'features/project';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '프로젝트 | 인천대학교 앱센터',
    description: '인천대학교 앱센터에서 진행한 프로젝트들을 소개합니다.',
    openGraph: {
      title: '프로젝트 | 인천대학교 앱센터',
      description: '인천대학교 앱센터에서 진행한 프로젝트들을 소개합니다.'
    }
  };
}

export async function ProjectListPage() {
  const data = await projectApi.getAll();
  const sortedData = data.sort((a, b) => {
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  return (
    <section className="flex flex-col items-center py-30 sm:py-40">
      <h1 className="font-product-design text-[1.5rem]/6 text-white sm:text-[4rem]/6">
        <span className="text-brand-primary-cta">P</span>roject
      </h1>

      <ul className="mt-8 grid grid-cols-2 gap-2 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {sortedData.map((item) => (
          <ProjectCard key={item.id} data={item} className="w-full" />
        ))}
      </ul>
      <ScrollToBottomButton />
    </section>
  );
}
