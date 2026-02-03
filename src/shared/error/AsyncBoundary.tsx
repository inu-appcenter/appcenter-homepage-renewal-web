import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertCircle, LoaderCircle, RotateCw } from 'lucide-react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export const AsyncBoundary = ({ children, fallback = <DefaultFallback /> }: { children: React.ReactNode; fallback?: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => <ErrorFallback reset={resetErrorBoundary} />}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const DefaultFallback = () => {
  return (
    <div className="flex h-60 w-full items-center justify-center">
      <LoaderCircle className="text-brand-primary-cta animate-spin" size={32} />
    </div>
  );
};

const ErrorFallback = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex h-60 w-full flex-col items-center justify-center gap-4 rounded-xl text-center">
      <div className="flex flex-col items-center gap-2">
        <AlertCircle className="text-custom-gray-600 mb-2" size={32} />
        <h3 className="text-custom-gray-600 text-lg font-bold">정보를 불러오지 못했어요.</h3>
        <p className="text-custom-gray-500 text-sm">잠시 후 다시 누르면 잘 될 거예요.</p>
      </div>

      <button onClick={reset} className="bg-brand-primary-cta flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
        <RotateCw size={16} />
        다시 불러오기
      </button>
    </div>
  );
};
