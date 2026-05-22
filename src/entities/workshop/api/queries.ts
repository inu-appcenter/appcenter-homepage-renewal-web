import { queryOptions } from '@tanstack/react-query';
import { workShopApi } from '.';

export const workShopKeys = {
  all: ['workShop'] as const,
  lists: () => [...workShopKeys.all, 'list'] as const
};

export const workShopOptions = {
  all: () =>
    queryOptions({
      queryKey: workShopKeys.lists(),
      queryFn: workShopApi.getAll
    })
};
