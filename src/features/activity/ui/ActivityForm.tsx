'use client';
import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Save } from 'lucide-react';
import type { ActivityForm as ActivityFormType } from '../types/form';
import { Activity, useActivityActions } from 'entities/activity';
import { useEditActivity } from '../hooks/useEditActivity';
import { useAddActivity } from '../hooks/useAddActivity';

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

  const { deleteImageMutation } = useActivityActions();

  const isPending = isEditMode ? isEditPending : isAddPending;

  const [form, setForm] = useState<ActivityFormType>(() => {
    return {
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
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && initialData) {
      editActivity(initialData, form);
    } else {
      addActivity(form);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, thumbnail: file }));
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

  const handleSectionImageAdd = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setForm((prev) => ({
        ...prev,
        contents: prev.contents.map((s) => {
          if (s.id === id) {
            return { ...s, imageUrls: [...s.imageUrls, ...newFiles] };
          }
          return s;
        })
      }));
    }
  };

  const removeSectionImage = async (sectionId: number, targetImage: string | File) => {
    //  로컬 파일인 경우 (아직 업로드 안 됨) -> State에서만 삭제
    if (targetImage instanceof File) {
      setForm((prev) => ({
        ...prev,
        contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.filter((img) => img !== targetImage) } : s))
      }));
      return;
    }

    // 서버 이미지인 경우 (URL 문자열)
    // 등록 모드이거나, ID가 0(새로 추가된 섹션)인 경우 -> 그냥 State에서 삭제 (아직 DB에 없음)
    if (!isEditMode) {
      setForm((prev) => ({
        ...prev,
        contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.filter((img) => img !== targetImage) } : s))
      }));
      return;
    }

    // 수정 모드이고, 기존 DB에 있던 섹션의 이미지인 경우 -> API 호출
    if (!confirm('서버에 저장된 이미지를 삭제하시겠습니까?')) return;

    try {
      // "https://server.inuappcenter.kr:443/image/photo/509" -> 509 추출
      const urlParts = targetImage.split('/');
      const lastPart = urlParts.pop();
      const imageId = Number(lastPart);

      if (!imageId) throw new Error('이미지 ID를 찾을 수 없습니다.');

      await deleteImageMutation.mutateAsync({ id: sectionId, imageIds: [imageId] });

      // 성공 시 State에서도 제거
      setForm((prev) => ({
        ...prev,
        contents: prev.contents.map((s) => (s.id === sectionId ? { ...s, imageUrls: s.imageUrls.filter((img) => img !== targetImage) } : s))
      }));
    } catch (error) {
      console.error(error);
      alert('이미지 삭제 실패');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">{isEditMode ? '활동 게시글 수정' : '활동 게시글 등록'}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="bg-brand-primary-cta flex h-6 w-6 items-center justify-center rounded-full text-xs">1</span>
            기본 정보
          </h2>

          <div className="flex flex-row gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Input label="제목" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="활동 제목을 입력하세요" />
              <Input label="영문 제목" type="text" value={form.titleEng} onChange={(e) => setForm({ ...form, titleEng: e.target.value })} placeholder="영문 제목을 입력하세요" />
              <Input label="작성자" type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="작성자 이름을 입력하세요" />
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">본문</label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="게시글 첫 화면에 보일 간단한 본문을 입력하세요"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="mb-1 text-sm font-medium text-slate-700">썸네일</span>
              <div className="flex-1">
                <label className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-slate-100">
                  {form.thumbnail ? (
                    <>
                      <img src={typeof form.thumbnail === 'string' ? form.thumbnail : URL.createObjectURL(form.thumbnail)} alt="thumb-preview" className="h-full w-full object-cover" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex translate-y-2 transform flex-col items-center gap-2 transition-transform group-hover:translate-y-0">
                          <div className="rounded-full bg-white/20 p-2">
                            <ImageIcon className="text-white" size={24} />
                          </div>
                          <span className="text-xs font-bold text-white">이미지 변경하기</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-slate-400 transition-transform group-hover:text-blue-500">
                      <Plus className="mb-2" size={24} />
                      <span className="text-xs font-medium">추가</span>
                    </div>
                  )}

                  <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                </label>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* --- 상세 콘텐츠 섹션 --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <span className="bg-brand-primary-cta flex h-6 w-6 items-center justify-center rounded-full text-xs">2</span>
              상세 콘텐츠
            </h2>
          </div>

          <div className="space-y-6">
            {form.contents.map((section, index) => (
              <div key={section.id !== 0 ? section.id : `new-${index}`} className="relative rounded-lg border border-slate-200 bg-slate-50/50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600">섹션 {index + 1}</span>
                  <button type="button" onClick={() => removeSection(section.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Input label="소제목" type="text" value={section.subTitle} onChange={(e) => updateSection(section.id, 'subTitle', e.target.value)} placeholder="소제목을 입력하세요" />
                    <textarea
                      value={section.text}
                      onChange={(e) => updateSection(section.id, 'text', e.target.value)}
                      placeholder="본문 내용을 입력하세요"
                      rows={5}
                      className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="min-h-35 rounded border border-slate-200 bg-white p-3">
                      <div className="mb-2 grid grid-cols-3 gap-2">
                        {section.imageUrls.map((url, imgIdx) => (
                          <div key={imgIdx} className="group relative aspect-square overflow-hidden rounded border border-slate-100">
                            <img src={typeof url === 'string' ? url : URL.createObjectURL(url)} alt="content" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeSectionImage(section.id, url)}
                              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded border border-dashed border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-500">
                          <Plus size={20} />
                          <span className="mt-1 text-[10px]">추가</span>
                          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleSectionImageAdd(section.id, e)} />
                        </label>
                      </div>
                    </div>
                    <p className="text-right text-xs text-slate-400">{section.imageUrls.length}개의 이미지 선택됨</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSection}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 py-4 text-sm text-slate-500 transition-colors hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600"
          >
            <Plus size={16} /> 새로운 섹션 추가하기
          </button>
        </section>

        <div className="flex justify-end pt-4">
          <button
            disabled={isPending}
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:bg-slate-400"
          >
            <Save size={18} /> {isEditMode ? '게시글 수정 저장' : '게시글 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}

const Input = ({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input {...props} className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${className}`} />
    </div>
  );
};
