import { Activity, useActivityActions, activityOptions } from 'entities/activity';
import { useRouter } from 'next/navigation';
import { ActivityForm } from '../types/form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// 1단계. 활동 메타데이터 확인 -> 다르면 수정
// 2단계. 썸네일 파일 확인 -> 파일이면 수정
// 3단계. 각 콘텐츠 섹션별 이미지 파일 확인 -> 파일이면 수정

export const useEditActivity = () => {
  const { editMetadataMutation, editThumbnailMutation, editImageMutation } = useActivityActions();
  const router = useRouter();
  const queryClient = useQueryClient();

  const editActivity = async (initialData: Activity, form: ActivityForm) => {
    try {
      const promises: Array<Promise<any>> = [];

      // 메타데이터 변경 사항 확인
      const isMetadataChanged =
        form.title !== initialData.title || form.author !== initialData.author || form.body !== initialData.body || form.titleEng !== initialData.titleEng || form.contents !== initialData.contents;

      if (isMetadataChanged) {
        promises.push(
          editMetadataMutation.mutateAsync({
            id: initialData.id,
            metaData: {
              title: form.title,
              author: form.author,
              body: form.body,
              titleEng: form.titleEng,
              contents: form.contents.map((section) => ({
                contentId: section.id,
                subTitle: section.subTitle,
                text: section.text
              }))
            }
          })
        );
      }

      // 썸네일 변경사항 확인
      if (form.thumbnail instanceof File) {
        const thumbData = new FormData();
        thumbData.append('thumbnail', form.thumbnail);
        promises.push(
          editThumbnailMutation.mutateAsync({
            id: initialData.id,
            thumbnail: thumbData
          })
        );
      }

      await Promise.all(promises);

      // 메타데이터 및 썸네일 수정 후, 최신 Activity 데이터를 가져옴
      const updatedActivity = await queryClient.fetchQuery({
        ...activityOptions.getById(initialData.id),
        staleTime: 0
      });

      const imageUploadPromises: Array<Promise<any>> = [];

      // form.contents(로컬 파일 보유)와 updatedActivity.contents(서버 ID 보유)를 순서대로 매칭
      form.contents.forEach((formSection, index) => {
        // 현재 섹션에 업로드해야 할 파일(File 객체)만 필터링
        const newFiles = (formSection.imageUrls || []).filter((item): item is File => item instanceof File);

        if (newFiles.length > 0) {
          // 같은 순서(index)에 있는 서버 데이터를 찾음
          const serverSection = updatedActivity.contents?.[index];

          // 서버 섹션 정보가 있고, ID가 존재하면 업로드 진행
          if (serverSection && serverSection.id) {
            const formData = new FormData();

            newFiles.forEach((file) => {
              formData.append('images', file);
            });

            imageUploadPromises.push(
              editImageMutation.mutateAsync({
                id: serverSection.id,
                images: formData
              })
            );
          }
        }
      });

      // 모든 이미지 업로드 병렬 처리
      if (imageUploadPromises.length > 0) {
        await Promise.all(imageUploadPromises);
      }

      router.push('/admin/activity');
      toast.success('활동이 성공적으로 수정되었습니다');
      router.refresh();
    } catch (error) {
      console.error('Edit Error:', error);
      toast.error('수정 중 오류가 발생했습니다.');
    }
  };

  const isPending = editMetadataMutation.isPending || editThumbnailMutation.isPending || editImageMutation.isPending;

  return { editActivity, isPending };
};
