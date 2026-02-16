'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signApi } from '../api';

export const useSignActions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const adminLoginMutation = useMutation({
    mutationFn: signApi.login,
    onSuccess: () => {
      router.push('/admin/home');
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    }
  });
  const adminLogoutMutation = useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/admin';
    }
  });
  const memberLoginMutation = useMutation({
    mutationFn: signApi.login,
    onSuccess: () => {
      router.push('/member/home');
    }
  });

  const memberLogoutMutation = useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    }
  });

  const signupMutation = useMutation({
    mutationFn: signApi.signup
  });

  return { adminLoginMutation, adminLogoutMutation, memberLoginMutation, memberLogoutMutation, signupMutation };
};
