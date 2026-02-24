import { usePathname } from 'next/navigation';
import { USER_MODES } from 'shared/constants/userMode';

export type UserMode = (typeof USER_MODES)[number];

const MODE_SET = new Set<string>(USER_MODES);

const isValidMode = (mode: string): mode is UserMode => {
  return MODE_SET.has(mode);
};

export const useRoleContext = () => {
  const pathname = usePathname();

  // URL 경로 분리 및 초기 값 추출
  const firstSegment = pathname?.split('/')[1] || USER_MODES[0];

  // 유효한 모드면 해당 모드를 사용하고, 아니면 기본값을 반환
  const mode: UserMode = isValidMode(firstSegment) ? firstSegment : USER_MODES[0];

  return { mode };
};
