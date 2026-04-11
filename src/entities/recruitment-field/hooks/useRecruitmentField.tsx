import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { recruitmentFieldKeys, recruitmentFieldOptions } from '../api/queries';
import { recruitmentFieldApi } from '../api';
import { toast } from 'sonner';

export const useRecruitmentField = () => {
  return useSuspenseQuery({
    ...recruitmentFieldOptions.all()
  });
};

export const useRecruitmentFieldById = (id: number) => {
  return useSuspenseQuery({
    ...recruitmentFieldOptions.getById(id)
  });
};

export const useRecruitmentFieldActions = () => {
  const queryClient = useQueryClient();

  const invalidateRecruitmentFields = () => {
    return queryClient.invalidateQueries({ queryKey: recruitmentFieldKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: recruitmentFieldApi.create,
    onSuccess: () => {
      invalidateRecruitmentFields();
      toast.success('모집 분야가 추가되었습니다');
    },
    onError: (error) => toast.error(error.message || '모집 분야 추가에 실패했습니다')
  });

  const editMutation = useMutation({
    mutationFn: recruitmentFieldApi.update,
    onSuccess: () => {
      invalidateRecruitmentFields();
      toast.success('모집 분야가 수정되었습니다');
    },
    onError: (error) => toast.error(error.message || '모집 분야 수정에 실패했습니다')
  });

  const deleteMutation = useMutation({
    mutationFn: recruitmentFieldApi.delete,
    onSuccess: () => {
      invalidateRecruitmentFields();
      toast.success('모집 분야가 삭제되었습니다');
    },
    onError: (error) => toast.error(error.message || '모집 분야 삭제에 실패했습니다')
  });

  return { addMutation, editMutation, deleteMutation };
};
