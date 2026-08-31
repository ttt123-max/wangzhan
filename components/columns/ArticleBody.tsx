import type { Article } from '@/lib/types';

export function ArticleBody({ article }: { article: Article }) {
  const paragraphs = article.content.split('\n\n').filter(Boolean);
  return (
    <article className="space-y-4">
      <h2 className="text-xl font-bold text-[#14213d]">{article.title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed text-slate-700">
          {p}
        </p>
      ))}
      {article.lawRef ? (
        <p className="rounded-md bg-brand-teal/10 px-3 py-2 text-sm text-teal-700">
          {article.lawRef}
        </p>
      ) : null}
    </article>
  );
}
