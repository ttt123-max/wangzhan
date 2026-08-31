'use client';

import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Mascot } from '@/components/mascot/Mascot';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/layout/Reveal';

export function Cta() {
  return (
    <section className="px-4 pb-2 sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-[#0f1b36] px-6 py-12 text-center shadow-lift sm:px-10">
            <div className="absolute inset-0 dot-backdrop opacity-40" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <Mascot mood="cheer" className="mx-auto h-16 w-16" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                开始你的网信普法之旅
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                免费浏览全部基础内容，做题赚积分，解锁更多拓展案例专题。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/station" variant="gold" size="lg" icon={MessagesSquare}>去普法驿站</ButtonLink>
                <ButtonLink href="/quiz" variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20" icon={ArrowRight}>
                  去答题赚积分
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
