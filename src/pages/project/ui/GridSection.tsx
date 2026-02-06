'use client';
import Image from 'next/image';
import { Project } from 'entities/project';
import { useMemo } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export const GridSection = ({ data }: { data: Project }) => {
  const { width, containerRef, mounted } = useContainerWidth();

  const isMobile = width < 640;
  const isSmallMobile = width < 400;
  const rowHeight = isSmallMobile ? 8 : isMobile ? 10 : 30;

  const sections = useMemo(() => {
    if (!data.body) return [];

    let originalLayouts: any[] = [];

    try {
      const parsed = JSON.parse(data.body);
      originalLayouts = Array.isArray(parsed) ? parsed : [];
    } catch {
      originalLayouts = [[{ i: '1', x: 0, y: 0, w: 12, h: 12, type: 'text', content: data.body }]];
    }

    return originalLayouts.map((layout) => {
      const smLayout = layout.map((item: any) => {
        if (item.type === 'text') {
          return {
            ...item,
            h: item.h * (isSmallMobile ? 2 : 2)
          };
        }
        return item;
      });

      return { lg: layout, sm: smLayout };
    });
  }, [data, isSmallMobile]);

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col gap-20 py-20">
      {mounted &&
        sections.map((layoutData, index) => (
          <section key={`view-section-${index}`} className="h-full w-full">
            <Responsive
              className="layout"
              layouts={{ lg: layoutData.lg, sm: layoutData.sm }}
              breakpoints={{ lg: 1200, sm: 640 }}
              cols={{ lg: 12, sm: 12 }}
              rowHeight={rowHeight}
              margin={{ lg: [16, 16], sm: [6, 6] }}
              width={width}
              dragConfig={{ enabled: false }}
              resizeConfig={{ enabled: false }}
            >
              {layoutData.lg.map((item: any) => (
                <div key={item.i} className="overflow-hidden rounded-lg sm:rounded-2xl">
                  {item.type === 'image' ? (
                    <Image src={item.content} alt="프로젝트 이미지" fill className="h-full w-full object-cover transition-transform duration-500" />
                  ) : (
                    <div className="flex h-full w-full items-start p-1">
                      <p className="text-[6px] tracking-tight break-keep whitespace-pre-wrap text-gray-100 min-[400px]:text-[8px] sm:text-lg sm:tracking-normal">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </Responsive>
          </section>
        ))}
    </div>
  );
};
