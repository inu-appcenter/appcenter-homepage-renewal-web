import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { registrationKeys } from '../api/queries';
import { registrationApi } from '../api';
import { toast } from 'sonner';

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
    onSuccess: () => {
      toast.success('인증 코드가 성공적으로 변경되었습니다');
      invalidateRegistration();
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return {
    editMutation
  };
};
