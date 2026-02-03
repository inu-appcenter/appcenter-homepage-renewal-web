'use client';
import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}

export function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.error('Error page caught:', error);
  }, [error]);

  const isUnauthorized = error.message === '인증에 실패하여 접근이 거부되었습니다.' || error.message.includes('401');

  const handleRecover = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-10 text-center">
      <h2 className="text-2xl font-bold text-slate-900">{isUnauthorized ? '인증 세션이 만료되었습니다' : '네트워크 문제가 발생했습니다'}</h2>

      <p className="mt-2 text-slate-500">{isUnauthorized ? '서비스 이용을 위해 다시 로그인해 주세요.' : '잠시 후 다시 시도하거나 관리자에게 문의하세요.'}</p>

      <div className="mt-8 flex gap-3">
        {isUnauthorized ? (
          <a href="/admin" className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-100 active:scale-95">
            로그인하러 가기
          </a>
        ) : (
          <>
            <button
              onClick={handleRecover}
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-50"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? '복구 중...' : '다시 시도'}
            </button>
            <Link href="/admin/home" className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              홈으로 이동
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
