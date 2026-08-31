import type { Article } from '@/lib/types';

export function ArticleBody({ article }: { article: Article }) {
  const paragraphs = article.content.split('\n\n').filter(Boolean);
  return (
    <article className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">{article.title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed text-foreground-soft">
          {p}
        </p>
      ))}
      {article.lawRef ? (
        <p className="rounded-lg bg-brand-tealSoft px-3 py-2.5 text-sm leading-relaxed text-teal-700">
          {article.lawRef}
        </p>
      ) : null}
    </article>
  );
}
