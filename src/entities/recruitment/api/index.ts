import { http } from 'shared/utils/http';
import { Email, Recruitment, RecruitmentList, RecruitmentMetaData } from '../types/recruitment';

export const recruitmentApi = {
  getAll: () => {
    return http.get<RecruitmentList[]>('/recruitment/public/all');
  },

  getById: (id: number) => {
    return http.get<Recruitment>(`/recruitment/public/${id}`);
  },

  getByMember: () => {
    return http.get<RecruitmentList[]>(`/recruitment/my`);
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

  // 모집 상태를 변경합니다 status는 'AUTO', 'WAITING', 'RECRUITING', 'CLOSED' 중 하나
  changeActive: ({ id, status }: { id: number; status: string }) => {
    return http.patch<Recruitment>(`/recruitment/${id}/status?status=${status}`, {});
  },

  delete: (id: number) => {
    return http.delete<void>(`/recruitment/${id}`);
  },

  postEmail: (email: string) => {
    return http.post(`/recruitment/public/email`, { email });
  },

  getAllEmail: () => {
    return http.get<Email[]>(`/recruitment/email`);
  }
};
