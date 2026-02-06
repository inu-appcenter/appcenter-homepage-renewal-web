import Image from 'next/image';
import { ScrambleText } from 'shared/animation/ScrambleText';

export const MainSection = () => {
  return (
    <section className="relative flex flex-row items-center justify-between py-40 sm:h-screen sm:py-0">
      <h1 className="text-brand-primary-cta font-product-design text-[40px] font-bold sm:text-[100px]/25">
        <ScrambleText text="Join" />
        <span className="text-white">
          <ScrambleText text="U" />
        </span>
        <ScrambleText text="s" />
      </h1>
      <Image src="/videos/joinus.png" width={1920} height={1080} alt="Main Illustration" className="absolute -z-10" />
    </section>
  );
};
