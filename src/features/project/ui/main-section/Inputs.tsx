import { ChangeEvent } from 'react';
import { WebLink, AppStore, GooglePlay } from 'entities/link';
import { ProjectFormType } from '../../types/form';
import { GitHub } from 'shared/icon/GitHub';

interface InputProps {
  form: ProjectFormType;
  onChange: (key: keyof ProjectFormType) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export const LinkInput = ({ form, onChange }: InputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="ml-1 block text-xs font-bold tracking-wider text-gray-500">관련 링크</label>
      <div
        className={
          'group bg-surface-elevated focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:bg-[#202024] focus-within:ring-1 hover:border-white/20'
        }
      >
        <GooglePlay href="#" className="h-8" />
        <div className="h-4 w-px bg-gray-700"></div>
        <input
          type="text"
          placeholder="Google Play 스토어 링크를 입력하세요"
          className={'w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600'}
          value={form.androidStoreLink}
          onChange={onChange('androidStoreLink')}
        />
      </div>
      <div
        className={
          'group bg-surface-elevated focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:bg-[#202024] focus-within:ring-1 hover:border-white/20'
        }
      >
        <AppStore href="#" className="h-8" />
        <div className="h-4 w-px bg-gray-700"></div>
        <input
          type="text"
          placeholder="App Store 스토어 링크를 입력하세요"
          className={'w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600'}
          value={form.appleStoreLink}
          onChange={onChange('appleStoreLink')}
        />
      </div>
      <div
        className={
          'group bg-surface-elevated focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:bg-[#202024] focus-within:ring-1 hover:border-white/20'
        }
      >
        <WebLink href="#" className="h-8" />
        <div className="h-4 w-px bg-gray-700"></div>
        <input
          type="text"
          placeholder="웹사이트 URL을 입력하세요"
          className={'w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600'}
          value={form.webSiteLink}
          onChange={onChange('webSiteLink')}
        />
      </div>
      <div
        className={
          'group bg-surface-elevated focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all focus-within:bg-[#202024] focus-within:ring-1 hover:border-white/20'
        }
      >
        <GitHub className="h-8 w-8" />
        <span>GitHub</span>
        <div className="h-4 w-px bg-gray-700"></div>
        <input
          type="text"
          placeholder="깃허브 링크를 입력하세요"
          className={'w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600'}
          value={form.githubLink}
          onChange={onChange('githubLink')}
        />
      </div>
    </div>
  );
};

export const TitleInput = ({ form, onChange }: InputProps) => {
  return (
    <div className="group relative">
      <label className="mb-2 ml-1 block text-xs font-bold text-gray-500">프로젝트 제목 (필수)</label>
      <div className="focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 bg-surface-elevated relative rounded-2xl border border-white/10 px-4 py-4 caret-white transition-all focus-within:ring-1 hover:border-white/20">
        <input
          type="text"
          className="w-full bg-transparent text-[72px] font-bold text-gray-300 outline-none placeholder:text-gray-700"
          placeholder="프로젝트 제목"
          value={form.title}
          onChange={onChange('title')}
        />
      </div>
    </div>
  );
};
export const SubTitleInput = ({ form, onChange }: InputProps) => {
  return (
    <div className="group relative">
      <label className="mb-2 ml-1 block text-xs font-bold text-gray-500">프로젝트 설명 (필수)</label>
      <div className="focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 bg-surface-elevated rounded-2xl border border-white/10 p-5 transition-all focus-within:ring-1 hover:border-white/20">
        <textarea
          className="h-32 w-full resize-none bg-transparent text-xl/7 text-gray-300 outline-none placeholder:text-gray-600"
          placeholder="프로젝트에 대한 핵심 설명을 작성해주세요. (최대 5줄 권장)"
          spellCheck={false}
          value={form.subTitle}
          onChange={onChange('subTitle')}
        />
      </div>
    </div>
  );
};
