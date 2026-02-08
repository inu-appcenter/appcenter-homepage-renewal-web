'use client';
import Link from 'next/link';
import { Mail, Instagram, Github } from 'lucide-react';
import { KakaoIcon } from 'shared/icon/KakaoIcon';
import { Logo } from 'shared/icon/Logo';

export const Footer = () => {
  return (
    <footer className="bg-custom-black relative w-full px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-380 flex-col items-center justify-between gap-4 sm:max-w-400 sm:flex-row sm:items-start sm:gap-10">
        <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="font-montserrat text-custom-gray-100 font-product-design pl-1 text-2xl sm:text-4xl">
              APP <span className="text-brand-primary-light">CENTER</span>
            </span>
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-custom-gray-500 text-sm sm:text-base">인천대학교 IT 이노베이션 랩</p>
            <p className="text-custom-gray-500 text-sm sm:text-base">인천광역시 아카데미로119 4호관 정보전산원(BM컨텐츠관) 107호</p>
          </div>

          <p className="text-custom-gray-600 mt-4 text-xs sm:text-sm">© Copyright 2026 INU App Center. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:items-end">
          <h4 className="text-custom-gray-400 mt-2 text-xs font-semibold uppercase sm:mt-8 sm:text-sm">Contact Us</h4>

          <div className="flex items-center gap-6">
            <Link
              href="https://pf.kakao.com/_xgxaSLd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 transition-colors hover:text-yellow-300"
              aria-label="앱센터 카카오톡 채널 방문하기"
            >
              <KakaoIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </Link>
            <Link
              href="https://instagram.com/inuappcenter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 transition-colors hover:text-fuchsia-500"
              aria-label="앱센터 인스타그램 방문하기"
            >
              <Instagram className="h-8 w-8 sm:h-10 sm:w-10" />
            </Link>
            <Link
              href="https://github.com/inu-appcenter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 transition-colors hover:text-white"
              aria-label="앱센터 GitHub 방문하기"
            >
              <Github className="h-8 w-8 sm:h-10 sm:w-10" />
            </Link>
            <Link href="mailto:inuappcenter@gmail.com" className="text-custom-gray-500 hover:text-brand-primary transition-colors" aria-label="앱센터 이메일 보내기">
              <Mail className="h-8 w-8 sm:h-10 sm:w-10" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
