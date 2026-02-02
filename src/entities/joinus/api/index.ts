import { http } from 'shared/utils/http';
import { JoinUs } from '../types/joinus';

export const joinUsApi = {
  getAll: () => {
    return http.get<JoinUs[]>('/groups/public/all-groups-members');
  },

  getById: (id: number) => {
    return http.get<JoinUs[]>(`/groups?roleId=${id}`);
  },
  create: (newJoinUs: any) => {
    return http.post<JoinUs>(`/groups?member_id=${newJoinUs.id}&role_id=${newJoinUs.role_id}`, { part: newJoinUs.part, year: newJoinUs.year });
  },

  update: (data: any) => {
    return http.patch<JoinUs>(`/groups?groupId=${data.id}&roleId=${data.role_id}`, { part: data.part, year: data.year });
  },

  delete: (id: number) => {
    return http.delete<void>(`/groups/${id}`);
  }
};
