'use client';
import { MemberWithGeneration } from 'entities/member';
import { Dot, FileUser, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GitHub } from 'shared/icon/GitHub';
import { Blog } from 'shared/icon/Blog';

interface ItemProps {
  member: MemberWithGeneration;
  activeYear: number;
}

// 🔥 반응형 플립(뒤집힘) 효과를 관리하는 커스텀 훅
const useResponsiveFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Tailwind의 'sm' 브레이크포인트 기준(640px)으로 모바일 여부 판단
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile(); // 초기 설정

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setIsFlipped(true); // PC에서는 마우스를 올리면 뒤집힘
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsFlipped(false); // PC에서는 마우스를 떼면 원상복구
  };

  const handleClick = () => {
    if (isMobile) setIsFlipped(!isFlipped); // 모바일에서는 클릭할 때마다 토글
  };

  return { isFlipped, handleMouseEnter, handleMouseLeave, handleClick };
};

export const LeaderItem = ({ member, activeYear }: ItemProps) => {
  const groupData = member.groups.find((g) => g.year === activeYear) || member.groups[0];
  const { isFlipped, handleMouseEnter, handleMouseLeave, handleClick } = useResponsiveFlip();

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
          className={`group border-brand-primary-cta h-full space-y-9 border-l-4 bg-[#191E1C] p-10 transition-colors hover:bg-[#232B28] hover:shadow-[inset_0_-4px_0_0_var(--color-brand-primary-cta)] part-${groupData.part.toLowerCase() || 'default'}`}
        >
          <div className="flex flex-row justify-between">
            <div className="bg-custom-gray-500 relative h-35 w-35 overflow-hidden rounded-sm">
              {member.profileImage ? (
                <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="bg-background border-border flex h-full w-full items-center justify-center border-2">
                  <span className="text-custom-gray-400 text-[32px] font-medium">{member.name.substring(1, 3)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-4">
              <span className="border-brand-primary-cta text-brand-primary-cta border-2 bg-[#08341F] p-4 text-[1.5rem]/6 font-medium">{groupData.role}</span>
              <span className="border-2 border-(--part-color) p-4 text-[1.5rem]/6 font-medium text-(--part-color)">{groupData?.part}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[40px]/10 font-semibold text-white">{member.name}</span>
            <div className="text-custom-gray-600 flex items-center text-[1.5rem]/6">
              <span className="line-clamp-1">{member.department}</span>
              <Dot />
              <span className="text-brand-primary-cta whitespace-nowrap">{groupData?.year}기</span>
            </div>
          </div>

          <div className="mt-3 flex flex-row gap-3">
            {member.projects.slice(0, 3).map((project, index) => (
              <img key={index} src={project.mainImage} alt={project.title} className="bg-custom-gray-500 h-9 w-9 rounded-sm object-cover" />
            ))}
          </div>
        </div>
        <FlipedContent member={member} />
      </motion.div>
    </div>
  );
};

export const MemberItem = ({ member, activeYear }: ItemProps) => {
  const groupData = member.groups.find((g) => g.year === activeYear) || member.groups[0];
  const { isFlipped, handleMouseEnter, handleMouseLeave, handleClick } = useResponsiveFlip();

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
          className={`group border-brand-primary-cta h-full space-y-9 bg-[#0A0A0A] p-10 transition-colors hover:bg-[#151515] hover:shadow-[inset_0_-4px_0_0_var(--color-brand-primary-cta)] part-${groupData.part.toLowerCase() || 'default'}`}
        >
          <div className="flex flex-row justify-between">
            <div className="bg-custom-gray-500 relative h-35 w-35 overflow-hidden rounded-sm">
              {member.profileImage ? (
                <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="bg-background border-border flex h-full w-full items-center justify-center border-2">
                  <span className="text-custom-gray-400 text-[32px] font-medium">{member.name.substring(1, 3)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-4">
              <span className="border-2 border-(--part-color) p-4 text-[1.5rem]/6 font-medium text-(--part-color)">{groupData?.part}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[40px]/10 font-semibold text-white">{member.name}</span>
            <div className="text-custom-gray-600 flex items-center text-[1.5rem]/6">
              <span className="line-clamp-1">
                {member.department}

                {member.department}
              </span>
              <Dot />
              <span className="text-brand-primary-cta whitespace-nowrap">{groupData.year}기</span>
            </div>
          </div>

          <div className="mt-3 flex flex-row gap-3">
            {member.projects.slice(0, 3).map((project, index) => (
              <img key={index} src={project.mainImage} alt={project.title} className="bg-custom-gray-500 h-9 w-9 rounded-sm object-cover" />
            ))}
          </div>
        </div>

        <FlipedContent member={member} />
      </motion.div>
    </div>
  );
};

export const FlipedContent = ({ member }: { member: MemberWithGeneration }) => {
  return (
    <div
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      className="border-brand-primary-cta absolute inset-0 flex flex-col items-start justify-between border-b-4 border-l-4 bg-[#232B28] p-10"
    >
      <div className="flex flex-col gap-3">
        <span className="text-[2.5rem]/10 font-semibold text-white">{member.name}</span>
        <div className="flex items-center gap-4 text-white">
          {member.gitRepositoryLink && (
            <a href={member.gitRepositoryLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <GitHub size={36} />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Mail size={32} />
            </a>
          )}
          {member.blogLink && (
            <a href={member.blogLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Blog size={32} />
            </a>
          )}
          {member.behanceLink && (
            <a href={member.behanceLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <FileUser size={32} />
            </a>
          )}
        </div>
      </div>
      <span className="text-custom-gray-500 text-[1.5rem]/6">{member.description}</span>
    </div>
  );
};
