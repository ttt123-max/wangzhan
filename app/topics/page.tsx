'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Lock, Sparkles, Unlock } from 'lucide-react';
import { topics } from '@/lib/content';
import type { Topic, UserProfile } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { StatePanel } from '@/components/ui/StatePanel';
import { PremiumBadge } from '@/components/topics/PremiumBadge';
import { UnlockModal } from '@/components/topics/UnlockModal';

export default function TopicsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [modal, setModal] = useState<Topic | null>(null);
  const [message, setMessage] = useState('');

  const refresh = async () => {
    const store = createStateStore();
    setProfile(await store.loadProfile());
    setUnlocked(await store.getUnlockedTopicIds());
    setLoading(false);
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

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        <StatePanel />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">专题库</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">你的网信普法知识地图</h1>
          <p className="mt-3 text-pretty text-sm text-muted">
            基础内容免费开放，拓展案例专题用积分解锁。{profile ? `当前积分：${profile.points}` : '登录后开始积累积分。'}
          </p>
        </div>
        {!profile ? (
          <ButtonLink href="/login" icon={Unlock}>登录后解锁</ButtonLink>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...topics]
          .sort((a, b) => a.order - b.order)
          .map((t) => {
            const isUnlocked = !t.isPremium || unlocked.includes(t.id);
            return (
              <Card key={t.id} className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {t.isPremium ? <PremiumBadge points={t.premiumPoints} /> : <Badge tone="blue">免费</Badge>}
                    <Badge tone="neutral">{t.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.summary}</p>
                </div>
                <div className="mt-4">
                  {isUnlocked ? (
                    <div className="flex flex-wrap items-center gap-4">
                      <Link href={`/columns/${t.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
                        进入专题 <ArrowRight className="h-4 w-4" />
                      </Link>
                      {t.officialDocs?.[0]?.url ? (
                        <a
                          href={t.officialDocs[0].url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          官方文件
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <Button
                      variant="gold"
                      size="sm"
                      icon={profile ? Lock : Unlock}
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
      <p className="mt-6 flex items-center gap-1.5 text-xs text-muted">
        <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
        积分不足时会在解锁弹窗提示，可先去答题中心积累积分。
      </p>
    </div>
  );
}
