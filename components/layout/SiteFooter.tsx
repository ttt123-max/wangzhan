import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>法治先锋 · 科小獬 —— 网信普法新模式探索者</p>
        <div className="flex gap-4">
          <Link href="/ip" className="hover:text-brand-blue">关于 IP</Link>
          <Link href="/columns" className="hover:text-brand-blue">普法专栏</Link>
          <Link href="/quiz" className="hover:text-brand-blue">答题中心</Link>
        </div>
        <p className="text-xs text-slate-400">本站内容为公益普法参考，不构成法律意见。</p>
      </div>
    </footer>
  );
}
