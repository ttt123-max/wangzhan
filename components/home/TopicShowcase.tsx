'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Lock } from 'lucide-react';
import { topics } from '@/lib/content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/layout/Reveal';

export function TopicShowcase() {
  const featured = [...topics].sort((a, b) => a.order - b.order).slice(0, 6);
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">专题入口</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              从一个你关心的场景开始
            </h2>
          </div>
          <Link href="/columns" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
            查看全部专栏 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((t, i) => (
          <Reveal key={t.id} delay={i * 60}>
            <Link href={`/columns/${t.slug}`} className="group block h-full">
              <Card variant="hover" className="flex h-full flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge tone={t.isPremium ? 'gold' : 'blue'}>
                    {t.isPremium ? (
                      <>
                        <Lock className="h-3 w-3" />
                        拓展专题
                      </>
                    ) : (
                      '免费'
                    )}
                  </Badge>
                  <Badge tone="neutral">{t.category}</Badge>
                </div>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blueSoft">
                  <BookOpen className="h-4 w-4 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-brand-blue">{t.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{t.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                  阅读专题 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
