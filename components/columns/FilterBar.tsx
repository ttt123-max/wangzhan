'use client';

import { Chip } from '@/components/ui/Chip';
import type { CaseType, TopicCategory } from '@/lib/types';

interface FilterBarProps {
  categories: TopicCategory[];
  caseTypes: CaseType[];
  activeCategory: TopicCategory | '全部';
  activeCaseType: CaseType | '全部';
  onCategory: (value: TopicCategory | '全部') => void;
  onCaseType: (value: CaseType | '全部') => void;
}

export function FilterBar({
  categories,
  caseTypes,
  activeCategory,
  activeCaseType,
  onCategory,
  onCaseType
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-16 shrink-0 text-sm text-slate-500">主题</span>
        {(['全部', ...categories] as const).map((c) => (
          <Chip key={c} active={activeCategory === c} onClick={() => onCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-16 shrink-0 text-sm text-slate-500">类型</span>
        {(['全部', ...caseTypes] as const).map((c) => (
          <Chip key={c} active={activeCaseType === c} onClick={() => onCaseType(c)}>
            {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}
