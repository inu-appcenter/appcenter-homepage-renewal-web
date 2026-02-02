import Image from 'next/image';

export const MainSection = () => {
  return (
    <section className="relative flex h-screen flex-row items-center justify-between">
      <h1 className="text-brand-primary-cta font-product-design text-[100px]/25 font-bold">
        Join <span className="text-white">U</span>s
      </h1>
      <Image src="/videos/joinus.png" fill alt="Main Illustration" className="-z-10" />
    </section>
  );
};
