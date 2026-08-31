import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import type { Faq, Topic } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

const accentMap: Record<Topic['accent'], string> = {
  blue: 'bg-brand-blueSoft',
  gold: 'bg-brand-goldSoft',
  teal: 'bg-brand-tealSoft'
};

export function CaseCard({ topic, faq }: { topic: Topic; faq?: Faq }) {
  return (
    <Link
      href={`/columns/${topic.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lift"
    >
      <div className={`flex h-28 items-center justify-center ${accentMap[topic.accent]} p-4`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface shadow-soft">
          <BookOpen className="h-5 w-5 text-brand-blue" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="blue">{topic.title}</Badge>
          <Badge tone="neutral">{topic.category}</Badge>
        </div>
        <h3 className="font-semibold leading-snug text-foreground group-hover:text-brand-blue">
          {faq?.question ?? topic.summary}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {faq?.answer ?? topic.summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
          查看案例 <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
