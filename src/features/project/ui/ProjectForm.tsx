'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from 'entities/project';
import { useRoleContext } from 'entities/sign';
import { SaveButton } from 'shared/ui/button';

import { ProjectFormType, ProjectImage } from '../types/form';
import { useProjectSubmit } from '../hooks/useProjectSubmit';
import { StackForm } from './StackForm';
import { MemberForm } from './MemberForm';

import dynamic from 'next/dynamic';
import { Input } from 'shared/ui/form-input';
import { ImageInput } from 'shared/ui/image-input';
// CloudFlare Workers 환경에서는 3MIB로 제한되므로, 동적 임포트로 최적화
const MarkdownEditor = dynamic(() => import('shared/ui/markdown-editor').then((mod) => mod.MarkdownEditor), {
  ssr: false,
  loading: () => <div className="min-h-37.5 w-full animate-pulse rounded-lg bg-slate-100 p-4 text-slate-400">에디터를 불러오는 중입니다...</div>
});

export const ProjectForm = ({ initialData }: { initialData?: Project }) => {
  const router = useRouter();
  const { mode } = useRoleContext();
  const isEditMode = Boolean(initialData);

  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [form, setForm] = useState<ProjectFormType>({
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
    images: Object.entries(initialData?.images || ['', '']).map(([id, url]) => ({
      id: Number(id),
      url: url
    }))
  });

  const { submit, isPending } = useProjectSubmit(
    initialData?.id
      ? {
          mode: 'edit',
          projectId: initialData.id,
          onSuccess: () => {
            router.push(`/${mode}/project`);
          }
        }
      : {
          mode: 'create',
          onSuccess: () => {
            router.push(`/${mode}/project`);
          }
        }
  );

  const handleImageChange = (file: File | null, index: 0 | 1) => {
    if (file === null) {
      removeSpecificImage(index);
      return;
    }
    setForm((prev) => {
      const newImages = [...prev.images];
      const existingImage = newImages[index];
      const newId = existingImage.url === '' ? Date.now() + index : existingImage.id;
      newImages[index] = { id: newId, url: URL.createObjectURL(file), file };
      return { ...prev, images: newImages };
    });
  };

  const removeSpecificImage = async (index: 0 | 1) => {
    const target = form.images[index];
    if (target && typeof target.url === 'string' && target.url !== '' && isEditMode) {
      if (target.id) {
        setDeletedImageIds((prev) => [...prev, target.id]);
      }
    }
    setForm((prev) => {
      const newImages = [...prev.images];
      const existingImage = newImages[index];
      newImages[index] = { id: existingImage.id, url: '' };
      return { ...prev, images: newImages };
    });
  };

  const addDetailImages = (files: File[]) => {
    const newImageObjs = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      file
    }));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...newImageObjs] }));
  };

  const removeDetailImage = (id: number, image: ProjectImage) => {
    if (!image.file) setDeletedImageIds((prev) => [...prev, id]);
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img, idx) => idx < 2 || img?.id !== id)
    }));
  };

  const replaceDetailImage = (image: ProjectImage, file: File) => {
    if (!image.file) setDeletedImageIds((prev) => [...prev, image.id]);
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((img) => (img.id === image.id ? { id: Date.now(), url: URL.createObjectURL(file), file } : img))
    }));
  };

  const appIconValue: File | string | null = form.images[0]?.file ?? (form.images[0]?.url || null);
  const thumbnailValue: File | string | null = form.images[1]?.file ?? (form.images[1]?.url || null);
  const detailImages = form.images.length > 2 ? form.images.slice(2).filter(Boolean) : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{isEditMode ? '프로젝트 수정' : '프로젝트 등록'}</h1>
        <label className="flex cursor-pointer items-center gap-2">
          <span className="text-sm font-medium text-slate-600">앱 상태</span>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(form, deletedImageIds);
        }}
        className="space-y-8"
      >
        {/* 1. 기본 정보 섹션 */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">1</span>
            기본 정보
          </h2>

          <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col gap-6">
              <ImageInput label="앱 아이콘" value={appIconValue} onChange={(file) => handleImageChange(file, 0)} className="w-32 md:w-40" />

              <div className="flex flex-col gap-4">
                <Input label="프로젝트명" required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="프로젝트 이름을 입력하세요" />
                <Input label="부제목 (한줄 소개)" type="text" value={form.subTitle} onChange={(e) => setForm({ ...form, subTitle: e.target.value })} placeholder="짧은 소개글을 입력하세요" />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-800">본문 설명</label>
                  <MarkdownEditor value={form.body} onChange={(val) => setForm({ ...form, body: val })} />
                </div>
              </div>
            </div>

            <ImageInput label="썸네일" value={thumbnailValue} onChange={(file) => handleImageChange(file, 1)} className="w-full shrink-0 md:w-72 lg:w-96" areaClassName="min-h-60 w-full" />
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">2</span>
            관련 링크
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="웹사이트 주소" type="url" value={form.webSiteLink} onChange={(e) => setForm({ ...form, webSiteLink: e.target.value })} placeholder="https://..." />
            <Input label="GitHub 주소" type="url" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} placeholder="https://github.com/..." />
            <Input label="PlayStore 링크" type="url" value={form.androidStoreLink} onChange={(e) => setForm({ ...form, androidStoreLink: e.target.value })} placeholder="PlayStore 링크" />
            <Input label="Apple 스토어 링크" type="url" value={form.appleStoreLink} onChange={(e) => setForm({ ...form, appleStoreLink: e.target.value })} placeholder="App Store 링크" />
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">3</span>
            프로젝트 메타 정보
          </h2>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-800">사용 기술 스택</label>
              <div className="relative min-h-62.5 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <StackForm form={form} setForm={setForm} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-800">참여 팀원</label>
              <div className="relative min-h-62.5 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <MemberForm form={form} setForm={setForm} />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">4</span>
              프로젝트 상세 이미지
            </h2>
            <span className="text-sm text-slate-500">{detailImages.length}개의 이미지</span>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {detailImages.map((image) => (
                <ImageInput
                  key={image.id}
                  value={image.file ?? (image.url || null)}
                  onChange={(file) => (file ? replaceDetailImage(image, file) : removeDetailImage(image.id, image))}
                  className="w-full"
                  areaClassName="aspect-square"
                />
              ))}
              <ImageInput
                value={null}
                onChange={(file) => {
                  if (file) addDetailImages([file]);
                }}
                className="w-full"
                areaClassName="aspect-square"
              />
            </div>
          </div>
        </section>
        <div className="fixed right-20 bottom-10 z-50 flex items-center gap-3">
          <SaveButton disabled={isPending} type="submit" className="w-50">
            {isEditMode ? '변경사항 저장' : '프로젝트 등록'}
          </SaveButton>
        </div>
      </form>
    </div>
  );
};
