import type { Faq } from '@/lib/types';

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.id} className="rounded-lg border border-slate-200 bg-white">
          <summary className="cursor-pointer select-none px-4 py-3 font-medium text-[#14213d]">
            {f.question}
          </summary>
          <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
