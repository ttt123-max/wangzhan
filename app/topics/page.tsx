'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, LockKeyhole, Unlock } from 'lucide-react';
import { topics } from '@/lib/content';
import type { Topic, UserProfile } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PremiumBadge } from '@/components/topics/PremiumBadge';
import { UnlockModal } from '@/components/topics/UnlockModal';

export default function TopicsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [modal, setModal] = useState<Topic | null>(null);
  const [message, setMessage] = useState('');

  const refresh = async () => {
    const store = createStateStore();
    setProfile(await store.loadProfile());
    setUnlocked(await store.getUnlockedTopicIds());
  };

  useEffect(() => {
    void refresh();
  }, []);

  const onUnlock = async () => {
    if (!modal) return;
    const store = createStateStore();
    const res = await store.unlockTopic(modal.id, modal.premiumPoints);
    if (res === 'unlocked') {
      setMessage('');
      setModal(null);
      await refresh();
    } else if (res === 'insufficient') {
      setMessage('积分不足，继续在答题中心赚积分吧。');
    } else if (res === 'already') {
      setMessage('');
      setModal(null);
      await refresh();
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14213d]">专题库</h1>
      <p className="mt-2 text-slate-500">
        基础内容免费开放，拓展案例专题用积分解锁。{profile ? `当前积分：${profile.points}` : '请先登录。'}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...topics]
          .sort((a, b) => a.order - b.order)
          .map((t) => {
            const isUnlocked = !t.isPremium || unlocked.includes(t.id);
            return (
              <Card key={t.id} className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {t.isPremium ? (
                      <PremiumBadge points={t.premiumPoints} />
                    ) : (
                      <Badge tone="blue">免费</Badge>
                    )}
                    <Badge tone="slate">{t.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-[#14213d]">{t.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{t.summary}</p>
                </div>

                <div className="mt-3">
                  {isUnlocked ? (
                    <Link
                      href={`/columns/${t.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue"
                    >
                      进入专题 <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Button
                      variant="gold"
                      icon={profile ? LockKeyhole : Unlock}
                      onClick={() => {
                        setMessage('');
                        setModal(t);
                      }}
                    >
                      {profile ? '解锁' : '登录后解锁'}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
      </div>

      {modal ? (
        <UnlockModal
          topic={modal}
          profile={profile}
          open
          message={message}
          onClose={() => {
            setModal(null);
            setMessage('');
          }}
          onUnlock={() => void onUnlock()}
        />
      ) : null}
    </div>
  );
}
