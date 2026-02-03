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
    <section className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="relative flex flex-row gap-30">
        {['사용 스택', '팀원 정보', '이용 현황'].map((tab, index) => (
          <SelectButton key={index} text={tab} isSelected={selected === index} onClick={() => setSelected(index)} />
        ))}
      </div>

      <div className="bg-custom-black flex h-110 w-full items-center justify-center overflow-hidden rounded-2xl px-20 py-11.5 whitespace-pre-line">
        <AnimatePresence mode="wait">
          <motion.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full w-full">
            {selected === 0 && <Stacks data={data} />}
            {selected === 1 && <Groups data={data.groups} />}
            {selected === 2 && <div className="text-custom-gray-100 flex h-full items-center justify-center text-3xl">아직 이용현황이 없습니다</div>}
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
      className={`group bg-background relative flex cursor-pointer items-center gap-2 rounded-[40px] px-5 py-2 text-2xl transition-colors duration-300 ${
        isSelected ? 'text-brand-primary-cta' : 'text-custom-gray-100 border-custom-gray-100 border'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="active-pill"
          className="border-brand-primary-cta absolute inset-0 rounded-[40px] border shadow-[0px_0px_16px_0px_#57FF8566]"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      <motion.div animate={{ rotate: isSelected ? 45 : 0 }} transition={{ duration: 0.3 }}>
        <Plus className={` ${isSelected ? 'text-brand-primary-cta' : 'text-custom-gray-100'}`} strokeWidth={1} size={28} />
      </motion.div>

      <span className="relative z-10">{text}</span>
    </button>
  );
};
const Stacks = ({ data }: { data: Project }) => {
  const hasNoContent = (!data.stacks || data.stacks.length === 0) && !data.githubLink;

  if (hasNoContent) {
    return <div className="text-custom-gray-100 flex h-full items-center justify-center text-3xl">사용 스택 정보가 없습니다</div>;
  }

  return (
    <div className="flex h-full flex-col justify-center gap-20">
      {data.githubLink && (
        <div className="flex items-center gap-4">
          <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="group flex w-fit items-center gap-5">
            <GitHub className="h-8 w-8 text-white" />
            <div className="flex flex-col">
              <span className="text-custom-gray-400 group-hover:text-brand-primary-cta text-2xl transition-colors">프로젝트 깃허브 바로가기</span>
              <div className="bg-brand-primary-cta h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </div>
          </a>
        </div>
      )}
      <div className="flex flex-wrap gap-8">
        {data.stacks &&
          data.stacks.map((stack) => (
            <div key={stack.name} className="bg-custom-gray-900 flex shrink-0 items-center gap-2 rounded-full px-3 py-2">
              <img src={stack.icon} alt={`${stack.name} icon`} className="h-4 w-4 object-contain" />
              <span className="text-custom-gray-400 text-lg font-medium">{stack.name}</span>
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

  if (!data) return <div className="text-custom-gray-100 flex h-full items-center justify-center text-3xl">팀원 정보가 없습니다</div>;

  return (
    <div className="flex h-full w-full justify-between px-8 xl:px-24">
      {data &&
        Object.entries(groupedByPart).map(([part, members]) => (
          <div key={part} className="flex shrink-0 flex-col items-start gap-6 rounded-full px-3 py-2">
            <span className="text-brand-primary-cta text-lg font-semibold uppercase">{part}</span>
            <div className="flex flex-col items-center gap-10">
              {members.map((member) => (
                <div key={member.member} className="flex flex-row items-center gap-4">
                  {member.profileImage ? (
                    <img src={member.profileImage} alt={`${member.member} profile`} className="h-15 w-15 rounded-full object-cover" />
                  ) : (
                    <div className="bg-custom-gray-500 flex h-15 w-15 items-center justify-center rounded-full text-2xl font-bold">{member.member.charAt(0)}</div>
                  )}
                  <span className="text-xl text-white">{member.member}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
