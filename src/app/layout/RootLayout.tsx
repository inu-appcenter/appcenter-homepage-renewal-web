import { ReactQueryProvider } from '../provider/ReactQueryProvider';
import { productDesignFont, pretendardFont } from '../style/fonts';
import '../style/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '인천대학교 앱센터',
    alternateName: ['INU App Center', '앱센터'],
    url: 'https://appcenter.inu.ac.kr'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '인천대학교 앱센터 | INU App Center',
        item: 'https://appcenter.inu.ac.kr'
      }
    ]
  }
];

export function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${productDesignFont.variable} ${pretendardFont.variable} no-scrollbar`}>
      <body className="antialiased">
        <Analytics />
        <SpeedInsights />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
