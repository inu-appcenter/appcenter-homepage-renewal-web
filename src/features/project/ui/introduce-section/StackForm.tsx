import { useState } from 'react';
import { Check, Code2, Layers, Plus, RefreshCw, Search, Settings, X } from 'lucide-react';
import Link from 'next/link';

import { useSkillStack } from 'entities/skill-stack';
import { ProjectFormType } from '../../types/form';
import { Modal } from 'shared/ui/modal';

export const StackForm = ({ form, setForm }: { form: ProjectFormType; setForm: React.Dispatch<React.SetStateAction<ProjectFormType>> }) => {
  const { data: skillStack, refetch, isRefetching } = useSkillStack();
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStack = (id: number) => {
    setForm((prev) => {
      const isSelected = prev.stacks.includes(id);
      return {
        ...prev,
        stacks: isSelected ? prev.stacks.filter((stackId) => stackId !== id) : [...prev.stacks, id]
      };
    });
  };

  const removeStack = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setForm((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((stackId) => stackId !== id)
    }));
  };

  const filteredStack = skillStack.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];
  const selectedSkills = skillStack.filter((skill) => form.stacks.includes(skill.id)) || [];

  return (
    <div className="gpa-4 relative flex h-full w-full flex-col">
      <div className="flex h-full items-center justify-center">
        {selectedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-12">
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={(e) => removeStack(e, skill.id)}
                className="bg-custom-gray-900 ring-custom-gray-900 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 ring transition-all hover:text-rose-400 hover:ring-rose-400"
              >
                <img src={skill.icon} alt={skill.name} className="h-5 w-5 object-contain" />
                <span className="text-custom-gray-400 text-2xl">{skill.name}</span>
                <X size={14} className="opacity-50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-6 text-slate-300">
            <Layers size={24} className="text-slate-300" />
            <span className="text-sm">아래 버튼을 클릭하여 사용 기술을 추가해주세요</span>
          </div>
        )}
      </div>
      <Modal
        title="기술 스택 선택"
        trigger={
          <div className="bg-brand-primary-cta text-background absolute right-4 bottom-4 rounded-full p-2 shadow-lg transition-transform hover:scale-110">
            <Plus size={32} />
          </div>
        }
      >
        {(close) => (
          <div className="flex h-150 w-200 max-w-full flex-col">
            <div className="relative mb-6 flex items-center gap-2 px-1">
              <div className="relative flex-1">
                <Search className="absolute top-3.5 left-4 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="기술 스택 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 py-3 pr-4 pl-12 text-sm text-slate-700 placeholder-slate-400 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              <button
                onClick={() => refetch()}
                className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                title="목록 새로고침"
              >
                <RefreshCw size={20} className={`transition-all ${isRefetching ? 'rotate-180 text-blue-500' : ''}`} />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto px-1 py-4">
              {filteredStack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {filteredStack.map((skill) => {
                    const isSelected = form.stacks.includes(skill.id);
                    return (
                      <div
                        key={skill.id}
                        onClick={() => toggleStack(skill.id)}
                        className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                            : 'border-slate-100 bg-white text-slate-600 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        {isSelected && (
                          <div className="animate-in zoom-in absolute top-2 right-2 duration-200">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-900">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          </div>
                        )}

                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl p-2 ${isSelected ? 'bg-white/10' : 'bg-slate-50'}`}>
                          <img src={skill.icon} alt={skill.name} className="h-full w-full object-contain" loading="lazy" />
                        </div>

                        <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-600'}`}>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-60 w-full flex-col items-center justify-center gap-6 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Code2 size={40} strokeWidth={1.5} className="opacity-20" />
                    <p>검색 결과가 없습니다.</p>
                  </div>

                  <div className="h-px w-32 bg-slate-100"></div>

                  <Link
                    href="/admin/skill"
                    target="_blank"
                    onClick={() => confirm('새 탭에 기술 아이콘 관리 페이지로 이동합니다. ')}
                    className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Settings size={16} />
                    <span>
                      원하는 기술이 없나요? <b className="underline">기술 아이콘 관리</b>로 이동
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={close}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              <Check size={20} />
              <span>선택 완료 ({form.stacks.length}개)</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
