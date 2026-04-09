'use client';
import { useMemo } from 'react';
import { Carousel, ListButton, SectionTitle } from './Components';
import { useProject } from 'entities/project';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';
import { ProjectCard } from 'features/project';

export const ProjectSection = () => {
  return (
    <section id="project" className="relative flex flex-col justify-center gap-4 pt-20 sm:h-screen sm:gap-10">
      <div className="flex justify-between">
        <SectionTitle title="project" />
        <ListButton href="/projectlist" className="hidden sm:flex" />
      </div>
      <AsyncBoundary>
        <ProjectCarousel />
      </AsyncBoundary>
    </section>
  );
};

const ProjectCarousel = () => {
  const { data } = useProject();

  const sortedProjects = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
  }, [data]);

  return <Carousel data={sortedProjects} overflowHidden={false} className="gap-3 sm:gap-8" renderItem={(item) => <ProjectCard data={item} />} />;
};
