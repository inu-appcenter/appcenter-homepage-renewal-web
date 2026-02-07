import Image from 'next/image';
import WebImage from 'shared/image/Web.png';

export const Web = ({ className }: { className?: string }) => {
  return <Image src={WebImage} width={1087} height={452} alt="Web Icon" className={className} />;
};
