'use client';
import { useState } from 'react';
import { Check, Code2, Plus, RotateCw, Search, Settings, X } from 'lucide-react';
import Link from 'next/link';

import { useSkillStack } from 'entities/skill-stack';
import { ProjectFormType } from '../../types/form';
import { Modal } from 'shared/ui/modal';
import { useRoleContext } from 'entities/sign';

export const StackForm = ({ form, setForm }: { form: ProjectFormType; setForm: React.Dispatch<React.SetStateAction<ProjectFormType>> }) => {
  const { data: skillStack, refetch, isRefetching } = useSkillStack();
  const [searchTerm, setSearchTerm] = useState('');
  const { mode } = useRoleContext();

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

  const safeSkillStack = skillStack || [];
  const filteredStack = safeSkillStack.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedSkills = safeSkillStack.filter((skill) => form.stacks.includes(skill.id));

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex h-full w-full items-start p-4">
        {selectedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={(e) => removeStack(e, skill.id)}
                className="group flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition-all hover:border-red-200 hover:bg-red-50"
                title={`${skill.name} 삭제`}
              >
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <img src={skill.icon} alt={skill.name} className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0" />
                  <div className="absolute inset-0 flex items-center justify-center text-red-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <X size={14} strokeWidth={3} />
                  </div>
                </div>

                <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-red-600">{skill.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 pt-10 pb-12 text-slate-400">
            <div className="rounded-full bg-slate-100 p-4">
              <Code2 size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-600">선택된 기술 스택이 없습니다.</p>
              <p className="text-xs text-slate-400">
                우측 하단의 <b className="font-semibold text-blue-500">+ 버튼</b>을 눌러 추가해주세요.
              </p>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="기술 스택 선택"
        trigger={
          <button
            type="button"
            className="absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-600 active:scale-95"
            title="기술 스택 추가"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        }
      >
        {(close) => (
          <div className="flex h-150 w-125 max-w-[95vw] flex-col">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="기술 이름으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  refetch();
                }}
                type="button"
                className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 hover:text-blue-500 active:scale-95"
                title="목록 새로고침"
              >
                <RotateCw size={18} className={`transition-all ${isRefetching ? 'animate-spin text-blue-500' : ''}`} />
              </button>
            </div>

            <div className="-mx-2 flex-1 overflow-y-auto px-2 py-2">
              {filteredStack.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {filteredStack.map((skill) => {
                    const isSelected = form.stacks.includes(skill.id);
                    return (
                      <div
                        key={skill.id}
                        onClick={() => toggleStack(skill.id)}
                        className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all duration-200 ${
                          isSelected ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 bg-white text-slate-600 hover:-translate-y-1 hover:border-slate-200 hover:shadow-md'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          </div>
                        )}

                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg p-2 ${isSelected ? 'bg-white' : 'bg-slate-50 group-hover:bg-slate-100'}`}>
                          <img src={skill.icon} alt={skill.name} className="h-full w-full object-contain" loading="lazy" />
                        </div>

                        <span className={`text-xs font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-800'}`}>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-slate-50 p-4">
                      <Search size={32} className="text-slate-300" />
                    </div>
                    <p className="font-medium text-slate-500">{searchTerm}에 대한 검색 결과가 없습니다.</p>
                  </div>

                  <div className="h-px w-16 bg-slate-200"></div>

                  <Link
                    href={`/${mode}/skill`}
                    target="_blank"
                    onClick={(e) => {
                      if (!confirm('새 탭에서 기술 아이콘 관리 페이지로 이동하시겠습니까?')) {
                        e.preventDefault();
                      }
                    }}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <Settings size={16} className="text-slate-400" />
                    <span>새 기술 스택 등록하러 가기</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98]"
              >
                <Check size={18} />
                <span>선택 완료 ({form.stacks.length}개)</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
