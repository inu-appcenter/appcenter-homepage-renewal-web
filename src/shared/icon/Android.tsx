import Image from 'next/image';
import AndroidImage from 'shared/image/Android.png';

export const Android = ({ className }: { className?: string }) => {
  return <Image src={AndroidImage} width={1087} height={452} alt="Android Icon" className={className} />;
};
