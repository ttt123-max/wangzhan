import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sheet' | 'muted' | 'hover';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const variants: Record<string, string> = {
    default: 'border border-border bg-surface shadow-soft',
    sheet: 'border border-border bg-surface',
    muted: 'border border-transparent bg-surface-2',
    hover:
      'border border-border bg-surface shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lift'
  };
  return (
    <div className={cn('rounded-xl', variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
