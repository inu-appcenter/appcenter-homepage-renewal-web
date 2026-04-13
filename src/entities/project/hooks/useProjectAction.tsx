import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { projectKeys, projectOptions } from '../api/queries';
import { projectApi } from '../api';
import { revalidateTag } from 'shared/utils/revalidateTag';
import { toast } from 'sonner';

export const useProject = () => {
  return useSuspenseQuery({
    ...projectOptions.all()
  });
};

export const useProjectByMember = () => {
  return useSuspenseQuery({
    ...projectOptions.byMember()
  });
};

export const useProjectActions = () => {
  const queryClient = useQueryClient();

  const invalidateProjects = async () => {
    await revalidateTag(projectKeys.all);
    await queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: projectApi.create,
    onSuccess: () => {
      invalidateProjects();
      toast.success('프로젝트가 성공적으로 등록되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message || '프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
    }
  });

  const editMutation = useMutation({
    mutationFn: projectApi.update,
    onSuccess: () => {
      invalidateProjects();
      toast.success('프로젝트가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message || '프로젝트 수정에 실패했습니다. 다시 시도해주세요.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: projectApi.delete,
    onSuccess: () => {
      invalidateProjects();
      toast.success('프로젝트가 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message || '프로젝트 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  });

  const toggleMutation = useMutation({
    mutationFn: projectApi.toggleActive,
    onSuccess: invalidateProjects
  });

  return { addMutation, editMutation, deleteMutation, toggleMutation };
};
