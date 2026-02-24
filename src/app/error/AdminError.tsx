'use client';
import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useRoleContext } from 'entities/sign';

interface ErrorProps {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}

type ErrorType = 'UNAUTHORIZED' | 'FORBIDDEN' | 'GENERAL';

export function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mode } = useRoleContext();

  useEffect(() => {
    console.error('Error page caught:', error);
  }, [error]);

  let errorType: ErrorType = 'GENERAL';
  if (error.message === '인증에 실패하여 접근이 거부되었습니다.' || error.message.includes('401')) {
    errorType = 'UNAUTHORIZED';
  } else if (error.message === '접근 권한이 없습니다.' || error.message.includes('403')) {
    errorType = 'FORBIDDEN';
  }

  const handleRecover = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  const errorContent = {
    title: errorType === 'UNAUTHORIZED' ? '인증 세션이 만료되었습니다' : errorType === 'FORBIDDEN' ? '페이지 접근 권한이 없습니다' : '문제가 발생했습니다',
    description:
      errorType === 'UNAUTHORIZED'
        ? '서비스 이용을 위해 다시 로그인해 주세요.'
        : errorType === 'FORBIDDEN'
          ? '이 메뉴를 이용할 수 있는 권한이 부여되지 않았습니다.'
          : '잠시 후 다시 시도하거나 관리자에게 문의하세요.'
  };

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-10 text-center">
      <h2 className="text-2xl font-bold text-slate-900">{errorContent.title}</h2>
      <p className="mt-2 text-slate-500">{errorContent.description}</p>

      <div className="mt-8 flex gap-3">
        {/* 401: 로그인 유도 */}
        {errorType === 'UNAUTHORIZED' && (
          <a href={`/${mode}`} className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-100 active:scale-95">
            로그인하러 가기
          </a>
        )}

        {/* 403: 홈으로 이동만 제공 (새로고침해도 어차피 권한이 없으므로) */}
        {errorType === 'FORBIDDEN' && (
          <Link
            href={`/${mode}/home`}
            className="rounded-lg bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-100 active:scale-95"
          >
            홈으로 이동
          </Link>
        )}

        {/* 기타 범용 에러: 다시 시도 & 홈으로 이동 둘 다 제공 */}
        {errorType === 'GENERAL' && (
          <>
            <button
              onClick={handleRecover}
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-50"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? '복구 중...' : '다시 시도'}
            </button>
            <Link href={`/${mode}/home`} className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              홈으로 이동
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
