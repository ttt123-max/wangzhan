import { notFound } from 'next/navigation';
import { bySlug, articlesFor, faqsFor } from '@/lib/content';
import { Badge } from '@/components/ui/Badge';
import { PremiumContent } from '@/components/columns/PremiumContent';
import { ArticleBody } from '@/components/columns/ArticleBody';
import { FaqList } from '@/components/columns/FaqList';
import { RecordView } from '@/components/history/RecordView';

export default async function ColumnDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = bySlug(slug);
  if (!topic) notFound();

  const article = articlesFor(topic.id)[0];
  const faqs = faqsFor(topic.id);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <RecordView entityType="article" entityId={article.id} />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge tone={topic.isPremium ? 'gold' : 'blue'}>
          {topic.isPremium ? '拓展专题' : '免费'}
        </Badge>
        <Badge tone="neutral">{topic.category}</Badge>
        <Badge tone="teal">{topic.caseType}</Badge>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">{topic.title}</h1>
      <p className="mt-2 max-w-2xl text-pretty text-foreground-soft">{topic.summary}</p>

      <div className="mt-6">
        {topic.isPremium ? (
          <PremiumContent topic={topic} article={article} faqs={faqs} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <ArticleBody article={article} />
            <aside>
              <h2 className="mb-3 font-semibold text-[#14213d]">常见问题</h2>
              <FaqList faqs={faqs} />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
