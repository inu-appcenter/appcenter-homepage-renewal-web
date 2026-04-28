import BasicImage from 'shared/image/Basic.webp';

export const Basic = ({ className }: { className?: string }) => {
  return <img src={BasicImage.src} alt="Basic Icon" className={className} />;
};
