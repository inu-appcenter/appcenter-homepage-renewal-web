'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminLogin() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (id: string, password: string) => {
    if (!id || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
      });

      if (res.ok) {
        router.push('/admin/home');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setError('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleLogin
  };
}
