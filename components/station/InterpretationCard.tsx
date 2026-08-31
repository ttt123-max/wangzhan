import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import type { Faq, Topic } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function InterpretationCard({
  question,
  faq,
  topic
}: {
  question: string;
  faq: Faq;
  topic?: Topic;
}) {
  return (
    <Card className="border-l-4 border-l-brand-teal">
      <div className="mb-2 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-brand-gold" />
        <p className="text-sm text-slate-500">科小獬为你解答</p>
      </div>
      <p className="font-medium text-[#14213d]">{faq.question}</p>
      <p className="mt-2 leading-relaxed text-slate-700">{faq.answer}</p>
      {topic ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge tone="blue">{topic.title}</Badge>
            <Badge tone="slate">{topic.category}</Badge>
          </div>
          <Link
            href={`/columns/${topic.slug}`}
            className="inline-flex items-center gap-1 text-sm text-brand-blue hover:underline"
          >
            查看专题 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
