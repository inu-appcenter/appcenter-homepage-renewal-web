'use client';
import { Logo } from 'shared/icon/Logo';
import { AdminLoginForm } from 'features/sign';

export function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-block">
            <Logo className="h-12 w-12" />
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">Admin Login</h1>
          <p className="font-medium text-slate-500">앱센터 어드민 로그인 페이지 입니다</p>
        </div>

        {/* Separated Login Form */}
        <AdminLoginForm />

        {/* Footer Section */}
        <p className="mt-8 text-center text-sm text-slate-500">
          관리자 권한 요청은 <span className="font-semibold text-slate-700 underline decoration-slate-300">운영진</span>에 문의하세요.
        </p>
      </div>
    </div>
  );
}
