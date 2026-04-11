'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2, X, Upload } from 'lucide-react';
import { Modal } from 'shared/ui/modal';
import { useSkillStackActions, type SkillStack } from 'entities/skill-stack';
import { SKILL_CATEGORY, SKILL_CATEGORY_COLORS } from 'shared/constants/skillCategory';
import { Alert } from 'shared/ui/alert';
import { SaveButton } from 'shared/ui/button';
import { toast } from 'sonner';
import { IMAGE_SIZE_ERROR_MESSAGE, IMAGE_SIZE_LIMIT } from 'shared/constants/dashBoard';

export const AddSkillForm = () => {
  const { addMutation } = useSkillStackActions();

  return (
    <Modal
      title="기술 스택 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 기술 아이콘 추가
        </button>
      }
    >
      {(close) => (
        <SkillForm
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

export const EditSkillForm = ({ data }: { data: SkillStack }) => {
  const { editMutation } = useSkillStackActions();

  return (
    <Modal
      title="기술 스택 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <SkillForm
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

export const DeleteSkillButton = ({ skillId }: { skillId: number }) => {
  const { deleteMutation } = useSkillStackActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(skillId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

interface SkillFormProps {
  initialData?: SkillStack;
  onSubmit: (formData: FormData) => Promise<void>;
  isPending: boolean;
}
export const SkillForm = ({ initialData, onSubmit, isPending }: SkillFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.icon || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    if (file) formData.append('iconImage', file);

    await onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.size > IMAGE_SIZE_LIMIT) {
        toast.error(IMAGE_SIZE_ERROR_MESSAGE);
        e.target.value = '';
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-400">
          기술 스택명 <span className="text-red-500">*</span>
        </label>
        <input
          autoFocus
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: React, TypeScript"
          className="w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-400">
          카테고리 <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SKILL_CATEGORY.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${category === c ? `${SKILL_CATEGORY_COLORS[c].bg} ${SKILL_CATEGORY_COLORS[c].text}` : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-slate-400">
          아이콘 이미지 <span className="text-red-500">*</span>
        </span>
        <Alert type="warning">
          <span>
            배경이 투명한 <b>.png</b> 파일만 업로드해주세요.
          </span>
        </Alert>

        <div className="relative h-32 w-fit">
          <label
            className={`flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 ${preview ? 'w-auto border-solid' : 'w-32 border-dashed'}`}
          >
            {preview ? (
              <img src={preview} alt="Preview 이미지" className="h-full w-auto object-contain" />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <Upload size={24} />
                <span className="mt-1 text-xs">클릭하여 추가</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          {preview && (
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
      <SaveButton type="submit" disabled={isPending || !name || !category || !preview}>
        저장하기
      </SaveButton>
    </form>
  );
};
