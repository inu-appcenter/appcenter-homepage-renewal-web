import { http } from 'shared/utils/http';
import { WorkShop } from '../types/workshop';
import { workShopKeys } from './queries';

export const workShopApi = {
  getAll: () => {
    return http.get<WorkShop[]>('/cache/photo-board/public/all-boards-contents', {
      headers: {
        'x-cache-tag': workShopKeys.all
      }
    });
  },

  create: (newFormData: FormData) => {
    return http.post<WorkShop>('/photo-board', newFormData);
  },

  update: ({ id, data, photoId }: { id: number; data: FormData; photoId: number }) => {
    return http.patch<WorkShop>(`/photo-board/${photoId}?board_id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/photo-board/${id}`);
  }
};
