'use client';
import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollContext } from 'entities/scroll';
import { NAV_ITEMS } from '../constants/navItem';

export function MobileHeader({ mode }: { mode?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const scrollContext = useContext(ScrollContext);
  const scrollToId = scrollContext?.scrollToId;

  const authBtnText = mode ? 'Dashboard' : 'Sign in';
  const authBtnHref = mode ? `/${mode}/home` : '/login';

  const closeMenu = () => setIsOpen(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (pathname === '/' && href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];

      if (scrollToId) {
        scrollToId(targetId);
        closeMenu();
      }
    }
  };

  return (
    <div className="z-100 flex sm:hidden">
      <button onClick={() => setIsOpen((prev) => !prev)} aria-label="메뉴 열기" className="text-white">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="bg-background/60 fixed inset-0 z-100 sm:hidden" />

            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                closed: {
                  opacity: 0,
                  transition: { staggerChildren: 0.05, staggerDirection: -1, when: 'afterChildren' }
                },
                open: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                }
              }}
              className="pointer-events-none fixed top-0 right-0 z-100 flex h-screen w-full flex-col items-end gap-4 pt-30 pr-9 sm:hidden"
            >
              <motion.div variants={{ closed: { opacity: 0, y: -20 }, open: { opacity: 1, y: 0 } }} className="pointer-events-auto">
                <Link
                  href={authBtnHref}
                  onClick={closeMenu}
                  className="block rounded-full bg-white/90 px-4 py-2 text-lg font-semibold text-black shadow-[0_0_10px_0_#FFFAFA] backdrop-blur-sm transition-transform active:scale-95"
                >
                  {authBtnText}
                </Link>
              </motion.div>

              {NAV_ITEMS.map((item) => (
                <motion.div key={item.name} variants={{ closed: { opacity: 0, y: -20 }, open: { opacity: 1, y: 0 } }} className="pointer-events-auto">
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      closeMenu();
                      handleScroll(e, item.href);
                    }}
                    className="bg-surface-elevated active:text-brand-primary-cta active:border-brand-primary-cta border-custom-gray-500 block rounded-full border px-4 py-2 font-bold text-white transition-colors active:scale-95"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
