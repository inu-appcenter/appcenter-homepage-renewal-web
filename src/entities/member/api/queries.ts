import { queryOptions } from '@tanstack/react-query';
import { memberApi } from '.';

export const memberKeys = {
  all: ['members'] as const,
  lists: () => [...memberKeys.all, 'list'] as const,
  search: (query: string) => [...memberKeys.all, 'search', query] as const,
  byMember: () => [...memberKeys.all, 'byMember'] as const
};

export const memberOptions = {
  all: () =>
    queryOptions({
      queryKey: memberKeys.lists(),
      queryFn: () => memberApi.getAll()
    }),
  search: (query: string) =>
    queryOptions({
      queryKey: memberKeys.search(query),
      queryFn: () => memberApi.getByName(query),
      enabled: Boolean(query)
    }),
  byMember: () =>
    queryOptions({
      queryKey: memberKeys.byMember(),
      queryFn: () => memberApi.getByMember()
    })
};
