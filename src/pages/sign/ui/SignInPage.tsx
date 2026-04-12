'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, User, Lock } from 'lucide-react';
import { useSignActions } from 'entities/sign';
import { Logo } from 'shared/icon/Logo';
import { AuthErrorHandler, Input } from './Components';

type LoginType = 'member' | 'admin';

const LOGIN_TABS = [
  { id: 'member', label: '구성원' },
  { id: 'admin', label: '관리자' }
] as const;

export function SignInPage() {
  const [loginType, setLoginType] = useState<LoginType>('member');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { memberLoginMutation, adminLoginMutation } = useSignActions();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginType === 'member') {
      memberLoginMutation.mutate({ id, password });
    } else {
      adminLoginMutation.mutate({ id, password });
    }
  };

  const isPending = memberLoginMutation.isPending || adminLoginMutation.isPending;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      <Suspense fallback={null}>
        <AuthErrorHandler setLoginType={setLoginType} />
      </Suspense>

      <div className="mb-10 text-center">
        <div className="mb-4 inline-block">
          <Logo className="h-12 w-12 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">{loginType === 'member' ? 'Member Login' : 'Admin Login'}</h1>
        <p className="font-medium text-gray-400">{loginType === 'member' ? '앱센터 구성원 로그인 페이지입니다' : '앱센터 관리자 전용 로그인 페이지입니다'}</p>
      </div>

      <div className="w-full max-w-100">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex rounded-xl bg-gray-900 p-1.5 ring-1 ring-gray-800">
            {LOGIN_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setLoginType(tab.id)}
                className={`relative flex-1 py-2 text-sm font-bold transition-all ${loginType === tab.id ? 'text-black' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {loginType === tab.id && (
                  <motion.div layoutId="loginTabIndicator" className="bg-brand-primary-cta absolute inset-0 rounded-lg" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          <label className="ml-1 text-sm font-semibold text-gray-300">ID</label>
          <Input icon={User} type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder={loginType === 'member' ? '구성원 아이디' : '관리자 아이디'} required />

          <label className="ml-1 text-sm font-semibold text-gray-300">Password</label>
          <Input icon={Lock} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />

          <button
            type="submit"
            disabled={isPending}
            className="group bg-brand-primary-cta hover:bg-brand-primary-cta/80 relative flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
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
