import Image from 'next/image';
import PMImage from 'shared/image/PM.webp';

export const PM = ({ className }: { className?: string }) => {
  return <Image src={PMImage} width={1087} height={452} alt="PM Icon" className={className} />;
};
