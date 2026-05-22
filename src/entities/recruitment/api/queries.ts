import { queryOptions } from '@tanstack/react-query';
import { recruitmentApi } from '.';

export const recruitmentKeys = {
  all: ['recruitment'] as const,
  lists: () => [...recruitmentKeys.all, 'list'] as const,
  detail: (id: number) => [...recruitmentKeys.all, 'detail', id] as const,
  email: () => ['email'] as const,
  getByMember: () => [...recruitmentKeys.lists(), 'my'] as const
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
    }),
  getByMember: () =>
    queryOptions({
      queryKey: recruitmentKeys.getByMember(),
      queryFn: () => recruitmentApi.getByMember()
    })
};
