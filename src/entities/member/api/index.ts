import { http } from 'shared/utils/http';
import type { Member, MemberForm } from '../types/member';

export const memberApi = {
  getAll: () => {
    return http.get<Member[]>('/members/all-members');
  },

  getByName: (name: string) => {
    return http.get<Member[]>(`/members/id/${encodeURIComponent(name.trim())}`);
  },
  getByMember: () => {
    return http.get<Member>(`/members/me`);
  },

  updateByMember: (data: MemberForm) => {
    return http.patch<Member>(`/members/me`, data);
  },

  create: (newMember: MemberForm) => {
    return http.post<Member>('/members', newMember);
  },

  update: ({ id, data }: { id: number; data: MemberForm }) => {
    return http.patch<Member>(`/members?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/members/${id}`);
  }
};
