import { http } from 'shared/utils/http';
import type { Project } from '../types/project';

export const projectApi = {
  getAll: () => {
    return http.get<Project[]>('/introduction-board/public/all-boards-contents');
  },

  getByMember: () => {
    return http.get<Project[]>('/introduction-board/my');
  },

  create: (newProject: FormData) => {
    return http.post<Project>('/introduction-board', newProject);
  },

  update: ({ data, id, modifiedIds }: { data: FormData; id: number; modifiedIds?: number[] }) => {
    return http.patch<Project>(`/introduction-board${modifiedIds ? `/${modifiedIds.join(',')}` : ''}?board_id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete(`/introduction-board/${id}`);
  },

  toggleActive: ({ id, isActive }: { id: number; isActive: boolean }) => {
    return http.patch<Project>(`/introduction-board/${id}/activation?isActive=${isActive}`, {});
  },

  getById: (id: number) => {
    return http.get<Project>(`/introduction-board/public/${id}`);
  }
};
