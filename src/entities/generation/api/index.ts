import { http } from 'shared/utils/http';
import { Part } from 'shared/types/part';
import { Generation, GenerationForm } from '../types/generation';

export const generationApi = {
  getAll: () => {
    return http.get<Generation[]>('/groups/public/all-groups-members');
  },

  create: (newGeneration: GenerationForm) => {
    return http.post<Generation>(`/groups?member_id=${newGeneration.id}&role_id=${newGeneration.role_id}`, { part: newGeneration.part, year: newGeneration.year });
  },

  update: (data: GenerationForm) => {
    return http.patch<Generation>(`/groups?groupId=${data.id}&roleId=${data.role_id}`, { part: data.part, year: data.year });
  },

  delete: (id: number) => {
    return http.delete<void>(`/groups/${id}`);
  },

  getGroupYears: () => {
    return http.get<{ yearList: number[] }>('/groups/public/all-groups-years', { next: { revalidate: 86400 } });
  },

  getParts: () => {
    return http.get<{ parts: Part[] }>('/groups/public/all-parts');
  }
};
