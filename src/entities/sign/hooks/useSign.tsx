'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signApi } from '../api';
import { toast } from 'sonner';

export const useSignActions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const adminLoginMutation = useMutation({
    mutationFn: signApi.login,
    onSuccess: () => {
      router.push('/admin/home');
    },
    onError: () =>
      toast.error('어드민 계정 정보가 일치하지 않습니다', {
        description: '구성원이라면 구성원탭에서 로그인해주세요'
      })
  });

  const memberLoginMutation = useMutation({
    mutationFn: signApi.login,
    onSuccess: () => {
      router.push('/member/home');
    },
    onError: () =>
      toast.error('계정 정보가 일치하지 않습니다', {
        description: '오타가 없는지 확인해주세요'
      })
  });

  const adminLogoutMutation = useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace('/login');
    }
  });

  const memberLogoutMutation = useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace('/login');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace('/login');
    }
  });

  const signupMutation = useMutation({
    mutationFn: signApi.signup
  });

  const changePasswordMutation = useMutation({
    mutationFn: signApi.changePassword
  });

  return { adminLoginMutation, adminLogoutMutation, memberLoginMutation, memberLogoutMutation, logoutMutation, signupMutation, changePasswordMutation };
};
