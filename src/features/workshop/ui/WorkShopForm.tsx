'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2, X, Upload } from 'lucide-react';
import { Modal } from 'shared/ui/modal';
import { WorkShop, useWorkShopActions } from 'entities/workshop';
import { Alert } from 'shared/ui/alert';
import { SaveButton } from 'shared/ui/button';
import { toast } from 'sonner';
import { IMAGE_SIZE_ERROR_MESSAGE, IMAGE_SIZE_LIMIT } from 'shared/constants/dashBoard';

export const AddWorkShopForm = () => {
  const { addMutation } = useWorkShopActions();

  return (
    <Modal
      title="워크숍 등록"
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
            toast.success('워크숍 사진이 등록되었습니다');
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
            toast.success('워크숍 사진이 수정되었습니다');
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
      toast.success('워크숍 사진이 삭제되었습니다');
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(() => {
    return initialData?.imageUrl || null;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > IMAGE_SIZE_LIMIT) {
      toast.error(IMAGE_SIZE_ERROR_MESSAGE);
      e.target.value = '';
      return;
    }

    setSelectedFile(file);

    if (preview && !initialData?.imageUrl) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('eventDate', eventDate);

    if (selectedFile) {
      formData.append('multipartFile', selectedFile);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400">워크숍 제목</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="워크숍 제목을 입력해주세요."
          className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400">워크숍 날짜</label>
        <input
          type="date"
          required
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400">이미지 첨부</label>
        <Alert type="warning">
          <span>
            이미지는 <b>무조건 </b>첨부해야합니다
          </span>
        </Alert>

        <div className="flex justify-start">
          {preview ? (
            <div className="relative aspect-square w-32 overflow-hidden rounded-lg border border-slate-200">
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
              <button type="button" onClick={removeFile} className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="flex aspect-square w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:border-blue-400 hover:bg-blue-50">
              <Upload size={24} />
              <span className="text-xs">사진 추가</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>
      </div>
      <SaveButton type="submit" disabled={isPending || !title || !eventDate || !preview}>
        저장하기
      </SaveButton>
    </form>
  );
};
