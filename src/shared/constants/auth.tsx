// shared/constant/auth.ts

export const AUTH_ERROR_TYPES = {
  ADMIN_REQUIRED: 'admin_required',
  MEMBER_REQUIRED: 'member_required',
  AUTH_EXPIRED: 'auth_expired'
} as const;

export type AuthErrorType = (typeof AUTH_ERROR_TYPES)[keyof typeof AUTH_ERROR_TYPES];

interface AuthErrorConfig {
  loginType: 'member' | 'admin';
  message: string;
  description: string;
}

// 팩토리 역할을 하는 맵 객체
export const AUTH_ERROR_FACTORY: Record<AuthErrorType, AuthErrorConfig> = {
  [AUTH_ERROR_TYPES.ADMIN_REQUIRED]: {
    loginType: 'admin',
    message: '관리자 권한이 필요한 페이지입니다',
    description: '관리자 계정으로 로그인해주세요'
  },
  [AUTH_ERROR_TYPES.MEMBER_REQUIRED]: {
    loginType: 'member',
    message: '구성원 전용 페이지입니다',
    description: '구성원 계정으로 로그인해주세요'
  },
  [AUTH_ERROR_TYPES.AUTH_EXPIRED]: {
    loginType: 'member',
    message: '인증이 만료되었습니다',
    description: '다시 로그인해주세요'
  }
};

/**
 * 에러 타입을 받아 대응하는 설정을 반환하는 팩토리 함수
 */
export const getAuthMessage = (errorType: string | null): AuthErrorConfig | null => {
  if (!errorType || !(errorType in AUTH_ERROR_FACTORY)) return null;
  return AUTH_ERROR_FACTORY[errorType as AuthErrorType];
};
