'use client';
import { useState } from 'react';
import { Pencil, Plus, Trash2, Loader2, Phone, Mail, User, GraduationCap, Github, LinkIcon, FileText, Camera, X, Hash, FileUser } from 'lucide-react';

import { Modal } from 'shared/ui/modal';
import { useMemberActions, type Member, type MemberForm } from 'entities/member';
import { SaveButton } from 'shared/ui/button';
import { formatPhoneNumber } from 'shared/utils/phoneNumber';
import { Input } from 'shared/ui/form-input';

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
  const [formData, setFormData] = useState<MemberForm>(initialData ?? DEFAULT_FORM);

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
          <div className="h-20 w-20 overflow-hidden rounded-lg bg-slate-50 shadow-inner">
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

        <div className="w-full max-w-xs">
          <Input
            icon={Camera}
            disabled={isPending}
            className="py-2"
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
          <Input icon={User} required disabled={isPending} placeholder="이름 (필수)" value={formData.name || ''} className="py-2" onChange={(e) => handleChange('name', e.target.value)} />
          <Input icon={Mail} disabled={isPending} placeholder="이메일" value={formData.email || ''} className="py-2" onChange={(e) => handleChange('email', e.target.value)} />
        </div>
        <Input
          icon={Phone}
          type="tel"
          disabled={isPending}
          placeholder="전화번호 (010-0000-0000)"
          value={formData.phoneNumber || ''}
          className="py-2"
          onChange={(e) => handleChange('phoneNumber', formatPhoneNumber(e.target.value))}
        />
      </section>

      {/* 2. 학적 정보 */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">학적 정보</h3>
        <div className="grid grid-cols-2 gap-3">
          <Input
            icon={Hash}
            required
            disabled={isPending}
            placeholder="학번 (필수)"
            value={formData.studentNumber || ''}
            className="py-2"
            onChange={(e) => handleChange('studentNumber', e.target.value)}
          />
          <Input icon={GraduationCap} disabled={isPending} placeholder="학과/학부" value={formData.department || ''} className="py-2" onChange={(e) => handleChange('department', e.target.value)} />
        </div>
      </section>

      {/* 3. 소셜 및 포트폴리오 링크 */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">소셜 및 링크</h3>
        <div className="grid grid-cols-1 gap-3">
          <Input
            icon={Github}
            disabled={isPending}
            placeholder="GitHub 링크"
            value={formData.gitRepositoryLink || ''}
            className="py-2"
            onChange={(e) => handleChange('gitRepositoryLink', e.target.value)}
          />
          <Input icon={FileUser} disabled={isPending} placeholder="포트폴리오 링크" value={formData.behanceLink || ''} className="py-2" onChange={(e) => handleChange('behanceLink', e.target.value)} />
          <Input icon={LinkIcon} disabled={isPending} placeholder="블로그 링크" value={formData.blogLink || ''} className="py-2" onChange={(e) => handleChange('blogLink', e.target.value)} />
        </div>
      </section>

      {/* 4. 자기소개 */}
      <section className="space-y-3">
        <h3 className="ml-1 text-xs font-bold text-slate-400 uppercase">자기소개</h3>
        <Input
          icon={FileText}
          disabled={isPending}
          placeholder="짧은 소개를 작성해주세요"
          value={formData.description || ''}
          className="py-2"
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </section>
      <SaveButton disabled={isPending || !formData.name || !formData.studentNumber} isPending={isPending}>
        {initialData ? '변경사항 수정' : '저장'}
      </SaveButton>
    </form>
  );
};
