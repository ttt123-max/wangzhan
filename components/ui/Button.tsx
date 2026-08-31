'use client';

import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'gold' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: LucideIcon;
}

export function Button({
  variant = 'primary',
  icon: Icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const variants: Record<Variant, string> = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue/90',
    gold: 'bg-brand-gold text-[#14213d] hover:bg-brand-gold/90',
    ghost: 'bg-transparent text-brand-blue hover:bg-brand-blue/10',
    outline: 'border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5'
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      {children}
    </button>
  );
}
