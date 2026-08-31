'use client';

import { useMemo, useState } from 'react';
import { topics } from '@/lib/content';
import type { CaseType, TopicCategory } from '@/lib/types';
import { FilterBar } from '@/components/columns/FilterBar';
import { TopicCard } from '@/components/columns/TopicCard';

export default function ColumnsPage() {
  const categories = useMemo(
    () => Array.from(new Set(topics.map((t) => t.category))),
    []
  );
  const caseTypes = useMemo(
    () => Array.from(new Set(topics.map((t) => t.caseType))),
    []
  );
  const [category, setCategory] = useState<TopicCategory | '全部'>('全部');
  const [caseType, setCaseType] = useState<CaseType | '全部'>('全部');

  const filtered = topics
    .filter((t) => category === '全部' || t.category === category)
    .filter((t) => caseType === '全部' || t.caseType === caseType)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14213d]">普法专栏</h1>
      <p className="mt-2 text-slate-500">按主题与案例类型筛选你关心的网信法律问题。</p>

      <div className="my-6 rounded-lg border border-slate-200 bg-white p-4">
        <FilterBar
          categories={categories}
          caseTypes={caseTypes}
          activeCategory={category}
          activeCaseType={caseType}
          onCategory={setCategory}
          onCaseType={setCaseType}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </div>
  );
}
