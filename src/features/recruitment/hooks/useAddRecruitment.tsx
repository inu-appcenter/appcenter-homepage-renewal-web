'use client';
import { useRouter } from 'next/navigation';
import { useRecruitmentActions } from 'entities/recruitment';
import { RecruitmentForm } from '../types/form';

export const useAddRecruitment = () => {
  // Recruitment 전용 mutation을 사용하도록 변경 필요
  const { addMutation } = useRecruitmentActions();
  const router = useRouter();

  const addRecruitment = async (data: RecruitmentForm) => {
    // // 1. 필수값 검증
    // if (!data.title || !data.thumbnail || !data.startDate || !data.endDate) {
    //   alert('필수 정보(제목, 썸네일, 모집 기간)를 모두 입력해주세요.');
    //   return;
    // }

    try {
      const formData = new FormData();

      // 2. thumbnail 추가 (string($binary) 대응)
      formData.append('thumbnail', data.thumbnail);

      // 3. request 객체 생성 (요청하신 JSON 구조)
      const requestPayload = {
        title: data.title,
        body: data.body,
        startDate: data.startDate, // "2026-03-01"
        endDate: data.endDate, // "2026-03-15"
        capacity: Number(data.capacity),
        targetAudience: data.targetAudience,
        applyLink: data.applyLink,
        fieldIds: data.fieldIds // [1, 2, 3]
      };

      // 4. request 객체를 Blob으로 만들어 'request'라는 키로 추가
      const jsonBlob = new Blob([JSON.stringify(requestPayload)], {
        type: 'application/json'
      });
      formData.append('request', jsonBlob);

      // 5. API 전송
      await addMutation.mutateAsync(formData, {
        onSuccess: () => {
          alert('모집 공고가 등록되었습니다.');
          router.push('/admin/recruitment'); // 이동 경로 수정 필요 시 변경
          router.refresh();
        },
        onError: (error) => {
          console.error('API Error:', error);
          alert('서버 저장에 실패했습니다.');
        }
      });
    } catch (error) {
      console.error('Submit Error:', error);
      alert('데이터 처리 중 오류가 발생했습니다.');
    }
  };

  return { addRecruitment, isPending: addMutation.isPending };
};
