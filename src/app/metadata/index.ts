import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인천대학교 앱센터 | INU App Center - Student Developers Community',
  description:
    '인천대학교 학생들이 직접 애플리케이션과 서비스를 만드는 IT 이노베이션 랩(구 앱센터)의 공식 홈페이지입니다. 오랫동안 사용되어 온 앱센터가 정보전산원 산하의 AI 빅데이터 센터에 소속된 IT 이노베이션 랩으로 명칭 정식 변경되었습니다. 앱센터는 인천대학교 학생들이 애플리케이션과 서비스를 직접 만드는 공간입니다. 활동에 필요한 비용의 일부를 소속 기관으로부터 지원받고 있습니다.',
  keywords: ['인천대학교', '앱센터', 'IT 이노베이션 랩', 'INU', 'App Center', '웹 개발', '앱 개발', '동아리', '학생 개발자', '대학생', '개발 동아리', '인천대', '대학교', '인천', '정보전산원'],
  openGraph: {
    title: '인천대학교 앱센터 | INU App Center - Student Developers Community',
    description: '인천대학교 학생들이 직접 애플리케이션과 서비스를 만드는 앱센터의 공식 홈페이지입니다.',
    siteName: '인천대학교 앱센터 | INU App Center - Student Developers Community',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'ogImage.png',
        alt: '인천대학교 앱센터 이미지'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '인천대학교 앱센터 | INU App Center - IT Innovation Lab',
    description: '인천대학교 학생들이 직접 애플리케이션과 서비스를 만드는 앱센터의 공식 홈페이지입니다.',
    images: ['ogImage.png']
  }
};
