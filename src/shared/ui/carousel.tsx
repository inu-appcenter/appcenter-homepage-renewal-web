'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from 'shared/utils/cn';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel';

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number, isActive?: boolean) => React.ReactNode;
  options?: EmblaOptionsType;
  autoScroll?: boolean;
  autoPlay?: boolean;
  autoPlayOptions?: Parameters<typeof Autoplay>[0];
  autoScrollOptions?: Parameters<typeof AutoScroll>[0];
  pauseOnIntersection?: boolean;
  showTrackButton?: boolean;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  overflow?: boolean;
}

export const Carousel = <T,>({
  data,
  renderItem,
  options = { loop: true, align: 'start', dragFree: true },
  autoScroll = false,
  autoPlay = false,
  autoPlayOptions = { delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true },
  autoScrollOptions = { speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true },
  pauseOnIntersection = true,
  showTrackButton = true,
  className,
  trackClassName = 'gap-4 px-4',
  slideClassName = '',
  overflow = true
}: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const plugins = useMemo(
    () => [autoScroll && AutoScroll({ ...autoScrollOptions }), autoPlay && Autoplay({ ...autoPlayOptions })].filter(Boolean) as any[],
    [autoScroll, autoPlay, autoPlayOptions, autoScrollOptions]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('init', onInit).on('reInit', onInit);
    emblaApi.on('select', onSelect).on('reInit', onSelect);

    onInit();
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !pauseOnIntersection || !containerRef.current) return;

    const plugin = emblaApi.plugins().autoScroll || emblaApi.plugins().autoplay;
    if (!plugin) return;

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? plugin.play() : plugin.stop()), { threshold: 0.3 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [emblaApi, pauseOnIntersection]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div ref={containerRef} className={cn('relative flex flex-col py-6', className)}>
      <div ref={emblaRef} className={cn('overflow-hidden', !overflow && 'overflow-visible')}>
        <ul className={cn('flex', trackClassName)}>
          {data.map((item, index) => (
            <li key={index} className={slideClassName}>
              {renderItem(item, index, activeIndex === index)}
            </li>
          ))}
        </ul>
      </div>

      {showTrackButton && scrollSnaps.length > 0 && (
        <div className="mt-4 flex justify-center gap-2 sm:gap-5">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn('h-1 w-1 rounded-full transition-all duration-300 sm:h-3 sm:w-3', activeIndex === index ? 'bg-brand-primary-cta scale-110' : 'bg-custom-gray-700')}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
