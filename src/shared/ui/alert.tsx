import { AlertCircle, Info, TriangleAlert } from 'lucide-react';

type AlertProps = {
  children: React.ReactNode;
  type?: 'error' | 'warning' | 'info';
};

export function Alert({ children, type }: AlertProps) {
  switch (type) {
    case 'error':
      return (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
          <TriangleAlert size={16} className="shrink-0" />
          {children}
        </div>
      );
    case 'warning':
      return (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-xs font-medium text-amber-600">
          <AlertCircle size={16} className="shrink-0" />
          {children}
        </div>
      );
    case 'info':
      return (
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs font-medium text-blue-600">
          <Info size={16} className="shrink-0" />
          {children}
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-xs font-medium text-gray-600">
          <AlertCircle size={16} className="shrink-0" />
          {children}
        </div>
      );
  }
}
