'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';
import { WorkShop, useWorkShopActions } from 'entities/workshop';
import { Modal } from 'shared/ui/modal';
import { SaveButton } from 'shared/ui/button';
import { Input } from 'shared/ui/form-input';
import { ImageInput } from 'shared/ui/image-input';

export const AddWorkShopForm = () => {
  const { addMutation } = useWorkShopActions();

  return (
    <Modal
      title="워크숍 추가"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 워크숍 활동 추가
        </button>
      }
    >
      {(close) => (
        <WorkShopForm
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync(data);
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const EditWorkShopForm = ({ workshop }: { workshop: WorkShop }) => {
  const { editMutation } = useWorkShopActions();
  const photoId = workshop.imageUrl.split('/').pop();

  return (
    <Modal
      title="워크숍 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <WorkShopForm
          initialData={workshop}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync({ id: workshop.id, data: formData, photoId: Number(photoId) });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteWorkShopButton = ({ workshopId }: { workshopId: number }) => {
  const { deleteMutation } = useWorkShopActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(workshopId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

interface WorkShopFormProps {
  initialData?: WorkShop;
  onSubmit: (formData: FormData) => Promise<void>;
  isPending: boolean;
}
export const WorkShopForm = ({ initialData, onSubmit, isPending }: WorkShopFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [eventDate, setEventDate] = useState(initialData?.eventDate || '');
  const [image, setImage] = useState<File | string | null>(initialData?.imageUrl || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('eventDate', eventDate);
    if (image instanceof File) formData.append('multipartFile', image);

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input label="워크숍 제목" autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="워크숍 제목을 입력해주세요." />
      <Input label="워크숍 날짜" type="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
      <ImageInput label="이미지 첨부" required value={image} onChange={setImage} />
      <SaveButton type="submit" disabled={isPending || !title || !eventDate || !image}>
        저장하기
      </SaveButton>
    </form>
  );
};
