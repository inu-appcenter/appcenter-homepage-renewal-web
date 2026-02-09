import { ReactQueryProvider } from '../provider/ReactQueryProvider';
import { productDesignFont, pretendardFont } from '../style/fonts';
import '../style/globals.css';

export function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
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
  };
  return (
    <html lang="ko" className={`${productDesignFont.variable} ${pretendardFont.variable} no-scrollbar`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
