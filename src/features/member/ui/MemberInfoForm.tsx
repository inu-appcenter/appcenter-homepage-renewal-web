'use client';
import { useState } from 'react';
import { Phone, Mail, User as UserIcon, GraduationCap, Github, LinkIcon, Camera, X, Hash, FileUser } from 'lucide-react';
import { useMemberActions, useMemberByMember } from 'entities/member';
import type { MemberForm as MemberFormType } from 'entities/member';
import { SaveButton } from 'shared/ui/button';
import { FormInput } from 'shared/ui/form-input';
import { FormTextarea } from 'shared/ui/text-area';

export function MemberInfoForm() {
  const { data: memberData } = useMemberByMember();
  const { editByMemberMutation } = useMemberActions();

  const [formData, setFormData] = useState<MemberFormType>({
    name: memberData.name || '',
    description: memberData.description || '',
    profileImage: memberData.profileImage || '',
    blogLink: memberData.blogLink || '',
    email: memberData.email || '',
    gitRepositoryLink: memberData.gitRepositoryLink || '',
    behanceLink: memberData.behanceLink || '',
    phoneNumber: memberData.phoneNumber || '',
    studentNumber: memberData.studentNumber || '',
    department: memberData.department || ''
  });

  const isPending = editByMemberMutation.isPending;

  const handleChange = (field: keyof MemberFormType, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value === '' ? '' : value }));
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
              <button type="button" onClick={() => handleChange('profileImage', '')} className="absolute -top-2 -right-2 rounded-full bg-white p-1.5 text-red-500 shadow-lg hover:bg-red-50">
                <X size={18} />
              </button>
            )}
          </div>
          <FormInput icon={Camera} label="프로필 이미지 URL" value={formData.profileImage} onChange={(e) => handleChange('profileImage', e.target.value)} required />
        </section>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <UserIcon size={18} className="text-slate-400" /> 기본 정보
            </h3>
            <div className="space-y-4">
              <FormInput icon={UserIcon} label="이름" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required />
              <FormInput icon={Mail} label="이메일" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
              <FormInput icon={Phone} label="전화번호" value={formData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} placeholder="010-0000-0000" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <GraduationCap size={18} className="text-slate-400" /> 학적 및 소셜
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormInput icon={Hash} label="학번" value={formData.studentNumber} onChange={(e) => handleChange('studentNumber', e.target.value)} required />
                <FormInput icon={GraduationCap} label="학과" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
              </div>
              <FormInput icon={Github} label="깃허브" value={formData.gitRepositoryLink} onChange={(e) => handleChange('gitRepositoryLink', e.target.value)} placeholder="https://www.github.com/..." />
              <FormInput icon={FileUser} label="포트폴리오" value={formData.behanceLink} onChange={(e) => handleChange('behanceLink', e.target.value)} placeholder="https://www.portfolio.com/..." />
              <FormInput icon={LinkIcon} label="블로그" value={formData.blogLink} onChange={(e) => handleChange('blogLink', e.target.value)} placeholder="https://velog.io/..." />
            </div>
          </div>
        </div>

        <FormTextarea label="자기 소개" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="자신을 짧게 소개해 주세요." />

        <SaveButton disabled={isPending} type="submit" className="fixed right-20 bottom-10 z-50 flex w-50 items-center gap-3 shadow">
          변경 사항 저장
        </SaveButton>
      </form>
    </div>
  );
}
