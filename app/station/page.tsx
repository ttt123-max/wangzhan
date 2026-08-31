'use client';

import { useMemo, useState } from 'react';
import { topics, faqs } from '@/lib/content';
import type { CaseType, Faq, Topic, TopicCategory } from '@/lib/types';
import { FilterBar } from '@/components/columns/FilterBar';
import { QuestionForm } from '@/components/station/QuestionForm';
import { InterpretationCard } from '@/components/station/InterpretationCard';
import { Card } from '@/components/ui/Card';
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
  const [lastQuestion, setLastQuestion] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);

  const onSubmit = async (question: string) => {
    setLastQuestion(question);
    const res = await fetch('/api/matching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category, caseType })
    });
    const data = (await res.json()) as MatchResult;
    setResult(data);
    const store = createStateStore();
    await store.logQuestion(question, data.matched?.topic?.id ?? null);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14213d]">线上普法驿站</h1>
      <p className="mt-2 text-slate-500">筛选主题与案例类型，输入你的问题，让科小獬帮你解读。</p>

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

      <QuestionForm onSubmit={onSubmit} />

      {result?.matched ? (
        <div className="mt-6">
          <InterpretationCard
            question={lastQuestion}
            faq={result.matched.faq}
            topic={result.matched.topic ?? undefined}
          />
        </div>
      ) : result?.fallback ? (
        <Card className="mt-6">
          <p className="font-medium text-[#14213d]">暂时没有精准匹配到你的问题。</p>
          <p className="mt-1 text-sm text-slate-500">
            你可以换个更具体的说法，或先看看这些热门专题：
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topics.slice(0, 4).map((t) => (
              <a
                key={t.id}
                href={`/columns/${t.slug}`}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-brand-blue hover:border-brand-blue/40"
              >
                {t.title}
              </a>
            ))}
          </div>
        </Card>
      ) : null}

      <div className="mt-10">
        <h2 className="mb-3 font-semibold text-[#14213d]">驿站常见问题</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <Card key={f.id} className="py-4">
              <p className="text-sm font-medium text-[#14213d]">{f.question}</p>
              <p className="mt-1 text-sm text-slate-500">{f.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
