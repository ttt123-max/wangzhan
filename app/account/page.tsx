'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumn,
  Gauge,
  History,
  Lock,
  Sparkles,
  Trophy
} from 'lucide-react';
import { topics } from '@/lib/content';
import type { UserProfile } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { StatePanel } from '@/components/ui/StatePanel';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile | null | 'loading'>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [attempted, setAttempted] = useState<number[]>([]);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    const store = createStateStore();
    Promise.all([store.loadProfile(), store.getUnlockedTopicIds(), store.getAttemptedQuizIds(), store.getHistory()])
      .then(([p, u, a, h]) => {
        setProfile(p ?? null);
        setUnlocked(u);
        setAttempted(a);
        setHistoryCount(h.length);
      })
      .catch(() => setProfile(null));
  }, []);

  if (profile === 'loading' || profile === null) {
    if (profile === 'loading') {
      return (
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
          <StatePanel />
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        <EmptyState
          icon={Lock}
          title="登录后查看你的账户总览"
          description="登录后即可看到积分、已解锁专题、浏览历史与成长进度。"
          action={
            <ButtonLink href="/login" icon={Sparkles}>去登录</ButtonLink>
          }
        />
      </div>
    );
  }

  const premium = topics.filter((t) => t.isPremium);
  const nextPremium = premium
    .filter((t) => !unlocked.includes(t.id))
    .sort((a, b) => a.premiumPoints - b.premiumPoints)[0];
  const totalQuizzes = 16;
  const answeredPercent = attempted.length > 0 ? Math.min(100, Math.round((attempted.length / totalQuizzes) * 100)) : 0;

  const stats = [
    { label: '当前积分', value: profile.points, icon: ChartNoAxesColumn, tone: 'text-brand-blue bg-brand-blueSoft' },
    { label: '已答题', value: attempted.length, icon: Gauge, tone: 'text-brand-teal bg-brand-tealSoft' },
    { label: '已解锁专题', value: unlocked.length, icon: Lock, tone: 'text-brand-gold bg-brand-goldSoft' },
    { label: '浏览记录', value: historyCount, icon: History, tone: 'text-brand-blue bg-brand-blueSoft' }
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101933] text-xl font-semibold text-white">
            {profile.nickname.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">你好，{profile.nickname}</h1>
            <p className="mt-1 text-sm text-muted">这里是你和科小獬的网信普法学习总览。</p>
          </div>
        </div>
        <ButtonLink href="/quiz" icon={Sparkles}>继续答题赚积分</ButtonLink>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-5">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted">{s.label}</p>
              <p className="mt-0.5 text-2xl font-semibold text-foreground">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-brand-gold" />
                <h2 className="font-semibold text-foreground">拓展专题进度</h2>
              </div>
              <Badge tone="gold">{unlocked.length} / {premium.length}</Badge>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-brand-gold transition-all duration-500"
                style={{ width: `${premium.length ? (unlocked.length / premium.length) * 100 : 0}%` }}
              />
            </div>
            {nextPremium ? (
              <p className="text-sm text-muted">
                下一个可解锁：<span className="font-medium text-foreground">{nextPremium.title}</span>
                <span className="mx-2 text-border-strong">·</span>
                需要 {nextPremium.premiumPoints} 积分
              </p>
            ) : (
              <p className="text-sm text-brand-teal">你已经解锁全部拓展专题，太棒了。</p>
            )}
            <Link href="/topics" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
              去专题库看看 <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-brand-blue" />
                <h2 className="font-semibold text-foreground">答题进度</h2>
              </div>
              <span className="text-sm text-muted">{attempted.length} / {totalQuizzes} 题</span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-brand-blue transition-all duration-500" style={{ width: `${answeredPercent}%` }} />
            </div>
            <p className="text-sm text-muted">完成全部小问答，把积分攒足，解锁更多拓展案例。</p>
          </Card>
        </div>

        <Card className="h-fit p-6">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-teal" />
            <h2 className="font-semibold text-foreground">快捷入口</h2>
          </div>
          <Separator className="mb-3" />
          <div className="space-y-2">
            {[
              { href: '/quiz', label: '答题赚积分', desc: '完成小问答' },
              { href: '/topics', label: '解锁拓展专题', desc: `${premium.length - unlocked.length} 个待解锁` },
              { href: '/station', label: '去普法驿站', desc: '提问获得解读' },
              { href: '/history', label: '查看浏览历史', desc: `${historyCount} 条记录` }
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex items-center justify-between rounded-xl border border-border px-4 py-3 transition-colors hover:border-brand-blue/40 hover:bg-surface-2"
              >
                <span>
                  <span className="block text-sm font-medium text-foreground">{a.label}</span>
                  <span className="text-xs text-muted">{a.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-blue" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
