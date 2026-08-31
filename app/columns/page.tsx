'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, Tags } from 'lucide-react';
import { topics } from '@/lib/content';
import type { CaseType, TopicCategory } from '@/lib/types';
import { TopicRow } from '@/components/columns/TopicRow';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';

export default function ColumnsPage() {
  const categories = useMemo(() => Array.from(new Set(topics.map((t) => t.category))), []);
  const caseTypes = useMemo(() => Array.from(new Set(topics.map((t) => t.caseType))), []);
  const [category, setCategory] = useState<TopicCategory | '全部'>('全部');
  const [caseType, setCaseType] = useState<CaseType | '全部'>('全部');

  const filtered = topics
    .filter((t) => category === '全部' || t.category === category)
    .filter((t) => caseType === '全部' || t.caseType === caseType)
    .sort((a, b) => a.order - b.order);

  const hasFilter = category !== '全部' || caseType !== '全部';

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">普法专栏</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          像工作台一样，浏览网信法律内容
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
          从左侧选定主题与案例类型，右侧按需浏览。想看哪篇，点进去即可阅读全文与常见问题。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Tags className="h-4 w-4 text-brand-blue" />
              <h2 className="text-sm font-semibold text-foreground">主题</h2>
            </div>
            <div className="space-y-1">
              {(['全部', ...categories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                    category === c
                      ? 'bg-brand-blueSoft font-medium text-brand-blueStrong'
                      : 'text-foreground-soft hover:bg-surface-2'
                  )}
                >
                  {c}
                  <span className="text-xs text-muted">
                    {c === '全部' ? topics.length : topics.filter((t) => t.category === c).length}
                  </span>
                </button>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="mb-3 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-brand-blue" />
              <h2 className="text-sm font-semibold text-foreground">案例类型</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['全部', ...caseTypes] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCaseType(c)}
                  className={cn(
                    'rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors',
                    caseType === c
                      ? 'border-brand-blue bg-brand-blue text-white'
                      : 'border-border bg-surface text-foreground-soft hover:border-brand-blue/50'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {hasFilter ? (
              <button
                type="button"
                onClick={() => {
                  setCategory('全部');
                  setCaseType('全部');
                }}
                className="mt-5 text-sm font-medium text-brand-blue hover:underline"
              >
                清除筛选
              </button>
            ) : null}
          </div>
        </aside>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted">
              共 <span className="font-semibold text-foreground">{filtered.length}</span> 个专题
            </p>
            <Badge tone="neutral">内容持续更新</Badge>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={SlidersHorizontal}
              title="没有符合筛选条件的专题"
              description="换个主题或案例类型，或者清除筛选看看全部内容。"
              action={
                <button
                  type="button"
                  onClick={() => {
                    setCategory('全部');
                    setCaseType('全部');
                  }}
                  className="text-sm font-medium text-brand-blue hover:underline"
                >
                  显示全部专题
                </button>
              }
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((t) => (
                <TopicRow key={t.id} topic={t} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
