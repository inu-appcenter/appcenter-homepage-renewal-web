import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRecruitmentActions } from 'entities/recruitment';

export const AddRecruitmentButton = () => {
  return (
    <Link href="/admin/recruitment/editor" className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
      <Plus size={18} /> 새 모집 공고 추가
    </Link>
  );
};

export const DeleteRecruitmentButton = ({ recruitmentId }: { recruitmentId: number }) => {
  const { deleteMutation } = useRecruitmentActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(recruitmentId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

export const EditRecruitmentButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/admin/recruitment/editor/${id}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
      <Pencil size={16} />
    </Link>
  );
};

export const ToggleRecruitmmentButton = ({ id, isRecruiting }: { id: number; isRecruiting: boolean }) => {
  const { toggleMutation } = useRecruitmentActions();

  const isPending = toggleMutation.isPending;

  const handleToggle = () => {
    if (isPending) return;

    toggleMutation.mutate(id);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={isRecruiting ? '비활성화하기' : '활성화하기'}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none ${
        isRecruiting ? 'bg-emerald-500' : 'bg-slate-200'
      } ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span className="sr-only">상태 변경</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isRecruiting ? 'translate-x-5' : 'translate-x-0'}`}
      >
        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={10} className="animate-spin text-slate-400" />
          </span>
        )}
      </span>
    </button>
  );
};
