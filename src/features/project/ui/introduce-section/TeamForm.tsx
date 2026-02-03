import { useMemo, useState } from 'react';
import { AlertCircle, Check, Plus, Search, Users, X } from 'lucide-react';

import { Generation, useGeneration, usePart } from 'entities/generation';

import { Modal } from 'shared/ui/modal';
import { PART_COLORS } from 'shared/constants/part';
import { ProjectFormType } from '../../types/form';

export const TeamForm = ({ form, setForm }: { form: ProjectFormType; setForm: React.Dispatch<React.SetStateAction<ProjectFormType>> }) => {
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
    return allMembers.filter((gen) => {
      const matchName = gen.member.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPart = selectedPartName === 'All' || gen.part === selectedPartName;
      return matchName && matchPart;
    });
  }, [allMembers, searchTerm, selectedPartName]);

  const selectedMemberObjects = useMemo(() => {
    return allMembers.filter((gen) => form.groups.includes(gen.group_id));
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
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        {selectedMemberObjects.length > 0 ? (
          <div className="custom-scrollbar flex h-full w-full flex-row items-start justify-center gap-8 overflow-x-auto p-4">
            {Object.entries(groupedSelectedMembers).map(([partName, members]) => (
              <div key={partName} className="flex min-w-50 flex-col gap-3">
                <div className="flex items-center gap-2 pb-2">
                  <span className="text-brand-primary-cta text-[28px] font-semibold">{partName}</span>
                </div>

                <div className="flex flex-col gap-8">
                  {members.map((member) => (
                    <SelectedMemberItem key={member.group_id} member={member} onRemove={() => removeMember(member.group_id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-6 text-slate-300">
            <Users size={24} className="text-slate-300" />
            <span className="text-sm">아래 버튼을 클릭하여 팀원을 추가해주세요</span>
          </div>
        )}
      </div>

      <Modal
        title="팀원 선택"
        trigger={
          <div className="bg-brand-primary-cta text-background absolute right-4 bottom-4 cursor-pointer rounded-full p-2 shadow-lg transition-transform hover:scale-110">
            <Plus size={32} />
          </div>
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
                    className={`rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                      selectedPartName === part ? `${PART_COLORS[part].bg} ${PART_COLORS[part].text} hover:${PART_COLORS[part].bg}` : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-xs font-medium text-amber-600">
              <AlertCircle size={16} className="shrink-0" />
              <span>
                반드시 <b>활동 기수</b>를 확인한 후 팀원을 선택해주세요.
              </span>
            </div>

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

const SelectedMemberItem = ({ member, onRemove }: { member: ReturnType<typeof useGeneration>['data'][number]; onRemove: () => void }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="group flex cursor-pointer items-center gap-3 rounded-full py-2 pr-4 pl-2 transition-all hover:text-rose-400 hover:ring hover:ring-rose-400"
    >
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10">
        {member.profileImage ? (
          <img src={member.profileImage} alt={member.member} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-lg text-slate-400">{member.member.charAt(0)}</div>
        )}
      </div>

      <div className="flex flex-col items-start leading-none">
        <span className="text-custom-gray-400 text-xl transition-colors group-hover:text-rose-400">{member.member}</span>
      </div>
      <X size={14} className="ml-auto opacity-50 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

const MemberSelectionCard = ({ member, isSelected, onToggle }: { member: ReturnType<typeof useGeneration>['data'][number]; isSelected: boolean; onToggle: () => void }) => {
  return (
    <div
      onClick={onToggle}
      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition-all duration-200 ${
        isSelected ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'border-slate-100 bg-white text-slate-600 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {isSelected && (
        <div className="animate-in zoom-in absolute top-2 right-2 duration-200">
          <Check size={12} strokeWidth={3} />
        </div>
      )}

      <div className={`h-14 w-14 overflow-hidden rounded-full border-2 ${isSelected ? 'border-white/20' : 'border-slate-100'}`}>
        {member.profileImage ? (
          <img src={member.profileImage} alt={member.member} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl text-slate-400">{member.member.charAt(0)}</div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 text-center">
        <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>{member.member}</div>
        <div className={`rounded-lg px-2 py-0.5 text-xs ${isSelected ? 'text-slate-300' : `${PART_COLORS[member.part].bg} ${PART_COLORS[member.part].text}`}`}>{member.part}</div>
        <div className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{member.year}기</div>
      </div>
    </div>
  );
};
