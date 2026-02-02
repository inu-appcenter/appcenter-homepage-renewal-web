import Image from 'next/image';
import { ScrambleText } from 'shared/animation/ScrambleText';

export const MainSection = () => {
  return (
    <section className="relative flex h-screen flex-row items-center justify-between">
      <h1 className="text-brand-primary-cta font-product-design text-[100px]/25 font-bold">
        <ScrambleText text="Join" />
        <span className="text-white">
          <ScrambleText text="U" />
        </span>
        <ScrambleText text="s" />
      </h1>
      <Image src="/videos/joinus.png" fill alt="Main Illustration" className="-z-10" />
    </section>
  );
};
