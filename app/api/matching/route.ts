import { NextResponse } from 'next/server';
import { matchQuery } from '@/lib/logic/matching';
import { faqs, topics } from '@/lib/content';

export async function POST(req: Request) {
  const body = (await req.json()) as {
    question?: string;
    category?: string;
    caseType?: string;
  };

  const faqPool = faqs.filter((f) => {
    const t = topics.find((topic) => topic.id === f.topicId);
    if (!t) return false;
    if (body.category && body.category !== '全部' && t.category !== body.category) return false;
    if (body.caseType && body.caseType !== '全部' && t.caseType !== body.caseType) return false;
    return true;
  });

  const result = matchQuery(body.question ?? '', faqPool, topics);
  if (!result) {
    return NextResponse.json({ matched: null, fallback: true });
  }

  return NextResponse.json({
    matched: {
      faq: result.faq,
      topic: result.topic ?? null
    }
  });
}
