'use client';
import { useRecruitmentActions } from 'entities/recruitment';
import { RecruitmentForm } from '../types/form';

export const useAddRecruitment = () => {
  const { addMutation } = useRecruitmentActions();

  const addRecruitment = async (data: RecruitmentForm) => {
    const { thumbnail, ...requestData } = data;

    const formData = new FormData();
    if (thumbnail) formData.append('thumbnail', thumbnail);
    formData.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    await addMutation.mutateAsync(formData);
  };

  return { addRecruitment, isPending: addMutation.isPending };
};
