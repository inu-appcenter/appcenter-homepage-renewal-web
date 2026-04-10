import Image from 'next/image';
import DevImage from 'shared/image/Dev.webp';

export const Dev = ({ className }: { className?: string }) => {
  return <Image src={DevImage} width={1087} height={452} alt="Dev Icon" className={className} />;
};
