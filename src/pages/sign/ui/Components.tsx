'use client';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getAuthMessage } from 'shared/constants/auth';
import { Input as BaseInput } from 'shared/ui/form-input';
import { cn } from 'shared/utils/cn';

export const Input = ({ className, ...props }: React.ComponentProps<typeof BaseInput>) => (
  <BaseInput
    {...props}
    className={cn(
      'focus:border-brand-primary-cta focus:ring-brand-primary-cta rounded-lg border border-gray-800 bg-gray-900 py-3 font-normal text-white placeholder:text-gray-600 focus:ring-1',
      className
    )}
  />
);

export const GoToLoginLink = () => (
  <Link href="/login" className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-300">
    <ArrowLeft className="h-4 w-4" />
    로그인 화면으로 돌아가기
  </Link>
);

export type StepType = 'account' | 'basic' | 'profile';
const STEPS: Array<{ id: StepType; label: string }> = [
  { id: 'account', label: '계정 정보' },
  { id: 'basic', label: '인적 사항' },
  { id: 'profile', label: '프로필 설정' }
];
export const StepIndicator = ({ currentStep }: { currentStep: StepType }) => {
  return (
    <div className="relative flex w-full items-start justify-between">
      <div className="absolute top-5 left-0 h-0.5 w-full -translate-y-1/2 bg-gray-800" />

      <div
        className="bg-brand-primary-cta absolute top-5 left-0 h-0.5 -translate-y-1/2 transition-all duration-300"
        style={{ width: currentStep === 'account' ? '0%' : currentStep === 'basic' ? '50%' : '100%' }}
      />

      {STEPS.map((step, index) => {
        const stepIndex = STEPS.findIndex((s) => s.id === step.id);
        const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

        const isCompleted = stepIndex < currentIndex;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {isActive && <span className="bg-brand-primary-cta absolute h-full w-full animate-ping rounded-full opacity-75" />}

              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-brand-primary-cta bg-brand-primary-cta text-black'
                    : isActive
                      ? 'border-brand-primary-cta text-brand-primary-cta bg-gray-900'
                      : 'border-gray-700 bg-gray-900 text-gray-500'
                }`}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
              </div>
            </div>

            <span className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors ${isActive || isCompleted ? 'text-brand-primary-cta' : 'text-gray-500'}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export function AuthErrorHandler({ setLoginType }: { setLoginType: React.Dispatch<React.SetStateAction<'member' | 'admin'>> }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams) return;
    const errorType = searchParams.get('error');
    const config = getAuthMessage(errorType);

    if (config) {
      setLoginType(config.loginType);
      toast.error(config.message, {
        description: config.description
      });
    }
  }, [searchParams, setLoginType, router]);

  return null;
}
