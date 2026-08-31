import { describe, it, expect } from 'vitest';
import { topics, articles, faqs, quizzes } from '../lib/content';

describe('content', () => {
  it('has 8 topics with required metadata', () => {
    expect(topics.length).toBe(8);
    expect(topics.every((t) => t.slug && t.title && t.summary)).toBe(true);
    expect(topics.some((t) => t.isPremium)).toBe(true);
    expect(topics.some((t) => t.isPremium && t.premiumPoints > 0)).toBe(true);
  });

  it('every topic has article, faqs and quizzes', () => {
    for (const t of topics) {
      expect(articles.filter((a) => a.topicId === t.id).length).toBeGreaterThan(0);
      expect(faqs.filter((f) => f.topicId === t.id).length).toBeGreaterThanOrEqual(3);
      expect(quizzes.filter((q) => q.topicId === t.id).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('all faqs have keywords for matching', () => {
    expect(faqs.every((f) => f.keywords.length >= 3)).toBe(true);
  });

  it('all quizzes have a valid correctIndex and positive points', () => {
    expect(
      quizzes.every((q) => q.correctIndex >= 0 && q.correctIndex < q.options.length && q.points > 0)
    ).toBe(true);
  });
});
