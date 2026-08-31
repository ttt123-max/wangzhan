import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Topic } from '@/lib/types';

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link href={`/columns/${topic.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col justify-between transition-shadow hover:shadow-md">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone={topic.isPremium ? 'gold' : 'blue'}>
              {topic.isPremium ? '拓展专题' : '免费'}
            </Badge>
            <Badge tone="slate">{topic.category}</Badge>
            <Badge tone="teal">{topic.caseType}</Badge>
          </div>
          <h3 className="font-semibold text-[#14213d] group-hover:text-brand-blue">
            {topic.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{topic.summary}</p>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-brand-blue">
          阅读原文 <ArrowRight className="h-4 w-4" />
        </span>
      </Card>
    </Link>
  );
}
