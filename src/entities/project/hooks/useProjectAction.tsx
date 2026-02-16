import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { projectKeys, projectOptions } from '../api/queries';
import { projectApi } from '../api';

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

  const invalidateProjects = () => {
    return queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: projectApi.create,
    onSuccess: invalidateProjects
  });

  const editMutation = useMutation({
    mutationFn: projectApi.update,
    onSuccess: invalidateProjects
  });

  const deleteMutation = useMutation({
    mutationFn: projectApi.delete,
    onSuccess: invalidateProjects
  });

  const toggleMutation = useMutation({
    mutationFn: projectApi.toggleActive,
    onSuccess: invalidateProjects
  });

  return { addMutation, editMutation, deleteMutation, toggleMutation };
};
