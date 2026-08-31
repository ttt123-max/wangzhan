import { topics } from './topics';
import { articles } from './articles';
import { faqs } from './faqs';
import { quizzes } from './quizzes';

export const bySlug = (slug: string) => topics.find((t) => t.slug === slug);
export const byId = (id: number) => topics.find((t) => t.id === id);
export const articlesFor = (topicId: number) =>
  articles.filter((a) => a.topicId === topicId);
export const faqsFor = (topicId: number) =>
  faqs.filter((f) => f.topicId === topicId);
export const quizzesFor = (topicId: number) =>
  quizzes.filter((q) => q.topicId === topicId);

export { topics, articles, faqs, quizzes };
