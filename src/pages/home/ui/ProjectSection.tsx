'use client';
import { useMemo } from 'react';
import { Menu, MoveRight } from 'lucide-react';
import { Carousel, SectionTitle } from './Components';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useProject } from 'entities/project';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

export const ProjectSection = () => {
  return (
    <section id="project" className="relative flex flex-col justify-center gap-4 pt-20 sm:h-screen sm:gap-10">
      <div className="flex justify-between">
        <SectionTitle title="project" description="앱센터에서 만든 앱들을 소개합니다" />
        <Link
          href="/projectlist"
          className="text-brand-primary-cta border-brand-primary-cta bg-surface-elevated hidden h-fit cursor-pointer items-center gap-1.5 rounded-4xl border-[0.7px] px-4 py-2 text-lg shadow-[0px_0px_12px_0px_#57FF8566] sm:flex"
        >
          <Menu strokeWidth={1.25} />
          <span>목록으로</span>
        </Link>
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

  return (
    <Carousel
      data={sortedProjects}
      className="w-screen gap-3 sm:gap-11.5"
      overflowHidden={false}
      renderItem={(item) => {
        const imageUrls = Object.values(item.images);
        return (
          <motion.div
            whileHover={{ y: -24, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="group relative h-35 w-35 shrink-0 cursor-pointer overflow-hidden rounded-sm sm:h-95 sm:w-100 sm:rounded-xl"
          >
            <Image draggable={false} loading="lazy" src={imageUrls[0]} alt={item.title} fill className="object-cover" quality={100} />
            <Link aria-label={`${item.title} 프로젝트 바로가기`} draggable={false} href={`/project/${item.id}`} className="absolute inset-0 z-10">
              <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-1 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-4 sm:p-10">
                <h3 className="text-brand-primary-cta line-clamp-2 text-[16px] font-extrabold break-keep whitespace-normal sm:text-[43px]">{item.title}</h3>
                <div className="flex gap-1 sm:gap-4">
                  {item.androidStoreLink && <span className="text-[9px] font-medium sm:text-[25px]">Android</span>}
                  {item.appleStoreLink && <span className="text-[9px] font-medium sm:text-[25px]">iOS</span>}
                  {item.websiteLink && <span className="text-[9px] font-medium sm:text-[25px]">Web</span>}
                </div>
                {item.isActive ? (
                  <span className="border-brand-primary-cta text-brand-primary-cta rounded-[31px] border px-1 py-0.5 text-[5px] font-semibold sm:px-4 sm:py-1.5 sm:text-[14px]">서비스 이용 가능</span>
                ) : (
                  <span className="border-custom-gray-500 text-custom-gray-500 rounded-[31px] border px-1 py-0.5 text-[5px] font-semibold sm:px-4 sm:py-1.5 sm:text-[14px]">서비스 종료</span>
                )}
                <MoveRight className="text-custom-gray-500 absolute right-2 bottom-2 h-3 w-3 sm:right-12 sm:bottom-12 sm:h-10 sm:w-10" />
              </div>
            </Link>
          </motion.div>
        );
      }}
    />
  );
};
