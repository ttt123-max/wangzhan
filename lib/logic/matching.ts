import type { Faq, Topic } from '../types';

export interface MatchResult {
  faq: Faq;
  topic?: Topic;
  score: number;
}

export function normalizeQuery(input: string): string {
  return input
    .trim()
    .replace(/[\s，。！？、,.!?;；:：'"“”‘’]+/g, '')
    .toLowerCase();
}

export function matchQuery(
  input: string,
  faqs: Faq[],
  topics: Topic[]
): MatchResult | null {
  const q = normalizeQuery(input);
  if (!q) return null;

  let best: MatchResult | null = null;
  for (const faq of faqs) {
    let score = 0;
    for (const k of faq.keywords) {
      if (k.length > 0 && q.includes(k)) score += k.length;
    }
    if (score > 0 && (best === null || score > best.score)) {
      best = {
        faq,
        topic: topics.find((t) => t.id === faq.topicId),
        score
      };
    }
  }
  return best;
}
