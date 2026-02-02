import { queryOptions } from '@tanstack/react-query';
import { joinUsApi } from '.';

export const joinUsKeys = {
  all: ['joinUs'] as const,
  lists: () => [...joinUsKeys.all, 'list'] as const,
  detail: (id: number) => [...joinUsKeys.all, 'detail', id] as const
};

export const joinUsOptions = {
  all: () =>
    queryOptions({
      queryKey: joinUsKeys.lists(),
      queryFn: joinUsApi.getAll
    }),
  getById: (id: number) =>
    queryOptions({
      queryKey: joinUsKeys.detail(id),
      queryFn: () => joinUsApi.getById(id)
    })
};
