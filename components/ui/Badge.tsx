import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'blue' | 'gold' | 'teal' | 'neutral' | 'danger';

const tones: Record<Tone, string> = {
  blue: 'bg-brand-blueSoft text-brand-blueStrong',
  gold: 'bg-brand-goldSoft text-[#7a5d06]',
  teal: 'bg-brand-tealSoft text-teal-700',
  neutral: 'bg-surface-2 text-muted',
  danger: 'bg-brand-dangerSoft text-brand-danger'
};

export function Badge({
  tone = 'neutral',
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium leading-5',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
