import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { recruitmentFieldKeys, recruitmentFieldOptions } from '../api/queries';
import { recruitmentFieldApi } from '../api';

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
    onSuccess: invalidateRecruitmentFields
  });

  const editMutation = useMutation({
    mutationFn: recruitmentFieldApi.update,
    onSuccess: invalidateRecruitmentFields
  });

  const deleteMutation = useMutation({
    mutationFn: recruitmentFieldApi.delete,
    onSuccess: invalidateRecruitmentFields
  });

  return { addMutation, editMutation, deleteMutation };
};
