import { Logo } from 'shared/icon/Logo';
import { AnimationButton } from 'shared/ui/animation-button';

export function EmptyRecruit() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <Logo className="h-32 w-32" />
      <div className="text-center text-2xl/10 whitespace-pre-line text-white">
        {`
        지금은 모집 중인 프로젝트가 없어요...
        프로젝트의 모집이 시작되었을 때 다시 알려드릴게요!
        `}
      </div>
      <input
        type="email"
        placeholder="이메일을 작성해주세요"
        className="focus:ring-brand-primary-cta placeholder-custom-gray-500 my-4 w-150 rounded-full border border-gray-600 bg-black/20 px-8 py-4 text-white focus:ring-1 focus:outline-none"
      />
      <AnimationButton href="#">
        <div className="text-xl text-white">이메일 작성하고 알림 받기</div>
      </AnimationButton>
    </section>
  );
}
