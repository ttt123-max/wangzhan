import { describe, it, expect } from 'vitest';
import { quizzes } from '../lib/content';
import { getDailyQuizzes } from '../lib/logic/dailyQuiz';

describe('dailyQuiz', () => {
  it('returns 15 deterministic questions for the same date', () => {
    const a = getDailyQuizzes(quizzes, '2026-08-31');
    const b = getDailyQuizzes(quizzes, '2026-08-31');
    expect(a.length).toBe(15);
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });

  it('changes the selection when the date changes', () => {
    const a = getDailyQuizzes(quizzes, '2026-08-31');
    const b = getDailyQuizzes(quizzes, '2026-09-01');
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
  });
});
