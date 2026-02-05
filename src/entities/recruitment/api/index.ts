import { http } from 'shared/utils/http';
import { Recruitment, RecruitmentList, RecruitmentMetaData } from '../types/recruitment';

export const recruitmentApi = {
  getAll: () => {
    return http.get<RecruitmentList[]>('/recruitment/public/all');
  },

  getById: (id: number) => {
    return http.get<Recruitment>(`/recruitment/public/${id}`);
  },

  create: (newRecruitment: FormData) => {
    return http.post<Recruitment>(`/recruitment`, newRecruitment);
  },

  // 썸네일만 수정 가능
  editThumbnail: ({ id, thumbnail }: { id: number; thumbnail: FormData }) => {
    return http.patch<Recruitment>(`/recruitment/thumbnail?recruitment_id=${id}`, thumbnail);
  },

  // 글의 텍스트, 메타데이터만 수정 가능
  editMetadata: ({ id, metaData }: { id: number; metaData: RecruitmentMetaData }) => {
    return http.patch<Recruitment>(`/recruitment/meta?recruitment_id=${id}`, metaData);
  },

  // 모집을 강제로 마감시킵니다. 이미 마감 된 모집글이라면 다시 활성화시킵니다.
  toggleActive: (id: number) => {
    return http.patch<Recruitment>(`/recruitment/${id}/toggle-close`, {});
  },

  delete: (id: number) => {
    return http.delete<void>(`/recruitment/${id}`);
  }
};
