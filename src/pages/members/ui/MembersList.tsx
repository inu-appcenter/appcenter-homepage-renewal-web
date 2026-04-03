'use client';
import { useState, useMemo } from 'react';
import { MemberWithGeneration } from 'entities/member';
import { MemberCard } from './Items';
import { Dropdown } from 'shared/ui/dropdown';

const PARTS = ['ALL', 'Dev', 'Basic', 'Design', 'PM'];

interface MembersListProps {
  initialMembers: MemberWithGeneration[];
  generationData: number[];
}
export const MembersList = ({ initialMembers, generationData }: MembersListProps) => {
  const [selectedPart, setSelectedPart] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState(generationData[0]);

  const matchedData = useMemo(() => {
    return initialMembers
      .map((member) => {
        const activeGroup = member.groups.find((g) => g.year === selectedYear);
        return { ...member, activeGroup };
      })
      .filter((m) => {
        if (!m.activeGroup) return false;
        return selectedPart === 'ALL' || m.activeGroup.part === selectedPart;
      });
  }, [initialMembers, selectedPart, selectedYear]);

  const leaders = matchedData.filter((m) => m.activeGroup?.role === '파트장' || m.activeGroup?.role === '센터장');
  const members = matchedData.filter((m) => !(m.activeGroup?.role === '파트장' || m.activeGroup?.role === '센터장'));

  return (
    <>
      <section className="border-border flex justify-between border-y py-3 sm:h-[25vh] sm:py-0">
        <div className="flex items-center gap-2 sm:gap-10">
          <span className="text-custom-gray-600 text-[0.75rem]/3 sm:text-[2rem]/6">PART</span>
          <div className="flex gap-0.5 sm:gap-0">
            {PARTS.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`border-border border px-2 py-1 text-[0.625rem]/2.5 font-medium transition-all sm:border-2 sm:px-10 sm:py-7 sm:text-[2rem]/6 ${
                  selectedPart === part ? 'text-brand-primary-cta border-brand-primary-cta bg-[#08341F]' : 'text-custom-gray-500 hover:text-white'
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>
        <Dropdown label="기수" options={generationData} value={selectedYear} onChange={setSelectedYear} renderValue={(v) => `${v}기`} />
      </section>

      {matchedData.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center">
          <span className="text-custom-gray-600 text-[1rem] sm:text-[2rem]">해당 조건에 맞는 멤버가 없습니다</span>
        </div>
      ) : (
        <section className="space-y-5 pb-20 sm:space-y-20 sm:py-10">
          {leaders.length > 0 && (
            <div className="flex flex-col">
              <div className="flex items-center py-5 sm:py-10">
                <span className="text-custom-gray-600 shrink-0 px-1.5 py-0.75 text-[0.75rem]/3 sm:px-10 sm:py-8 sm:text-[2rem]/8">Leader</span>
                <span className="text-brand-primary-cta border-brand-primary-cta border p-0.75 text-[0.625rem]/2.5 font-medium sm:p-4 sm:text-[2rem]/8">{leaders.length}</span>
                <hr className="text-border ml-4 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                {leaders.map((m) => (
                  <MemberCard key={m.memberId} member={m} activeYear={selectedYear} />
                ))}
              </div>
            </div>
          )}

          {members.length > 0 && (
            <div className="flex flex-col">
              <div className="flex items-center py-5 sm:py-10">
                <span className="text-custom-gray-600 shrink-0 px-1.5 py-0.75 text-[0.75rem]/3 sm:px-10 sm:py-8 sm:text-[2rem]/8">Member</span>
                <span className="text-brand-primary-cta border-brand-primary-cta border p-0.75 text-[0.625rem]/2.5 font-medium sm:p-4 sm:text-[2rem]/8">{members.length}</span>
                <hr className="text-border ml-4 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                {members.map((m) => (
                  <MemberCard key={m.memberId} member={m} activeYear={selectedYear} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};
