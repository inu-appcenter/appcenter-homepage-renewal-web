'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Project, projectApi } from 'entities/project';

import { ProjectFormType, StepType } from '../types/form';

import { useProjectSubmit } from '../hooks/useProjectSubmit';

import { MainSectionForm } from './MainSectionForm';
import { IntroduceSectionForm } from './IntroduceSectionForm';
import { GridSectionForm } from './GridSectionForm';
import { StepIndicator } from './StepIndicator';

export const ProjectForm = ({ initialData }: { initialData?: Project }) => {
  const router = useRouter();
  const [projectId, setProjectId] = useState<number | null>(initialData?.id || null);
  const [step, setStep] = useState<StepType>('main');
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
    images: Object.entries(initialData?.images || [null, null]).map(([id, url]) => ({
      id: Number(id),
      url: url as string
    }))
  });

  const isFormValid = form.title.trim().length > 0 && form.subTitle.trim().length > 0 && Boolean(form.images[0]) && Boolean(form.images[1]);

  const { submit, isPending } = useProjectSubmit(
    projectId
      ? {
          mode: 'edit',
          projectId: projectId,
          onSuccess: () => {
            if (step === 'grid') {
              router.push('/admin/project');
              router.refresh();
            } else if (step === 'introduce') {
              setStep('grid');
            }
          }
        }
      : {
          mode: 'create',
          onSuccess: async (id: number) => {
            try {
              const updatedData = await projectApi.getById(id);

              if (updatedData) {
                setForm({
                  title: updatedData.title,
                  subTitle: updatedData.subTitle,
                  isActive: updatedData.isActive,
                  githubLink: updatedData.githubLink || '',
                  androidStoreLink: updatedData.androidStoreLink || '',
                  appleStoreLink: updatedData.appleStoreLink || '',
                  webSiteLink: updatedData.websiteLink || '',
                  body: updatedData.body || '',
                  stacks: updatedData.stacks?.map((s) => s.id) || [],
                  groups: updatedData.groups?.map((g) => g.group_id) || [],
                  images: Object.entries(updatedData.images || {}).map(([imgId, url]) => ({
                    id: Number(imgId),
                    url: url as string
                  }))
                });

                // 3. ID 설정 및 다음 단계로 이동
                setProjectId(id);
                setStep('grid');
              }
            } catch (error) {
              console.error('데이터를 불러오는 중 오류 발생:', error);
              alert('프로젝트는 생성되었으나 데이터를 불러오지 못했습니다.');
            }
          }
        }
  );

  const renderStepContent = () => {
    switch (step) {
      case 'main':
        return <MainSectionForm form={form} setForm={setForm} setStep={setStep} />;
      case 'introduce':
        return <IntroduceSectionForm form={form} setForm={setForm} setStep={setStep} />;
      case 'grid':
        return <GridSectionForm form={form} setForm={setForm} projectId={projectId} />;
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (step === 'main') {
      if (isFormValid) setStep('introduce');
    } else if (step === 'introduce') {
      submit(form);
    } else if (step === 'grid') {
      submit(form);
    }
  };
  const handlePrev = () => {
    if (step === 'introduce') {
      setStep('main');
    } else if (step === 'grid') {
      setStep('introduce');
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto mb-12 w-full max-w-3xl">
        <StepIndicator currentStep={step} />
      </div>

      <section className="bg-background w-full flex-1 rounded-2xl">
        {renderStepContent()}

        <div className="fixed right-24 bottom-10 z-50 flex items-center gap-4">
          {step !== 'main' && (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isPending}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-xl font-semibold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" size={20} />
              <span className="font-medium">이전</span>
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isFormValid || isPending}
            className="group bg-brand-primary-cta text-custom-black flex items-center gap-2 rounded-full px-6 py-4 text-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span className="font-medium">저장 중...</span>
              </>
            ) : (
              <>
                <span className="font-medium">{step === 'grid' ? '완료' : '다음'}</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
