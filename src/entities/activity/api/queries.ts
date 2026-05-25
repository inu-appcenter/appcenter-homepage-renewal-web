import { queryOptions } from '@tanstack/react-query';
import { activityApi } from '.';

export const activityKeys = {
  all: ['activities'] as const,
  lists: () => [...activityKeys.all, 'list'] as const,
  detail: (id: number) => [...activityKeys.all, 'detail', id] as const
};

export const activityOptions = {
  all: () =>
    queryOptions({
      queryKey: activityKeys.lists(),
      queryFn: activityApi.getAll
    }),
  getById: (id: number) =>
    queryOptions({
      queryKey: activityKeys.detail(id),
      queryFn: () => activityApi.getById(id)
    })
};
