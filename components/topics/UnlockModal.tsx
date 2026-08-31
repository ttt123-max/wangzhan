'use client';

import { Coins, Sparkles } from 'lucide-react';
import type { Topic, UserProfile } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function UnlockModal({
  topic,
  profile,
  open,
  message,
  onClose,
  onUnlock
}: {
  topic: Topic;
  profile: UserProfile | null;
  open: boolean;
  message: string;
  onClose: () => void;
  onUnlock: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="解锁拓展案例专题">
      <div className="space-y-4 text-center">
        <Coins className="mx-auto h-8 w-8 text-brand-gold" />
        <div>
          <p className="font-semibold text-[#14213d]">{topic.title}</p>
          <p className="mt-1 text-sm text-slate-500">
            解锁需要 <span className="font-semibold text-amber-700">{topic.premiumPoints}</span> 积分
            {profile ? (
              <span className="text-slate-400">（当前 {profile.points} 分）</span>
            ) : (
              <span className="text-slate-400">（请先登录）</span>
            )}
          </p>
        </div>
        {message ? (
          <p className="text-sm font-medium text-amber-600">{message}</p>
        ) : null}
        <div className="flex justify-center gap-2">
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button onClick={onUnlock} icon={Sparkles} disabled={!profile}>
            确认解锁
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          <Badge tone="slate">后续拓展入口</Badge>
        </p>
      </div>
    </Modal>
  );
}
