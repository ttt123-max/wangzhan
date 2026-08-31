import { LockKeyhole } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function PremiumBadge({ points }: { points: number }) {
  return (
    <Badge tone="gold" className="inline-flex items-center gap-1">
      <LockKeyhole className="h-3 w-3" />
      拓展专题 · {points} 分
    </Badge>
  );
}
