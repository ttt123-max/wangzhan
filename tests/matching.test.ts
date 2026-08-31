import { describe, it, expect } from 'vitest';
import { normalizeQuery, matchQuery } from '../lib/logic/matching';
import type { Faq, Topic } from '../lib/types';

const topics: Topic[] = [
  {
    id: 1,
    slug: 'network-security',
    title: '网络安全基础',
    summary: '',
    category: '网络安全',
    caseType: '科普',
    isPremium: false,
    premiumPoints: 0,
    accent: 'blue',
    order: 1
  }
];

const faqs: Faq[] = [
  {
    id: 1,
    topicId: 1,
    question: '如何设置安全密码？',
    answer: '使用长且唯一的密码。',
    keywords: ['密码', '安全']
  }
];

describe('matching', () => {
  it('normalizes punctuation', () => {
    expect(normalizeQuery(' 密码，安全！')).toBe('密码安全');
  });

  it('finds matching faq', () => {
    const r = matchQuery('密码怎么设置', faqs, topics);
    expect(r).not.toBeNull();
    expect(r!.faq.id).toBe(1);
    expect(r!.topic?.slug).toBe('network-security');
  });

  it('returns null on no match', () => {
    expect(matchQuery('完全无关内容xyz', faqs, topics)).toBeNull();
  });
});
