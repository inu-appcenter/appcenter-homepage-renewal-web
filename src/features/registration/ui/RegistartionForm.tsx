'use client';
import { useState } from 'react';
import { useRegistrationActions } from 'entities/registraion';
import { Pencil } from 'lucide-react';
import { Modal } from 'shared/ui/modal';
import { SaveButton } from 'shared/ui/button';
import { Alert } from 'shared/ui/alert';

export const EditRegistrationButton = ({ code }: { code: string }) => {
  const { editMutation } = useRegistrationActions();

  return (
    <Modal
      title="인증 코드 변경"
      trigger={
        <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-600">
          <Pencil size={16} /> 코드 변경하기
        </button>
      }
    >
      {(close) => (
        <AuthCodeInnerForm
          initialData={{ code }}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync(formData.code);
            close();
          }}
        />
      )}
    </Modal>
  );
};

const AuthCodeInnerForm = ({ initialData, onSubmit, isPending }: { initialData: { code: string }; onSubmit: (data: { code: string }) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState({
    code: initialData.code
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
        <label className="ml-1 text-sm font-semibold text-slate-400">새로운 인증 코드 입력</label>
        <input
          disabled={isPending}
          className="w-full rounded-2xl bg-slate-50 p-4 font-mono text-lg font-bold tracking-widest text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
          placeholder="예: APPCENTER2026"
          autoFocus
          value={formData.code}
          onChange={(e) => {
            const uppercasedValue = e.target.value.toUpperCase();
            setFormData({ code: uppercasedValue });
          }}
        />
        <Alert type="warning">
          코드는 항상 <strong>대문자</strong>입니다.
        </Alert>
      </div>
      <SaveButton type="submit" disabled={isPending || !formData.code || formData.code === initialData.code}>
        코드 변경하기
      </SaveButton>
    </form>
  );
};
