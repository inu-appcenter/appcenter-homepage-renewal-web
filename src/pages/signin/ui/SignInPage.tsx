'use client';
import { ArrowRight, Loader2, User, Lock, EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';
import { Logo } from 'shared/icon/Logo';

export function SignInPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Logged in with ID:', id, 'and Password:', password);
    } catch {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
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

          {error && <div className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-900/50 bg-red-900/20 py-2.5 text-center text-sm font-semibold text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="group bg-brand-primary-cta hover:bg-brand-primary-cta/80 relative flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-black" />
            ) : (
              <>
                로그인
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
