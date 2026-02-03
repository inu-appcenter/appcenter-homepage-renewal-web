'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { OurTeamData } from '../data/OurTeamData';
import Link from 'next/link';
import { motion } from 'motion/react';

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    OurTeamData.forEach((part) => {
      const element = document.getElementById(part.title);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.4 }} className="text-custom-black fixed top-1/4 right-8 z-60 flex flex-col items-center">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-brand-primary-cta z-20 rounded-full p-5 shadow-lg transition-transform active:scale-90">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`bg-custom-gray-800 absolute flex flex-col items-center gap-2 overflow-hidden rounded-full pt-20 pb-8 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {OurTeamData.map((part) => {
          const isActive = activeSection === part.title;
          return (
            <Link
              key={part.title}
              href={`#${part.title}`}
              className={`w-full cursor-pointer px-2 py-3 text-center font-semibold transition-all duration-300 hover:scale-110 ${isActive ? 'text-brand-primary-cta bg-custom-gray-900 opacity-100' : 'text-custom-black'} `}
            >
              {part.title}
            </Link>
          );
        })}
      </div>
    </motion.div>,
    document.body
  );
};
