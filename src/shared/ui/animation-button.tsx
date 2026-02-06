'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ComponentProps } from 'react';

type AnimationButtonProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
};
export const AnimationButton = ({ children, className, ...props }: AnimationButtonProps) => {
  return (
    <Link {...props} className={`group relative isolate inline-block w-fit overflow-hidden rounded-[60px] bg-white/10 p-[1.5px] ${className ?? ''}`}>
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

      <div className="bg-background-surface group-hover:bg-surface-elevated relative z-10 flex items-center justify-center rounded-[60px] px-10 py-4 transition-colors duration-300">
        <span className="relative z-20 text-white">{children}</span>
      </div>
    </Link>
  );
};
