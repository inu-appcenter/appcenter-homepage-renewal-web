'use client';
import { useRouter } from 'next/navigation';
import { useRecruitmentActions } from 'entities/recruitment';
import { RecruitmentForm } from '../types/form';

export const useAddRecruitment = () => {
  const { addMutation } = useRecruitmentActions();
  const router = useRouter();

  const addRecruitment = async (data: RecruitmentForm) => {
    if (!data.title || !data.startDate || !data.endDate) {
      alert('필수 정보(제목, 모집 기간)를 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();

    formData.append('thumbnail', data.thumbnail);

    const requestPayload = {
      title: data.title,
      body: data.body,
      startDate: data.startDate,
      endDate: data.endDate,
      capacity: Number(data.capacity),
      targetAudience: data.targetAudience,
      applyLink: data.applyLink,
      fieldIds: data.fieldIds
    };

    const jsonBlob = new Blob([JSON.stringify(requestPayload)], {
      type: 'application/json'
    });
    formData.append('request', jsonBlob);

    await addMutation.mutateAsync(formData, {
      onSuccess: () => {
        alert('모집 공고가 등록되었습니다.');
        router.back();
        router.refresh();
      },
      onError: (error) => {
        console.error('API Error:', error);
        alert('서버 저장에 실패했습니다.');
      }
    });
  };

  return { addRecruitment, isPending: addMutation.isPending };
};
