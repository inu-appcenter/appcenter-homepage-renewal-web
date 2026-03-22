'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';

import { Modal } from 'shared/ui/modal';
import { RecruitmentField, useRecruitmentFieldActions, type RecruitmentFieldForm } from 'entities/recruitment-field';
import { SaveButton } from 'shared/ui/button';
import { toast } from 'sonner';

export const AddRecruitmentFieldForm = () => {
  const { addMutation } = useRecruitmentFieldActions();

  return (
    <Modal
      title="모집 분야 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 모집 분야 추가
        </button>
      }
    >
      {(close) => (
        <RecruitmentFieldForm
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync(data);
            close();
            toast.success('모집 분야가 등록되었습니다');
          }}
        />
      )}
    </Modal>
  );
};

export const EditRecruitmentFieldForm = ({ data }: { data: RecruitmentField }) => {
  const { editMutation } = useRecruitmentFieldActions();

  return (
    <Modal
      title="모집 분야 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <RecruitmentFieldForm
          initialData={data}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync({ id: data.id, data: formData });
            close();
            toast.success('모집 분야가 수정되었습니다');
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteRecruitmentFieldButton = ({ recruitmentFieldId }: { recruitmentFieldId: number }) => {
  const { deleteMutation } = useRecruitmentFieldActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(recruitmentFieldId);
      toast.success('모집 분야가 삭제되었습니다');
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const RecruitmentFieldForm = ({ initialData, onSubmit, isPending }: { initialData?: RecruitmentField; onSubmit: (data: RecruitmentFieldForm) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState<RecruitmentFieldForm>({
    name: initialData?.name || ''
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-2">
        <label className="ml-1 text-sm font-semibold text-slate-400">모집 분야 명</label>
        <input
          disabled={isPending}
          className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
          placeholder="모집 분야 이름"
          autoFocus
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <SaveButton type="submit" disabled={isPending || !formData.name}>
        {initialData ? '변경사항 수정' : '저장'}
      </SaveButton>
    </form>
  );
};
