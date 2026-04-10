'use client';
import { useState } from 'react';
import { ArrowRight, Loader2, User, Lock, Mail, EyeOff, Eye, Camera, X, Phone, Hash, GraduationCap, Github, Link as LinkIcon, FileText, Key, Tag, Text } from 'lucide-react';
import { Logo } from 'shared/icon/Logo';
import { SignUpRequest, useSignActions } from 'entities/sign';
import { SignUpSuccessView } from './SignupSuccess';
import { formatPhoneNumber } from 'shared/utils/phoneNumber';
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

export function SignUpPage() {
  // account -> basic -> profile 순으로 이동
  const [currentStep, setCurrentStep] = useState<StepType>('account');
  const [formData, setFormData] = useState<SignUpForm>(DEFAULT_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signupMutation } = useSignActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'phoneNumber') {
      value = formatPhoneNumber(value);
    }

    if (name === 'registrationCode') {
      value = value.toUpperCase();
    }
    const isOptionalField = ['description', 'profileImage', 'blogLink', 'gitRepositoryLink', 'behanceLink', 'department'].includes(name);
    setFormData((prev) => ({ ...prev, [name]: isOptionalField && value === '' ? null : value }));
  };

  const handlePrev = () => {
    setError(null);
    if (currentStep === 'profile') setCurrentStep('basic');
    else if (currentStep === 'basic') setCurrentStep('account');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentStep === 'account') {
      if (formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      setCurrentStep('basic');
      return;
    }

    if (currentStep === 'basic') {
      setCurrentStep('profile');
      return;
    }

    if (currentStep === 'profile') {
      const { confirmPassword, ...submitData } = formData;

      signupMutation.mutate(submitData, {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (err: any) => {
          setError(err.message || '회원가입 중 오류가 발생했습니다.');
        }
      });
    }
  };

  if (isSuccess) {
    return <SignUpSuccessView />;
  }

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
          {currentStep === 'account' && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-3 duration-300">
              <Input icon={User} type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="사용할 아이디" required />
              <Input
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                required
                rightElement={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-white">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <Input icon={Lock} type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="비밀번호 확인" required />
            </div>
          )}

          {currentStep === 'basic' && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-3 duration-300">
              <p className="text-brand-primary-cta/80 mb-2 ml-1 text-xs">기존 회원이신 경우, 입력하신 이메일과 전화번호를 통해 이전 정보가 자동 연동됩니다.</p>
              <div className="grid grid-cols-2 gap-2.5">
                <Input icon={Tag} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="이름" required />
                <Input icon={Hash} type="text" name="studentNumber" value={formData.studentNumber} onChange={handleChange} placeholder="학번" required />
              </div>
              <Input icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일" required />
              <Input icon={Phone} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="전화번호 (010-0000-0000)" required />
            </div>
          )}

          {currentStep === 'profile' && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-3 duration-300">
              <Input icon={Key} type="text" name="registrationCode" value={formData.registrationCode} onChange={handleChange} placeholder="인증 코드 (어드민에게 문의하세요)" required />
              <p className="mb-2 ml-1 text-xs text-gray-400">모두 선택 항목입니다. 나중에 마이페이지에서 수정할 수 있습니다.</p>

              <div className="flex items-center gap-3 pb-2">
                <div className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-700 bg-gray-800">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500">{formData.name ? formData.name.charAt(0) : <User size={20} />}</div>
                  )}
                  {formData.profileImage && (
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, profileImage: null }))}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
                <div className="w-full">
                  <Input icon={Camera} type="text" name="profileImage" value={formData.profileImage || ''} onChange={handleChange} placeholder="이미지 URL (https://...)" />
                </div>
              </div>

              <Input icon={GraduationCap} type="text" name="department" value={formData.department || ''} onChange={handleChange} placeholder="학과/학부" />
              <Input icon={Text} type="text" name="description" value={formData.description || ''} onChange={handleChange} placeholder="짧은 자기소개" />

              <div className="grid grid-cols-1 gap-3 pt-1">
                <Input icon={Github} type="text" name="gitRepositoryLink" value={formData.gitRepositoryLink || ''} onChange={handleChange} placeholder="GitHub 링크" />
                <Input icon={FileText} type="text" name="behanceLink" value={formData.behanceLink || ''} onChange={handleChange} placeholder="포트폴리오 링크" />
                <Input icon={LinkIcon} type="text" name="blogLink" value={formData.blogLink || ''} onChange={handleChange} placeholder="블로그 링크" />
              </div>
            </div>
          )}

          {error && <div className="rounded-lg border border-red-900/50 bg-red-900/20 py-2.5 text-center text-sm font-semibold text-red-400">{error}</div>}

          <div className="flex gap-3 pt-4">
            {currentStep !== 'account' && (
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
