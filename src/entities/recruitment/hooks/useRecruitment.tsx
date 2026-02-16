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
export const useRecruitmentByMember = () => {
  return useSuspenseQuery({
    ...recruitmentOptions.getByMember()
  });
};

export const useRecruitmentEmail = () => {
  return useSuspenseQuery({
    queryKey: recruitmentKeys.email(),
    queryFn: recruitmentApi.getAllEmail
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

  const changeActiveMutation = useMutation({
    mutationFn: recruitmentApi.changeActive,
    onSuccess: invalidateRecruitments
  });

  const invalidateEmail = () => {
    return queryClient.invalidateQueries({ queryKey: recruitmentKeys.email() });
  };

  // 이메일 관련 API
  const postEmailMutation = useMutation({
    mutationFn: recruitmentApi.postEmail,
    onSuccess: invalidateEmail
  });

  return { addMutation, editThumbnailMutation, editMetadataMutation, deleteMutation, changeActiveMutation, postEmailMutation };
};
