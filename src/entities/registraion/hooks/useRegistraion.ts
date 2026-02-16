import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { registrationKeys } from '../api/queries';
import { registrationApi } from '../api';

export const useRegistration = () => {
  return useSuspenseQuery({
    queryKey: registrationKeys.all,
    queryFn: registrationApi.get
  });
};

export const useRegistrationActions = () => {
  const queryClient = useQueryClient();

  const invalidateRegistration = () => {
    return queryClient.invalidateQueries({ queryKey: registrationKeys.all });
  };

  const editMutation = useMutation({
    mutationFn: registrationApi.update,
    onSuccess: invalidateRegistration
  });

  return {
    editMutation
  };
};
