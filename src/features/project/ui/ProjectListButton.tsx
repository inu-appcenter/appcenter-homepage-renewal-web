'use client';
import Link from 'next/link';
import { Pencil, Plus, Trash2, Loader2 } from 'lucide-react';
import { Project, useProjectActions } from 'entities/project';

export const AddProjectForm = () => {
  return (
    <Link href="/admin/project/editor">
      <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
        <Plus size={18} /> 새 프로젝트 추가
      </button>
    </Link>
  );
};

export const EditProjectForm = ({ project }: { project: Project }) => {
  return (
    <Link href={`/admin/project/editor/${project.id}`}>
      <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
        <Pencil size={16} />
      </button>
    </Link>
  );
};

export const MemberAddProjectForm = () => {
  return (
    <Link href="/member/project/editor">
      <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
        <Plus size={18} /> 새 프로젝트 추가
      </button>
    </Link>
  );
};

export const MemberEditProjectForm = ({ project }: { project: Project }) => {
  return (
    <Link href={`/member/project/editor/${project.id}`}>
      <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
        <Pencil size={16} />
      </button>
    </Link>
  );
};

export const DeleteProjectButton = ({ projectId }: { projectId: number }) => {
  const { deleteMutation } = useProjectActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(projectId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

export const ProjectStatusToggle = ({ projectId, isActive }: { projectId: number; isActive: boolean }) => {
  const { toggleMutation } = useProjectActions();

  const isPending = toggleMutation.isPending;

  const handleToggle = () => {
    if (isPending) return;

    toggleMutation.mutate({
      id: projectId,
      isActive: !isActive
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={isActive ? '비활성화하기' : '활성화하기'}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none ${
        isActive ? 'bg-emerald-500' : 'bg-slate-200'
      } ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span className="sr-only">상태 변경</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`}
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
