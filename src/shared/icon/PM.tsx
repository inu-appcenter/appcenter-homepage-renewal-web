import PMImage from 'shared/image/PM.webp';

export const PM = ({ className }: { className?: string }) => {
  return <img src={PMImage.src} alt="PM Icon" className={className} />;
};
