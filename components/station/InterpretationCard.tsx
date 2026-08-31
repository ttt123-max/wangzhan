import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import type { Faq, Topic } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mascot } from '@/components/mascot/Mascot';

export function InterpretationCard({ faq, topic }: { faq: Faq; topic?: Topic }) {
  if (topic) {
    return (
      <Card variant="default" className="border-l-4 border-l-brand-teal p-6">
        <div className="flex items-start gap-3">
          <Mascot mood="ask" className="h-12 w-12 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-brand-gold" />
              <p className="text-xs font-medium uppercase tracking-widest text-muted">科小獬解读</p>
            </div>
            <h3 className="font-semibold text-foreground">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-soft">{faq.answer}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{topic.title}</Badge>
                <Badge tone="neutral">{topic.category}</Badge>
                <Badge tone="teal">{topic.caseType}</Badge>
              </div>
              <Link href={`/columns/${topic.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue">
                查看专题 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-brand-teal p-6">
      <p className="font-semibold text-foreground">{faq.question}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-soft">{faq.answer}</p>
    </Card>
  );
}
