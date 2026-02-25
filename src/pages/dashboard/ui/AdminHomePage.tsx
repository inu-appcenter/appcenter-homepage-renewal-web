'use client';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ADMIN_MENU } from 'shared/constants/adminMenu';

export const AdminHomePage = () => {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-7xl px-8 py-16">
      <header className="mb-16">
        <h1 className="mb-3 text-sm font-semibold tracking-widest text-slate-400">관리자 페이지</h1>
        <h2 className="text-5xl font-bold tracking-tight text-slate-900">
          앱센터 관리자 페이지입니다 <br />
          <span className="text-slate-400">최대화된 화면으로 사용하길 권장합니다</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_MENU.map((feature, index) => (
          <div
            key={index}
            onClick={() => router.push(feature.path)}
            className="group relative flex h-72 cursor-pointer flex-col justify-between overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                <feature.icon />
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:rotate-45 group-hover:text-slate-900" />
            </div>

            <div className="z-10">
              <span className="mb-2 inline-block text-[11px] font-bold tracking-wider text-slate-400 uppercase">{feature.tag}</span>
              <h3 className="mb-2 text-xl font-bold text-slate-900">{feature.group}</h3>

              {feature.subMenu ? (
                <div className="mt-2 space-y-1.5">
                  {feature.subMenu.map((sub) => (
                    <Submenu key={sub.name} name={sub.name} href={sub.href} />
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-snug font-medium text-slate-500 italic opacity-0 transition-opacity group-hover:opacity-100">{feature.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Submenu = ({ name, href }: { name: string; href: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        router.push(href);
      }}
      className="flex w-full items-center gap-1.5 text-[13px] font-semibold text-slate-400 transition-colors hover:text-emerald-500"
    >
      <ArrowRight size={12} className="rotate-45" />
      {name}
    </button>
  );
};
