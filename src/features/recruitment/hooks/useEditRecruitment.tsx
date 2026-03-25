'use client';
import { useRouter } from 'next/navigation';
import { useRecruitmentActions } from 'entities/recruitment';
import { RecruitmentForm } from '../types/form';
import { toast } from 'sonner';

export const useEditRecruitment = () => {
  const { editMetadataMutation, editThumbnailMutation } = useRecruitmentActions();
  const router = useRouter();

  const editRecruitment = async (recruitmentId: number, form: RecruitmentForm) => {
    try {
      const promises: Array<Promise<any>> = [];

      const requestPayload = {
        title: form.title,
        body: form.body,
        startDate: form.startDate,
        endDate: form.endDate,
        capacity: Number(form.capacity),
        targetAudience: form.targetAudience,
        applyLink: form.applyLink,
        fieldIds: form.fieldIds
      };

      promises.push(
        editMetadataMutation.mutateAsync({
          id: recruitmentId,
          metaData: requestPayload
        })
      );

      // 2. 썸네일 변경사항 확인 (새로운 파일이 업로드된 경우에만 실행)
      if (form.thumbnail instanceof File) {
        const thumbData = new FormData();
        thumbData.append('thumbnail', form.thumbnail);

        promises.push(
          editThumbnailMutation.mutateAsync({
            id: recruitmentId,
            thumbnail: thumbData
          })
        );
      }

      // 3. 모든 수정 요청 병렬 처리
      await Promise.all(promises);

      toast.success('수정이 완료되었습니다.');
      router.back();
      router.refresh();
    } catch (error) {
      console.error('Edit Error:', error);
      toast.error('수정 중 오류가 발생했습니다.');
    }
  };

  const isPending = editMetadataMutation.isPending || editThumbnailMutation.isPending;

  return { editRecruitment, isPending };
};
