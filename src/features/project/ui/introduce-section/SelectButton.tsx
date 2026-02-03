import { Plus } from 'lucide-react';

export const SelectButton = ({ text, onClick, isSelected }: { text: string; onClick: () => void; isSelected: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex cursor-pointer items-center gap-2.5 rounded-[40px] px-6 py-3 text-2xl transition-colors duration-300 ${
        isSelected ? 'text-brand-primary-cta border-brand-primary-cta border shadow-[0px_0px_16px_0px_#57FF8566]' : 'text-custom-gray-100 border-custom-gray-100'
      }`}
    >
      <div>
        <Plus fill={'currentColor'} strokeWidth={0.5} size={28} />
      </div>

      <span className="relative z-10">{text}</span>
    </button>
  );
};
