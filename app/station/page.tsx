'use client';

import { useMemo, useState } from 'react';
import { Inbox, MessagesSquare, SearchX } from 'lucide-react';
import { topics, faqsFor } from '@/lib/content';
import type { CaseType, Faq, Topic, TopicCategory } from '@/lib/types';
import { QuestionForm } from '@/components/station/QuestionForm';
import { InterpretationCard } from '@/components/station/InterpretationCard';
import { CaseCard } from '@/components/station/CaseCard';
import { Chip } from '@/components/ui/Chip';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Mascot } from '@/components/mascot/Mascot';
import { createStateStore } from '@/lib/state';

interface MatchResult {
  matched: { faq: Faq; topic: Topic | null } | null;
  fallback?: boolean;
}

export default function StationPage() {
  const categories = useMemo(() => Array.from(new Set(topics.map((t) => t.category))), []);
  const caseTypes = useMemo(() => Array.from(new Set(topics.map((t) => t.caseType))), []);
  const [category, setCategory] = useState<TopicCategory | '全部'>('全部');
  const [caseType, setCaseType] = useState<CaseType | '全部'>('全部');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  const onSubmit = async (question: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, category, caseType })
      });
      const data = (await res.json()) as MatchResult;
      setResult(data);
      await createStateStore().logQuestion(question, data.matched?.topic?.id ?? null);
    } finally {
      setLoading(false);
    }
  };

  const library = topics
    .filter((t) => category === '全部' || t.category === category)
    .filter((t) => caseType === '全部' || t.caseType === caseType)
    .sort((a, b) => a.order - b.order)
    .map((t) => ({ topic: t, faq: faqsFor(t.id)[0] as Faq | undefined }));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Badge tone="blue" className="inline-flex items-center gap-1.5">
            <MessagesSquare className="h-3.5 w-3.5" />
            线上普法驿站
          </Badge>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            说出你的疑问，科小獬给你可行动的答案
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted">
            免去逐条啃法条的功夫。选择主题与案例类型，再输入问题，科小獬结合知识库给出贴近实操的普法解读。下方是实时案例库，随时浏览。
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Mascot mood="ask" className="h-40 w-40" />
        </div>
      </div>

      <div className="my-8 rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-foreground">筛选范围</span>
          {(['全部', ...categories] as const).map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-border sm:block" />
          {(['全部', ...caseTypes] as const).map((c) => (
            <Chip key={c} active={caseType === c} onClick={() => setCaseType(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <QuestionForm onSubmit={onSubmit} loading={loading} />

        {loading ? (
          <div className="mt-5 space-y-3">
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-16 w-full rounded-xl" />
          </div>
        ) : result?.matched ? (
          <div className="mt-5">
            <InterpretationCard faq={result.matched.faq} topic={result.matched.topic ?? undefined} />
          </div>
        ) : result?.fallback ? (
          <div className="mt-5 rounded-xl bg-surface-2 p-5">
            <p className="font-medium text-foreground">暂时没有精准匹配到你的问题。</p>
            <p className="mt-1 text-sm text-muted">换个更具体的说法，或先浏览下方案例库。</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-blue">
              <Inbox className="h-4 w-4" />
              你的问题已被记录，便于后续精细化普法
            </p>
          </div>
        ) : null}
      </div>

      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">案例库</h2>
            <p className="mt-1 text-sm text-muted">按你筛选的主题与案例类型陈列实时普法案例。</p>
          </div>
          <Badge tone="neutral">{library.length} 个案例</Badge>
        </div>

        {library.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="没有符合筛选条件的案例"
            description="换个主题或案例类型，浏览更多网信普法案例。"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {library.map((c) => (
              <CaseCard key={c.topic.id} topic={c.topic} faq={c.faq} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
