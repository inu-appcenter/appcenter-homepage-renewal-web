import { usePathname } from 'next/navigation';

// URL 경로에서 사용자 권한을 추출하는 커스텀 훅
export const useRoleContext = () => {
  const pathname = usePathname();

  // URL 경로에서 모드를 추출 (예: /member, /admin) 기본값은 member
  const mode = pathname?.split('/')[1] || 'member';
  return { mode };
};
