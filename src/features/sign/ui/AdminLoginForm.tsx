'use client';
import { useState } from 'react';
import { Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useSignActions } from 'entities/sign';

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { adminLoginMutation } = useSignActions();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLoginMutation.mutate({ id, password });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* ID Input */}
        <div className="space-y-2">
          <label className="ml-1 text-sm font-bold text-slate-700">ID</label>
          <div className="group relative">
            <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:outline-none"
              placeholder="관리자 아이디"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="ml-1 text-sm font-bold text-slate-700">Password</label>
          <div className="group relative">
            <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-12 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:outline-none"
              placeholder="비밀번호"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {adminLoginMutation.error && (
          <div className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-100 bg-red-50 py-2.5 text-center text-sm font-semibold text-red-600">
            아이디 또는 비밀번호가 올바르지 않습니다.
          </div>
        )}

        <button
          type="submit"
          disabled={adminLoginMutation.isPending}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
        >
          {adminLoginMutation.isPending ? (
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          ) : (
            <>
              로그인
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
