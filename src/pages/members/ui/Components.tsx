'use client';
import { MemberWithGeneration } from 'entities/member';
import { Dot, FileUser, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GitHub } from 'shared/icon/GitHub';
import { Blog } from 'shared/icon/Blog';
import { Hello } from 'shared/icon/Hello';
import { useMediaQuery } from 'shared/hooks/useMediaQuery';
import { PartDescriptData } from '../model/PartDescriptData';
import { toast } from 'sonner';

interface ItemProps {
  member: MemberWithGeneration;
  activeYear: number;
}
const useResponsiveFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useMediaQuery('(max-width: 639px)');

  const handleMouseEnter = () => {
    if (!isMobile) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsFlipped(false);
  };

  const handleClick = () => {
    if (isMobile) setIsFlipped(!isFlipped);
  };

  return { isFlipped, handleMouseEnter, handleMouseLeave, handleClick };
};

export const MemberCard = ({ member, activeYear }: ItemProps) => {
  const groupData = member.groups.find((g) => g.year === activeYear) || member.groups[0];
  const { isFlipped, handleMouseEnter, handleMouseLeave, handleClick } = useResponsiveFlip();

  const isLeader = groupData.role === '파트장' || groupData.role === '센터장';

  return (
    <div style={{ perspective: 1600 }} className="h-full w-full">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full w-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className={`group border-brand-primary-cta flex h-full flex-row gap-2 ${isLeader ? 'border-l bg-[#191E1C] hover:bg-[#232B28]' : 'border-none bg-[#0A0A0A] hover:bg-[#151515]'} p-3 transition-colors hover:shadow-[inset_0_-1px_0_0_var(--color-brand-primary-cta)] sm:flex-col sm:gap-7 sm:border-l-4 sm:p-10 hover:sm:shadow-[inset_0_-4px_0_0_var(--color-brand-primary-cta)] part-${groupData.part.toLowerCase() || 'default'}`}
        >
          <div className="flex flex-row justify-between">
            <div className="bg-custom-gray-500 relative h-12 w-12 overflow-hidden sm:h-28 sm:w-28">
              {member.profileImage ? (
                <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="bg-background border-border flex h-full w-full items-center justify-center border-2">
                  <span className="text-custom-gray-400 font-medium sm:text-[2rem]/8">{member.name.substring(1, 3)}</span>
                </div>
              )}
            </div>

            <div className="hidden items-end gap-4 sm:flex sm:flex-col">
              <span className="border-brand-primary-cta text-brand-primary-cta border-2 bg-[#08341F] p-3 text-[1.25rem]/5 font-medium">{groupData.role}</span>
              <span className="border-2 border-(--part-color) p-3 text-[1.25rem]/5 font-medium text-(--part-color)">{groupData.part}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2.5">
            <span className="text-[0.875rem]/2.5 font-semibold text-white sm:text-[2rem]/8">{member.name}</span>
            <div className="text-custom-gray-600 flex items-center text-[0.625rem]/2.5 sm:text-[1.25rem]/5">
              <span className="line-clamp-1">{member.department}</span>
              <Dot className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="text-brand-primary-cta whitespace-nowrap">{groupData.year}기</span>
            </div>
          </div>
          <div className="ml-auto sm:ml-0">
            <div className="flex items-end gap-0.5 sm:hidden">
              <span className="border-brand-primary-cta text-brand-primary-cta border bg-[#08341F] p-1 text-[0.625rem]/2.5 font-medium whitespace-nowrap">{groupData.role}</span>
              <span className="border border-(--part-color) p-1 text-[0.625rem]/2.5 font-medium whitespace-nowrap text-(--part-color)">{groupData.part}</span>
            </div>
            <div className="mt-3 flex flex-row-reverse gap-1 sm:flex-row sm:gap-3">
              {member.projects.map((project, index) => (
                <img key={index} src={project.mainImage} alt={project.title} className="bg-custom-gray-500 h-2.5 w-2.5 rounded-[1px] object-cover sm:h-7 sm:w-7 sm:rounded-sm" />
              ))}
            </div>
          </div>
        </div>
        <FlipedContent member={member} groupData={groupData} />
      </motion.div>
    </div>
  );
};

export const FlipedContent = ({ member, groupData }: { member: MemberWithGeneration; groupData: MemberWithGeneration['groups'][0] }) => {
  return (
    <div
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      className="border-brand-primary-cta absolute inset-0 flex flex-col items-start justify-between border-b border-l bg-[#232B28] px-2 py-2.5 sm:border-b-4 sm:border-l-4 sm:p-10"
    >
      <div className="flex w-full flex-row justify-between sm:flex-col sm:gap-3">
        <div className="flex flex-col gap-1 sm:gap-3">
          <span className="text-[0.625rem]/2.5 font-semibold text-white sm:text-[2rem]/8">{member.name}</span>
          <div className="text-custom-gray-600 flex items-center text-[0.625rem]/2.5 sm:text-[1.25rem]/5">
            <span className="line-clamp-1">{member.department}</span>
            <Dot className="h-2 w-2 sm:h-6 sm:w-6" />
            <span className="text-brand-primary-cta whitespace-nowrap">{groupData.year}기</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white sm:gap-4">
          {member.gitRepositoryLink && (
            <a href={member.gitRepositoryLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <GitHub className="h-2.5 w-2.5 sm:h-9 sm:w-9" />
            </a>
          )}
          {member.email && (
            <Mail
              className="h-2.5 w-2.5 sm:h-9 sm:w-9"
              onClick={() => {
                if (!member.email) return;
                navigator.clipboard.writeText(member.email);
                toast.success('이메일 주소가 복사되었습니다');
              }}
            />
          )}
          {member.blogLink && (
            <a href={member.blogLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Blog className="h-2.5 w-2.5 sm:h-9 sm:w-9" />
            </a>
          )}
          {member.behanceLink && (
            <a href={member.behanceLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <FileUser className="h-2.5 w-2.5 sm:h-9 sm:w-9" />
            </a>
          )}
        </div>
      </div>
      <span className="sm:text-custom-gray-500 text-[0.625rem]/2.5 whitespace-pre-line text-white sm:text-[1.5rem]/8">{member.description || `안녕하세요 \n ${member.name}입니다`}</span>
    </div>
  );
};

export const IntroduceBlock = ({ part }: { part: string }) => {
  if (part === 'ALL') {
    return null;
  }
  const partData = PartDescriptData[part];

  return (
    <div className="flex flex-col gap-2.5 pb-20 sm:gap-12 sm:px-36">
      <div className="relative flex flex-col items-end overflow-hidden">
        <div className="from-background-surface/60 to-background-surface/0 pointer-events-none absolute inset-0 z-50 bg-linear-to-t to-47%" />
        <div className="bg-surface-elevated flex w-full rounded-md px-3 py-2.5 sm:rounded-2xl sm:px-12 sm:py-10">
          <div className="z-10 sm:pt-10">
            <motion.div
              style={{
                display: 'inline-block',
                fontSize: '2rem',
                originX: 0.7,
                originY: 0.9
              }}
              whileInView={{ rotate: [0, 20, -10, 20, -10, 0] }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: 'easeInOut'
              }}
            >
              <Hello className="mb-5 h-2 w-2 sm:h-8 sm:w-8" />
            </motion.div>
            <p className="text-custom-gray-100 text-[14px]/4 font-bold sm:text-[56px]/17">
              안녕하세요! <br />
              <span className="text-brand-primary-cta">{partData.partName} 파트</span>입니다.
            </p>
            {partData.icon}
          </div>
        </div>
      </div>
      <div className="relative flex w-full items-start gap-2.5 sm:gap-12">
        <div className="bg-surface-elevated flex h-19 flex-1 flex-col justify-end rounded-md px-3 py-2.5 sm:h-79 sm:rounded-2xl sm:px-12 sm:py-10">
          <p className="text-custom-gray-100 text-[12px]/4 font-medium whitespace-pre-line sm:text-[44px]/15">{partData.description}</p>
        </div>

        <div className="bg-surface-elevated flex h-19 flex-col rounded-md p-2 sm:h-79 sm:rounded-2xl sm:px-8 sm:py-9.5">
          <p className="text-brand-secondary-light text-[8px]/1.5 sm:text-[20px]/6">이런 기술 스택을 주로 이용합니다.</p>
          <div className="flex flex-1 flex-col justify-end gap-0.5 sm:gap-4">
            {partData.techStack.map((tech, index) => (
              <div key={index} className="space-y-1">
                <div className="text-brand-secondary-light border-brand-secondary-light/40 sm:border-brand-secondary-light flex h-2 w-2 items-center justify-center rounded-full border text-[6px] sm:h-6 sm:w-6 sm:text-sm">
                  {index + 1}
                </div>
                <p className="text-custom-gray-100 text-[10px]/3 font-semibold sm:text-[42px]/14.5">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
