import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({ label, required, className, ...props }: TextAreaProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        required={required}
        {...props}
        className={`w-full resize-none rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 ${className ?? ''}`}
      />
    </div>
  );
};
