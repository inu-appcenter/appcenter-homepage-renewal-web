'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';
import { useRoleActions, type Role, type RoleForm } from 'entities/role';
import { Modal } from 'shared/ui/modal';
import { SaveButton } from 'shared/ui/button';
import { Input } from 'shared/ui/form-input';

export const AddRoleForm = () => {
  const { addMutation } = useRoleActions();

  return (
    <Modal
      title="역할 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 역할 추가
        </button>
      }
    >
      {(close) => (
        <RoleForm
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync({ roleName: data.roleName });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const EditRoleForm = ({ data }: { data: Role }) => {
  const { editMutation } = useRoleActions();

  return (
    <Modal
      title="역할 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <RoleForm
          initialData={data}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync({ id: data.roleId, data: formData });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteRoleButton = ({ roleId }: { roleId: number }) => {
  const { deleteMutation } = useRoleActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(roleId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const RoleForm = ({ initialData, onSubmit, isPending }: { initialData?: Role; onSubmit: (data: RoleForm) => void; isPending: boolean }) => {
  const [roleName, setRoleName] = useState(initialData?.roleName || '');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ roleName });
      }}
      className="space-y-4"
    >
      <Input label="역할 이름" required value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="역할 이름을 입력해주세요." />
      <SaveButton isPending={isPending} disabled={!roleName}>
        {initialData ? '변경사항 수정' : '저장'}
      </SaveButton>
    </form>
  );
};
