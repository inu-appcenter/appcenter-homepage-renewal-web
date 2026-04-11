import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { memberKeys, memberOptions } from '../api/queries';
import { memberApi } from '../api';
import { toast } from 'sonner';

export const useMember = () => {
  return useSuspenseQuery({
    ...memberOptions.all()
  });
};

export const useSearchMember = (query: string, enabled = false) => {
  return useQuery({
    ...memberOptions.search(query),
    enabled: enabled,
    retry: false
  });
};

export const useMemberByMember = () => {
  return useSuspenseQuery({
    ...memberOptions.byMember()
  });
};

export const useMemberInfo = (year?: number, part?: string) => {
  return useSuspenseQuery({
    ...memberOptions.memberInfo(year, part)
  });
};

export const useMemberActions = () => {
  const queryClient = useQueryClient();

  const invalidateMembers = () => {
    return queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: memberApi.create,
    onSuccess: () => {
      invalidateMembers();
      toast.success('동아리원이 추가되었습니다');
    },
    onError: (error) => toast.error(error.message || '동아리원 추가에 실패했습니다')
  });

  const editMutation = useMutation({
    mutationFn: memberApi.update,
    onSuccess: () => {
      invalidateMembers();
      toast.success('동아리원 정보가 수정되었습니다');
    },
    onError: (error) => toast.error(error.message || '동아리원 수정에 실패했습니다')
  });

  const deleteMutation = useMutation({
    mutationFn: memberApi.delete,
    onSuccess: () => {
      invalidateMembers();
      toast.success('동아리원이 삭제되었습니다');
    },
    onError: (error) => toast.error(error.message || '동아리원 삭제에 실패했습니다')
  });

  const editByMemberMutation = useMutation({
    mutationFn: memberApi.updateByMember,
    onSuccess: () => {
      invalidateMembers();
      toast.success('프로필이 성공적으로 수정되었습니다');
    },
    onError: (error) => toast.error(error.message || '프로필 수정에 실패했습니다')
  });

  return { addMutation, editMutation, deleteMutation, editByMemberMutation };
};
