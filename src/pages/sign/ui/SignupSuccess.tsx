import confetti from 'canvas-confetti';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SignUpSuccessView() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  useEffect(() => {
    triggerConfetti();
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 pb-20 text-center">
      <h1 className="animate-in slide-in-from-bottom-4 mb-4 text-4xl font-extrabold tracking-tight text-white delay-150 duration-700 sm:text-5xl">
        <span className="text-brand-primary-cta">🥳가입을 축하합니다!</span>
      </h1>

      <p className="animate-in slide-in-from-bottom-3 mb-12 max-w-md text-lg leading-relaxed text-gray-300 delay-300 duration-700">
        앱센터의 새로운 구성원이 되신 것을 진심으로 환영합니다.
        <br className="hidden sm:block" />
        <strong>로그인</strong> 후 구성원 전용 기능을 자유롭게 이용해보세요!
      </p>

      <div className="animate-in fade-in flex flex-col items-center gap-4 rounded-2xl p-6 backdrop-blur-sm delay-500 duration-1000">
        <div className="flex items-center gap-2.5 text-gray-400">
          <Loader2 className="text-brand-primary-cta h-5 w-5 animate-spin" />
          <p className="text-sm font-medium">
            잠시 후 로그인 페이지로 이동합니다 (<span className="text-brand-primary-cta inline-block w-3 text-center font-bold">{countdown}</span>초)
          </p>
        </div>

        <button
          onClick={() => router.push('/login')}
          className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white/10 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/20 active:scale-95"
        >
          <span className="transition-transform duration-300 ease-out group-hover:-translate-x-2.5">기다리지 않고 바로 이동</span>

          <ArrowRight className="absolute right-2 h-4 w-4 translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}
