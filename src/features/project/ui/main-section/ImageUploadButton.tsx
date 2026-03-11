import { ChangeEvent, MouseEvent } from 'react';
import { ImagePlus, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  imageFile: string | null;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (e: MouseEvent) => void;
}
export const MockupImageUploader = ({ imageFile, onUpload, onRemove }: ImageUploaderProps) => {
  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        toast.error('이미지 크기는 2MB 이하여야 합니다');

        e.target.value = '';
        return;
      }
    }

    onUpload(e);
  };
  return (
    <div className="group flex flex-col">
      <label className="mb-2 ml-1 block text-xs font-bold tracking-wider text-gray-500">디바이스 목업 이미지 (필수)</label>
      <div
        className={`relative flex h-200 w-150 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[40px] border-2 border-dashed transition-all duration-300 ${
          imageFile ? 'border-transparent bg-black shadow-2xl' : 'hover:border-brand-primary/50 border-gray-700 bg-[#151518] hover:bg-[#1a1a1f]'
        }`}
      >
        <input type="file" className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept="image/*" onChange={handleUploadChange} />

        {imageFile ? (
          <div className="group relative h-full w-full">
            <img src={imageFile} alt="Mockup Preview" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-40" />

            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={onRemove}
                className="flex transform items-center gap-2 rounded-full bg-red-500/90 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-500"
              >
                <Trash2 size={20} /> 이미지 제거
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 text-gray-500">
            <div className="group-hover:text-brand-primary flex h-24 w-24 items-center justify-center rounded-full bg-[#1e1e22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-transform group-hover:scale-110">
              <ImagePlus size={40} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="group-hover:text-brand-primary text-xl font-bold text-gray-300 transition-colors">목업 이미지 업로드</p>
              <p className="mt-2 text-sm text-gray-500">900 x 900 이하 권장</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AppIconUploader = ({ imageFile, onUpload, onRemove }: ImageUploaderProps) => {
  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        toast.error('이미지 크기는 2MB 이하여야 합니다');

        e.target.value = '';
        return;
      }
    }

    onUpload(e);
  };
  return (
    <div className="group flex flex-col">
      <label className="mb-2 ml-1 block text-xs font-bold tracking-wider text-gray-500">앱 아이콘 (필수)</label>
      <div
        className={`relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[28px] border-2 border-dashed transition-all duration-300 ${
          imageFile ? 'border-transparent bg-black shadow-lg' : 'hover:border-brand-primary/50 border-gray-700 bg-[#151518] hover:bg-[#1a1a1f]'
        }`}
      >
        <input type="file" className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept="image/*" onChange={handleUploadChange} />

        {imageFile ? (
          <div className="group relative h-full w-full">
            <img src={imageFile} alt="Icon Preview" className="h-full w-full object-cover" />

            <button
              onClick={onRemove}
              className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="group-hover:text-brand-primary flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-transform group-hover:scale-110">
              <ImagePlus size={24} strokeWidth={1.5} />
            </div>
            <span className="group-hover:text-brand-primary text-xs font-bold text-gray-300">앱 아이콘</span>
          </div>
        )}
      </div>
    </div>
  );
};
