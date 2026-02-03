import localFont from 'next/font/local';

export const productDesignFont = localFont({
  src: '../../../public/fonts/ProductDesign.ttf',
  weight: '100 900',
  style: 'normal',
  variable: '--font-product-design',
  display: 'swap'
});

export const pretendardFont = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-pretendard',
  display: 'swap'
});
