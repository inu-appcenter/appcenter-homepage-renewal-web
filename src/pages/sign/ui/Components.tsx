'use client';
import React, { useState } from 'react';
import { LucideIcon, Eye, EyeOff, ArrowLeft, CheckIcon } from 'lucide-react';
import Link from 'next/link';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
}
export const Input = ({ icon: Icon, type, rightElement, className = '', ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="group relative w-full">
      {Icon && (
        <div className="pointer-events-none absolute top-0 left-4 flex h-full items-center">
          <Icon className="h-4.5 w-4.5 text-gray-500 transition-colors group-focus-within:text-white" />
        </div>
      )}

      <input
        type={inputType}
        className={`focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-lg border border-gray-800 bg-gray-900 py-3 text-sm text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none ${Icon ? 'pl-11' : 'pl-4'} ${isPassword || rightElement ? 'pr-11' : 'pr-4'} ${className}`}
        {...props}
      />

      <div className="absolute top-0 right-4 flex h-full items-center">
        {isPassword ? (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex items-center justify-center text-gray-500 transition-colors hover:text-white">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : (
          rightElement
        )}
      </div>
    </div>
  );
};

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
