'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-blue text-white hover:bg-brand-blueStrong shadow-soft',
  secondary: 'bg-[#101933] text-white hover:bg-[#1b2749]',
  gold: 'bg-brand-gold text-[#3a2b05] hover:brightness-95',
  outline:
    'border border-border-strong bg-surface text-foreground hover:border-brand-blue/60 hover:bg-brand-blueSoft/50',
  ghost: 'bg-transparent text-foreground-soft hover:bg-surface-2 hover:text-foreground'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-6 text-base'
};

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  children
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'active:translate-y-[1px]',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      {children}
    </Link>
  );
}
