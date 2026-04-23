import Image from 'next/image';
import BasicImage from 'shared/image/Basic.webp';

export const Basic = ({ className }: { className?: string }) => {
  return <Image unoptimized src={BasicImage} width={1087} height={452} quality={75} alt="Basic Icon" className={className} />;
};
