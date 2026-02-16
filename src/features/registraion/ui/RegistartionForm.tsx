'use client';
import { useState } from 'react';
import { useRegistrationActions } from 'entities/registraion';
import { Pencil, Save, Loader2 } from 'lucide-react';
import { Modal } from 'shared/ui/modal';

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
        <p className="ml-1 text-xs text-slate-400"> 변경 즉시 기존 코드는 무효화됩니다.</p>
      </div>

      <button
        type="submit"
        disabled={isPending || !formData.code || formData.code === initialData.code}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white transition-all hover:bg-emerald-600 disabled:bg-slate-300"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {isPending ? '변경 중...' : '새 코드로 저장'}
      </button>
    </form>
  );
};
