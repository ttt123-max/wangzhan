'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Clock, FileText, MessageSquareText } from 'lucide-react';
import type { BrowsingRecord } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { articles, faqs, byId } from '@/lib/content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatePanel } from '@/components/ui/StatePanel';
import { EmptyState } from '@/components/ui/EmptyState';

function resolve(record: BrowsingRecord): { title: string; href: string; kind: '文章' | '问答'; category: string } | null {
  if (record.entityType === 'article') {
    const article = articles.find((a) => a.id === record.entityId);
    const topic = article ? byId(article.topicId) : null;
    if (!article || !topic) return null;
    return { title: article.title, href: `/columns/${topic.slug}`, kind: '文章', category: topic.category };
  }
  const faq = faqs.find((f) => f.id === record.entityId);
  const topic = faq ? byId(faq.topicId) : null;
  if (!faq || !topic) return null;
  return { title: faq.question, href: `/columns/${topic.slug}`, kind: '问答', category: topic.category };
}

export default function HistoryPage() {
  const [records, setRecords] = useState<BrowsingRecord[] | null>(null);

  useEffect(() => {
    createStateStore()
      .getHistory()
      .then(setRecords)
      .catch(() => setRecords([]));
  }, []);

  if (records === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <StatePanel />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">浏览历史</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">最近看过的普法内容</h1>
        <p className="mt-3 text-sm text-muted">登录用户浏览专题或常见问题时，会记录在这里。</p>
      </div>

      {records.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="还没有浏览记录"
          description="去普法专栏逛一逛，读过的内容会出现在这里。"
          action={
            <Link href="/columns">
              <Badge tone="blue" className="px-3 py-1.5">去普法专栏</Badge>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {records.map((r) => {
            const resolved = resolve(r);
            if (!resolved) return null;
            return (
              <Link key={r.id} href={resolved.href} className="block">
                <Card variant="hover" className="flex items-center gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blueSoft">
                    {resolved.kind === '文章' ? (
                      <FileText className="h-5 w-5 text-brand-blue" />
                    ) : (
                      <MessageSquareText className="h-5 w-5 text-brand-teal" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{resolved.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{resolved.kind} · {new Date(r.viewedAt).toLocaleString('zh-CN')}</p>
                  </div>
                  <Badge tone="neutral">{resolved.category}</Badge>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
