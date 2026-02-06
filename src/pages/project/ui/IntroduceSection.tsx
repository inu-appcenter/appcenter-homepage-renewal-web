'use client';
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Part } from 'shared/types/part';
import { Project } from 'entities/project';
import { GitHub } from 'shared/icon/GitHub';

export const IntroduceSection = ({ data }: { data: Project }) => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="flex flex-col items-center justify-center gap-4 sm:h-screen sm:gap-10">
      <div className="relative flex flex-row gap-8 sm:gap-30">
        {['사용 스택', '팀원 정보', '이용 현황'].map((tab, index) => (
          <SelectButton key={index} text={tab} isSelected={selected === index} onClick={() => setSelected(index)} />
        ))}
      </div>

      <div className="bg-custom-black flex h-80 w-full items-center justify-center overflow-hidden rounded-2xl px-4 py-2 whitespace-pre-line sm:h-110 sm:px-20 sm:py-11.5">
        <AnimatePresence mode="wait">
          <motion.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full w-full">
            {selected === 0 && <Stacks data={data} />}
            {selected === 1 && <Groups data={data.groups} />}
            {selected === 2 && <div className="text-custom-gray-100 flex h-full items-center justify-center text-sm sm:text-3xl">아직 이용현황이 없습니다</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const SelectButton = ({ text, onClick, isSelected }: { text: string; onClick: () => void; isSelected: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`group bg-surface-elevated relative flex cursor-pointer items-center gap-1 rounded-[40px] px-2 py-1 text-2xl transition-colors duration-300 sm:gap-2 sm:px-5 sm:py-2 ${
        isSelected ? 'text-brand-primary-cta' : 'text-custom-gray-100 border-custom-gray-100 border-[0.4px] sm:border'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="active-pill"
          className="border-brand-primary-cta absolute inset-0 rounded-[40px] border-[0.4px] shadow-[0px_0px_16px_0px_#57FF8566] sm:border"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      <motion.div animate={{ rotate: isSelected ? 45 : 0 }} transition={{ duration: 0.3 }}>
        <Plus className={`h-2 w-2 sm:h-7 sm:w-7 ${isSelected ? 'text-brand-primary-cta' : 'text-custom-gray-100'}`} strokeWidth={1} />
      </motion.div>

      <span className="relative z-10 text-[9px] whitespace-nowrap sm:text-2xl">{text}</span>
    </button>
  );
};
const Stacks = ({ data }: { data: Project }) => {
  const hasNoContent = (!data.stacks || data.stacks.length === 0) && !data.githubLink;

  if (hasNoContent) {
    return <div className="text-custom-gray-100 flex h-full items-center justify-center text-sm sm:text-3xl">사용 스택 정보가 없습니다</div>;
  }

  return (
    <div className="flex h-full flex-col justify-center gap-4 sm:gap-20">
      {data.githubLink && (
        <div className="flex items-center gap-4">
          <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="group flex w-fit items-center gap-5">
            <GitHub className="h-4 w-4 text-white sm:h-8 sm:w-8" />
            <div className="flex flex-col">
              <span className="text-custom-gray-400 group-hover:text-brand-primary-cta text-xs transition-colors sm:text-2xl">프로젝트 깃허브 바로가기</span>
              <div className="bg-brand-primary-cta h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </div>
          </a>
        </div>
      )}
      <div className="flex flex-wrap gap-2 sm:gap-8">
        {data.stacks &&
          data.stacks.map((stack) => (
            <div key={stack.name} className="bg-custom-gray-900 flex shrink-0 items-center gap-2 rounded-full px-1.5 py-1 sm:px-3 sm:py-2">
              <img src={stack.icon} alt={`${stack.name} icon`} className="h-2 w-2 object-contain sm:h-4 sm:w-4" />
              <span className="text-custom-gray-400 text-[8px] font-medium sm:text-lg">{stack.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

interface Groups {
  member: string;
  group_id: number;
  profileImage: string;
  part: Part;
}
const Groups = ({ data }: { data: Groups[] }) => {
  const groupedByPart = useMemo(() => {
    const groups: Record<string, Groups[]> = {};
    data?.forEach((member) => {
      if (!groups[member.part]) groups[member.part] = [];
      groups[member.part].push(member);
    });

    return groups;
  }, [data]);

  if (!data) return <div className="text-custom-gray-100 flex h-full items-center justify-center text-sm sm:text-3xl">팀원 정보가 없습니다</div>;

  return (
    <div className="flex h-full w-full flex-wrap justify-between px-4 sm:px-8 xl:px-24">
      {data &&
        Object.entries(groupedByPart).map(([part, members]) => (
          <div key={part} className="flex shrink-0 flex-col items-start gap-3 rounded-full px-3 py-2 sm:gap-6">
            <span className="text-brand-primary-cta text-[10px] font-semibold uppercase sm:text-lg">{part}</span>
            <div className="flex flex-col items-center gap-2 sm:gap-10">
              {members.map((member) => (
                <div key={member.member} className="flex flex-row items-center gap-2 sm:gap-4">
                  {member.profileImage ? (
                    <img src={member.profileImage} alt={`${member.member} profile`} className="h-5 w-5 rounded-full object-cover sm:h-15 sm:w-15" />
                  ) : (
                    <div className="bg-custom-gray-500 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold sm:h-15 sm:w-15 sm:text-2xl">{member.member.charAt(0)}</div>
                  )}
                  <span className="text-[10px] text-white sm:text-xl">{member.member}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
