'use client';
import { useMemo, useState } from 'react';
import { Check, Plus, Search, Users, X } from 'lucide-react';

import { Generation, useGeneration, usePart } from 'entities/generation';

import { Modal } from 'shared/ui/modal';
import { ProjectFormType } from '../types/form';
import { Alert } from 'shared/ui/alert';

export const MemberForm = ({ form, setForm }: { form: ProjectFormType; setForm: React.Dispatch<React.SetStateAction<ProjectFormType>> }) => {
  const { data: allMembers } = useGeneration();
  const { data: partData } = usePart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartName, setSelectedPartName] = useState<string>('All');

  const toggleMember = (groupId: number) => {
    setForm((prev) => {
      const isSelected = prev.groups.includes(groupId);
      return {
        ...prev,
        groups: isSelected ? prev.groups.filter((id) => id !== groupId) : [...prev.groups, groupId]
      };
    });
  };

  const removeMember = (groupId: number) => {
    setForm((prev) => ({
      ...prev,
      groups: prev.groups.filter((id) => id !== groupId)
    }));
  };

  const filteredMembers = useMemo(() => {
    const safeMembers = allMembers || [];
    return safeMembers.filter((gen) => {
      const matchName = gen.member.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPart = selectedPartName === 'All' || gen.part === selectedPartName;
      return matchName && matchPart;
    });
  }, [allMembers, searchTerm, selectedPartName]);

  const selectedMemberObjects = useMemo(() => {
    const safeMembers = allMembers || [];
    return safeMembers.filter((gen) => form.groups.includes(gen.group_id));
  }, [allMembers, form.groups]);

  const groupedSelectedMembers = useMemo(() => {
    const groups: Record<string, Generation[]> = {};
    selectedMemberObjects.forEach((member) => {
      if (!groups[member.part]) groups[member.part] = [];
      groups[member.part].push(member);
    });
    return groups;
  }, [selectedMemberObjects]);

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex h-full w-full items-start p-4">
        {selectedMemberObjects.length > 0 ? (
          <div className="custom-scrollbar flex w-full flex-col gap-4 overflow-y-auto">
            {Object.entries(groupedSelectedMembers).map(([partName, members]) => (
              <div key={partName} className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <span className="text-sm font-bold text-slate-800">{partName}</span>
                <div className="flex flex-wrap gap-2">
                  {members.map((member) => (
                    <SelectedMemberItem key={member.group_id} member={member} onRemove={() => removeMember(member.group_id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 pt-10 pb-12 text-slate-400">
            <div className="rounded-full bg-slate-100 p-4">
              <Users size={32} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-600">선택된 참여 팀원이 없습니다.</p>
              <p className="text-xs text-slate-400">
                우측 하단의 <b className="font-semibold text-blue-500">+ 버튼</b>을 눌러 추가해주세요.
              </p>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="팀원 선택"
        trigger={
          <button
            type="button"
            className="absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-600 active:scale-95"
            title="팀원 선택"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        }
      >
        {(close) => (
          <div className="flex h-150 w-200 max-w-full flex-col">
            <div className="mb-4 flex flex-col gap-3 px-1">
              <div className="relative">
                <Search className="absolute top-3.5 left-4 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="이름 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 py-3 pr-4 pl-12 text-sm text-slate-700 placeholder-slate-400 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPartName('All')}
                  className={`rounded-xl px-3 py-1 text-xs font-medium transition-colors ${selectedPartName === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  All
                </button>
                {partData?.parts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedPartName(part)}
                    className={`rounded-xl px-4 py-2 text-xs font-medium transition-colors ${selectedPartName === part ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>
            <Alert type="warning">
              <span>
                반드시 <b>활동 기수</b>를 확인한 후 팀원을 선택해주세요.
              </span>
            </Alert>

            <div className="flex-1 overflow-y-auto px-1 py-4">
              {filteredMembers.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {filteredMembers.map((member) => (
                    <MemberSelectionCard key={member.group_id} member={member} isSelected={form.groups.includes(member.group_id)} onToggle={() => toggleMember(member.group_id)} />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 w-full flex-col items-center justify-center gap-2 text-slate-400">검색 결과가 없습니다.</div>
              )}
            </div>

            <button
              onClick={close}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              <Check size={20} />
              <span>선택 완료 ({form.groups.length}명)</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
const SelectedMemberItem = ({ member, onRemove }: { member: Generation; onRemove: () => void }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="group flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pr-3 pl-1 transition-all hover:border-red-200 hover:bg-red-50"
      title={`${member.member} 제외`}
    >
      <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white">
        {member.profileImage ? (
          <img src={member.profileImage} alt={member.member} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] font-bold text-slate-400">{member.member.charAt(0)}</div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-red-600">{member.member}</span>

        <div className="relative flex items-center justify-center">
          <span className="text-[10px] text-slate-400 transition-opacity duration-200 group-hover:opacity-0">{member.year}기</span>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-4 w-4 items-center justify-center text-red-500">
              <X size={10} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MemberSelectionCard = ({ member, isSelected, onToggle }: { member: Generation; isSelected: boolean; onToggle: () => void }) => {
  return (
    <div
      onClick={onToggle}
      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
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

      <div className={`h-14 w-14 overflow-hidden rounded-full border-2 ${isSelected ? 'border-blue-200' : 'border-slate-100'}`}>
        {member.profileImage ? (
          <img src={member.profileImage} alt={member.member} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-lg font-bold text-slate-400">{member.member.charAt(0)}</div>
        )}
      </div>

      <div className="flex flex-col items-center gap-0.5 text-center">
        <div className={`text-sm font-bold ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>{member.member}</div>
        <div className={`text-xs ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>{member.part}</div>
        <div className={`text-[10px] ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>{member.year}기</div>
      </div>
    </div>
  );
};
