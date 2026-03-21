import { useMutation } from '@tanstack/react-query';
import { signApi } from '../api';

export const useFindActions = () => {
  const findIdMutation = useMutation({
    mutationFn: signApi.findId
  });

  return {
    findIdMutation
  };
};
