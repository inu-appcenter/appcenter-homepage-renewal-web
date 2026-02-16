'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import { Logo } from 'shared/icon/Logo';
import { AnimationButton } from 'shared/ui/animation-button';
import { useRecruitmentActions } from 'entities/recruitment';

export function EmptyRecruit() {
  const [email, setEmail] = useState('');

  const { postEmailMutation } = useRecruitmentActions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요!');
      return;
    }
    postEmailMutation.mutate(email);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-20 sm:py-40">
      <Logo className="h-16 w-16 sm:h-32 sm:w-32" />

      <div className="text-custom-gray-400 text-center text-[16px] whitespace-pre-line sm:text-2xl/10">
        {`지금은 모집 중인 프로젝트가 없어요...
        프로젝트의 모집이 시작되었을 때 다시 알려드릴게요!`}
      </div>

      <div className="mt-4 flex h-32 w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {postEmailMutation.isSuccess ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
              <div className="bg-brand-primary-cta/20 text-brand-primary-cta flex h-12 w-12 items-center justify-center rounded-full">
                <Check className="h-6 w-6" strokeWidth={2} />
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-brand-primary-cta text-xl font-bold">알림 신청이 완료되었어요</h3>
                <p className="text-custom-gray-400 text-sm font-medium">모집이 시작되면 가장 먼저 알려드릴게요</p>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (postEmailMutation.isError) {
                      postEmailMutation.reset();
                    }
                  }}
                  placeholder="이메일을 작성해주세요"
                  disabled={postEmailMutation.isPending}
                  className={`focus:ring-brand-primary-cta placeholder-custom-gray-500 w-70 rounded-full border bg-black/20 p-4 text-white transition-colors focus:ring-1 focus:outline-none disabled:opacity-50 sm:w-150 sm:py-4 ${
                    postEmailMutation.isError ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {/** 일단 에러면 등록된 이메일이라고 처리함 (추후 수정 필요) */}
                {postEmailMutation.isError && (
                  <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-500">
                    이미 등록된 이메일입니다.
                  </motion.span>
                )}
              </div>

              <button type="submit" disabled={postEmailMutation.isPending} className="w-fit">
                <AnimationButton>
                  <div className="flex items-center gap-2 text-[16px] text-white sm:text-xl">
                    {postEmailMutation.isPending && <Loader2 className="h-5 w-5 animate-spin" />}
                    <span>{postEmailMutation.isPending ? '신청하는 중...' : '이메일 작성하고 알림 받기'}</span>
                  </div>
                </AnimationButton>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
