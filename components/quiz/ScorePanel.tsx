import { ChartNoAxesColumn, CircleCheck } from 'lucide-react';

export function ScorePanel({ points, completed }: { points: number; completed: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-soft">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-goldSoft">
          <ChartNoAxesColumn className="h-5 w-5 text-brand-gold" />
        </span>
        <div>
          <p className="text-xs text-muted">当前积分</p>
          <p className="text-xl font-semibold text-foreground">{points}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-soft">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tealSoft">
          <CircleCheck className="h-5 w-5 text-brand-teal" />
        </span>
        <div>
          <p className="text-xs text-muted">已完成题目</p>
          <p className="text-xl font-semibold text-foreground">{completed}</p>
        </div>
      </div>
    </div>
  );
}
