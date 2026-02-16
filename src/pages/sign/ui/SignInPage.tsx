'use client';
import { useSignActions } from 'entities/sign';
import { ArrowRight, Loader2, User, Lock, EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from 'shared/icon/Logo';

export function SignInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { memberLoginMutation } = useSignActions();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    memberLoginMutation.mutate({ id, password });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-block">
          <Logo className="h-12 w-12 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">Member Login</h1>
        <p className="font-medium text-gray-400">앱센터 구성원 로그인 페이지 입니다</p>
      </div>

      <div className="w-full max-w-100">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">ID</label>
            <div className="group relative">
              <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="구성원 아이디"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">Password</label>
            <div className="group relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-12 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="비밀번호"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition-colors hover:text-white">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {memberLoginMutation.error && (
            <div className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-900/50 bg-red-900/20 py-2.5 text-center text-sm font-semibold text-red-400">
              아이디 또는 비밀번호가 일치하지 않습니다.
            </div>
          )}

          <button
            type="submit"
            disabled={memberLoginMutation.isPending}
            className="group bg-brand-primary-cta hover:bg-brand-primary-cta/80 relative flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {memberLoginMutation.isPending ? (
              <Loader2 className="h-6 w-6 animate-spin text-black" />
            ) : (
              <>
                로그인
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm">
            <span className="text-zinc-400">아직 계정이 없으신가요?</span>
            <Link href="/sign-up" className="group text-brand-primary-cta hover:text-brand-primary-cta/70 relative font-bold transition-colors">
              회원가입
              <span className="bg-brand-primary-cta absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
