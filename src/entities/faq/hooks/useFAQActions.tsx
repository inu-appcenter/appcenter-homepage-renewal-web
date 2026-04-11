import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { faqApi } from '../api';
import { faqOptions, faqKeys } from '../api/queries';
import { toast } from 'sonner';

export const useFAQs = () => {
  return useSuspenseQuery({
    ...faqOptions.all()
  });
};

export const useFAQActions = () => {
  const queryClient = useQueryClient();

  const invalidateFaqs = () => {
    return queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: faqApi.create,
    onSuccess: () => {
      toast.success('FAQ가 추가되었습니다');
      invalidateFaqs();
    },
    onError: (error) => toast.error(error.message || 'FAQ 추가에 실패했습니다')
  });

  const editMutation = useMutation({
    mutationFn: faqApi.update,
    onSuccess: () => {
      toast.success('FAQ가 수정되었습니다');
      invalidateFaqs();
    },
    onError: (error) => toast.error(error.message || 'FAQ 수정에 실패했습니다')
  });

  const deleteMutation = useMutation({
    mutationFn: faqApi.delete,
    onSuccess: () => {
      toast.success('FAQ가 삭제되었습니다');
      invalidateFaqs();
    },
    onError: (error) => toast.error(error.message || 'FAQ 삭제에 실패했습니다')
  });

  return { addMutation, editMutation, deleteMutation };
};
