'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { cn } from 'shared/utils/cn';

type AnimationButtonProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
};
export const AnimationButton = ({ children, className, ...props }: AnimationButtonProps) => {
  return (
    <Link {...props} className={`group relative isolate inline-block w-fit overflow-hidden rounded-[60px] bg-white/10 p-[1.5px]`}>
      <motion.div
        style={{
          willChange: 'transform'
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="pointer-events-none absolute inset-[-200%] z-0 bg-[conic-gradient(from_0deg,transparent_70%,var(--color-brand-secondary)_85%,var(--color-brand-secondary-light)_95%,#ffffff_100%)]"
      />

      <div
        className={cn`${className ?? ''} bg-background-surface group-hover:bg-surface-elevated relative z-10 flex items-center justify-center rounded-[60px] px-3.5 py-2 transition-colors duration-300 sm:px-10 sm:py-4`}
      >
        {children}
      </div>
    </Link>
  );
};
