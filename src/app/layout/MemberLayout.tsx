import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { ScrollToTopButton } from 'shared/ui/ScrollToTopButton';
import { MemberSidebar } from 'widgets/sidebar';

export function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/layout flex min-h-screen bg-[#F8F9FA]">
      <MemberSidebar />
      <main className="ml-64 flex-1 overflow-y-auto px-10 py-12 text-slate-900 transition-all duration-300 ease-in-out group-has-[aside.w-20]/layout:ml-20 selection:bg-emerald-100">
        <div className="mx-auto max-w-400">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <ScrollToTopButton />
    </div>
  );
}
