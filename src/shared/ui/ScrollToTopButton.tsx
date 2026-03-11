'use client';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤 위치에 따라 상태 변경
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-1/2 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-all duration-300 ease-in-out ${
        isVisible ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible translate-y-4 scale-75 opacity-0'
      } hover:bg-brand-primary-cta hover:scale-110 active:scale-95`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
