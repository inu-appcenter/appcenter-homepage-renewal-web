import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server.inuappcenter.kr',
        pathname: '/image/photo/**'
      }
    ],
    qualities: [75, 100],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [16, 64, 256],
    // 1년(365일) 동안 이미지 캐시 강제 유지
    minimumCacheTTL: 31536000
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
