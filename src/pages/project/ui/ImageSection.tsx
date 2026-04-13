'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from 'entities/project';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageSection = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images || {}).slice(2);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev! + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  return (
    <>
      <section className="my-10 flex flex-col gap-8 py-10 sm:gap-12 sm:py-20">
        {imageUrls.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <div className="custom-scrollbar flex h-75 w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:h-150">
                {imageUrls.map((url, index) => (
                  <div key={index} onClick={() => setSelectedIndex(index)} className="group relative h-full shrink-0 cursor-pointer snap-start overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                      src={url}
                      alt={`${data.title} 상세 이미지 ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="100vh"
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute top-0 right-0 bottom-4 w-6 bg-linear-to-l from-black/60 to-transparent sm:w-24" />
            </div>
          </div>
        )}
      </section>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-4 right-4 z-50 rounded-full p-4 text-white transition-colors hover:bg-white/20 sm:top-12 sm:right-12" onClick={() => setSelectedIndex(null)}>
            <X size={28} />
          </button>

          {imageUrls.length > 1 && (
            <>
              <button className="absolute top-1/2 left-2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80 sm:left-8 sm:p-3" onClick={handlePrev}>
                <ChevronLeft size={32} />
              </button>
              <button className="absolute top-1/2 right-2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80 sm:right-8 sm:p-3" onClick={handleNext}>
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div className="relative h-full max-h-[85vh] w-full max-w-[90vw] rounded-lg">
            <Image src={imageUrls[selectedIndex]} alt={`상세 이미지 확대뷰 ${selectedIndex + 1}`} fill className="object-contain" />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white">
            {selectedIndex + 1} / {imageUrls.length}
          </div>
        </div>
      )}
    </>
  );
};
