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
    qualities: [75, 100]
  },
  logging: {
    fetches: {
      fullUrl: true // 백엔드로 보내는 전체 URL을 로그에 출력
    }
  }
};

export default nextConfig;
