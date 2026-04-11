import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { workShopKeys, workShopOptions } from '../api/queries';
import { workShopApi } from '../api';
import { revalidateTag } from 'shared/utils/revalidateTag';
import { toast } from 'sonner';

export const useWorkShop = () => {
  return useSuspenseQuery({
    ...workShopOptions.all()
  });
};

export const useWorkShopActions = () => {
  const queryClient = useQueryClient();

  const invalidateWorkShop = async () => {
    await revalidateTag(workShopKeys.all);
    await queryClient.invalidateQueries({ queryKey: workShopKeys.lists() });
  };

  const addMutation = useMutation({
    mutationFn: workShopApi.create,
    onSuccess: () => {
      invalidateWorkShop();
      toast.success('워크숍 사진이 등록되었습니다');
    },
    onError: (error) => toast.error(error.message || '워크숍 사진 등록에 실패했습니다')
  });

  const editMutation = useMutation({
    mutationFn: workShopApi.update,
    onSuccess: () => {
      invalidateWorkShop();
      toast.success('워크숍 사진이 수정되었습니다');
    },
    onError: (error) => toast.error(error.message || '워크숍 사진 수정에 실패했습니다')
  });

  const deleteMutation = useMutation({
    mutationFn: workShopApi.delete,
    onSuccess: () => {
      invalidateWorkShop();
      toast.success('워크숍 사진이 삭제되었습니다');
    },
    onError: (error) => toast.error(error.message || '워크숍 사진 삭제에 실패했습니다')
  });

  return { addMutation, editMutation, deleteMutation };
};
