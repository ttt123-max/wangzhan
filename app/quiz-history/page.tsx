'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Check, CircleX, FileQuestion } from 'lucide-react';
import { quizzes } from '@/lib/content';
import {
  loadQuizHistory,
  type QuizHistoryItem
} from '@/lib/logic/quizHistory';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/utils';

export default function QuizHistoryPage() {
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHistory(loadQuizHistory());
    setLoading(false);
  }, []);

  const questionMap = new Map(quizzes.map((q) => [q.id, q]));
  const grouped = history.reduce<Record<string, QuizHistoryItem[]>>((acc, item) => {
    (acc[item.dateKey] ??= []).push(item);
    return acc;
  }, {});
  const dates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        <div className="space-y-3">
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-16 w-full" />
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        <EmptyState
          icon={FileQuestion}
          title="还没有做题记录"
          description="完成网信普法小问答后，这里会展示你做过、答对或答错的题。"
          action={
            <ButtonLink href="/quiz" icon={ArrowLeft}>
              去答题
            </ButtonLink>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">答题记录</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">你做过哪些题</h1>
          <p className="mt-3 text-sm text-muted">按日期查看你的答题结果，绿色为正确答案。</p>
        </div>
        <ButtonLink href="/quiz" variant="outline" icon={ArrowLeft}>
          返回答题
        </ButtonLink>
      </div>

      <div className="space-y-8">
        {dates.map((date) => (
          <section key={date}>
            <div className="mb-3 flex items-center gap-2">
              <Badge tone="blue">{date}</Badge>
              <span className="text-sm text-muted">共 {grouped[date].length} 题</span>
            </div>
            <div className="space-y-4">
              {grouped[date].map((record) => {
                const quiz = questionMap.get(record.quizId);
                if (!quiz) return null;
                return (
                  <div key={`${date}-${record.quizId}`} className="rounded-lg border border-border bg-surface p-5 shadow-soft">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-foreground">{quiz.question}</p>
                      <Badge tone={record.isCorrect ? 'teal' : 'gold'}>
                        {record.isCorrect ? (
                          <>
                            <Check className="h-3 w-3" /> 答对
                          </>
                        ) : (
                          <>
                            <CircleX className="h-3 w-3" /> 答错
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {quiz.options.map((opt, i) => {
                        const isCorrect = i === quiz.correctIndex;
                        const isSelected = i === record.selectedIndex;
                        return (
                          <div
                            key={i}
                            className={cn(
                              'rounded-lg border px-3 py-2 text-sm',
                              isCorrect
                                ? 'border-brand-teal bg-brand-tealSoft/60 text-teal-700'
                                : isSelected && !isCorrect
                                  ? 'border-brand-danger bg-brand-dangerSoft text-brand-danger'
                                  : 'border-border bg-surface-2 text-foreground-soft'
                            )}
                          >
                            <span className="mr-1.5 font-medium">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                            {isCorrect ? <Check className="ml-1 inline h-3.5 w-3.5 text-brand-teal" /> : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
