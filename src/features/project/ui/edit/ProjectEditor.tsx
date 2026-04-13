'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Project } from 'entities/project';
import { ProjectFormType } from '../../types/form';
import { useRoleContext } from 'entities/sign';
import { SaveButton } from 'shared/ui/button';
import { IMAGE_SIZE_ERROR_MESSAGE, IMAGE_SIZE_LIMIT } from 'shared/constants/dashBoard';
import { toast } from 'sonner';

// 추가된 모달 폼 컴포넌트 임포트 (경로는 실제 구조에 맞게 수정하세요)
import { StackForm } from './StackForm';
import { MemberForm } from './MemberForm';

// 이미지 타입 정의
type ImageObj = { id: number; url: string | File };

export const ProjectEditor = ({ initialData }: { initialData?: Project }) => {
  const router = useRouter();
  const { mode } = useRoleContext();
  const isEditMode = Boolean(initialData);

  const [projectId, setProjectId] = useState<number | null>(initialData?.id || null);

  const parsedImages = Object.entries(initialData?.images || {}).map(([id, url]) => ({
    id: Number(id),
    url: url as string
  }));

  const initialImages: (ImageObj | null)[] = [parsedImages[0] || null, parsedImages[1] || null, ...parsedImages.slice(2)];

  const [form, setForm] = useState<ProjectFormType & { images: (ImageObj | null)[] }>({
    title: initialData?.title || '',
    subTitle: initialData?.subTitle || '',
    isActive: initialData?.isActive ?? true,
    githubLink: initialData?.githubLink || '',
    androidStoreLink: initialData?.androidStoreLink || '',
    appleStoreLink: initialData?.appleStoreLink || '',
    webSiteLink: initialData?.websiteLink || '',
    body: initialData?.body || '',
    stacks: initialData?.stacks?.map((stack) => stack.id) || [],
    groups: initialData?.groups?.map((group) => group.group_id) || [],
    images: initialImages
  });

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      console.log('제출할 폼 데이터:', form);
      toast.success(isEditMode ? '프로젝트가 수정되었습니다.' : '프로젝트가 등록되었습니다.');
      router.back();
    } catch (error) {
      toast.error('저장에 실패했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  const handleSpecificImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > IMAGE_SIZE_LIMIT) {
        toast.error('이미지 파일 크기는 4MB 이하여야 합니다.');
        e.target.value = '';
        return;
      }
      setForm((prev) => {
        const newImages = [...prev.images];
        newImages[index] = { id: Date.now(), url: file };
        return { ...prev, images: newImages };
      });
      e.target.value = '';
    }
  };

  const removeSpecificImage = async (index: 0 | 1) => {
    const target = form.images[index];
    if (target && typeof target.url === 'string' && isEditMode) {
      if (!confirm('서버에 저장된 이미지를 삭제하시겠습니까?')) return;
    }
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages[index] = null;
      return { ...prev, images: newImages };
    });
  };

  const handleDetailImagesAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const hasLargeFile = newFiles.some((file) => file.size > IMAGE_SIZE_LIMIT);

      if (hasLargeFile) {
        toast.error(IMAGE_SIZE_ERROR_MESSAGE);
        e.target.value = '';
        return;
      }
      const newImageObjs = newFiles.map((file) => ({
        id: Date.now() + Math.random(),
        url: file
      }));
      setForm((prev) => ({ ...prev, images: [...prev.images, ...newImageObjs] }));
      e.target.value = '';
    }
  };

  const removeDetailImage = async (targetId: number, targetUrl: string | File) => {
    if (typeof targetUrl === 'string' && isEditMode) {
      if (!confirm('서버에 저장된 이미지를 삭제하시겠습니까?')) return;
    }
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img, idx) => idx < 2 || img?.id !== targetId)
    }));
  };

  const appIcon = form.images[0];
  const thumbnail = form.images[1];
  const detailImages = form.images.slice(2).filter(Boolean) as ImageObj[];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{isEditMode ? '프로젝트 수정' : '프로젝트 등록'}</h1>
        <label className="flex cursor-pointer items-center gap-2">
          <span className="text-sm font-medium text-slate-600">활성화 상태</span>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. 기본 정보 섹션 */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">1</span>
            기본 정보
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="프로젝트명" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="프로젝트 이름을 입력하세요" />
            <Input label="부제목 (한줄 소개)" type="text" value={form.subTitle} onChange={(e) => setForm({ ...form, subTitle: e.target.value })} placeholder="짧은 소개글을 입력하세요" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400">본문 설명</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={6}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="프로젝트에 대한 상세 설명을 입력하세요"
            />
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* 2. 대표 이미지 섹션 */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">2</span>
            대표 이미지
          </h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex flex-col gap-2 md:w-48">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">앱 아이콘</span>
                {appIcon && (
                  <button type="button" onClick={() => removeSpecificImage(0)} className="text-xs text-red-500 hover:underline">
                    삭제
                  </button>
                )}
              </div>
              <label className="group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-slate-100">
                {appIcon ? (
                  <>
                    <img src={typeof appIcon.url === 'string' ? appIcon.url : URL.createObjectURL(appIcon.url)} alt="app-icon" className="h-full w-full object-cover" />
                    <HoverOverlay label="아이콘 변경" />
                  </>
                ) : (
                  <EmptyImagePlaceholder />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSpecificImageChange(e, 0)} />
              </label>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">리스트 썸네일</span>
                {thumbnail && (
                  <button type="button" onClick={() => removeSpecificImage(1)} className="text-xs text-red-500 hover:underline">
                    삭제
                  </button>
                )}
              </div>
              <label className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-slate-100 md:max-w-md">
                {thumbnail ? (
                  <>
                    <img src={typeof thumbnail.url === 'string' ? thumbnail.url : URL.createObjectURL(thumbnail.url)} alt="thumbnail" className="h-full w-full object-cover" />
                    <HoverOverlay label="썸네일 변경" />
                  </>
                ) : (
                  <EmptyImagePlaceholder />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSpecificImageChange(e, 1)} />
              </label>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* 3. 링크 정보 섹션 */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">3</span>
            관련 링크
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="웹사이트 주소" type="url" value={form.webSiteLink} onChange={(e) => setForm({ ...form, webSiteLink: e.target.value })} placeholder="https://" />
            <Input label="GitHub 주소" type="url" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} placeholder="https://github.com/..." />
            <Input label="Android 스토어 링크" type="url" value={form.androidStoreLink} onChange={(e) => setForm({ ...form, androidStoreLink: e.target.value })} placeholder="Play Store 링크" />
            <Input label="Apple 스토어 링크" type="url" value={form.appleStoreLink} onChange={(e) => setForm({ ...form, appleStoreLink: e.target.value })} placeholder="App Store 링크" />
          </div>
        </section>

        <hr className="border-slate-200" />
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">4</span>
            프로젝트 메타 정보
          </h2>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* 기술 스택 영역 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">사용 기술 스택</label>
              {/* 🚨 overflow-hidden 제거! */}
              <div className="relative min-h-[250px] rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <StackForm form={form} setForm={setForm} />
              </div>
            </div>

            {/* 참여 팀원 영역 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">참여 팀원</label>
              {/* 🚨 overflow-hidden 제거! */}
              <div className="relative min-h-[250px] rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <MemberForm form={form} setForm={setForm} />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* 5. 상세 이미지 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">5</span>
              프로젝트 상세 이미지
            </h2>
            <span className="text-sm text-slate-500">{detailImages.length}개의 이미지</span>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {detailImages.map((image) => (
                <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <img src={typeof image.url === 'string' ? image.url : URL.createObjectURL(image.url)} alt="project-image" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => removeDetailImage(image.id, image.url)}
                      className="flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                    >
                      <Trash2 size={14} /> 삭제
                    </button>
                  </div>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-slate-400 transition-colors hover:border-blue-400 hover:text-blue-500">
                <Plus size={24} className="mb-2" />
                <span className="text-sm font-medium">이미지 추가</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleDetailImagesAdd} />
              </label>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <SaveButton disabled={isPending} type="submit" className="w-50">
            {isEditMode ? '변경사항 저장' : '프로젝트 등록'}
          </SaveButton>
        </div>
      </form>
    </div>
  );
};

// --- 재사용 UI 컴포넌트들 ---
const Input = ({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-slate-400">{label}</label>
    <input {...props} className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${className || ''}`} />
  </div>
);

const EmptyImagePlaceholder = () => (
  <div className="flex flex-col items-center text-slate-400 transition-transform group-hover:text-blue-500">
    <Plus className="mb-2" size={24} />
    <span className="text-xs font-medium">이미지 추가</span>
  </div>
);

const HoverOverlay = ({ label }: { label: string }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
    <div className="flex translate-y-2 transform flex-col items-center gap-2 transition-transform group-hover:translate-y-0">
      <div className="rounded-full bg-white/20 p-2">
        <ImageIcon className="text-white" size={24} />
      </div>
      <span className="text-xs font-bold text-white">{label}</span>
    </div>
  </div>
);
