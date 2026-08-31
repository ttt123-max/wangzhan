import Link from 'next/link';
import { ArrowRight, BookOpen, Lock } from 'lucide-react';
import type { Topic } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

export function TopicRow({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/columns/${topic.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-lift"
    >
      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blueSoft sm:flex">
        <BookOpen className="h-5 w-5 text-brand-blue" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-brand-blue">{topic.title}</h3>
          <Badge tone={topic.isPremium ? 'gold' : 'blue'}>
            {topic.isPremium ? (
              <>
                <Lock className="h-3 w-3" />
                拓展专题
              </>
            ) : (
              '免费'
            )}
          </Badge>
          <Badge tone="neutral">{topic.category}</Badge>
          <Badge tone="teal">{topic.caseType}</Badge>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{topic.summary}</p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-blue" />
    </Link>
  );
}
