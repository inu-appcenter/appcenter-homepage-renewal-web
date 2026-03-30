import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { workShopKeys, workShopOptions } from '../api/queries';
import { workShopApi } from '../api';
import { revalidateTag } from 'shared/utils/revalidateTag';

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
    onSuccess: invalidateWorkShop
  });

  const editMutation = useMutation({
    mutationFn: workShopApi.update,
    onSuccess: invalidateWorkShop
  });

  const deleteMutation = useMutation({
    mutationFn: workShopApi.delete,
    onSuccess: invalidateWorkShop
  });

  return { addMutation, editMutation, deleteMutation };
};
