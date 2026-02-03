'use client';
import { useState } from 'react';
import { Pencil, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { useFAQActions, type Faq, type FAQForm } from 'entities/faq';

import { PART, PART_COLORS } from 'shared/constants/part';
import type { Part } from 'shared/types/part';
import { Modal } from 'shared/ui/modal';

export const AddFAQForm = () => {
  const { addMutation } = useFAQActions();

  return (
    <Modal
      title="FAQ 질문 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 질문 추가
        </button>
      }
    >
      {(close) => (
        <FAQForm
          initialPart="Common"
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

export const EditFAQForm = ({ data }: { data: Faq }) => {
  const { editMutation } = useFAQActions();

  return (
    <Modal
      title="FAQ 질문 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <FAQForm
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

export const DeleteFAQButton = ({ faqId }: { faqId: number }) => {
  const { deleteMutation } = useFAQActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(faqId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const FAQForm = ({ initialData, initialPart, onSubmit, isPending }: { initialData?: Faq; initialPart?: Part; onSubmit: (data: FAQForm) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState<FAQForm>({
    part: initialData?.part || initialPart || 'Common',
    question: initialData?.question || '',
    answer: initialData?.answer || ''
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div>
        <label className="mb-2 block text-xs font-bold text-slate-400 uppercase">파트</label>
        <div className="flex flex-wrap gap-2">
          {PART.map((p) => (
            <button
              type="button"
              key={p}
              disabled={isPending}
              onClick={() => setFormData({ ...formData, part: p })}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                formData.part === p ? `${PART_COLORS[p].bg} ${PART_COLORS[p].text}` : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              } disabled:opacity-50`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <label className="mb-2 block text-xs font-bold text-slate-400 uppercase">질문</label>
      <input
        disabled={isPending}
        className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
        placeholder="질문 내용"
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
      />
      <label className="mb-2 block text-xs font-bold text-slate-400 uppercase">답변</label>
      <input
        disabled={isPending}
        className="w-full rounded-2xl bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
        placeholder="답변 내용"
        value={formData.answer}
        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
      />
      <button
        type="submit"
        disabled={isPending || !formData.question || !formData.answer}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white transition-all hover:bg-emerald-600 disabled:bg-slate-300"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {isPending ? '처리 중...' : initialData ? '변경사항 저장' : '데이터베이스에 저장'}
      </button>
    </form>
  );
};
