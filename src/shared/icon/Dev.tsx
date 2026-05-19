import DevImage from 'shared/image/Dev.webp';

export const Dev = ({ className }: { className?: string }) => {
  return <img src={DevImage.src} alt="Dev Icon" className={className} />;
};
