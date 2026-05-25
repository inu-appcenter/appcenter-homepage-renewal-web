'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';

import { RecruitmentField, useRecruitmentFieldActions, type RecruitmentFieldForm } from 'entities/recruitment-field';
import { Modal } from 'shared/ui/modal';
import { SaveButton } from 'shared/ui/button';
import { Input } from 'shared/ui/form-input';

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
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const RecruitmentFieldForm = ({ initialData, onSubmit, isPending }: { initialData?: RecruitmentField; onSubmit: (data: RecruitmentFieldForm) => void; isPending: boolean }) => {
  const [name, setName] = useState(initialData?.name || '');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name });
      }}
      className="space-y-4"
    >
      <Input label="모집 분야" required value={name} onChange={(e) => setName(e.target.value)} placeholder="모집 분야 이름을 입력해주세요." />
      <SaveButton type="submit" disabled={isPending || !name}>
        {initialData ? '변경사항 수정' : '저장'}
      </SaveButton>
    </form>
  );
};
