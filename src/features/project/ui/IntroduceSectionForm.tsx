'use client';
import { Suspense, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ProjectFormType, StepType } from '../types/form';
import { SelectButton, StackForm, TeamForm } from './introduce-section';

interface IntroduceSectionFormProps {
  form: ProjectFormType;
  setForm: React.Dispatch<React.SetStateAction<ProjectFormType>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}
export const IntroduceSectionForm = ({ form, setForm }: IntroduceSectionFormProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <section className="mx-20 flex h-screen flex-col items-center justify-center gap-10">
      <div className="relative flex flex-row gap-30">
        {['사용 스택', '팀원 정보', '이용 현황'].map((tab, index) => (
          <SelectButton key={index} text={tab} isSelected={selectedTab === index} onClick={() => setSelectedTab(index)} />
        ))}
      </div>
      <div className="bg-custom-black h-118.5 w-full overflow-hidden rounded-2xl p-8 text-5xl whitespace-pre-line text-white">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          {selectedTab === 0 && <StackForm form={form} setForm={setForm} />}
          {selectedTab === 1 && <TeamForm form={form} setForm={setForm} />}
          {selectedTab === 2 && '아직 미구현'}
        </Suspense>
      </div>
    </section>
  );
};
