import { Coins } from 'lucide-react';

export function ScorePanel({ points, completed }: { points: number; completed: number }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3">
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
        <Coins className="h-4 w-4" />
        当前积分 {points}
      </span>
      <span className="text-sm text-slate-500">已完成 {completed} 题</span>
    </div>
  );
}
