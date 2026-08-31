'use client';

import Link from 'next/link';
import { MessageCircleQuestion, BookOpen } from 'lucide-react';
import { Mascot } from '@/components/mascot/Mascot';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="grid items-center gap-8 py-10 md:grid-cols-2">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-brand-blue/10 px-3 py-1 text-sm font-medium text-brand-blue">
          <BookOpen className="h-4 w-4" />
          网信普法新模式探索者
        </p>
        <h1 className="text-3xl font-bold leading-tight text-[#14213d] sm:text-4xl">
          和科小獬一起，<br />读懂网络世界的规则
        </h1>
        <p className="mt-4 max-w-lg text-slate-600">
          围绕獬豸法治神兽 IP，打造全场景网信普法空间。读专栏、进驿站、答问题、赚积分，解锁更多拓展案例。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/station">
            <Button icon={MessageCircleQuestion}>去普法驿站提问</Button>
          </Link>
          <Link href="/columns">
            <Button variant="outline">浏览普法专栏</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
          <Mascot mood="default" className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
