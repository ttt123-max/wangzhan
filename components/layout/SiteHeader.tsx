'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LifeBuoy, ShieldCheck, ListChecks, LibraryBig, History, LogOut, UserRound } from 'lucide-react';
import { createStateStore } from '@/lib/state';
import { signOut } from '@/lib/auth';
import type { UserProfile } from '@/lib/types';
import { Mascot } from '@/components/mascot/Mascot';

const nav = [
  { href: '/', label: '首页', icon: ShieldCheck },
  { href: '/ip', label: '科小獬', icon: LifeBuoy },
  { href: '/columns', label: '普法专栏', icon: LibraryBig },
  { href: '/station', label: '普法驿站', icon: ListChecks },
  { href: '/quiz', label: '答题中心', icon: ListChecks },
  { href: '/topics', label: '专题库', icon: LibraryBig },
  { href: '/history', label: '浏览历史', icon: History }
];

export function SiteHeader() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    createStateStore()
      .loadProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  const refresh = async () => {
    setProfile(await createStateStore().loadProfile());
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Mascot mood="cheer" className="h-10 w-10" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-[#14213d]">法治先锋</p>
            <p className="text-xs text-brand-blue">科小獬</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-brand-blue/10 hover:text-brand-blue"
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {profile ? (
            <>
              <span className="hidden items-center gap-1 rounded-md bg-brand-gold/15 px-2 py-1 text-xs font-semibold text-amber-700 sm:inline-flex">
                积分 {profile.points}
              </span>
              <span className="hidden items-center gap-1 text-sm text-slate-600 sm:inline-flex">
                <UserRound className="h-4 w-4" />
                {profile.nickname}
              </span>
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  await refresh();
                }}
                aria-label="退出登录"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                退出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
            >
              <UserRound className="h-4 w-4" />
              登录
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
