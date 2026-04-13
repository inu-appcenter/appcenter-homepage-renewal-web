import { cookies } from 'next/headers';
import { LogoLink } from './LogoLink';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export async function Header() {
  const cookieStore = await cookies();
  const mode = cookieStore.get('role')?.value;

  return (
    <header className="fixed z-9999 flex h-30 w-full flex-row items-center justify-between bg-linear-to-b from-black/80 to-transparent px-9 sm:px-30">
      <a href="#main-content" className="bg-brand-primary-cta text-background fixed -top-2499.75 left-0 z-99999 w-40 px-6 py-4 text-center focus:top-0">
        본문 바로가기
      </a>

      <LogoLink />
      <DesktopHeader mode={mode} />
      <MobileHeader mode={mode} />
    </header>
  );
}
