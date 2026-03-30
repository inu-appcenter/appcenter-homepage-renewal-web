import { http } from 'shared/utils/http';
import { Activity, ActivityMetaData } from '../types/activity';
import { activityKeys } from './queries';

export const activityApi = {
  getAll: () => {
    return http.get<Activity[]>('/cache/activity-board/public/all-boards-contents', {
      headers: {
        'x-cache-tag': activityKeys.all
      }
    });
  },
  getById: (id: number) => {
    return http.get<Activity>(`/activity-board/public/${id}`);
  },
  create: (activity: FormData) => {
    return http.post<Activity>('/activity-board', activity);
  },
  delete: (id: number) => {
    return http.delete(`/activity-board/${id}`);
  },
  // 썸네일 이미지만 수정 가능
  editThumbnail: ({ id, thumbnail }: { id: number; thumbnail: FormData }) => {
    return http.patch<Activity>(`/activity-board/thumbnail?board_id=${id}`, thumbnail);
  },
  // 글의 텍스트, 메타데이터만 수정 가능
  editMetadata: ({ id, metaData }: { id: number; metaData: ActivityMetaData }) => {
    return http.patch<Activity>(`/activity-board/meta?board_id=${id}`, metaData);
  },
  editImageOrder: ({ id, order }: { id: number; order: number[] }) => {
    return http.patch<Activity>(`/activity-board/contents/${id}/images/order`, order);
  },

  // 이미지만 수정할 수 있으며 이미지 추가,수정 동시에 안됨
  editImage: ({ id, imageIds, images }: { id: number; imageIds?: number[]; images: FormData }) => {
    const params = new URLSearchParams();

    imageIds?.forEach((imgId) => {
      params.append('image_id', String(imgId));
    });
    return http.patch<Activity>(`/activity-board/contents/${id}/images?${params.toString()}`, images);
  },
  deleteImage: ({ id, imageIds }: { id: number; imageIds: number[] }) => {
    const params = new URLSearchParams();

    imageIds.forEach((imgId) => {
      params.append('image_id', String(imgId));
    });

    return http.delete<Activity>(`/activity-board/contents/${id}/images?${params.toString()}`);
  }
};
