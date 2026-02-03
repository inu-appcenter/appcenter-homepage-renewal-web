import { projectApi } from 'entities/project';
import { useProjectSubmit } from '../../hooks/useProjectSubmit';
import { GridItem, GridItemType, ProjectFormType } from '../../types/form';
import { ArrowDownRight, ImageIcon, LayoutGrid, Loader2, Plus, Trash2, Type, X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface GridEditorProps {
  initialItems: GridItem[];
  onUpdate: (items: GridItem[]) => void;
  onRemoveSection: () => void;
  index: number;
  projectId: number | null;
  currentForm: ProjectFormType;
}
export const GridEditor = ({ initialItems, onUpdate, onRemoveSection, index, projectId, currentForm }: GridEditorProps) => {
  const [items, setItems] = useState<GridItem[]>(initialItems);
  const [inputType, setInputType] = useState<GridItemType>('text');
  const [inputValue, setInputValue] = useState('');

  // 이미지 관련 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 이미지가 PATCH가 완료되는 시간과 실제 업로드 시간을 맞추기 위한 상태
  const [isUploadingForGrid, setIsUploadingForGrid] = useState(false);

  const { width, containerRef, mounted } = useContainerWidth();

  // 메모리 누수 방지를 위한 Preview URL 해제
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const { submit } = useProjectSubmit({
    mode: 'edit',
    projectId: projectId || 0,
    onSuccess: () => {}
  });

  const onLayoutChange = (newLayout: any) => {
    const updatedData = items.map((item) => {
      const changed = newLayout.find((l: any) => l.i === item.i);
      if (changed) {
        return { ...item, x: changed.x, y: changed.y, w: changed.w, h: changed.h };
      }
      return item;
    });
    setItems(updatedData);
    onUpdate(updatedData);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 기존 미리보기 URL이 있다면 해제
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addItem = async () => {
    if (inputType === 'text') {
      if (!inputValue.trim()) return alert('내용을 입력해주세요.');
      const nextId = items.length > 0 ? Math.max(...items.map((item) => parseInt(item.i))) + 1 : 1;
      const newItem: GridItem = {
        i: String(nextId),
        x: (items.length * 4) % 12,
        y: Infinity,
        w: 12,
        h: 4,
        type: 'text',
        content: inputValue
      };
      const newItems = [...items, newItem];
      setItems(newItems);
      onUpdate(newItems);
      setInputValue('');
    } else if (inputType === 'image') {
      if (!selectedFile) return alert('이미지를 선택해주세요.');
      if (!projectId) return;
      if (!currentForm) return;

      setIsUploadingForGrid(true);
      const updatedForm: ProjectFormType = {
        ...currentForm,
        images: [...currentForm.images, { id: 0, url: '', file: selectedFile }]
      };
      await submit(updatedForm);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 이미지 업로드 대기 시간 (마땅한 방법을 못찾음...)

      const response = await projectApi.getById(projectId);

      if (response?.images) {
        const imageEntries = Object.entries(response.images);
        const [, latestUrl] = imageEntries[imageEntries.length - 1];

        setItems((prev) => {
          const nextId = prev.length > 0 ? Math.max(...prev.map((it) => parseInt(it.i))) + 1 : 1;
          const newItem: GridItem = {
            i: String(nextId),
            x: (prev.length * 4) % 12,
            y: Infinity,
            w: 4,
            h: 10,
            type: 'image',
            content: latestUrl
          };
          const updated = [...prev, newItem];
          onUpdate(updated); // 부모에게도 최신 상태 전달
          return updated;
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        setInputValue('');
        setIsUploadingForGrid(false);
      }
    }
  };

  const removeItem = (itemId: string) => {
    const newItems = items.filter((item) => item.i !== itemId);
    setItems(newItems);
    onUpdate(newItems);
  };

  return (
    <div className="focus-within:border-brand-primary/20 mb-12 flex flex-col gap-6 rounded-4xl border border-white/5 bg-[#0f0f12] p-4 shadow-2xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary-cta text-background flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.3)]">
            {index + 1}
          </div>
          <span className="text-sm font-bold text-gray-400">번째</span>
        </div>
        <button onClick={onRemoveSection} className="group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400">
          <Trash2 size={14} className="transition-transform group-hover:scale-110" />
          <span>삭제</span>
        </button>
      </div>

      {/* Input Area */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-2">
          <label className="ml-1 block text-xs font-black text-gray-500">블록 유형</label>
          <div className="flex w-fit rounded-xl border border-white/5 bg-[#151518] p-1">
            {(['text', 'image'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setInputType(type);
                  setInputValue('');
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  inputType === type ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {type === 'text' ? <Type size={16} /> : <ImageIcon size={16} />}
                {type === 'text' ? '텍스트' : '이미지'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label className="ml-1 block text-xs font-black text-gray-500 uppercase">{inputType === 'image' ? '이미지 블록 입력' : '글자 블록 입력'}</label>

          <div className="group focus-within:border-brand-primary/50 flex min-h-20 items-center gap-4 rounded-xl border border-white/10 bg-[#1e1e22] px-4 py-3 transition-all hover:border-white/20">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black/40">
              {inputType === 'image' && previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : inputType === 'image' ? (
                <Upload className="text-gray-700" size={20} />
              ) : (
                <Type className="text-gray-700" size={20} />
              )}
            </div>

            <div className="flex-1">
              {inputType === 'image' ? (
                <input
                  key="file-input"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="w-full cursor-pointer text-xs text-gray-400 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gray-800 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-gray-700"
                />
              ) : (
                <input
                  type="text"
                  key="text-input"
                  value={inputValue ?? ''}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="내용을 입력하세요..."
                  className="w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600"
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                />
              )}
            </div>
          </div>
        </div>

        <button
          onClick={addItem}
          disabled={isUploadingForGrid}
          className="group bg-brand-primary-cta text-background flex h-13 items-center justify-center gap-2 rounded-xl px-8 text-sm font-black shadow-lg transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploadingForGrid ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} className="transition-transform group-hover:rotate-90" />}
          <span>{isUploadingForGrid ? '업로드 중...' : '블록 추가'}</span>
        </button>
      </div>

      <div ref={containerRef} className="relative min-h-100 w-full rounded-3xl border-2 border-dashed border-gray-800 bg-[#0a0a0c] p-4 transition-colors">
        {!items.length && mounted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-700">
            <LayoutGrid size={48} strokeWidth={1} />
            <p className="text-sm font-bold">블록이 없네요. 위에서 추가해보세요.</p>
          </div>
        )}

        {mounted && (
          <Responsive
            className="layout"
            layouts={{ lg: items }}
            breakpoints={{ lg: 1200 }}
            cols={{ lg: 12 }}
            rowHeight={30}
            margin={[16, 16]}
            width={width}
            onLayoutChange={onLayoutChange}
            dragConfig={{
              enabled: true
            }}
            resizeConfig={{
              enabled: true,
              handles: ['se']
            }}
          >
            {items.map((item) => (
              <div key={item.i} className="group hover:border-brand-primary/30 relative rounded-2xl border border-white/5 bg-[#1e1e22] shadow-lg transition-all">
                <div className="drag-handle absolute inset-0 z-0 cursor-move" />

                <div className="absolute top-2 right-2 z-30 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.i);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="pointer-events-none relative z-10 h-full w-full overflow-hidden p-1">
                  <div className="pointer-events-auto h-full w-full">
                    {item.type === 'image' ? (
                      <img src={item.content} alt="" className="h-full w-full rounded-xl object-cover select-none" />
                    ) : (
                      <div className="custom-scrollbar h-full w-full overflow-y-auto p-4">
                        <p className="text-md whitespace-pre-wrap text-gray-300">{item.content}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute right-1 bottom-1 z-20 text-gray-600 opacity-30">
                  <ArrowDownRight size={14} />
                </div>
              </div>
            ))}
          </Responsive>
        )}
      </div>
    </div>
  );
};
