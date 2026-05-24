'use client';
import React, { useState } from 'react';
import { Lock, KeyRound, Check, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useSignActions } from 'entities/sign';
import { Alert } from 'shared/ui/alert';
import { FormInput } from 'shared/ui/form-input';

export function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { changePasswordMutation } = useSignActions();
  const isPending = changePasswordMutation.isPending;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    changePasswordMutation.mutateAsync(formData);
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="mx-auto mt-4 w-full rounded-3xl border border-slate-200 bg-white p-12 shadow-xl shadow-slate-200/50">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Lock size={18} className="text-slate-400" /> 본인 확인
            </h3>
            <div className="space-y-4">
              <FormInput
                icon={Lock}
                label="현재 비밀번호"
                value={formData.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                passwordToggle
                placeholder="현재 사용 중인 비밀번호"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <KeyRound size={18} className="text-slate-400" /> 새 비밀번호 설정
            </h3>
            <div className="space-y-4">
              <FormInput
                icon={KeyRound}
                label="새 비밀번호"
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                passwordToggle
                placeholder="새로운 비밀번호 입력"
                disabled={isPending}
              />
              <FormInput
                icon={Check}
                label="새 비밀번호 확인"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                passwordToggle
                placeholder="한 번 더 입력해 주세요"
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <Alert type="info">
          여러분의 소중한 프로젝트 데이터와 개인정보를 위해,<strong>비밀번호를 정기적으로 변경하는 건 어떨까요?</strong>
        </Alert>
        <div className="fixed right-20 bottom-10 z-50 flex items-center gap-3">
          <button
            disabled={isPending || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            type="submit"
            className="group bg-brand-primary-cta hover:bg-brand-primary-cta/90 flex items-center gap-2.5 rounded-2xl px-6 py-4 font-bold tracking-tight text-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:grayscale sm:px-8"
          >
            {isPending ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm sm:text-base">비밀번호 변경 중...</span>
              </>
            ) : (
              <>
                <Save size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                <span className="text-sm sm:text-base">비밀번호 변경 완료</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
