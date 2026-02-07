import Image from 'next/image';
import IosImage from 'shared/image/iOS.png';

export const Ios = ({ className }: { className?: string }) => {
  return <Image src={IosImage} width={1087} height={452} alt="Ios Icon" className={className} />;
};
