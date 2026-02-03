import { useActivityActions } from 'entities/activity';
import { useRouter } from 'next/navigation';
import { ActivityForm } from '../types/form';

export const useAddActivity = () => {
  const { addMutation } = useActivityActions();
  const router = useRouter();

  const addActivity = async (data: ActivityForm) => {
    if (!data.title || !data.author || !data.thumbnail) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('thumbnail', data.thumbnail);
      let globalImageIndex = 0;

      const processedContents = (data.contents || []).map((section, index) => {
        // contents별 이미지 파일들을 FormData에 추가하고, 인덱스 기록
        const sectionImageIndexes: number[] = [];

        section.imageUrls.forEach((file) => {
          formData.append('contentImages', file);
          sectionImageIndexes.push(globalImageIndex);
          globalImageIndex++;
        });

        return {
          subTitle: section.subTitle,
          text: section.text,
          sequence: index + 1,
          imageIndexes: sectionImageIndexes
        };
      });

      const requestPayload = {
        title: data.title,
        author: data.author,
        body: data.body,
        contents: processedContents
      };

      const jsonBlob = new Blob([JSON.stringify(requestPayload)], {
        type: 'application/json'
      });
      formData.append('request', jsonBlob);

      await addMutation.mutateAsync(formData, {
        onSuccess: () => {
          router.push('/admin/activity');
          router.refresh();
        }
      });
    } catch (error) {
      console.error('Submit Error:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return { addActivity, isPending: addMutation.isPending };
};
