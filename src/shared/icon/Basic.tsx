import Image from 'next/image';
import BasicImage from 'shared/image/Basic.png';

export const Basic = ({ className }: { className?: string }) => {
  return <Image src={BasicImage} width={1087} height={452} alt="Basic Icon" className={className} />;
};
