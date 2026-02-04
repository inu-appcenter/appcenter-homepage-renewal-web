import { http } from 'shared/utils/http';
import { Recruitment } from '../types/recruitment';

export const recruitmentApi = {
  getAll: () => {
    return http.get<Recruitment[]>('/groups/public/all-groups-members');
  },

  getById: (id: number) => {
    return http.get<Recruitment[]>(`/groups?roleId=${id}`);
  },
  create: (newRecruitment: any) => {
    return http.post<Recruitment>(`/groups?member_id=${newRecruitment.id}&role_id=${newRecruitment.role_id}`, { part: newRecruitment.part, year: newRecruitment.year });
  },

  update: (data: any) => {
    return http.patch<Recruitment>(`/groups?groupId=${data.id}&roleId=${data.role_id}`, { part: data.part, year: data.year });
  },

  delete: (id: number) => {
    return http.delete<void>(`/groups/${id}`);
  }
};
