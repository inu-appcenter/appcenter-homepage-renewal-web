'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, User, Lock } from 'lucide-react';
import { useSignActions } from 'entities/sign';
import { Logo } from 'shared/icon/Logo';
import { Input } from './Components';

export function SignInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { memberLoginMutation } = useSignActions();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    memberLoginMutation.mutate({ id, password });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black p-4">
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
            <Input icon={User} type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="구성원 아이디" required />
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">Password</label>
            <Input icon={Lock} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />
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

          <div className="mt-8 flex flex-col items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">아직 계정이 없으신가요?</span>
              <Link href="/sign-up" className="group text-brand-primary-cta hover:text-brand-primary-cta/70 relative font-bold transition-colors">
                회원가입
                <span className="bg-brand-primary-cta absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full" />
              </Link>
            </div>

            <div className="flex items-center gap-3 text-zinc-500">
              <Link href="/find-id" className="transition-colors hover:text-zinc-300">
                아이디 찾기
              </Link>
              <span className="h-3 w-px bg-zinc-800" />
              <Link href="/find-password" className="transition-colors hover:text-zinc-300">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
