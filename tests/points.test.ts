import { describe, it, expect } from 'vitest';
import {
  INITIAL_POINTS,
  pointsForQuiz,
  canUnlock,
  applyUnlock
} from '../lib/logic/points';
import type { Quiz } from '../lib/types';

const quiz: Quiz = {
  id: 1,
  topicId: 1,
  question: 'q',
  options: ['a', 'b'],
  correctIndex: 0,
  points: 10
};

describe('points', () => {
  it('starts at 0', () => {
    expect(INITIAL_POINTS).toBe(0);
  });

  it('awards points only when correct', () => {
    expect(pointsForQuiz(quiz, true)).toBe(10);
    expect(pointsForQuiz(quiz, false)).toBe(0);
  });

  it('canUnlock requires enough points', () => {
    expect(canUnlock(30, 30)).toBe(true);
    expect(canUnlock(29, 30)).toBe(false);
  });

  it('applyUnlock deducts only when enough', () => {
    expect(applyUnlock(30, 30)).toBe(0);
    expect(applyUnlock(29, 30)).toBeNull();
  });
});
