'use client';
import { useState } from 'react';
import { Trash2, Loader2, Pencil, Plus } from 'lucide-react';
import { useGenerationActions, useGroupYear, usePart, Generation, GenerationForm } from 'entities/generation';
import { useRoles } from 'entities/role';

import { Modal } from 'shared/ui/modal';
import { SearchMember } from './SearchMember';
import { Alert } from 'shared/ui/alert';
import { SaveButton } from 'shared/ui/button';

export const AddGenerationForm = () => {
  return (
    <Modal
      title="기수원 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 기수원 등록
        </button>
      }
    >
      {(close) => <GenerationFormContent onClose={close} />}
    </Modal>
  );
};

export const EditGenerationForm = ({ data }: { data: Generation }) => {
  return (
    <Modal
      title="기수원 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => <GenerationFormContent initialData={data} onClose={close} />}
    </Modal>
  );
};

export const DeleteGenerationButton = ({ generationId }: { generationId: number }) => {
  const { deleteMutation } = useGenerationActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(generationId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const DEFAULT_FORM: GenerationForm = {
  id: 0,
  role_id: 3, // 기본값: 파트원
  year: new Date().getFullYear() - 2008, // 기본값: 현재 연도 기준 기수
  part: 'Common'
};
interface FormContentProps {
  initialData?: Generation;
  onClose: () => void;
}
const GenerationFormContent = ({ initialData, onClose }: FormContentProps) => {
  const { addMutation, editMutation } = useGenerationActions();
  const { data: partData } = usePart();
  const { data: roleData } = useRoles();
  const { data: groupYear } = useGroupYear();

  const isEdit = Boolean(initialData);
  const mutation = isEdit ? editMutation : addMutation;

  const [formData, setFormData] = useState<GenerationForm>(() => {
    if (initialData && roleData) {
      return {
        id: initialData.group_id,
        role_id: roleData.find((r) => r.roleName === initialData.role)?.roleId ?? 0,
        year: initialData.year,
        part: initialData.part
      };
    }
    return DEFAULT_FORM;
  });
  const [customYear, setCustomYear] = useState<number | string>('');
  const [customPart, setCustomPart] = useState<string>('');

  const [selectedName, setSelectedName] = useState(initialData?.member || '');

  const isValid = formData.id !== 0 && formData.role_id !== null && formData.year && formData.part;
  const isPending = mutation.isPending;

  const handleChange = <K extends keyof GenerationForm>(field: K, value: GenerationForm[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const finalYear = customYear !== '' ? Number(customYear) : formData.year;
    const finalPart = customPart !== '' ? customPart : formData.part;

    await mutation.mutateAsync({
      ...formData,
      year: finalYear,
      part: finalPart
    });
    onClose();
  };

  return (
    <div className="space-y-7 py-2">
      {isEdit ? (
        <>
          <p className="mb-1 text-xs font-bold text-slate-400">수정 대상</p>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-700">
              {selectedName}
              <span className="font-normal text-slate-400">
                ({formData.year}기 {formData.part}) #{formData.id}
              </span>
            </p>
          </div>
        </>
      ) : (
        <div className="relative space-y-3">
          <SearchMember
            initialName={selectedName}
            isPending={isPending}
            onSelect={(member) => {
              setFormData((prev) => ({ ...prev, id: member.member_id }));
              setSelectedName(member.name);
            }}
          />
        </div>
      )}

      <div className="space-y-4 border-t border-slate-100 pt-4">
        <Alert type="info">
          <span>
            새 기수 또는 파트가 필요하면 <b>직접 입력</b> 해주세요
          </span>
        </Alert>
        <div className="space-y-3">
          <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">기수 선택 또는 직접 입력</label>

          <div className="flex flex-wrap gap-2">
            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="직접 입력"
                value={customYear}
                onChange={(e) => setCustomYear(e.target.value)}
                className={`w-28 rounded-xl border-2 border-slate-200 px-2 py-1.5 text-xs font-bold transition-all outline-none`}
              />
              <span className="pointer-events-none absolute right-8 text-[10px] font-bold text-slate-400">기</span>
            </div>
            {groupYear?.yearList.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => handleChange('year', y)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${formData.year === y ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                {y}기
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">파트 선택</label>

          <div className="flex flex-wrap gap-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="직접 입력"
                value={customPart}
                onChange={(e) => setCustomPart(e.target.value)}
                className={`w-28 rounded-xl border-2 border-slate-200 px-2 py-1.5 text-xs font-bold transition-all outline-none`}
              />
            </div>
            {partData?.parts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleChange('part', p)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${formData.part === p ? 'bg-slate-900 text-slate-100 shadow-sm' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">역할 선택</label>
          <div className="flex flex-wrap gap-2">
            {roleData?.map((r) => (
              <button
                key={r.roleId}
                type="button"
                onClick={() => handleChange('role_id', r.roleId)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  formData.role_id === r.roleId ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {r.roleName}
              </button>
            ))}
          </div>
        </div>
      </div>
      <SaveButton disabled={isPending || !isValid} onClick={handleSubmit} isPending={isPending}>
        {isEdit ? '변경사항 수정' : '저장'}
      </SaveButton>
    </div>
  );
};
