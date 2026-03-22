'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, Hash, Check, Lock, RotateCw, Tag } from 'lucide-react';
import Link from 'next/link';
import { useFindActions } from 'entities/sign';
import { formatPhoneNumber } from 'shared/utils/phoneNumber';
import { GoToLoginLink, Input } from './Components';

type VerifyMethod = 'email' | 'phone' | 'studentId';

export function FindPasswordPage() {
  const [method, setMethod] = useState<VerifyMethod>('email');
  const [formData, setFormData] = useState({
    uid: '',
    name: '',
    value: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { resetPasswordMutation } = useFindActions();

  const methodConfig = {
    email: { label: '이메일', icon: Mail, placeholder: 'example@email.com', type: 'email' },
    phone: { label: '전화번호', icon: Phone, placeholder: '010-0000-0000', type: 'tel' },
    studentId: { label: '학번', icon: Hash, placeholder: '학번 8자리 입력', type: 'text' }
  };

  const Icon = methodConfig[method].icon;

  const handleInputChange = (field: string, val: string) => {
    let finalVal = val;
    if (field === 'value' && method === 'phone') finalVal = formatPhoneNumber(val);
    setFormData((prev) => ({ ...prev, [field]: finalVal }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    resetPasswordMutation.mutate({
      uid: formData.uid,
      name: formData.name,
      email: method === 'email' ? formData.value : undefined,
      phoneNumber: method === 'phone' ? formData.value.replace(/\D/g, '') : undefined,
      studentNumber: method === 'studentId' ? formData.value : undefined,
      newPassword: formData.newPassword
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">비밀번호 재설정</h1>
        <p className="mt-2 text-gray-400">본인 확인 정보와 새 비밀번호를 입력해주세요.</p>
      </div>

      <div className="w-full max-w-105">
        <AnimatePresence mode="wait">
          {resetPasswordMutation.isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center rounded-2xl text-center">
              <div className="bg-brand-primary-cta/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Check className="text-brand-primary-cta h-10 w-10" strokeWidth={1.5} />
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">변경 완료!</h2>
              <p className="mb-8 text-sm text-gray-400">이제 새로운 비밀번호로 로그인할 수 있습니다.</p>
              <Link href="/login" className="bg-brand-primary-cta hover:bg-brand-primary-cta/80 w-full rounded-xl py-4 font-bold text-black transition-all">
                로그인하러 가기
              </Link>
            </motion.div>
          ) : (
            <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-3">
                <Input icon={User} placeholder="구성원 아이디" value={formData.uid} onChange={(e) => handleInputChange('uid', e.target.value)} required />
                <Input icon={Tag} placeholder="이름" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
              </div>

              <div className="space-y-3">
                <div className="flex rounded-xl bg-gray-900 p-1 ring-1 ring-gray-800">
                  {(Object.keys(methodConfig) as VerifyMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMethod(m);
                        handleInputChange('value', '');
                      }}
                      className={`relative flex-1 py-2 text-xs font-bold transition-all ${method === m ? 'text-black' : 'text-gray-500'}`}
                    >
                      {method === m && <motion.div layoutId="activeTabP" className="bg-brand-primary-cta absolute inset-0 rounded-lg" />}
                      <span className="relative z-10">{methodConfig[m].label}</span>
                    </button>
                  ))}
                </div>
                <Input
                  icon={Icon}
                  type={methodConfig[method].type}
                  placeholder={methodConfig[method].placeholder}
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  required
                />
              </div>

              {/* 3. 새 비밀번호 섹션 */}
              <div className="space-y-3">
                <Input icon={Lock} type="password" placeholder="새 비밀번호" value={formData.newPassword} onChange={(e) => handleInputChange('newPassword', e.target.value)} required />
                <Input icon={Lock} type="password" placeholder="새 비밀번호 확인" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} required />
              </div>

              {resetPasswordMutation.isError && (
                <div className="rounded-lg border border-red-900/50 bg-red-900/20 py-2.5 text-center text-sm font-semibold text-red-400">정보가 일치하지 않습니다. 다시 확인해주세요.</div>
              )}

              <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="bg-brand-primary-cta hover:bg-brand-primary-cta/90 flex w-full items-center justify-center gap-2 rounded-xl py-4.5 font-bold text-black transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {resetPasswordMutation.isPending ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-5 w-5 rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <>
                    <RotateCw size={19} strokeWidth={2} />
                    비밀번호 재설정
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <GoToLoginLink />
      </div>
    </div>
  );
}
