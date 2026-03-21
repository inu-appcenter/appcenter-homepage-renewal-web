'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, Hash, ArrowLeft, Search, Copy, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useFindActions } from 'entities/sign';
import { formatPhoneNumber } from 'shared/utils/phoneNumber';

type FindMethod = 'email' | 'phone' | 'studentId';

export function FindIdPage() {
  const [name, setName] = useState('');
  const [method, setMethod] = useState<FindMethod>('email');
  const [value, setValue] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const { findIdMutation } = useFindActions();

  const methodConfig = {
    email: { label: '이메일', icon: Mail, placeholder: 'example@email.com', type: 'email' },
    phone: { label: '전화번호', icon: Phone, placeholder: '010-0000-0000', type: 'tel' },
    studentId: { label: '학번', icon: Hash, placeholder: '200201234', type: 'text' }
  };

  const Icon = methodConfig[method].icon;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findIdMutation.mutate({
      name,
      email: method === 'email' ? value : undefined,
      phoneNumber: method === 'phone' ? value : undefined,
      studentNumber: method === 'studentId' ? value : undefined
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (method === 'phone') {
      inputValue = formatPhoneNumber(inputValue);
    }

    if (method === 'phone' && inputValue.length > 13) return;

    setValue(inputValue);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      {/* 상단 헤더 섹션 */}
      <div className="mb-10 text-center">
        <Link href="/login" className="group mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          로그인으로 돌아가기
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{findIdMutation.isSuccess ? '아이디 확인' : '아이디 찾기'}</h1>
        <p className="mt-2 font-medium text-gray-400">{findIdMutation.isSuccess ? '입력하신 정보와 일치하는 아이디입니다.' : '아이디를 찾기 위한 정보를 입력해주세요.'}</p>
      </div>

      <div className="w-full max-w-100">
        <AnimatePresence mode="wait">
          {!findIdMutation.isSuccess ? (
            <motion.div key="find-form" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-8">
              <div className="flex rounded-xl bg-gray-900 p-1.5 ring-1 ring-gray-800">
                {(Object.keys(methodConfig) as FindMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMethod(m);
                      setValue('');
                    }}
                    className={`relative flex-1 py-2.5 text-sm font-bold transition-all ${method === m ? 'text-black' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {method === m && <motion.div layoutId="activeTab" className="bg-brand-primary-cta absolute inset-0 rounded-lg" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                    <span className="relative z-10">{methodConfig[m].label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold tracking-wider text-gray-500 uppercase">성명</label>
                  <div className="group relative">
                    <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-4 pl-12 text-white transition-all focus:ring-1 focus:outline-none"
                      placeholder="이름을 입력하세요"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold tracking-wider text-gray-500 uppercase">{methodConfig[method].label}</label>
                  <div className="group relative">
                    <Icon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-white" />
                    <input
                      type={methodConfig[method].type}
                      value={value}
                      onChange={handleValueChange}
                      className="focus:border-brand-primary-cta focus:ring-brand-primary-cta w-full rounded-xl border border-gray-800 bg-gray-900 py-4 pl-12 text-white transition-all focus:ring-1 focus:outline-none"
                      placeholder={methodConfig[method].placeholder}
                      required
                    />
                  </div>
                </div>

                {findIdMutation.isError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg bg-red-950/30 py-3 text-center text-sm font-medium text-red-400 ring-1 ring-red-900/50">
                    일치하는 정보가 없습니다. 다시 확인해 주세요.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={findIdMutation.isPending}
                  className="bg-brand-primary-cta hover:bg-brand-primary-cta/90 flex w-full items-center justify-center gap-2 rounded-xl py-4.5 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {findIdMutation.isPending ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-5 w-5 rounded-full border-2 border-black border-t-transparent" />
                  ) : (
                    <>
                      <Search size={19} strokeWidth={2.5} />
                      아이디 찾기
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="find-result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center rounded-2xl text-center">
              <div className="bg-brand-primary-cta/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Check className="text-brand-primary-cta h-10 w-10" strokeWidth={1.5} />
              </div>

              <div
                onClick={() => handleCopy(findIdMutation.data.msg)}
                className="group hover:ring-brand-primary-cta/50 relative mt-4 mb-10 w-full cursor-pointer overflow-hidden rounded-xl bg-black px-6 py-5 ring-1 ring-gray-800 transition-all active:bg-zinc-900"
              >
                <span className="text-2xl font-bold tracking-wider text-white">{findIdMutation.data.msg}</span>
                <div className="group-hover:text-brand-primary-cta absolute top-1/2 right-4 -translate-y-1/2 text-gray-600 transition-colors">
                  {isCopied ? <span className="text-xs font-bold">복사됨!</span> : <Copy size={18} />}
                </div>
              </div>

              <div className="flex w-full flex-col gap-3">
                <Link href="/login" className="bg-brand-primary-cta flex w-full items-center justify-center rounded-xl py-4 font-bold text-black transition-transform active:scale-95">
                  로그인하러 가기
                </Link>
                <Link href="/find-password" className="group flex items-center justify-center gap-1 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-300">
                  비밀번호를 잊으셨나요?
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
