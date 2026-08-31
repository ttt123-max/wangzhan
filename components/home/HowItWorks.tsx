'use client';

import { Filter, Fingerprint, MessagesSquare, MessageSquareQuote } from 'lucide-react';
import { Reveal } from '@/components/layout/Reveal';

const steps = [
  { icon: Fingerprint, title: '选择主题', desc: '先选平台与栏目，找到你在意的场景' },
  { icon: Filter, title: '筛选案例', desc: '按案例类型与板块过滤，缩小范围' },
  { icon: MessagesSquare, title: '说出疑问', desc: '输入你真正关心的网络法律问题' },
  { icon: MessageSquareQuote, title: '获得解读', desc: '科小獬给出易懂、可行动的建议' }
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-surface px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">怎么用</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              四步，得到一份能看懂的普法答案
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="relative h-full rounded-xl border border-border bg-surface-2 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blueSoft">
                    <s.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <span className="text-3xl font-semibold text-brand-blueSoft">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
