import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { activityApi } from '../api';
import { activityOptions, activityKeys } from '../api/queries';

export const useActivities = () => {
  return useSuspenseQuery({
    ...activityOptions.all()
  });
};

export const useActivitiesById = (activityId: number) => {
  return useSuspenseQuery({
    ...activityOptions.getById(activityId)
  });
};

export const useActivityActions = () => {
  const queryClient = useQueryClient();

  const invalidateActivities = () => {
    return queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: activityApi.create,
    onSuccess: invalidateActivities
  });

  const deleteMutation = useMutation({
    mutationFn: activityApi.delete,
    onSuccess: invalidateActivities
  });

  const editThumbnailMutation = useMutation({
    mutationFn: activityApi.editThumbnail,
    onSuccess: invalidateActivities
  });

  const editMetadataMutation = useMutation({
    mutationFn: activityApi.editMetadata,
    onSuccess: invalidateActivities
  });

  const editImageMutation = useMutation({
    mutationFn: activityApi.editImage,
    onSuccess: invalidateActivities
  });

  const deleteImageMutation = useMutation({
    mutationFn: activityApi.deleteImage,
    onSuccess: invalidateActivities
  });

  return { addMutation, editThumbnailMutation, editMetadataMutation, editImageMutation, deleteImageMutation, deleteMutation };
};
