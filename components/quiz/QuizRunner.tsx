'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, CircleX, RotateCcw, Sparkles } from 'lucide-react';
import { quizzes } from '@/lib/content';
import type { Quiz } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { pointsForQuiz } from '@/lib/logic/points';
import { ScorePanel } from './ScorePanel';
import { QuizOption } from './QuizOption';
import { Mascot } from '@/components/mascot/Mascot';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { StatePanel } from '@/components/ui/StatePanel';

export function QuizRunner() {
  const [loading, setLoading] = useState(true);
  const [attempted, setAttempted] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [counted, setCounted] = useState(false);

  const load = async () => {
    const store = createStateStore();
    const ids = await store.getAttemptedQuizIds();
    const p = await store.loadProfile();
    setAttempted(ids);
    setPoints(p?.points ?? 0);
    setIndex(0);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const pool = quizzes.filter((q) => !attempted.includes(q.id));
  const current: Quiz | undefined = pool[index];
  const done = pool.length === 0 || index >= pool.length;

  const choose = async (optionIndex: number) => {
    if (!current || revealed) return;
    setSelected(optionIndex);
    setRevealed(true);
    const correct = optionIndex === current.correctIndex;
    const earned = pointsForQuiz(current, correct);
    const store = createStateStore();
    const wasCounted = await store.recordQuiz(current.id, correct, earned);
    setCounted(wasCounted);
    if (wasCounted && correct) setPoints((p) => p + earned);
    setAttempted((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
  };

  const next = () => {
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
    setCounted(false);
  };

  if (loading) return <StatePanel />;

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-soft">
        <Mascot mood="cheer" className="mx-auto h-24 w-24" />
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-tealSoft px-3 py-1 text-sm font-medium text-teal-700">
          <Sparkles className="h-4 w-4" />
          完成
        </div>
        <h2 className="mt-3 text-xl font-semibold text-foreground">今日题目已完成</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          你已完成全部小问答，当前积分 <span className="font-semibold text-brand-gold">{points}</span>。去专题库用积分解锁更多拓展案例吧。
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <ButtonLink href="/topics" variant="outline" icon={Sparkles}>去专题库</ButtonLink>
          <Button variant="ghost" icon={RotateCcw} onClick={() => void load()}>重新开始</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScorePanel points={points} completed={attempted.length} />
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted">第 {index + 1} / {pool.length} 题</p>
          <div className="flex gap-1">
            {pool.map((_, i) => (
              <span key={i} className={`h-1.5 w-5 rounded-full ${i <= index ? 'bg-brand-blue' : 'bg-surface-2'}`} />
            ))}
          </div>
        </div>
        <h2 className="text-lg font-semibold leading-snug text-foreground">{current?.question}</h2>
        <div className="mt-5 grid gap-2.5">
          {current?.options.map((opt, i) => (
            <QuizOption
              key={i}
              label={opt}
              selected={selected === i}
              revealed={revealed}
              isCorrect={i === current.correctIndex}
              onSelect={() => void choose(i)}
            />
          ))}
        </div>
        {revealed ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className={selected === current?.correctIndex ? 'inline-flex items-center gap-1.5 text-sm font-medium text-teal-700' : 'inline-flex items-center gap-1.5 text-sm font-medium text-brand-danger'}>
              {selected === current?.correctIndex ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> 答对了，+{current?.points} 分
                </>
              ) : (
                <>
                  <CircleX className="h-4 w-4" /> 答错了，继续加油
                </>
              )}
              {!counted ? <span className="text-xs text-muted">（已计过）</span> : null}
            </p>
            <Button onClick={next}>下一题</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
