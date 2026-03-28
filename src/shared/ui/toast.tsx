'use client';

import { Toaster as Sonner } from 'sonner';

export const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      expand={false}
      style={{ fontFamily: 'var(--font-pretendard)' }}
      toastOptions={{
        classNames: {
          toast: 'group flex w-full items-center rounded-4xl border border-gray-200/60 bg-white/80 px-4 py-3.5 text-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
          title: ' !text-base text-zinc-900',
          description: 'text-zinc-500',
          actionButton: 'rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800',
          cancelButton: 'rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-200',
          success: '[&_[data-icon]]:text-green-500',
          error: '[&_[data-icon]]:text-red-500',
          warning: '[&_[data-icon]]:text-yellow-500',
          info: '[&_[data-icon]]:text-blue-500'
        }
      }}
    />
  );
};
