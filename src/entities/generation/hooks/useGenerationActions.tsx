import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { generationOptions } from '../api/queries';
import { generationApi } from '../api';
import { toast } from 'sonner';

export const useGeneration = () => {
  return useSuspenseQuery({
    ...generationOptions.all()
  });
};

export const usePart = () => {
  return useSuspenseQuery({
    ...generationOptions.parts()
  });
};

export const useGroupYear = () => {
  return useSuspenseQuery({
    ...generationOptions.groupYears()
  });
};

export const useGenerationActions = () => {
  const queryClient = useQueryClient();

  const invalidateGenerations = () => {
    queryClient.invalidateQueries({ queryKey: ['generations'] });
  };

  const addMutation = useMutation({
    mutationFn: generationApi.create,
    onSuccess: () => {
      toast.success('기수가 추가되었습니다');
      invalidateGenerations();
    },
    onError: (error) => toast.error(error.message)
  });

  const editMutation = useMutation({
    mutationFn: generationApi.update,
    onSuccess: () => {
      toast.success('기수 정보가 수정되었습니다');
      invalidateGenerations();
    },
    onError: (error) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: generationApi.delete,
    onSuccess: () => {
      toast.success('기수가 삭제되었습니다');
      invalidateGenerations();
    },
    onError: (error) => toast.error(error.message)
  });

  return { addMutation, editMutation, deleteMutation };
};
