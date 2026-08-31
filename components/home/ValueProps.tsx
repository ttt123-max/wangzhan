'use client';

import { MessagesSquare, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/layout/Reveal';

const items = [
  {
    icon: Scale,
    title: '全场景覆盖',
    desc: '网络安全、个人信息、数据安全、未成年人保护、反诈、网络侵权等 8 大普法专题，全都讲得清。',
    accent: 'bg-brand-blueSoft text-brand-blue'
  },
  {
    icon: MessagesSquare,
    title: 'IP 化解读',
    desc: '不堆法条，用科小獬的亲和口吻把条文翻译成你听得懂的行动指南。',
    accent: 'bg-brand-tealSoft text-brand-teal'
  },
  {
    icon: Sparkles,
    title: '答题赚积分',
    desc: '完成网信普法小问答赚积分，积分解锁更多拓展案例专题，边学边涨知识。',
    accent: 'bg-brand-goldSoft text-brand-gold'
  },
  {
    icon: ShieldCheck,
    title: '内容可回溯',
    desc: '重要结论标注法律依据，公益普法参考，守住可信底线。',
    accent: 'bg-brand-blueSoft text-brand-blue'
  }
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">为什么选科小獬</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            把网信法律，变成每个人都能用上的知识
          </h2>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <div className="group h-full rounded-xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lift">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${item.accent}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
