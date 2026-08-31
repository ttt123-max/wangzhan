import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'blue' | 'gold' | 'teal' | 'slate';

const tones: Record<Tone, string> = {
  blue: 'bg-brand-blue/10 text-brand-blue',
  gold: 'bg-brand-gold/15 text-amber-700',
  teal: 'bg-brand-teal/12 text-teal-700',
  slate: 'bg-slate-100 text-slate-600'
};

export function Badge({
  tone = 'slate',
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', tones[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}
