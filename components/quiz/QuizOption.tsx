'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuizOption({
  label,
  selected,
  revealed,
  isCorrect,
  onSelect
}: {
  label: string;
  selected: boolean;
  revealed: boolean;
  isCorrect: boolean;
  onSelect: () => void;
}) {
  let style = 'border-border bg-surface text-foreground-soft hover:border-brand-blue/50 hover:text-foreground';
  if (revealed && isCorrect) style = 'border-brand-teal bg-brand-tealSoft/60 text-teal-700';
  else if (revealed && selected && !isCorrect) style = 'border-brand-danger bg-brand-dangerSoft text-brand-danger';
  else if (selected) style = 'border-brand-blue bg-brand-blueSoft text-brand-blueStrong';

  return (
    <button
      type="button"
      disabled={revealed}
      onClick={onSelect}
      className={cn(
        'flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all',
        'active:translate-y-[1px] disabled:cursor-default',
        style
      )}
    >
      <span>{label}</span>
      {revealed && isCorrect ? <Check className="h-4 w-4 shrink-0 text-brand-teal" /> : null}
      {revealed && selected && !isCorrect ? <X className="h-4 w-4 shrink-0 text-brand-danger" /> : null}
    </button>
  );
}
