'use client';
import { useState } from 'react';
import { Save, CheckCircle2, Image as ImageIcon, Plus, Settings, RefreshCw } from 'lucide-react';
import { useAddRecruitment } from '../hooks/useAddRecruitment';
import { useEditRecruitment } from '../hooks/useEditRecruitment';
import { useRecruitmentField } from 'entities/recruitment-field';
import type { RecruitmentForm as RecruitmentFormType } from '../types/form';
import { Recruitment } from 'entities/recruitment';
import Link from 'next/link';

export function MemberRecruitmentForm({ initialData }: { initialData?: Recruitment }) {
  const isEditMode = Boolean(initialData);
  const { addRecruitment, isPending: isAddPending } = useAddRecruitment();
  const { editRecruitment, isPending: isEditPending } = useEditRecruitment();
  const { data: recruitmentField, refetch, isFetching } = useRecruitmentField();

  const isPending = isEditMode ? isEditPending : isAddPending;

  const [form, setForm] = useState<RecruitmentFormType>({
    title: initialData?.title || '',
    body: initialData?.body || '',
    thumbnail: initialData?.thumbnail || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    capacity: initialData?.capacity || 0,
    targetAudience: initialData?.targetAudience || '',
    applyLink: initialData?.applyLink || '',
    fieldIds: initialData?.fields.map((field) => field.id) || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      editRecruitment(initialData.id, form);
    } else {
      addRecruitment(form);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleFieldToggle = (fieldId: number) => {
    setForm((prev) => ({
      ...prev,
      fieldIds: prev.fieldIds.includes(fieldId) ? prev.fieldIds.filter((id) => id !== fieldId) : [...prev.fieldIds, fieldId]
    }));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">{isEditMode ? '모집 공고 수정' : '신입 부원 모집 등록'}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">1</span>
            공고 기본 정보
          </h2>

          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-4">
              <Input label="공고 제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="예: 앱센터 18기 모집" />
              <div className="h-full space-y-1">
                <label className="text-sm font-medium text-slate-700">모집 설명</label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="h-full w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="모집 설명을 입력하세요"
                />
              </div>
            </div>

            {/* 오른쪽: 썸네일 업로드 영역 */}
            <div className="flex w-92 flex-col">
              <span className="mb-1 text-sm font-medium text-slate-700">대표 썸네일</span>
              <label className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-slate-100 lg:aspect-square">
                {form.thumbnail ? (
                  <>
                    <img src={typeof form.thumbnail === 'string' ? form.thumbnail : URL.createObjectURL(form.thumbnail)} alt="thumb-preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <ImageIcon className="mb-1 text-white" size={24} />
                      <span className="text-xs font-bold text-white">변경하기</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-slate-400 transition-colors group-hover:text-blue-500">
                    <Plus className="mb-1" size={28} />
                    <span className="text-xs font-medium">이미지 업로드</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
              </label>
              <p className="mt-2 text-center text-[11px] text-slate-400">권장 사이즈: 1200 x 630 (px)</p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* 2. 상세 조건 */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">2</span>
            모집 상세 조건
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <Input label="모집 시작일" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              <Input label="모집 종료일" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
            <Input label="모집 인원" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} placeholder="숫자만 입력" />
            <Input label="모집 대상" value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} placeholder="예: 인천대학교 재학생" />
            <Input label="지원 링크(Google Form 등)" value={form.applyLink} onChange={(e) => setForm({ ...form, applyLink: e.target.value })} placeholder="https://..." />
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* 3. 모집 분야 */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">3</span>
            모집 분야 선택
          </h2>
          <div className="flex items-center gap-3">
            <Link
              href="/member/recruitment-field"
              target="_blank"
              onClick={(e) => {
                const ok = confirm('새 탭에 모집 분야 관리 페이지로 이동합니다.');
                if (!ok) {
                  e.preventDefault();
                }
              }}
              className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Settings size={16} />
              <span>
                원하는 모집 분야가 없나요? <b className="underline">모집 분야 관리</b>로 이동
              </span>
            </Link>

            <button
              type="button"
              onClick={() => refetch()}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
              title="목록 새로고침"
            >
              <RefreshCw size={20} className={`transition-all ${isFetching ? 'rotate-180 text-blue-500' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {recruitmentField.map((field) => (
              <button
                key={field.id}
                type="button"
                onClick={() => handleFieldToggle(field.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  form.fieldIds.includes(field.id)
                    ? 'border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {field.name}
                {form.fieldIds.includes(field.id) && <CheckCircle2 size={14} />}
              </button>
            ))}
          </div>
        </section>

        <div className="flex justify-end pt-6">
          <button
            disabled={isPending}
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-12 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-200 disabled:bg-slate-400 disabled:shadow-none"
          >
            <Save size={20} /> {isEditMode ? '수정 사항 저장' : '모집 공고 등록'}
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
      <input {...props} className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`} />
    </div>
  );
};
