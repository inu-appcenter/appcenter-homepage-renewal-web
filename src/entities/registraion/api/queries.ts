import { queryOptions } from '@tanstack/react-query';
import { registrationApi } from '.';

export const registrationKeys = {
  all: ['registration'] as const
};

export const registrationOptions = {
  all: () =>
    queryOptions({
      queryKey: registrationKeys.all,
      queryFn: registrationApi.get
    })
};
