import { Loader2, Save } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean;
}

export function SaveButton({ isPending, children, disabled, type = 'submit', className = '', ...props }: SaveButtonProps) {
  return (
    <button
      disabled={disabled || isPending}
      type={type}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white transition-all hover:bg-emerald-600 disabled:bg-slate-300 ${className}`}
      {...props}
    >
      {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
      {isPending ? '처리 중...' : children}
    </button>
  );
}
