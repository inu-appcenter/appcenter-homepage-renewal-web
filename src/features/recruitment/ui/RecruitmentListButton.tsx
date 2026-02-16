import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRecruitmentActions } from 'entities/recruitment';
import { STATUS_CONFIG } from '../config/statusConfig';

export const AddRecruitmentButton = () => {
  return (
    <Link href="/admin/recruitment/editor" className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
      <Plus size={18} /> 새 모집 공고 추가
    </Link>
  );
};

export const EditRecruitmentButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/admin/recruitment/editor/${id}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
      <Pencil size={16} />
    </Link>
  );
};

export const MemberAddRecruitmentButton = () => {
  return (
    <Link href="/member/recruitment/editor" className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
      <Plus size={18} /> 새 모집 공고 추가
    </Link>
  );
};

export const MemberEditRecruitmentButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/member/recruitment/editor/${id}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
      <Pencil size={16} />
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
export const RecruitmentStatusGrid = ({ id, currentStatus }: { id: number; currentStatus: string }) => {
  const { changeActiveMutation } = useRecruitmentActions();
  const isPending = changeActiveMutation.isPending;

  const handleStatusChange = (newStatus: string) => {
    if (isPending || currentStatus === newStatus) return;
    changeActiveMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="relative inline-flex flex-col">
      <div className="grid w-39 grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
        {STATUS_CONFIG.map(({ value, label, Icon, activeColor }) => {
          const isSelected = currentStatus === value;

          return (
            <button
              key={value}
              onClick={() => handleStatusChange(value)}
              disabled={isPending}
              className={`relative flex items-center justify-center gap-1.5 rounded-md px-1.5 py-1.5 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none ${
                isSelected ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 shrink-0 transition-colors ${isSelected ? activeColor : 'text-slate-400'}`} />
              <span className={`text-[11px] font-bold tracking-tight ${isSelected ? 'text-slate-800' : ''}`}>{label}</span>
            </button>
          );
        })}
      </div>

      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-[1px]">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  );
};
