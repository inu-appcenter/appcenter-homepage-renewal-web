import { useProjectActions } from 'entities/project';
import { ProjectFormType } from '../types/form';

interface EditProjectSubmitProps {
  mode: 'edit';
  projectId: number;
  onSuccess: () => void;
}
interface AddProjectSubmitProps {
  mode: 'create';
  onSuccess: (id: number) => void;
}
export const useProjectSubmit = (props: EditProjectSubmitProps | AddProjectSubmitProps) => {
  const { addMutation, editMutation } = useProjectActions();

  const isPending = props.mode === 'create' ? addMutation.isPending : editMutation.isPending;

  const submit = async (data: ProjectFormType) => {
    const formData = new FormData();
    const modifiedIds: number[] = [];

    // 1. 기본 텍스트 데이터
    formData.append('title', data.title);
    formData.append('subTitle', data.subTitle);
    formData.append('body', data.body);
    formData.append('isActive', String(data.isActive));
    formData.append('githubLink', data.githubLink);
    formData.append('androidStoreLink', data.androidStoreLink);
    formData.append('appleStoreLink', data.appleStoreLink);
    formData.append('webSiteLink', data.webSiteLink);

    // 2. 이미지 파일 데이터
    data.images.forEach((img) => {
      if (img?.file) {
        formData.append('multipartFiles', img.file);
        if (img.id) {
          modifiedIds.push(img.id);
        }
      }
    });

    // 3. 스택 및 참여 파트원 배열 처리
    if (data.stacks) data.stacks.forEach((id) => formData.append('stackIds', String(id)));
    if (data.groups) data.groups.forEach((id) => formData.append('groupIds', String(id)));

    if (props.mode === 'create') {
      addMutation.mutate(formData, {
        onSuccess: (response: any) => {
          // response.msg에서 숫자(ID) 추출
          // {"msg" : "108 Board has been successfully saved."}
          const idMatch = response.msg.match(/\d+/);
          const generatedId = idMatch ? Number(idMatch[0]) : null;
          if (generatedId) {
            props.onSuccess(generatedId);
          }
        }
      });
    } else {
      editMutation.mutate({ data: formData, id: props.projectId, modifiedIds }, { onSuccess: props.onSuccess });
    }
  };

  return {
    submit,
    isPending
  };
};
