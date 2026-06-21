import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 워커(/_next/image) 대신 Cloudflare Image Transformations(/cdn-cgi/image/)로 최적화 + 엣지 자동 캐싱
    loader: 'custom',
    loaderFile: './src/shared/utils/cloudflareImageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server.inuappcenter.kr',
        pathname: '/image/photo/**'
      }
    ],
    qualities: [75, 100],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [16, 64, 256]
  },
  logging: {
    fetches: {
      fullUrl: true // 백엔드로 보내는 전체 URL을 로그에 출력
    }
  },
  experimental: {
    serverActions: { allowedOrigins: ['home.inuappcenter.kr', 'appcenter-hompage-renewal-web.inuappcenter.workers.dev'] }
  }
};

export default nextConfig;

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
