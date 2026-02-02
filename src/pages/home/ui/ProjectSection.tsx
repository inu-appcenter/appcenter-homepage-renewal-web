'use client';
import { MoveRight } from 'lucide-react';
import { Carousel, SectionTitle } from './Components';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useProject } from 'entities/project';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

export const ProjectSection = () => {
  return (
    <section className="relative flex h-[60vh] flex-col justify-center gap-4 sm:h-screen sm:gap-10">
      <SectionTitle title="project" description="앱센터에서 만든 앱들을 소개합니다" />
      <AsyncBoundary>
        <ProjectCarousel />
      </AsyncBoundary>
    </section>
  );
};

const ProjectCarousel = () => {
  const { data } = useProject();

  return (
    <Carousel
      data={data}
      className="-mx-20 gap-8 sm:gap-16"
      renderItem={(item) => {
        const imageUrls = Object.values(item.images);
        return (
          <motion.div whileHover={{ y: -24, scale: 1.05 }} transition={{ duration: 0.4 }} className="group relative h-35 w-35 shrink-0 cursor-pointer overflow-hidden rounded-xl sm:h-120 sm:w-125">
            <Image draggable={false} loading="lazy" src={imageUrls[0]} alt={item.title} fill className="object-cover" quality={100} />
            <Link draggable={false} href={`/project/${item.id}`} className="absolute inset-0 z-10">
              <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-2 p-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-4">
                <h1 className="text-brand-primary-cta text-[32px] font-extrabold break-keep whitespace-normal sm:text-[64px]">{item.title}</h1>
                <div className="flex gap-2 sm:gap-4">
                  {item.androidStoreLink && <span className="text-[18px] font-medium sm:text-[36px]">Android</span>}
                  {item.appleStoreLink && <span className="text-[18px] font-medium sm:text-[36px]">iOS</span>}
                  {item.websiteLink && <span className="text-[18px] font-medium sm:text-[36px]">Web</span>}
                </div>
                {item.isActive ? (
                  <span className="border-brand-primary-cta text-brand-primary-cta rounded-[31px] border px-2 py-1.5 text-[10px] font-semibold sm:border-2 sm:px-4 sm:py-3 sm:text-xl">
                    서비스 이용 가능
                  </span>
                ) : (
                  <span className="rounded-[31px] border border-gray-500 px-2 py-1.5 text-[10px] font-semibold sm:border-2 sm:px-4 sm:py-3 sm:text-xl">서비스 종료</span>
                )}
                <MoveRight className="text-custom-gray-500 absolute right-12 bottom-12" size={40} />
              </div>
            </Link>
          </motion.div>
        );
      }}
    />
  );
};
