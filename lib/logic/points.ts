import type { Quiz } from '../types';

export const INITIAL_POINTS = 0;

export function pointsForQuiz(quiz: Quiz, correct: boolean): number {
  return correct ? Math.max(1, quiz.points) : 0;
}

export function canUnlock(points: number, required: number): boolean {
  return points >= required;
}

export function applyUnlock(points: number, required: number): number | null {
  if (points < required) return null;
  return points - required;
}
