'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { quizzes } from '@/lib/content';
import type { Quiz } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { pointsForQuiz } from '@/lib/logic/points';
import { ScorePanel } from './ScorePanel';
import { QuizOption } from './QuizOption';
import { Mascot } from '@/components/mascot/Mascot';

export function QuizRunner() {
  const [attempted, setAttempted] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const store = createStateStore();
    store
      .getAttemptedQuizIds()
      .then((ids) => {
        setAttempted(ids);
        return store.loadProfile();
      })
      .then((p) => setPoints(p?.points ?? 0));
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
    if (wasCounted && correct) {
      setPoints((p) => p + earned);
    }
  };

  const next = () => {
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
    setCounted(false);
  };

  if (done) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
        <Mascot mood="cheer" className="mx-auto h-24 w-24" />
        <h2 className="mt-3 text-lg font-bold text-[#14213d]">今日题目已完成</h2>
        <p className="mt-2 text-slate-500">
          你已完成全部小问答，当前积分 <span className="font-semibold text-amber-700">{points}</span>。
          去专题库用积分解锁更多拓展案例吧。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScorePanel points={points} completed={attempted.length} />
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-400">
          第 {index + 1} / {pool.length} 题
        </p>
        <h2 className="mt-1 text-lg font-semibold text-[#14213d]">{current?.question}</h2>
        <div className="mt-4 grid gap-2">
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
          <div className="mt-4 flex items-center justify-between">
            <p
              className={
                selected === current?.correctIndex
                  ? 'inline-flex items-center gap-1 text-sm font-medium text-teal-700'
                  : 'inline-flex items-center gap-1 text-sm font-medium text-red-600'
              }
            >
              {selected === current?.correctIndex ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> 答对了，+{current?.points} 分
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" /> 答错了，继续加油
                </>
              )}
              {!counted ? <span className="text-slate-400">（已计过）</span> : null}
            </p>
            <button
              type="button"
              onClick={next}
              className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
            >
              下一题
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
