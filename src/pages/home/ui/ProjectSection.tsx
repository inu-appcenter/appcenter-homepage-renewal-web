'use client';
import { useMemo } from 'react';
import { ListButton, SectionTitle } from './Components';
import { ProjectCard } from 'features/project';
import { useProject } from 'entities/project';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { Carousel } from 'shared/ui/carousel';

export const ProjectSection = () => {
  return (
    <section id="project" className="flex flex-col justify-center gap-4 pt-30 sm:h-screen">
      <div className="flex justify-between">
        <SectionTitle title="project" />
        <ListButton href="/projectlist" />
      </div>
      <AsyncBoundary>
        <ProjectCarousel />
      </AsyncBoundary>
    </section>
  );
};

function ProjectCarousel() {
  const { data } = useProject();
  const sortedProjects = useMemo(() => [...(data ?? [])].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()), [data]);

  return (
    <Carousel
      data={sortedProjects}
      options={{ loop: true, align: 'center', containScroll: 'trimSnaps', dragFree: true }}
      autoPlay={true}
      autoPlayOptions={{ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }}
      className="space-y-4 py-4"
      trackClassName="gap-4 p-4"
      slideClassName="flex-[0_0_60%] sm:flex-[0_0_25%]"
      renderItem={(project, _, isActive) => <ProjectCard data={project} isActive={isActive} />}
      overflow={false}
    />
  );
}
