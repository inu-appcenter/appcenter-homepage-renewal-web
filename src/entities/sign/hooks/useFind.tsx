import { useMutation } from '@tanstack/react-query';
import { signApi } from '../api';

export const useFindActions = () => {
  const findIdMutation = useMutation({
    mutationFn: signApi.findId
  });
  const resetPasswordMutation = useMutation({
    mutationFn: signApi.resetPassword
  });

  return {
    findIdMutation,
    resetPasswordMutation
  };
};
