import { Skeleton } from './Skeleton';

export function StatePanel() {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-9 w-32" />
    </div>
  );
}
