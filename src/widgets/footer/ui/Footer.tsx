'use client';
import Link from 'next/link';
import { Mail, Instagram, Github } from 'lucide-react';
import { KakaoIcon } from 'shared/icon/KakaoIcon';
import { Logo } from 'shared/icon/Logo';

export const Footer = () => {
  return (
    <footer className="bg-custom-black relative mt-20 w-full px-10 py-16">
      <div className="mx-auto flex max-w-380 flex-col items-start justify-between gap-10 sm:max-w-400 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-montserrat text-custom-gray-100 font-product-design pl-1 text-2xl sm:text-4xl">
              APP <span className="text-brand-primary-light">CENTER</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-custom-gray-500">인천대학교 IT 이노베이션 랩</p>
            <p className="text-custom-gray-500">인천광역시 아카데미로119 4호관 정보전산원(BM컨텐츠관) 107호</p>
          </div>
          <p className="text-custom-gray-600 mt-4 text-sm">© Copyright 2026 INU App Center. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:items-end">
          <h4 className="text-custom-gray-400 mt-8 text-sm font-semibold uppercase">Contact Us</h4>
          <div className="flex items-center gap-6">
            <Link
              href="https://pf.kakao.com/_xgxaSLd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 transition-colors hover:text-yellow-300"
              aria-label="KakaoTalk Channel"
            >
              <KakaoIcon className="h-10 w-10" />
            </Link>
            <Link href="https://instagram.com/inuappcenter" target="_blank" rel="noopener noreferrer" className="text-custom-gray-500 transition-colors hover:text-fuchsia-500" aria-label="Instagram">
              <Instagram className="h-10 w-10" />
            </Link>
            <Link href="https://github.com/inu-appcenter" target="_blank" rel="noopener noreferrer" className="text-custom-gray-500 transition-colors hover:text-white" aria-label="GitHub">
              <Github className="h-10 w-10" />
            </Link>
            <Link href="mailto:inuappcenter@gmail.com" className="text-custom-gray-500 hover:text-brand-primary transition-colors" aria-label="Email">
              <Mail className="h-10 w-10" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
