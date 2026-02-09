'use client';
import { MoveDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (document.body.scrollHeight - (window.scrollY + window.innerHeight) < 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToBottom}
      className="bg-custom-black border-custom-gray-800 fixed bottom-8 left-1/2 z-50 flex h-12 w-12 -translate-x-1/2 transform animate-bounce cursor-pointer items-center justify-center rounded-full border shadow-xl transition-all hover:scale-110 active:scale-95 sm:bottom-10 sm:h-14 sm:w-14"
      aria-label="맨 아래로 스크롤"
    >
      <MoveDown className="text-brand-primary-cta" />
    </button>
  );
};
