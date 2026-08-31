import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { topics } from '@/lib/content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function TopicShowcase() {
  const featured = [...topics].sort((a, b) => a.order - b.order).slice(0, 6);
  return (
    <section className="py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#14213d]">普法专题</h2>
        <Link href="/columns" className="inline-flex items-center gap-1 text-sm text-brand-blue">
          全部专栏 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((t) => (
          <Link key={t.id} href={`/columns/${t.slug}`} className="group">
            <Card className="h-full transition-shadow hover:shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <Badge tone={t.isPremium ? 'gold' : 'blue'}>{t.isPremium ? '拓展专题' : '免费'}</Badge>
                <Badge tone="slate">{t.category}</Badge>
              </div>
              <h3 className="mb-1 font-semibold text-[#14213d] group-hover:text-brand-blue">{t.title}</h3>
              <p className="text-sm text-slate-500">{t.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
