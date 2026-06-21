interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

// Cloudflare Image Transformations(/cdn-cgi/image/)를 통한 이미지 최적화 로더.
// 워커(/_next/image)를 거치지 않고 엣지에서 직접 변환 + 자동 캐싱되어
// 동일 이미지 재요청 시 transformation 재집계를 방지한다.
export default function cloudflareImageLoader({ src, width, quality }: LoaderParams) {
  // dev 환경에선 /cdn-cgi/image/가 없으므로 원본을 그대로 사용
  if (process.env.NODE_ENV === 'development') return src;

  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  return `/cdn-cgi/image/${params.join(',')}/${src}`;
}
