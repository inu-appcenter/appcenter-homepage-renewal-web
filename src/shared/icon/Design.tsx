import Image from 'next/image';
import DesignImage from 'shared/image/Design.png';

export const Design = ({ className }: { className?: string }) => {
  return <Image src={DesignImage} width={1087} height={452} alt="Design Icon" className={className} />;
};
