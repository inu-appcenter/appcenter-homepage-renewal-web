import Image from 'next/image';
import PMImage from 'shared/image/PM.webp';

export const PM = ({ className }: { className?: string }) => {
  return <Image unoptimized src={PMImage} width={1087} height={452} quality={75} alt="PM Icon" className={className} />;
};
