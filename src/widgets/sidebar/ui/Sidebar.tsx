'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { LogoutButton } from 'features/sign';
import { Logo } from 'shared/icon/Logo';
import { MEMBER_MENU } from 'shared/constants/memberMenu';
import { useRoleContext } from 'entities/sign';
import { ADMIN_MENU } from 'shared/constants/adminMenu';

export function Sidebar() {
  const pathname = usePathname();
  const { mode } = useRoleContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [manualOpenGroup, setManualOpenGroup] = useState<string | null>(null);

  const data = mode === 'admin' ? ADMIN_MENU : MEMBER_MENU;

  const activeGroup = data.find((group) => group.path === pathname || group.subMenu?.some((sub) => sub.href === pathname));

  useEffect(() => {
    if (activeGroup) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setManualOpenGroup(activeGroup.group);
    }
  }, [pathname, activeGroup]);

  const currentOpenGroup = manualOpenGroup ?? activeGroup?.group;

  const handleGroupClick = (groupName: string, hasSubMenu: boolean) => {
    if (isCollapsed || !hasSubMenu) return;
    setManualOpenGroup(currentOpenGroup === groupName ? 'CLOSED_ALL' : groupName);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 border-r border-slate-200 bg-white px-3 py-6 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button
        onClick={() => {
          setIsCollapsed(!isCollapsed);
          setManualOpenGroup(null);
        }}
        className="absolute top-10 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:text-slate-900"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`mb-6 flex items-center px-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <Link href="/member/home">
          <Logo className="h-6 w-6" />
        </Link>
      </div>

      <nav className="no-scrollbar flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
        {data.map((item) => {
          const hasSubMenu = Boolean(item.subMenu && item.subMenu.length > 0);
          const isExpanded = currentOpenGroup === item.group;
          const isGroupActive = pathname?.startsWith(item.path) || item.subMenu?.some((sub) => sub.href === pathname);

          return (
            <div key={item.group} className="flex flex-col">
              {hasSubMenu ? (
                <button
                  onClick={() => handleGroupClick(item.group, true)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isExpanded || isGroupActive ? 'bg-slate-50/80 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  <item.icon size={18} className={`shrink-0 ${isGroupActive ? 'text-slate-900' : ''}`} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate text-left">{item.group}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    pathname === item.path ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.group}</span>}
                </Link>
              )}

              {!isCollapsed && hasSubMenu && (
                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isExpanded ? 'mb-1 max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="mt-0.5 ml-5 flex flex-col gap-0.5 border-l border-slate-100 pl-2.5">
                    {item.subMenu?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-all ${
                            isSubActive ? 'bg-slate-100/50 font-bold text-slate-900' : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900'
                          }`}
                        >
                          <sub.icon size={14} className="shrink-0" />
                          <span className="truncate">{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="absolute right-0 bottom-6 left-0 px-4">
        <div className="flex justify-center border-t border-slate-100 pt-4">
          <LogoutButton isCollapsed={isCollapsed} type={mode} />
        </div>
      </div>
    </aside>
  );
}
