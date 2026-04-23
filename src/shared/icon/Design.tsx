import Image from 'next/image';
import DesignImage from 'shared/image/Design.webp';

export const Design = ({ className }: { className?: string }) => {
  return <Image unoptimized src={DesignImage} width={1087} height={452} quality={75} alt="Design Icon" className={className} />;
};
