import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { recruitmentKeys, recruitmentOptions } from '../api/queries';
import { recruitmentApi } from '../api';

export const useRecruitment = () => {
  return useSuspenseQuery({
    ...recruitmentOptions.all()
  });
};

export const useRecruitmentById = (recruitmentId: number) => {
  return useSuspenseQuery({
    ...recruitmentOptions.getById(recruitmentId)
  });
};

export const useRecruitmentActions = () => {
  const queryClient = useQueryClient();

  const invalidateRecruitments = () => {
    return queryClient.invalidateQueries({ queryKey: recruitmentKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: recruitmentApi.create,
    onSuccess: invalidateRecruitments
  });

  const deleteMutation = useMutation({
    mutationFn: recruitmentApi.delete,
    onSuccess: invalidateRecruitments
  });

  const editThumbnailMutation = useMutation({
    mutationFn: recruitmentApi.editThumbnail,
    onSuccess: invalidateRecruitments
  });

  const editMetadataMutation = useMutation({
    mutationFn: recruitmentApi.editMetadata,
    onSuccess: invalidateRecruitments
  });

  const toggleMutation = useMutation({
    mutationFn: recruitmentApi.toggleActive,
    onSuccess: invalidateRecruitments
  });

  return { addMutation, editThumbnailMutation, editMetadataMutation, deleteMutation, toggleMutation };
};
