'use client';
import { useState } from 'react';

export function useAdminLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;

    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/sign-out', {
        method: 'POST'
      });

      if (res.ok) {
        window.location.href = '/admin';
      } else {
        alert('로그아웃 처리에 실패했습니다.');
      }
    } catch {
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
}
