import DesignImage from 'shared/image/Design.webp';

export const Design = ({ className }: { className?: string }) => {
  return <img src={DesignImage.src} alt="Design Icon" className={className} />;
};
