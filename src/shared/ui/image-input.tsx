'use client';
import { useEffect, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { IMAGE_SIZE_ERROR_MESSAGE, IMAGE_SIZE_LIMIT } from 'shared/constants/dashBoard';

interface ImageInputProps {
  label?: string;
  value: File | string | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  className?: string;
  areaClassName?: string;
  accept?: string;
  objectFit?: 'cover' | 'contain';
  sizeLimit?: number;
  sizeErrorMessage?: string;
}

export const ImageInput = ({
  label,
  value,
  onChange,
  required,
  className,
  areaClassName,
  accept = 'image/*',
  objectFit = 'cover',
  sizeLimit = IMAGE_SIZE_LIMIT,
  sizeErrorMessage = IMAGE_SIZE_ERROR_MESSAGE
}: ImageInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(typeof value === 'string' ? value : null);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > sizeLimit) {
      toast.error(sizeErrorMessage);
      e.target.value = '';
      return;
    }
    onChange(file);
    e.target.value = '';
  };

  return (
    <div className={`flex flex-col gap-2 ${className ?? 'w-32'}`}>
      {label && (
        <span className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <div className="relative flex-1">
        <label
          className={`group relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-emerald-400 hover:bg-slate-100 ${areaClassName ?? 'aspect-square'}`}
        >
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="preview" className={`h-full w-full ${objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex translate-y-2 transform flex-col items-center gap-2 transition-transform group-hover:translate-y-0">
                  <div className="rounded-full bg-white/20 p-2">
                    <ImageIcon className="text-white" size={20} />
                  </div>
                  <span className="text-xs font-bold text-white">이미지 변경</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-slate-400 transition-colors group-hover:text-emerald-500">
              <Upload className="mb-2" size={24} />
              <span className="text-xs font-medium">이미지 추가</span>
            </div>
          )}
          <input type="file" accept={accept} className="hidden" onChange={handleFileChange} />
        </label>
        {previewUrl && (
          <button type="button" onClick={() => onChange(null)} className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600">
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
};
