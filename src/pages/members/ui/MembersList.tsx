'use client';
import { useState, useMemo, useEffect } from 'react';
import { MemberWithGeneration } from 'entities/member';
import { LeaderItem, MemberItem } from './Items';
import { Dropdown } from 'shared/ui/dropdown';
import { useMotionValue } from 'framer-motion';

const PARTS = ['ALL', 'Dev', 'Basic', 'Design', 'PM'];

interface MembersListProps {
  initialMembers: MemberWithGeneration[];
  generationData: number[];
}

export const MembersList = ({ initialMembers, generationData }: MembersListProps) => {
  const [selectedPart, setSelectedPart] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState(generationData[0]);

  // 🔥 화면(Viewport) 기준 마우스 좌표
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      // 스크롤과 무관한 화면 절대 좌표 사용
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
      <section className="border-border flex h-[25vh] justify-between border-y">
        <div className="flex items-center gap-10">
          <span className="text-custom-gray-600 text-[32px]">PART</span>
          <div className="flex">
            {PARTS.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`border-border border-2 px-10 py-7 text-[32px] font-medium transition-all ${
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
          <span className="text-custom-gray-600 text-[2rem]">해당 조건에 맞는 멤버가 없습니다</span>
        </div>
      ) : (
        <section className="space-y-20 py-10">
          {leaders.length > 0 && (
            <div className="flex flex-col">
              <div className="flex items-center py-10">
                <span className="text-custom-gray-600 shrink-0 px-10 py-8 text-[32px]">Leader</span>
                <span className="text-brand-primary-cta border-brand-primary-cta border p-4 text-[2rem]/8 font-medium">{leaders.length}</span>
                <hr className="text-border ml-4 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {leaders.map((m) => (
                  <LeaderItem key={m.memberId} member={m} activeYear={selectedYear} mouseX={mouseX} mouseY={mouseY} />
                ))}
              </div>
            </div>
          )}

          {members.length > 0 && (
            <div className="flex flex-col">
              <div className="flex items-center py-10">
                <span className="text-custom-gray-600 shrink-0 px-10 py-8 text-[32px]">Member</span>
                <span className="text-brand-primary-cta border-brand-primary-cta border p-4 text-[2rem]/8 font-medium">{members.length}</span>
                <hr className="text-border ml-4 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {members.map((m) => (
                  <MemberItem key={m.memberId} member={m} activeYear={selectedYear} mouseX={mouseX} mouseY={mouseY} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};
