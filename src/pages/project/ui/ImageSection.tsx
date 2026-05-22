'use client';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from 'entities/project';
import { BLUR_DATA_URL } from 'shared/constants/blur';

export const ImageSection = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images).slice(2);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = (dir: 1 | -1) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! + dir + imageUrls.length) % imageUrls.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  return (
    <>
      <section className="my-10 py-10 sm:py-20">
        <div className="custom-scrollbar flex h-75 w-full gap-4 overflow-x-auto pb-4 sm:h-150">
          {imageUrls.map((url, index) => (
            <div key={index} onClick={() => setSelectedIndex(index)} className="group relative h-full shrink-0 cursor-pointer overflow-hidden rounded-lg sm:rounded-xl">
              <Image
                src={url}
                alt={`${data.title} 상세 이미지 ${index + 1}`}
                width={0}
                height={0}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="100vh"
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-102"
              />
            </div>
          ))}
        </div>
      </section>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-4 right-4 z-50 rounded-full p-4 text-white transition-colors hover:bg-white/20 sm:top-12 sm:right-8" onClick={() => setSelectedIndex(null)}>
            <X size={28} />
          </button>

          {imageUrls.length > 1 && (
            <>
              <button className="absolute top-1/2 left-4 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80 sm:left-8 sm:p-3" onClick={navigate(-1)}>
                <ChevronLeft size={32} />
              </button>
              <button className="absolute top-1/2 right-4 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80 sm:right-8 sm:p-3" onClick={navigate(1)}>
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div className="relative h-full max-h-[85vh] w-full max-w-[90vw]">
            <Image src={imageUrls[selectedIndex]} alt={`상세 이미지 확대뷰 ${selectedIndex + 1}`} fill className="object-contain" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white">
            {selectedIndex + 1} / {imageUrls.length}
          </div>
        </div>
      )}
    </>
  );
};
