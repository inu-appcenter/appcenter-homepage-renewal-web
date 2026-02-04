import { queryOptions } from '@tanstack/react-query';
import { recruitmentApi } from '.';

export const recruitmentKeys = {
  all: ['recruitment'] as const,
  lists: () => [...recruitmentKeys.all, 'list'] as const,
  detail: (id: number) => [...recruitmentKeys.all, 'detail', id] as const
};

export const recruitmentOptions = {
  all: () =>
    queryOptions({
      queryKey: recruitmentKeys.lists(),
      queryFn: recruitmentApi.getAll
    }),
  getById: (id: number) =>
    queryOptions({
      queryKey: recruitmentKeys.detail(id),
      queryFn: () => recruitmentApi.getById(id)
    })
};
