'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();

  // 대시보드 홈에서는 브레드크럼 표시 안 함
  if (!pathname || pathname === '/admin/home' || pathname === '/member/home') return null;

  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment !== '')
    .map((segment) => segment.toUpperCase());

  return (
    <>
      <div className="mb-8">
        <Link href="/admin/home" className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-900">
          <ArrowLeft size={16} />
          대시보드로 돌아가기
        </Link>
      </div>
      <header className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-400">
            {pathSegments.map((segment, index) => (
              <div key={`${segment}-${index}`} className="flex items-center gap-2">
                <span className={`text-xs font-bold tracking-widest uppercase ${index === pathSegments.length - 1 ? 'text-slate-900' : 'text-slate-300'}`}>{segment}</span>
                {index < pathSegments.length - 1 && <ChevronRight size={14} className="text-slate-300" />}
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
