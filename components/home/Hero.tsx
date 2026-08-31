'use client';

import { ArrowRight, MessagesSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Mascot } from '@/components/mascot/Mascot';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/layout/Reveal';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#edf2ff] to-bg">
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <Reveal>
          <div>
            <Badge tone="blue" className="inline-flex items-center gap-1.5 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              网信普法新模式探索者
            </Badge>
            <h1 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              别再自己啃法条，
              <br />
              把疑问交给科小獬
            </h1>
            <p className="mt-5 max-w-[46ch] text-pretty text-base leading-relaxed text-foreground-soft">
              选择普法主题与案例板块，输入你真正关心的网络法律问题。科小獬以獬豸法治神兽 IP，把枯燥条文讲成你能读懂、能记住、能行动的普法解读。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/station" size="lg" icon={MessagesSquare}>去普法驿站提问</ButtonLink>
              <ButtonLink href="/columns" size="lg" variant="outline" icon={ShieldCheck}>浏览普法专栏</ButtonLink>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-teal" />
                内容可查证，附法律依据
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-brand-gold" />
                答题赚积分，解锁拓展案例
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border border-border bg-surface p-6 shadow-lift">
              <div className="relative flex items-center justify-center py-8">
                <Mascot mood="default" className="h-64 w-64 sm:h-72 sm:w-72" />
              </div>
              <div className="relative grid grid-cols-3 gap-3 text-center">
                {[
                  ['8', '个普法专题'],
                  ['32+', '常见问答'],
                  ['100%', '可回溯']
                ].map(([n, label]) => (
                  <div key={label} className="rounded-lg bg-surface-2 px-2 py-3">
                    <p className="text-lg font-semibold text-brand-blue">{n}</p>
                    <p className="mt-0.5 text-xs text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <div className="relative mt-4 flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-goldSoft">
                    <Sparkles className="h-4 w-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">科小獬 · 普法解读</p>
                    <p className="text-xs text-muted">已准备好，等你提问</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
