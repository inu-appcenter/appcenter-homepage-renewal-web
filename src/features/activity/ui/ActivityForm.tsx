'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ActivityForm as ActivityFormType } from '../types/form';
import { Activity } from 'entities/activity';
import { useEditActivity } from '../hooks/useEditActivity';
import { useAddActivity } from '../hooks/useAddActivity';
import { SaveButton } from 'shared/ui/button';
import { Input } from 'shared/ui/form-input';
import { TextArea } from 'shared/ui/text-area';
import { ImageInput } from 'shared/ui/image-input';

const DEFAULT_CONTENT = {
  sequence: 0,
  subTitle: '',
  text: '',
  imageUrls: [],
  id: 0
};
export function ActivityForm({ initialData }: { initialData?: Activity }) {
  const isEditMode = Boolean(initialData);

  const { addActivity, isPending: isAddPending } = useAddActivity();
  const { editActivity, isPending: isEditPending } = useEditActivity();

  const isPending = isEditMode ? isEditPending : isAddPending;

  const [deletedImages, setDeletedImages] = useState<Array<{ sectionId: number; imageId: number }>>([]);

  const [form, setForm] = useState<ActivityFormType>(() => ({
    title: initialData?.title || '',
    author: initialData?.author || '',
    body: initialData?.body || '',
    titleEng: initialData?.titleEng || '',
    thumbnail: initialData?.thumbnail || null,
    contents: initialData?.contents
      ? initialData.contents.map((content) => ({
          ...content,
          imageUrls: content.imageUrls || []
        }))
      : [{ ...DEFAULT_CONTENT, id: Date.now() }]
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && initialData) {
      editActivity(initialData, form, deletedImages);
    } else {
      addActivity(form);
    }
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      contents: [
        ...prev.contents,
        {
          ...DEFAULT_CONTENT,
          id: Date.now()
        }
      ]
    }));
  };

  const removeSection = (id: number) => {
    setForm((prev) => ({
      ...prev,
      contents: prev.contents.filter((s) => s.id !== id)
    }));
  };

  const updateSection = (id: number, field: keyof (typeof form.contents)[number], value: string) => {
    setForm((prev) => ({
      ...prev,
      contents: prev.contents.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    }));
  };

  const handleSectionImageAdd = (sectionId: number, file: File | null) => {
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: [...s.imageUrls, file] } : s))
    }));
  };

  const handleSectionImageChange = (sectionId: number, index: number, file: File | null) => {
    const existingUrl = form.contents.find((s) => s.id === sectionId)?.imageUrls[index];

    if (file === null) {
      if (existingUrl) removeSectionImage(sectionId, existingUrl);
      return;
    }

    if (typeof existingUrl === 'string' && isEditMode) {
      const imageId = Number(existingUrl.split('/').pop());
      if (imageId) setDeletedImages((prev) => [...prev, { sectionId, imageId }]);
    }

    setForm((prev) => ({
      ...prev,
      contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.map((img, i) => (i === index ? file : img)) } : s))
    }));
  };
  const removeSectionImage = (sectionId: number, targetImage: string | File) => {
    if (typeof targetImage === 'string' && isEditMode) {
      const imageId = Number(targetImage.split('/').pop());
      if (imageId) setDeletedImages((prev) => [...prev, { sectionId, imageId }]);
    }
    setForm((prev) => ({
      ...prev,
      contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.filter((img) => img !== targetImage) } : s))
    }));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">{isEditMode ? '활동 게시글 수정' : '활동 게시글 등록'}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">1</span>
            기본 정보
          </h2>

          <div className="flex flex-row gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Input label="제목" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="활동 제목을 입력하세요" />
              <Input label="영문 제목" type="text" value={form.titleEng} onChange={(e) => setForm({ ...form, titleEng: e.target.value })} placeholder="영문 제목을 입력하세요" />
              <Input label="작성자" type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="작성자를 입력하세요" />
              <TextArea label="본문" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={10} placeholder="게시글 첫 화면에 보일 본문을 입력하세요" />
            </div>
            <ImageInput label="썸네일" value={form.thumbnail} onChange={(file) => setForm((prev) => ({ ...prev, thumbnail: file }))} className="flex-1" areaClassName="h-full w-full" />
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* --- 상세 콘텐츠 섹션 --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">2</span>
              상세 콘텐츠
            </h2>
          </div>

          <div className="space-y-6">
            {form.contents.map((section, index) => (
              <div key={section.id !== 0 ? section.id : `new-${index}`} className="relative rounded-lg border border-slate-200 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600">섹션 {index + 1}</span>
                  <button type="button" onClick={() => removeSection(section.id)} className="text-slate-500 hover:text-red-500">
                    <Trash2 size={24} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Input label="소제목" type="text" value={section.subTitle} onChange={(e) => updateSection(section.id, 'subTitle', e.target.value)} placeholder="소제목을 입력하세요" />
                    <TextArea label="본문 내용" value={section.text} onChange={(e) => updateSection(section.id, 'text', e.target.value)} placeholder="본문 내용을 입력하세요" rows={5} />
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="grid grid-cols-3 gap-2">
                        {section.imageUrls.map((url, imgIdx) => (
                          <ImageInput key={imgIdx} value={url} onChange={(file) => handleSectionImageChange(section.id, imgIdx, file)} areaClassName="aspect-square" className="w-full" />
                        ))}
                        <ImageInput value={null} onChange={(file) => handleSectionImageAdd(section.id, file)} areaClassName="aspect-square" className="w-full" />
                      </div>
                    </div>
                    <p className="text-right text-sm text-slate-500">{section.imageUrls.length}개의 이미지 추가됨</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSection}
            className="text-md flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 py-4 text-slate-500 transition-colors hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600"
          >
            <Plus size={16} /> 새로운 섹션 추가하기
          </button>
        </section>
        <SaveButton disabled={isPending} type="submit" className="fixed right-20 bottom-10 z-50 flex w-50">
          {isEditMode ? '변경사항 저장' : '게시글 등록'}
        </SaveButton>
      </form>
    </div>
  );
}
