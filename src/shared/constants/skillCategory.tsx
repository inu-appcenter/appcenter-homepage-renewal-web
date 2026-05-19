import { SkillCategory } from 'shared/types/skillCategory';

// 스킬 카테고리를 추가하게 될 경우 여기에 추가해주세요.
export const SKILL_CATEGORY = ['FRONTEND', 'BACKEND', 'OTHERS', 'DATABASE', 'DEVOPS', 'DESIGN'] as const;

// 색상은 관리자 페이지에만 적용됩니다.
export const SKILL_CATEGORY_COLORS: Record<SkillCategory, { bg: `bg-${string}`; text: `text-${string}` }> = {
  FRONTEND: { bg: 'bg-blue-100', text: 'text-blue-700' },
  BACKEND: { bg: 'bg-teal-100', text: 'text-teal-700' },
  DATABASE: { bg: 'bg-orange-100', text: 'text-orange-700' },
  DEVOPS: { bg: 'bg-purple-100', text: 'text-purple-700' },
  DESIGN: { bg: 'bg-pink-100', text: 'text-pink-700' },
  OTHERS: { bg: 'bg-slate-100', text: 'text-slate-600' }
};
