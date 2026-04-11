import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { roleKeys, roleOptions } from '../api/queries';
import { roleApi } from '../api';
import { toast } from 'sonner';

export const useRoles = () => {
  return useSuspenseQuery({ ...roleOptions.all() });
};

export const useRoleActions = () => {
  const queryClient = useQueryClient();

  const invalidateRoles = () => {
    return queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: roleApi.create,
    onSuccess: () => {
      invalidateRoles();
      toast.success('역할이 추가되었습니다');
    },
    onError: (error) => toast.error(error.message || '역할 추가에 실패했습니다')
  });

  const editMutation = useMutation({
    mutationFn: roleApi.update,
    onSuccess: () => {
      invalidateRoles();
      toast.success('역할이 수정되었습니다');
    },
    onError: (error) => toast.error(error.message || '역할 수정에 실패했습니다')
  });

  const deleteMutation = useMutation({
    mutationFn: roleApi.delete,
    onSuccess: () => {
      invalidateRoles();
      toast.success('역할이 삭제되었습니다');
    },
    onError: (error) => toast.error(error.message || '역할 삭제에 실패했습니다')
  });

  return { addMutation, editMutation, deleteMutation };
};
