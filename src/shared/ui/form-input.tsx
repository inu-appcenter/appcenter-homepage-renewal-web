import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput = ({ label, required, className, ...props }: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-400">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        required={required}
        {...props}
        className={`w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 ${className ?? ''}`}
      />
    </div>
  );
};
