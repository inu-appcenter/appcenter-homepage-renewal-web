'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { LogoutButton } from 'features/sign';
import { Logo } from 'shared/icon/Logo';
import { MEMBER_MENU } from 'shared/constants/memberMenu';

export function MemberSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 border-r border-slate-200 bg-white px-4 py-5 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-10 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm hover:text-slate-900"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`mb-6 flex items-center gap-2 px-2 text-xl font-bold tracking-tight ${isCollapsed ? 'justify-center' : ''}`}>
        <Link href="/member/home">
          <Logo className="h-7 w-7" />
        </Link>
      </div>

      <nav className="space-y-4">
        {MEMBER_MENU.map((item) => (
          <div key={item.group}>
            {!isCollapsed && <p className="mb-1.5 px-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">{item.group}</p>}

            <div className="space-y-1">
              {(item.subMenu || [{ name: item.group, href: item.path!, icon: item.icon }]).map((sub) => {
                const isActive = pathname === sub.href;
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    title={isCollapsed ? sub.name : ''}
                    className={`flex items-center gap-3 rounded-xl transition-all ${isCollapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-2.5'} text-sm font-medium ${
                      isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <sub.icon size={18} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{sub.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="absolute right-4 bottom-8 left-4">
        <div className="flex justify-center">
          <LogoutButton isCollapsed={isCollapsed} type="member" />
        </div>
      </div>
    </aside>
  );
}
