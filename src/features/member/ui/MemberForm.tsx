'use client';
import { useState } from 'react';
import { Pencil, Plus, Save, Trash2, Loader2, Phone, Mail, User, GraduationCap, Github, Palette, LinkIcon, FileText, Camera, X, Hash } from 'lucide-react';

import { Modal } from 'shared/ui/modal';
import { useMemberActions, type Member, type MemberForm } from 'entities/member';

export const AddMemberForm = () => {
  const { addMutation } = useMemberActions();

  return (
    <Modal
      title="동아리원 등록"
      trigger={
        <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600">
          <Plus size={18} /> 새 동아리원 추가
        </button>
      }
    >
      {(close) => (
        <MemberForm
          isPending={addMutation.isPending}
          onSubmit={async (data) => {
            await addMutation.mutateAsync(data);
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const EditMemberForm = ({ member }: { member: Member }) => {
  const { editMutation } = useMemberActions();

  return (
    <Modal
      title="동아리원 수정"
      trigger={
        <button className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500">
          <Pencil size={16} />
        </button>
      }
    >
      {(close) => (
        <MemberForm
          initialData={member}
          isPending={editMutation.isPending}
          onSubmit={async (formData) => {
            await editMutation.mutateAsync({ id: member.member_id, data: formData });
            close();
          }}
        />
      )}
    </Modal>
  );
};

export const DeleteMemberButton = ({ memberId }: { memberId: number }) => {
  const { deleteMutation } = useMemberActions();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(memberId);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50" onClick={handleDelete}>
      {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
};

const DEFAULT_FORM: MemberForm = {
  name: '',
  description: null,
  profileImage: null,
  blogLink: null,
  email: null,
  gitRepositoryLink: null,
  behanceLink: null,
  phoneNumber: null,
  studentNumber: null,
  department: null
};
const MemberForm = ({ initialData, onSubmit, isPending }: { initialData?: MemberForm; onSubmit: (data: MemberForm) => void; isPending: boolean }) => {
  const [formData, setFormData] = useState<MemberForm>(initialData || DEFAULT_FORM);

  const handleChange = (field: keyof MemberForm, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value === '' ? null : value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-6"
    >
      {/* 0. 프로필 이미지 섹션 */}
      <section className="flex flex-col items-center justify-center space-y-4">
        <div className="group relative">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-50 shadow-inner">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-3xl text-slate-400">{formData.name ? formData.name.charAt(0) : <User size={40} />}</div>
            )}
          </div>

          {formData.profileImage && (
            <button type="button" onClick={() => handleChange('profileImage', null)} className="absolute -top-1 -right-1 rounded-full bg-white p-1 text-red-500 shadow-md hover:bg-red-50">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="relative w-full max-w-xs">
          <Camera className="absolute top-3 left-4 text-slate-300" size={16} />
          <input
            disabled={isPending}
            className="w-full rounded-xl bg-slate-50 p-3 pl-11 text-xs outline-none focus:ring-2 focus:ring-slate-900/10 disabled:opacity-60"
            placeholder="프로필 이미지 URL을 입력하세요"
            value={formData.profileImage || ''}
            onChange={(e) => handleChange('profileImage', e.target.value)}
          />
        </div>
      </section>

      {/* 1. 기본 인적 사항 */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">기본 정보</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <User className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              required
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm font-semibold outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="이름 (필수)"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="relative">
            <Mail className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="이메일"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>
        <div className="relative">
          <Phone className="absolute top-2.5 left-4 text-slate-300" size={16} />
          <input
            disabled={isPending}
            className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            placeholder="전화번호 (010-0000-0000)"
            value={formData.phoneNumber || ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </div>
      </section>

      {/* 2. 학적 정보 (기존과 동일) */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">학적 정보</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Hash className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              required
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm font-semibold outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="학번 (필수)"
              value={formData.studentNumber || ''}
              onChange={(e) => handleChange('studentNumber', e.target.value)}
            />
          </div>
          <div className="relative">
            <GraduationCap className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="학과/학부"
              value={formData.department || ''}
              onChange={(e) => handleChange('department', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 3. 소셜 및 포트폴리오 링크 (기존과 동일) */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">소셜 및 링크</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="relative">
            <Github className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="GitHub 링크"
              value={formData.gitRepositoryLink || ''}
              onChange={(e) => handleChange('gitRepositoryLink', e.target.value)}
            />
          </div>
          <div className="relative">
            <Palette className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Behance 링크"
              value={formData.behanceLink || ''}
              onChange={(e) => handleChange('behanceLink', e.target.value)}
            />
          </div>
          <div className="relative">
            <LinkIcon className="absolute top-2.5 left-4 text-slate-300" size={16} />
            <input
              disabled={isPending}
              className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="블로그/포트폴리오 링크"
              value={formData.blogLink || ''}
              onChange={(e) => handleChange('blogLink', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 4. 자기소개 (기존과 동일) */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">자기소개</h3>
        <div className="relative">
          <FileText className="absolute top-2.5 left-4 text-slate-300" size={16} />
          <input
            disabled={isPending}
            className="w-full rounded-lg bg-slate-50 p-2 pl-11 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            placeholder="짧은 소개를 작성해주세요"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </section>

      <button
        disabled={isPending || !formData.name}
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 disabled:bg-slate-300"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {isPending ? '처리 중...' : initialData ? '멤버 정보 수정' : '새 멤버 등록'}
      </button>
    </form>
  );
};
