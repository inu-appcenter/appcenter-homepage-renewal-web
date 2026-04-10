import { useSyncExternalStore } from 'react';

// matchMedia API를 구독하여 뷰포트 크기에 따른 미디어 쿼리 결과를 반환하는 커스텀 훅
// 사용 예시: const isMobile = useMediaQuery('(max-width: 639px)');

export function useMediaQuery(query: `(max-width: ${number}px)`) {
  const subscribe = (callback: () => void) => {
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener('change', callback);
    return () => matchMedia.removeEventListener('change', callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
