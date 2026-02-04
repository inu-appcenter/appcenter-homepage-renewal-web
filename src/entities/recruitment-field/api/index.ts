import { http } from 'shared/utils/http';
import { RecruitmentField, RecruitmentFieldForm } from '../types/recruitmentField';

export const recruitmentFieldApi = {
  getAll: () => {
    return http.get<RecruitmentField[]>('/recruitment-fields/public/all');
  },

  getById: (id: number) => {
    return http.get<RecruitmentField[]>(`/recruitment-fields/public/${id}`);
  },

  create: (newRecruitmentField: RecruitmentFieldForm) => {
    return http.post<RecruitmentField>(`/recruitment-fields`, newRecruitmentField);
  },

  update: ({ data, id }: { data: RecruitmentFieldForm; id: number }) => {
    return http.patch<RecruitmentField>(`/recruitment-fields/${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<void>(`/recruitment-fields/${id}`);
  }
};
