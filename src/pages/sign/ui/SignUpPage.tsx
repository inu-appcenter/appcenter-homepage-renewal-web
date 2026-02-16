'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, User, Lock, Mail, UserCheck, EyeOff, Eye, ArrowLeft } from 'lucide-react';
import { Logo } from 'shared/icon/Logo';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // API 통신 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Sign Up Data:', formData);
    } catch {
      setError('회원가입 신청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 py-12">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-block">
          <Logo className="h-12 w-12 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">Join Member</h1>
        <p className="font-medium text-gray-400">앱센터 구성원 전용 회원가입 페이지입니다</p>
      </div>

      <div className="w-full max-w-md">
        <form onSubmit={onSubmit} className="space-y-5">
          {/* ID 입력 */}
          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">ID</label>
            <div className="group relative">
              <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="사용할 아이디"
                required
              />
            </div>
          </div>

          {/* 이름 입력 */}
          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">Name</label>
            <div className="group relative">
              <UserCheck className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="실명 입력"
                required
              />
            </div>
          </div>

          {/* 이메일 입력 */}
          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">Email</label>
            <div className="group relative">
              <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-4 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">Password</label>
            <div className="group relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-12 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="비밀번호 설정"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition-colors hover:text-white">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <label className="ml-1 text-sm font-bold text-gray-300">Confirm Password</label>
            <div className="group relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-3.5 pr-12 pl-12 text-white transition-all placeholder:text-gray-600 focus:ring-1 focus:outline-none"
                placeholder="비밀번호 재입력"
                required
              />
            </div>
          </div>

          {error && <div className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-900/50 bg-red-900/20 py-2.5 text-center text-sm font-semibold text-red-400">{error}</div>}

          {/* 가입 신청 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="group bg-brand-primary-cta hover:bg-brand-primary-cta/80 relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-black" />
            ) : (
              <>
                가입 신청하기
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* 돌아가기 버튼 */}
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-300">
            <ArrowLeft className="h-4 w-4" />
            로그인 화면으로 돌아가기
          </Link>
        </form>
      </div>
    </div>
  );
}
