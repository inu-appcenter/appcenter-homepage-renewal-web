'use client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { activityApi } from '../api';
import { activityOptions, activityKeys } from '../api/queries';
import { revalidateTag } from 'shared/utils/revalidateTag';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const invalidateActivities = async () => {
    await revalidateTag(activityKeys.all);
    await queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: activityApi.create,
    onSuccess: () => {
      invalidateActivities();
      toast.success('활동이 추가되었습니다.');
      router.push('/admin/activity');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: activityApi.delete,
    onSuccess: () => {
      toast.success('활동이 삭제되었습니다.');
      invalidateActivities();
    },
    onError: (error) => toast.error(error.message)
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
