import type { Faq } from '@/lib/types';

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.id} className="rounded-xl border border-border bg-surface">
          <summary className="cursor-pointer select-none px-4 py-3 font-medium text-foreground">
            {f.question}
          </summary>
          <p className="px-4 pb-4 text-sm leading-relaxed text-foreground-soft">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
