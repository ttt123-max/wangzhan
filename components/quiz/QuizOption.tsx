'use client';

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
  let style = 'border-slate-200 bg-white text-slate-700 hover:border-brand-blue/40';
  if (revealed && isCorrect) style = 'border-brand-teal bg-brand-teal/10 text-teal-700';
  else if (revealed && selected && !isCorrect) style = 'border-red-300 bg-red-50 text-red-600';
  else if (selected) style = 'border-brand-blue bg-brand-blue/10 text-brand-blue';

  return (
    <button
      type="button"
      disabled={revealed}
      onClick={onSelect}
      className={cn(
        'rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default',
        style
      )}
    >
      {label}
    </button>
  );
}
