'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemberWithGeneration } from 'entities/member';
import { IntroduceBlock, MemberCard } from './Components';
import { Dropdown } from 'shared/ui/dropdown';
import { cn } from 'shared/utils/cn';

const PARTS = ['ALL', 'Dev', 'Basic', 'Design', 'PM'];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const isLeader = (role?: string) => role === '파트장' || role === '센터장';

interface MembersListProps {
  initialMembers: MemberWithGeneration[];
  generationData: number[];
}
export const MembersList = ({ initialMembers, generationData }: MembersListProps) => {
  const [selectedPart, setSelectedPart] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState(generationData[0]);

  const { leaders, members, isEmpty } = useMemo(() => {
    const matched = initialMembers
      .map((member) => ({ ...member, activeGroup: member.groups.find((g) => g.year === selectedYear) }))
      .filter((m) => m.activeGroup && (selectedPart === 'ALL' || m.activeGroup.part === selectedPart));

    return {
      leaders: matched.filter((m) => isLeader(m.activeGroup?.role)),
      members: matched.filter((m) => !isLeader(m.activeGroup?.role)),
      isEmpty: matched.length === 0
    };
  }, [initialMembers, selectedPart, selectedYear]);

  return (
    <>
      <section className="border-border flex justify-between border-y py-3 sm:h-[15vh] sm:py-0">
        <div className="flex items-center gap-2 sm:gap-10">
          <span className="text-custom-gray-600 text-[0.75rem]/3 sm:text-[1.5rem]/4">PART</span>
          <div className="flex gap-0.5 sm:gap-0">
            {PARTS.map((part) => {
              const isActive = selectedPart === part;
              return (
                <button
                  key={part}
                  onClick={() => setSelectedPart(part)}
                  className={cn(
                    'group border-border relative overflow-hidden border px-2 py-1 text-[0.625rem]/2.5 font-medium transition-all sm:border-2 sm:px-8 sm:py-4 sm:text-[1.5rem]/6',
                    isActive ? 'border-brand-primary-cta' : 'hover:border-white'
                  )}
                >
                  {isActive && <motion.div layoutId="activePartBg" className="absolute inset-0 bg-[#08341F]" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                  <span className={cn('relative z-10 transition-colors duration-300', isActive ? 'text-brand-primary-cta' : 'text-custom-gray-500 group-hover:text-white')}>{part}</span>
                </button>
              );
            })}
          </div>
        </div>
        <Dropdown label="기수" options={generationData} value={selectedYear} onChange={setSelectedYear} renderValue={(v) => `${v}기`} />
      </section>

      <AnimatePresence mode="wait">
        {isEmpty ? (
          <motion.div key="no-data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[30vh] items-center justify-center">
            <span className="text-custom-gray-600 text-[1rem] sm:text-[2rem]">해당 조건에 맞는 멤버가 없습니다</span>
          </motion.div>
        ) : (
          <motion.section
            key={`${selectedPart}-${selectedYear}`}
            className="space-y-5 pb-10 sm:space-y-20 sm:px-36 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: 0.05 } }}
          >
            <MemberSection title="Leader" members={leaders} activeYear={selectedYear} />
            <MemberSection title="Member" members={members} activeYear={selectedYear} />
          </motion.section>
        )}
      </AnimatePresence>

      <IntroduceBlock part={selectedPart} />
    </>
  );
};

function MemberSection({ title, members, activeYear }: { title: string; members: ReturnType<typeof useMemo<MemberWithGeneration[]>>; activeYear: number }) {
  if (members.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center py-5 sm:py-10">
        <span className="text-custom-gray-600 shrink-0 px-1.5 py-0.75 text-[0.75rem]/3 sm:px-8 sm:py-5 sm:text-[1.625rem]/6.5">{title}</span>
        <motion.span layout className="text-brand-primary-cta border-brand-primary-cta border p-0.75 text-[0.625rem]/2.5 font-medium sm:p-3 sm:text-[1.625rem]/6.5">
          {members.length}
        </motion.span>
        <hr className="text-border ml-4 w-full" />
      </div>
      <motion.div layout className="grid grid-cols-1 gap-2.5 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {members.map((m) => (
            <motion.div key={m.memberId} variants={itemVariants} layout initial="hidden" animate="visible" exit="exit">
              <MemberCard member={m} activeYear={activeYear} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
