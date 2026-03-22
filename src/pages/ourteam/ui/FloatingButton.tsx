'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { OurTeamData } from '../data/OurTeamData';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useScroll } from 'entities/scroll';

export const FloatingButton = () => {
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);
  const { scrollToId } = useScroll();

  useEffect(() => {
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.4 }}
      className="text-custom-black fixed top-1/4 z-60 hidden flex-col items-center sm:flex md:right-8 lg:right-16"
    >
      <div className="bg-custom-gray-800 relative -mt-6 flex flex-col items-center gap-2 overflow-hidden rounded-xl shadow-md">
        {OurTeamData.map((part) => {
          const isActive = activeSection === part.title;
          return (
            <Link
              key={part.title}
              href={`/ourteam/#${part.title}`}
              scroll={false}
              onClick={(e) => handleClick(e, part.title)}
              className={`w-full cursor-pointer px-1 py-3 text-center font-semibold transition-all duration-300 hover:scale-110 ${
                isActive ? 'text-brand-primary-cta bg-custom-gray-900 opacity-100' : 'text-custom-black opacity-70 hover:opacity-100'
              }`}
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
