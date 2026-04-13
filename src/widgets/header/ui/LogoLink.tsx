'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { Logo } from 'shared/icon/Logo';
import { usePathname } from 'next/navigation';
import { ScrollContext } from 'entities/scroll';

export function LogoLink() {
  const pathname = usePathname();
  const scrollContext = useContext(ScrollContext);
  const scrollToId = scrollContext?.scrollToId;

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
    <Link href="/" aria-label="홈으로 가기" onClick={(e) => handleScroll(e, '/#home')}>
      <Logo className="w-8 sm:w-16" />
    </Link>
  );
}
