'use client';
import Image from 'next/image';
import { Project } from 'entities/project';
import { useMemo } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export const GridSection = ({ data }: { data: Project }) => {
  const { width, containerRef, mounted } = useContainerWidth();

  const sections = useMemo(() => {
    if (!data.body) return [];
    try {
      const parsed = JSON.parse(data.body);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [
        [
          {
            i: '1',
            x: 0,
            y: 0,
            w: 12,
            h: 10,
            type: 'text',
            content: data.body
          }
        ]
      ];
    }
  }, [data]);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-20 py-20">
      {mounted &&
        sections.map((layout, index) => (
          <section key={`view-section-${index}`} className="w-full">
            <Responsive
              className="layout"
              layouts={{ lg: layout }}
              breakpoints={{ lg: 1200 }}
              cols={{ lg: 12 }}
              rowHeight={30}
              margin={[16, 16]}
              width={width}
              dragConfig={{ enabled: false }}
              resizeConfig={{ enabled: false }}
            >
              {layout.map((item: any) => (
                <div key={item.i} className="overflow-hidden rounded-2xl">
                  {item.type === 'image' ? (
                    <Image src={item.content} alt="프로젝트 이미지" fill className="h-full w-full object-cover transition-transform duration-500" />
                  ) : (
                    <div className="flex h-full w-full items-start p-2">
                      <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-100">{item.content}</p>
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
