import { ScrambleText } from 'shared/animation/ScrambleText';

export const MainSection = () => {
  return (
    <section className="relative flex flex-row items-center justify-between py-40 sm:h-screen sm:py-0">
      <h1 role="heading" aria-level={1} className="text-brand-primary-cta font-product-design text-[40px] font-bold sm:text-[100px]/25">
        <ScrambleText text="Join" />
        <span className="text-white">
          <ScrambleText text=" U" />
        </span>
        <ScrambleText text="s" />
      </h1>
      {/* APNG 애니메이션 보존을 위해 next/image(Cloudflare Image Transformations)를 거치지 않고 원본을 직접 서빙 */}
      <img src="/videos/joinus.png" width={1200} height={675} alt="Main Illustration" className="absolute -z-10" />
    </section>
  );
};
