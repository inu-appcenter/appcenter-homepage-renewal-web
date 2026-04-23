import Image from 'next/image';
import DevImage from 'shared/image/Dev.webp';

export const Dev = ({ className }: { className?: string }) => {
  return <Image unoptimized src={DevImage} width={1087} height={452} quality={75} alt="Dev Icon" className={className} />;
};
