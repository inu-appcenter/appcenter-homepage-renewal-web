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
                className={`group border-border relative overflow-hidden border px-2 py-1 text-[0.625rem]/2.5 font-medium transition-all sm:border-2 sm:px-10 sm:py-7 sm:text-[2rem]/6 ${selectedPart === part ? 'border-brand-primary-cta' : 'hover:border-white'}`}
              >
                {selectedPart === part && <motion.div layoutId="activePartBg" className="absolute inset-0 bg-[#08341F]" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                <span className={cn('relative z-10 transition-colors duration-300', selectedPart === part ? 'text-brand-primary-cta' : 'text-custom-gray-500 group-hover:text-white')}>{part}</span>
              </button>
            ))}
          </div>
        </div>
        <Dropdown label="기수" options={generationData} value={selectedYear} onChange={setSelectedYear} renderValue={(v) => `${v}기`} />
      </section>

      <AnimatePresence mode="wait">
        {matchedData.length === 0 ? (
          <motion.div key="no-data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[30vh] items-center justify-center">
            <span className="text-custom-gray-600 text-[1rem] sm:text-[2rem]">해당 조건에 맞는 멤버가 없습니다</span>
          </motion.div>
        ) : (
          <motion.section
            key={`${selectedPart}-${selectedYear}`}
            className="space-y-5 pb-10 sm:space-y-20 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }}
          >
            {leaders.length > 0 && (
              <div className="flex flex-col">
                <div className="flex items-center py-5 sm:py-10">
                  <span className="text-custom-gray-600 shrink-0 px-1.5 py-0.75 text-[0.75rem]/3 sm:px-10 sm:py-8 sm:text-[2rem]/8">Leader</span>
                  <motion.span layout className="text-brand-primary-cta border-brand-primary-cta border p-0.75 text-[0.625rem]/2.5 font-medium sm:p-4 sm:text-[2rem]/8">
                    {leaders.length}
                  </motion.span>
                  <hr className="text-border ml-4 w-full" />
                </div>
                <motion.div layout className="grid grid-cols-1 gap-2.5 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {leaders.map((m) => (
                      <motion.div key={m.memberId} variants={itemVariants} layout initial="hidden" animate="visible" exit="exit">
                        <MemberCard member={m} activeYear={selectedYear} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {/* Member 섹션 */}
            {members.length > 0 && (
              <div className="flex flex-col">
                <div className="flex items-center py-5 sm:py-10">
                  <span className="text-custom-gray-600 shrink-0 px-1.5 py-0.75 text-[0.75rem]/3 sm:px-10 sm:py-8 sm:text-[2rem]/8">Member</span>
                  <motion.span layout className="text-brand-primary-cta border-brand-primary-cta border p-0.75 text-[0.625rem]/2.5 font-medium sm:p-4 sm:text-[2rem]/8">
                    {members.length}
                  </motion.span>
                  <hr className="text-border ml-4 w-full" />
                </div>
                <motion.div layout className="grid grid-cols-1 gap-2.5 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {members.map((m) => (
                      <motion.div key={m.memberId} variants={itemVariants} layout initial="hidden" animate="visible" exit="exit">
                        <MemberCard member={m} activeYear={selectedYear} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <IntroduceBlock part={selectedPart} />
    </>
  );
};
