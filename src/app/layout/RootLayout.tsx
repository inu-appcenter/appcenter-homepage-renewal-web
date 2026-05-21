import Script from 'next/script';
import { Toaster } from 'shared/ui/toast';
import { ReactQueryProvider } from '../provider/ReactQueryProvider';
import { MixpanelProvider } from '../provider/MixpanelProvider';
import { productDesignFont, pretendardFont, tokyoFont } from '../style/fonts';
import '../style/globals.css';
import NextTopLoader from 'nextjs-toploader';

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
    <html lang="ko" className={`${productDesignFont.variable} ${pretendardFont.variable} ${tokyoFont.variable} no-scrollbar`}>
      <body className="antialiased">
        <NextTopLoader zIndex={9999} color="#57ff85" initialPosition={0.08} crawlSpeed={200} height={2} crawl={true} showSpinner={false} easing="ease" speed={200} />
        <Script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "d72988e5b9f34b398e6901943d0f0e6d"}' />
        <Toaster />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MixpanelProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MixpanelProvider>
      </body>
    </html>
  );
}
