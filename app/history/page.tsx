'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, MessageSquareText } from 'lucide-react';
import type { BrowsingRecord } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { articles, faqs, byId } from '@/lib/content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

function resolve(
  record: BrowsingRecord
): { title: string; href: string; kind: '文章' | '问答'; category: string } | null {
  if (record.entityType === 'article') {
    const article = articles.find((a) => a.id === record.entityId);
    if (!article) return null;
    const topic = byId(article.topicId);
    if (!topic) return null;
    return { title: article.title, href: `/columns/${topic.slug}`, kind: '文章', category: topic.category };
  }
  const faq = faqs.find((f) => f.id === record.entityId);
  if (!faq) return null;
  const topic = byId(faq.topicId);
  if (!topic) return null;
  return { title: faq.question, href: `/columns/${topic.slug}`, kind: '问答', category: topic.category };
}

export default function HistoryPage() {
  const [records, setRecords] = useState<BrowsingRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    createStateStore()
      .getHistory()
      .then(setRecords)
      .catch(() => setRecords([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14213d]">浏览历史</h1>
      <p className="mt-2 text-slate-500">你最近浏览过的普法专题与问答。</p>

      {loaded && records.length === 0 ? (
        <Card className="mt-6 text-center">
          <p className="text-slate-500">暂无浏览记录，去科普专栏逛逛吧。</p>
        </Card>
      ) : null}

      <div className="mt-6 space-y-3">
        {records.map((r) => {
          const resolved = resolve(r);
          if (!resolved) return null;
          return (
            <Link key={r.id} href={resolved.href} className="block">
              <Card className="flex items-center gap-3 transition-shadow hover:shadow-md">
                {resolved.kind === '文章' ? (
                  <FileText className="h-5 w-5 shrink-0 text-brand-blue" />
                ) : (
                  <MessageSquareText className="h-5 w-5 shrink-0 text-brand-teal" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#14213d]">{resolved.title}</p>
                  <p className="text-xs text-slate-400">
                    {resolved.kind} · {new Date(r.viewedAt).toLocaleString('zh-CN')}
                  </p>
                </div>
                <Badge tone="slate">{resolved.category}</Badge>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
