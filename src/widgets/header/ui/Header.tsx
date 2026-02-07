'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from 'shared/icon/Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useScroll } from 'entities/scroll';

const NAV_ITEMS = [
  { name: 'About', href: '/#about' },
  { name: 'Project', href: '/#project' },
  { name: 'Activity', href: '/#activity' },
  { name: 'FAQ', href: '/#faq' }
];
// 헤더에서 이동 처리는 FullPageScroll의 scrollToId를 사용하여 처리합니다.
// 단, 다른 페이지로 이동하는 경우에는 일반적인 링크 동작을 사용합니다.
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  let scrollToId: ((id: string) => void) | undefined;
  try {
    const scrollContext = useScroll();
    scrollToId = scrollContext.scrollToId;
  } catch {
    scrollToId = undefined;
  }

  const toggleMenu = () => setIsOpen((prev) => !prev);
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
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed z-50 flex h-30 w-full flex-row items-center justify-between bg-linear-to-b from-black/80 to-transparent px-9 sm:px-30"
      >
        <Link href="/#home" aria-label="홈으로 가기" onClick={(e) => handleScroll(e, '/#home')}>
          <Logo className="w-8 sm:w-16" />
        </Link>

        <div className="hidden flex-1 flex-row items-center justify-end gap-20 text-xl font-semibold text-white sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.name} scroll={false} href={item.href} onClick={(e) => handleScroll(e, item.href)} className="hover:text-brand-primary-light transition-colors">
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-custom-black ring-custom-gray-100 rounded-[60px] bg-white px-5 py-2.5 text-xl leading-none whitespace-nowrap shadow-[0_0_10px_0_#FFFAFA] ring-1 transition-all ring-inset hover:bg-gray-100 active:scale-95"
          >
            Sign in
          </Link>
        </div>

        <div className="z-50 flex sm:hidden">
          <button onClick={toggleMenu} aria-label="메뉴 열기" className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="bg-background/60 fixed inset-0 z-40 sm:hidden" />
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
              className="fixed top-0 right-0 z-40 flex h-screen w-full flex-col items-end gap-4 pt-30 pr-9 sm:hidden"
            >
              <motion.div variants={{ closed: { opacity: 0, y: -20 }, open: { opacity: 1, y: 0 } }}>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block rounded-full bg-white/90 px-4 py-2 text-lg font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm transition-transform active:scale-95"
                >
                  Sign in
                </Link>
              </motion.div>

              {NAV_ITEMS.map((item) => (
                <motion.div key={item.name} variants={{ closed: { opacity: 0, y: -20 }, open: { opacity: 1, y: 0 } }}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      closeMenu();
                      handleScroll(e, item.href);
                    }}
                    className="bg-surface-elevated active:text-brand-primary-cta active:border-brand-primary-cta block rounded-full border border-white/20 px-4 py-2 font-bold text-white transition-colors active:scale-95"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
