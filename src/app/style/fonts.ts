import localFont from 'next/font/local';

export const productDesignFont = localFont({
  src: '../../../public/fonts/ProductDesign.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-product-design',
  display: 'swap'
});
// regular, medium, semibold, bold
export const pretendardFont = localFont({
  src: [
    {
      path: '../../../public/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-pretendard',
  display: 'swap'
});

export const tokyoFont = localFont({
  src: '../../../public/fonts/Tokyo.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-tokyo',
  display: 'swap'
});
