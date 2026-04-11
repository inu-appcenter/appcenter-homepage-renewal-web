import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { skillStackKeys, skillStackOptions } from '../api/queries';
import { skillStackApi } from '../api';
import { toast } from 'sonner';

export const useSkillStack = () => {
  return useSuspenseQuery({
    ...skillStackOptions.all()
  });
};

export const useSkillStackActions = () => {
  const queryClient = useQueryClient();

  const invalidateSkillStack = () => {
    queryClient.invalidateQueries({ queryKey: skillStackKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: skillStackApi.create,
    onSuccess: () => {
      toast.success('기술 스택 아이콘이 추가되었습니다');
      invalidateSkillStack();
    },
    onError: (error) => toast.error(error.message || '기술 스택 아이콘 추가에 실패했습니다')
  });

  const editMutation = useMutation({
    mutationFn: skillStackApi.update,
    onSuccess: () => {
      toast.success('기술 스택 아이콘이 수정되었습니다');
      invalidateSkillStack();
    },
    onError: (error) => toast.error(error.message || '기술 스택 아이콘 수정에 실패했습니다')
  });

  const deleteMutation = useMutation({
    mutationFn: skillStackApi.delete,
    onSuccess: () => {
      toast.success('기술 스택 아이콘이 삭제되었습니다');
      invalidateSkillStack();
    },
    onError: (error) => toast.error(error.message || '기술 스택 아이콘 삭제에 실패했습니다')
  });

  return { addMutation, editMutation, deleteMutation };
};
