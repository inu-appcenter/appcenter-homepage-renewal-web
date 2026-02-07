import Image from 'next/image';
import ServerImage from 'shared/image/Server.png';

export const Server = ({ className }: { className?: string }) => {
  return <Image src={ServerImage} width={1087} height={452} alt="Server Icon" className={className} />;
};
