'use client';
import { useState } from 'react';
import { Save, Loader2, Phone, Mail, User as UserIcon, GraduationCap, Github, LinkIcon, Camera, X, Hash, FileUser } from 'lucide-react';

import { useMemberActions, useMemberByMember } from 'entities/member';
import type { MemberForm as MemberFormType } from 'entities/member';

export function MemberInfoForm() {
  const { data: memberData } = useMemberByMember();
  const { editByMemberMutation } = useMemberActions();

  const [formData, setFormData] = useState<MemberFormType>({
    name: memberData?.name || '',
    description: memberData?.description || null,
    profileImage: memberData?.profileImage || null,
    blogLink: memberData?.blogLink || null,
    email: memberData?.email || null,
    gitRepositoryLink: memberData?.gitRepositoryLink || null,
    behanceLink: memberData?.behanceLink || null,
    phoneNumber: memberData?.phoneNumber || null,
    studentNumber: memberData?.studentNumber || null,
    department: memberData?.department || null
  });

  const isPending = editByMemberMutation.isPending;

  const handleChange = (field: keyof MemberFormType, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value === '' ? null : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editByMemberMutation.mutateAsync(formData);
  };

  return (
    <div className="mx-auto mt-4 w-full rounded-3xl border border-slate-200 bg-white p-12 shadow-xl shadow-slate-200/50">
      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="flex flex-col items-center gap-6 border-b border-slate-100 pb-10 md:flex-row md:items-end">
          <div className="group relative">
            <div className="h-32 w-32 overflow-hidden rounded-3xl bg-slate-50 shadow-inner ring-4 ring-white">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-4xl text-slate-400">{formData.name ? formData.name.charAt(0) : <UserIcon size={48} />}</div>
              )}
            </div>
            {formData.profileImage && (
              <button type="button" onClick={() => handleChange('profileImage', null)} className="absolute -top-2 -right-2 rounded-full bg-white p-1.5 text-red-500 shadow-lg hover:bg-red-50">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="w-full max-w-md flex-1 space-y-3">
            <label className="ml-1 text-sm font-bold text-slate-700">프로필 이미지 URL</label>
            <div className="relative">
              <Camera className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300" size={18} />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 pl-12 text-sm transition-all outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
                placeholder="이미지 주소를 입력하세요"
                value={formData.profileImage || ''}
                onChange={(e) => handleChange('profileImage', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* 메인 정보 그리드 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* 왼쪽 컬럼: 인적 사항 */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <UserIcon size={18} className="text-slate-400" /> 기본 정보
            </h3>
            <div className="space-y-4">
              <FormInput icon={UserIcon} label="이름" value={formData.name} onChange={(v) => handleChange('name', v)} required />
              <FormInput icon={Mail} label="이메일" type="email" value={formData.email} onChange={(v) => handleChange('email', v)} />
              <FormInput icon={Phone} label="전화번호" value={formData.phoneNumber} onChange={(v) => handleChange('phoneNumber', v)} placeholder="010-0000-0000" />
            </div>
          </div>

          {/* 오른쪽 컬럼: 학적 및 소셜 */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <GraduationCap size={18} className="text-slate-400" /> 학적 및 소셜
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormInput icon={Hash} label="학번" value={formData.studentNumber} onChange={(v) => handleChange('studentNumber', v)} required />
                <FormInput icon={GraduationCap} label="학과" value={formData.department} onChange={(v) => handleChange('department', v)} />
              </div>

              <FormInput icon={Github} label="깃허브" value={formData.gitRepositoryLink} onChange={(v) => handleChange('gitRepositoryLink', v)} placeholder="https://www.github.com/..." />

              <FormInput icon={FileUser} label="포트폴리오" value={formData.behanceLink} onChange={(v) => handleChange('behanceLink', v)} placeholder="https://www.portfolio.com/..." />

              <FormInput icon={LinkIcon} label="블로그" value={formData.blogLink} onChange={(v) => handleChange('blogLink', v)} placeholder="https://velog.io/..." />
            </div>
          </div>
        </div>

        {/* 하단 전체 너비: 자기소개 */}
        <section className="space-y-4">
          <label className="ml-1 text-[12px] font-bold text-zinc-400 uppercase">자기소개</label>
          <div className="relative">
            <textarea
              rows={4}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm transition-all outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              placeholder="자신을 짧게 소개해 주세요."
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </section>

        {/* 저장 버튼 */}
        <div className="fixed right-20 bottom-10 z-50 flex items-center gap-3">
          <button
            disabled={isPending || !formData.name || !formData.studentNumber}
            type="submit"
            className="group bg-brand-primary-cta hover:bg-brand-primary-cta/90 flex items-center gap-2.5 rounded-2xl px-6 py-4 font-bold tracking-tight text-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:grayscale sm:px-8"
          >
            {isPending ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm sm:text-base">저장 중...</span>
              </>
            ) : (
              <>
                <Save size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                <span className="text-sm sm:text-base">변경 사항 저장</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  icon: React.ElementType;
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}
function FormInput({ icon: Icon, label, value, onChange, ...props }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="ml-1 text-[12px] font-bold text-zinc-400 uppercase">{label}</label>
      <div className="relative">
        <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300" size={16} />
        <input
          className="w-full rounded-xl border border-slate-100 bg-slate-50/50 p-3 pl-11 text-sm transition-all outline-none focus:border-slate-900 focus:bg-white focus:ring-0"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      </div>
    </div>
  );
}
