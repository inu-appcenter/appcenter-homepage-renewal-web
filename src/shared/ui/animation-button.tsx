'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

export function AnimationButton({ children, className, ...props }: { children: React.ReactNode; className?: string } & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link {...props} className="group relative inline-block w-fit overflow-hidden rounded-[60px] bg-white/10 p-[1.5px]">
      <motion.div
        style={{ willChange: 'transform' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-[-200%] z-0 bg-[conic-gradient(from_0deg,transparent_70%,var(--color-brand-secondary)_85%,var(--color-brand-secondary-light)_95%,#ffffff_100%)]"
      />
      <div
        className={`${className} bg-background-surface group-hover:bg-surface-elevated relative flex items-center justify-center rounded-[60px] px-3.5 py-2 transition-colors duration-300 sm:px-8 sm:py-4`}
      >
        {children}
      </div>
    </Link>
  );
}
