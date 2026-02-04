import { queryOptions } from '@tanstack/react-query';
import { recruitmentFieldApi } from '.';

export const recruitmentFieldKeys = {
  all: ['recruitmentField'] as const,
  lists: () => [...recruitmentFieldKeys.all, 'list'] as const,
  detail: (id: number) => [...recruitmentFieldKeys.all, 'detail', id] as const
};

export const recruitmentFieldOptions = {
  all: () =>
    queryOptions({
      queryKey: recruitmentFieldKeys.lists(),
      queryFn: recruitmentFieldApi.getAll
    }),
  getById: (id: number) =>
    queryOptions({
      queryKey: recruitmentFieldKeys.detail(id),
      queryFn: () => recruitmentFieldApi.getById(id)
    })
};
