'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm transition-colors',
        active
          ? 'border-brand-blue bg-brand-blue text-white'
          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-blue/40',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
