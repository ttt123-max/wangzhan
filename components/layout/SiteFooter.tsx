import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Mascot } from '@/components/mascot/Mascot';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mascot mood="default" className="h-9 w-9" />
            <div className="leading-none">
              <p className="text-sm font-semibold text-foreground">法治先锋 · 科小獬</p>
              <p className="mt-0.5 text-xs text-muted">网信普法新模式探索者</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            不用自己啃法条。选主题、选板块、说出你的疑问，科小獬用易懂的方式给你讲清网信法律。
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-teal" />
            本站内容为公益普法参考，不构成法律意见
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">内容</p>
          <ul className="space-y-2 text-sm text-foreground-soft">
            <li><Link className="hover:text-brand-blue" href="/columns">普法专栏</Link></li>
            <li><Link className="hover:text-brand-blue" href="/station">普法驿站</Link></li>
            <li><Link className="hover:text-brand-blue" href="/topics">专题库</Link></li>
            <li><Link className="hover:text-brand-blue" href="/quiz">答题中心</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">关于</p>
          <ul className="space-y-2 text-sm text-foreground-soft">
            <li><Link className="hover:text-brand-blue" href="/ip">科小獬 IP</Link></li>
            <li><Link className="hover:text-brand-blue" href="/account">我的账户</Link></li>
            <li><Link className="hover:text-brand-blue" href="/login">登录 / 注册</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 法治先锋 · 科小獬</p>
          <p>以法为盾，守护每一个上网的人</p>
        </div>
      </div>
    </footer>
  );
}
