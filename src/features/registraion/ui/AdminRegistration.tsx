'use client';
import { useState } from 'react';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { useRegistration } from 'entities/registraion';
import { EditRegistrationButton } from './RegistartionForm';

export const AdminRegistration = () => {
  const { data } = useRegistration();
  const [isVisible, setIsVisible] = useState(false);

  if (!data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    alert('인증 코드가 복사되었습니다!');
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-3xl flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* 헤더 영역 */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-800">회원가입 인증 코드</h2>
            <p className="text-sm text-slate-500">멤버 회원가입 시 필요한 인증 코드입니다. 필요 시 코드를 수정할 수 있습니다.</p>
          </div>

          <div className="shrink-0">
            <EditRegistrationButton code={data.code} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            {data.lastModifiedDate && (
              <span className="text-xs text-slate-400">
                최근 수정일:{' '}
                <span className="font-medium text-slate-500">
                  {new Date(data.lastModifiedDate).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </span>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:p-5">
            <button
              type="button"
              onClick={() => !isVisible && setIsVisible(true)}
              className={`text-left font-mono text-2xl font-bold tracking-[0.25em] transition-colors sm:text-3xl ${
                isVisible ? 'cursor-text text-slate-800' : 'cursor-pointer text-slate-400 hover:text-slate-500'
              }`}
              title={!isVisible ? '클릭하여 코드 보기' : ''}
            >
              {isVisible ? data.code : '••••••••'}
            </button>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 focus:outline-none sm:flex-none"
              >
                {isVisible ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span className="text-sm font-semibold">숨기기</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-semibold">보기</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 focus:outline-none sm:flex-none"
              >
                <Copy className="h-4 w-4" />
                <span className="text-sm font-semibold">복사</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
