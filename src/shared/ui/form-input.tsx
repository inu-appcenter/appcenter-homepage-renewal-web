import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ElementType;
  passwordToggle?: boolean;
}

export const FormInput = ({ label, required, className, icon: Icon, passwordToggle, type, ...props }: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = passwordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300" size={18} />}
        <input
          required={required}
          type={inputType}
          {...props}
          className={`w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 ${Icon ? 'pl-11' : ''} ${passwordToggle ? 'pr-11' : ''} ${className ?? ''}`}
        />
        {passwordToggle && (
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-300 transition-colors hover:text-slate-600">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};
