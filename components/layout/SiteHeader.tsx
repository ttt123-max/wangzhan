'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ChartNoAxesColumn,
  Columns3,
  Gauge,
  History,
  Home,
  Library,
  LogOut,
  Menu,
  MessageCircleQuestion,
  ShieldCheck,
  UserRound,
  X
} from 'lucide-react';
import { createStateStore } from '@/lib/state';
import { signOut } from '@/lib/auth';
import type { UserProfile } from '@/lib/types';
import { Mascot } from '@/components/mascot/Mascot';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: '首页', icon: Home },
  { href: '/ip', label: '科小獬', icon: ShieldCheck },
  { href: '/columns', label: '普法专栏', icon: Columns3 },
  { href: '/station', label: '普法驿站', icon: MessageCircleQuestion },
  { href: '/topics', label: '专题库', icon: Library },
  { href: '/quiz', label: '答题中心', icon: Gauge },
  { href: '/quiz-history', label: '答题记录', icon: History }
];

export function SiteHeader() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [open, setOpen] = useState(false);

  const refresh = async () => {
    setProfile(await createStateStore().loadProfile());
  };

  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    const onAuth = () => {
      void refresh();
    };
    window.addEventListener('kxb:auth', onAuth);
    return () => window.removeEventListener('kxb:auth', onAuth);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[#f5f7fc]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blueSoft">
            <Mascot mood="cheer" className="h-8 w-8" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">法治先锋</span>
            <span className="mt-0.5 text-xs font-medium text-brand-blue">科小獬 · 网信普法</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground-soft transition-colors hover:bg-surface hover:text-brand-blue"
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {profile ? (
            <>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-surface"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#101933] text-sm font-semibold text-white">
                  {profile.nickname.slice(0, 1).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-foreground">{profile.nickname}</span>
              </Link>
              <Badge tone="gold" className="gap-1">
                <ChartNoAxesColumn className="h-3 w-3" />
                {profile.points} 分
              </Badge>
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  await refresh();
                  setOpen(false);
                }}
                aria-label="退出登录"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-blueStrong"
            >
              <UserRound className="h-4 w-4" />
              登录
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="打开菜单"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface px-4 pb-4 pt-2 lg:hidden">
          <nav className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-soft hover:bg-surface-2 hover:text-brand-blue"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <Link
              href={profile ? '/account' : '/login'}
              onClick={() => setOpen(false)}
              className={cn(
                'mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium',
                profile ? 'text-foreground-soft hover:bg-surface-2' : 'bg-brand-blue text-white'
              )}
            >
              <UserRound className="h-4 w-4" />
              {profile ? `${profile.nickname} · ${profile.points} 分` : '登录 / 注册'}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
