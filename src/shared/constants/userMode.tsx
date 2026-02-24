/* 
권한이 더 생긴다면 아래 배열에 추가하세요.
예시: export const USER_MODES = ['admin', 'member', 'guest'] as const;
entities/sign/hooks/useRoleContext.tsx에서 url 경로를 기반으로 사용자의 권한을 확인합니다.
배열의 0번째는 예외 시 기본값이 됩ㄴ디ㅏ.
*/

export const USER_MODES = ['admin', 'member'] as const;
