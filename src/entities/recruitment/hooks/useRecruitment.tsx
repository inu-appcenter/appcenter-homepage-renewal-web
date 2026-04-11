'use client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { recruitmentKeys, recruitmentOptions } from '../api/queries';
import { recruitmentApi } from '../api';
import { revalidateTag } from 'shared/utils/revalidateTag';
import { toast } from 'sonner';

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
  const router = useRouter();

  const invalidateRecruitments = async () => {
    await revalidateTag(recruitmentKeys.all);
    await queryClient.invalidateQueries({ queryKey: recruitmentKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: recruitmentApi.create,
    onSuccess: () => {
      invalidateRecruitments();
      toast.success('모집 공고가 등록되었습니다.');
      router.back();
      router.refresh();
    },
    onError: (error) => toast.error(error.message || '모집 공고 등록에 실패했습니다.')
  });

  const deleteMutation = useMutation({
    mutationFn: recruitmentApi.delete,
    onSuccess: () => {
      invalidateRecruitments();
      toast.success('모집공고가 삭제되었습니다');
    },
    onError: (error) => toast.error(error.message || '모집공고 삭제에 실패했습니다')
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
