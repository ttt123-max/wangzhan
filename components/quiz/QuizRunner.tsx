'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, CircleX, Sparkles } from 'lucide-react';
import { quizzes } from '@/lib/content';
import type { Quiz } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { pointsForQuiz } from '@/lib/logic/points';
import {
  DAILY_QUIZ_COUNT,
  getDailyQuizzes,
  todayKey,
  readDailySeen,
  markDailySeen
} from '@/lib/logic/dailyQuiz';
import { addQuizHistory } from '@/lib/logic/quizHistory';
import { ScorePanel } from './ScorePanel';
import { QuizOption } from './QuizOption';
import { Mascot } from '@/components/mascot/Mascot';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { StatePanel } from '@/components/ui/StatePanel';

export function QuizRunner() {
  const [loading, setLoading] = useState(true);
  const [seen, setSeen] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [daily, setDaily] = useState<Quiz[]>([]);
  const [active, setActive] = useState<Quiz | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const load = async () => {
      const store = createStateStore();
      const day = todayKey();
      const pool = getDailyQuizzes(quizzes, day);
      const profile = await store.loadProfile();
      setPoints(profile?.points ?? 0);
      setDaily(pool);
      const seenIds = readDailySeen(day).filter((id) => pool.some((q) => q.id === id));
      setSeen(seenIds);
      setActive(pool.find((q) => !seenIds.includes(q.id)) ?? null);
      setLoading(false);
    };
    void load();
  }, []);

  const current = active;
  const remaining = daily.filter((q) => !seen.includes(q.id));
  const done = remaining.length === 0;
  const todayDone = daily.filter((q) => seen.includes(q.id)).length;

  const choose = async (optionIndex: number) => {
    if (!current || revealed) return;
    setSelected(optionIndex);
    setRevealed(true);
    const correct = optionIndex === current.correctIndex;
    const earned = pointsForQuiz(current, correct);
    const store = createStateStore();
    const wasCounted = await store.recordQuiz(current.id, correct, earned);
    setCounted(wasCounted);
    if (wasCounted && correct) {
      setPoints((p) => p + earned);
      window.dispatchEvent(new Event('kxb:auth'));
    }
    addQuizHistory({
      quizId: current.id,
      selectedIndex: optionIndex,
      isCorrect: correct,
      dateKey: todayKey(),
      answeredAt: new Date().toISOString()
    });
    const day = todayKey();
    setSeen(markDailySeen(day, current.id));
  };

  const next = () => {
    setActive(daily.find((q) => !seen.includes(q.id)) ?? null);
    setSelected(null);
    setRevealed(false);
    setCounted(false);
  };

  if (loading) return <StatePanel />;

  if (done) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center shadow-soft">
        <Mascot mood="cheer" className="mx-auto h-24 w-24" />
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-tealSoft px-3 py-1 text-sm font-medium text-teal-700">
          <Sparkles className="h-4 w-4" />
          完成
        </div>
        <h2 className="mt-3 text-xl font-semibold text-foreground">今日 {DAILY_QUIZ_COUNT} 道题已完成</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          你完成了今天的全部小问答，当前积分 <span className="font-semibold text-brand-gold">{points}</span>。
          明天会自动换一组新题，也可以回看今天做过的题。
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <ButtonLink href="/quiz-history" variant="outline" icon={Sparkles}>
            查看做过的题
          </ButtonLink>
          <ButtonLink href="/topics" variant="ghost">
            去专题库
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScorePanel points={points} completed={todayDone} />
      <div className="rounded-lg border border-border bg-surface p-6 shadow-soft sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">今日 {daily.length} 题 · 已完成 {todayDone}</p>
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-brand-blue transition-all duration-500"
              style={{ width: `${daily.length ? (todayDone / daily.length) * 100 : 0}%` }}
            />
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
            <p
              className={
                selected === current?.correctIndex
                  ? 'inline-flex items-center gap-1.5 text-sm font-medium text-teal-700'
                  : 'inline-flex items-center gap-1.5 text-sm font-medium text-brand-danger'
              }
            >
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
      <p className="text-center text-xs text-muted">
        每天自动从题库抽取 {DAILY_QUIZ_COUNT} 道，每题只计一次分；
        <a href="/quiz-history" className="text-brand-blue hover:underline">
          {' '}
          查看做过的题
        </a>
      </p>
    </div>
  );
}
