'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Chip({
  active,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
        'active:translate-y-[1px]',
        active
          ? 'border-brand-blue bg-brand-blue text-white'
          : 'border-border bg-surface text-foreground-soft hover:border-brand-blue/50 hover:text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
