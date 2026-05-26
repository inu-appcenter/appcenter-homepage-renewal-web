'use client';
import { useState } from 'react';
import { ArrowRight, Loader2, User, Camera, Phone, Hash, GraduationCap, Github, Link as LinkIcon, FileText, Key, Tag, Text, Mail, Lock } from 'lucide-react';
import { SignUpRequest, useSignActions } from 'entities/sign';
import { Logo } from 'shared/icon/Logo';
import { formatPhoneNumber } from 'shared/utils/phoneNumber';
import { SignUpSuccessView } from './SignupSuccess';
import { GoToLoginLink, Input, StepIndicator, StepType } from './Components';

type SignUpForm = SignUpRequest & { confirmPassword: string };

const DEFAULT_FORM: SignUpForm = {
  registrationCode: '',
  uid: '',
  password: '',
  confirmPassword: '',
  name: '',
  email: '',
  phoneNumber: '',
  studentNumber: '',
  description: null,
  profileImage: null,
  blogLink: null,
  gitRepositoryLink: null,
  behanceLink: null,
  department: null
};

const OPTIONAL_FIELDS = ['description', 'profileImage', 'blogLink', 'gitRepositoryLink', 'behanceLink', 'department'] as const;

const NEXT_STEP: Record<StepType, StepType | null> = { account: 'basic', basic: 'profile', profile: null };
const PREV_STEP: Record<StepType, StepType | null> = { account: null, basic: 'account', profile: 'basic' };

type StepProps = { formData: SignUpForm; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };

export function SignUpPage() {
  const [currentStep, setCurrentStep] = useState<StepType>('account');
  const [formData, setFormData] = useState<SignUpForm>(DEFAULT_FORM);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signupMutation } = useSignActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'phoneNumber') value = formatPhoneNumber(value);
    if (name === 'registrationCode') value = value.toUpperCase();

    const isOptional = (OPTIONAL_FIELDS as readonly string[]).includes(name);
    setFormData((prev) => ({ ...prev, [name]: isOptional && value === '' ? null : value }));
  };

  const handlePrev = () => {
    const prev = PREV_STEP[currentStep];
    if (prev) {
      setCurrentStep(prev);
      setError(null);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentStep === 'account' && formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const next = NEXT_STEP[currentStep];
    if (next) {
      setCurrentStep(next);
      return;
    }

    const { confirmPassword, ...submitData } = formData;
    signupMutation.mutate(submitData, {
      onSuccess: () => setIsSuccess(true),
      onError: (err) => setError(err.message || '회원가입 중 오류가 발생했습니다.')
    });
  };

  if (isSuccess) return <SignUpSuccessView />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 pt-20 pb-12">
      <div className="mb-10 text-center">
        <Logo className="mb-4 inline-block h-10 w-10 text-white" />
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-white">Join Member</h1>
        <p className="text-sm font-medium text-gray-400">앱센터 구성원 전용 회원가입 페이지입니다</p>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-14 px-4">
          <StepIndicator currentStep={currentStep} />
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {currentStep === 'account' && <AccountStep formData={formData} onChange={handleChange} />}
          {currentStep === 'basic' && <BasicStep formData={formData} onChange={handleChange} />}
          {currentStep === 'profile' && <ProfileStep formData={formData} onChange={handleChange} />}

          {error && <div className="rounded-lg border border-red-900/50 bg-red-900/20 py-2.5 text-center text-sm font-semibold text-red-400">{error}</div>}

          <div className="flex gap-3 pt-4">
            {PREV_STEP[currentStep] && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex w-1/3 items-center justify-center rounded-xl border border-gray-700 bg-gray-800 py-4 font-bold text-white transition-all hover:bg-gray-700 active:scale-[0.98]"
              >
                이전
              </button>
            )}
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="group bg-brand-primary-cta hover:bg-brand-primary-cta/80 relative flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {signupMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin text-black" />
              ) : currentStep !== 'profile' ? (
                <>
                  다음 단계로 <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                '가입 완료하기'
              )}
            </button>
          </div>

          <GoToLoginLink />
        </form>
      </div>
    </div>
  );
}

const AccountStep = ({ formData, onChange }: StepProps) => (
  <div className="animate-in fade-in slide-in-from-right-4 space-y-3 duration-300">
    <Input icon={User} type="text" name="uid" value={formData.uid} onChange={onChange} placeholder="사용할 아이디" required autoFocus />
    <Input icon={Lock} type="password" name="password" value={formData.password} onChange={onChange} placeholder="비밀번호" required />
    <Input icon={Lock} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} placeholder="비밀번호 확인" required />
  </div>
);

const BasicStep = ({ formData, onChange }: StepProps) => (
  <div className="animate-in fade-in slide-in-from-right-4 space-y-3 duration-300">
    <p className="text-brand-primary-cta/80 mb-2 ml-1 text-xs">기존 회원이신 경우, 입력하신 이메일과 전화번호를 통해 이전 정보가 자동 연동됩니다.</p>
    <div className="grid grid-cols-2 gap-2.5">
      <Input icon={Tag} type="text" name="name" value={formData.name} onChange={onChange} placeholder="이름" required autoFocus />
      <Input icon={Hash} type="text" name="studentNumber" value={formData.studentNumber} onChange={onChange} placeholder="학번" required />
    </div>
    <Input icon={Mail} type="email" name="email" value={formData.email} onChange={onChange} placeholder="이메일" required />
    <Input icon={Phone} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={onChange} placeholder="전화번호 (010-0000-0000)" required />
  </div>
);

const ProfileStep = ({ formData, onChange }: StepProps) => (
  <div className="animate-in fade-in slide-in-from-right-4 space-y-3 duration-300">
    <Input icon={Key} type="text" name="registrationCode" value={formData.registrationCode} onChange={onChange} placeholder="인증 코드 (어드민에게 문의하세요)" required autoFocus />
    <p className="mb-2 ml-1 text-xs text-gray-400">모두 선택 항목입니다. 나중에 마이페이지에서 수정할 수 있습니다.</p>
    <div className="flex items-center gap-3 pb-2">
      <ProfileImagePreview name={formData.name} profileImage={formData.profileImage} />
      <div className="w-full">
        <Input icon={Camera} type="text" name="profileImage" value={formData.profileImage || ''} onChange={onChange} placeholder="이미지 URL (https://...)" />
      </div>
    </div>
    <Input icon={GraduationCap} type="text" name="department" value={formData.department || ''} onChange={onChange} placeholder="학과/학부" />
    <Input icon={Text} type="text" name="description" value={formData.description || ''} onChange={onChange} placeholder="짧은 자기소개" />
    <div className="grid grid-cols-1 gap-3 pt-1">
      <Input icon={Github} type="text" name="gitRepositoryLink" value={formData.gitRepositoryLink || ''} onChange={onChange} placeholder="GitHub 링크" />
      <Input icon={FileText} type="text" name="behanceLink" value={formData.behanceLink || ''} onChange={onChange} placeholder="포트폴리오 링크" />
      <Input icon={LinkIcon} type="text" name="blogLink" value={formData.blogLink || ''} onChange={onChange} placeholder="블로그 링크" />
    </div>
  </div>
);

const ProfileImagePreview = ({ name, profileImage }: { name: string; profileImage: string | null | undefined }) => (
  <div className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-700 bg-gray-800">
    {profileImage ? (
      <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-gray-500">{name ? name.charAt(0) : <User size={20} />}</div>
    )}
  </div>
);
