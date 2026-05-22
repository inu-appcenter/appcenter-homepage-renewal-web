'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollContext } from 'entities/scroll';
import { NAV_ITEMS } from '../constants/navItem';
import { ChartLine } from 'lucide-react';

export function DesktopHeader({ mode }: { mode?: string }) {
  const pathname = usePathname();
  const scrollContext = useContext(ScrollContext);
  const scrollToId = scrollContext?.scrollToId;
  const activeId = scrollContext?.activeId;

  const loginText = mode === 'member' ? '멤버 대시보드' : '관리자 대시보드';
  const authBtnText = mode ? loginText : 'Sign in';
  const authBtnHref = mode ? `/${mode}/home` : '/login';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (pathname === '/' && href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];

      if (scrollToId) {
        scrollToId(targetId);
      }
    }
  };

  return (
    <nav className="hidden flex-1 justify-end text-xl font-semibold text-white sm:flex">
      <ul className="flex items-center gap-20">
        {NAV_ITEMS.map((item) => {
          const itemId = item.href.split('#')[1];
          const isActive = itemId === undefined ? false : activeId === itemId;

          return (
            <li key={item.name}>
              <Link
                scroll={false}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`hover:text-brand-primary-light transition-colors ${isActive ? 'text-brand-primary-cta' : 'text-white'}`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href={authBtnHref}
            className="text-custom-black ring-custom-gray-100 flex items-center justify-center gap-2 rounded-[60px] bg-white px-5 py-3 text-xl leading-none whitespace-nowrap shadow-[0_0_10px_0_#FFFAFA] ring-1 transition-all ring-inset hover:bg-gray-100 active:scale-95"
          >
            {mode && <ChartLine size={24} />}
            {authBtnText}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
