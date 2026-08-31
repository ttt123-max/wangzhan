import type { BrowsingRecord, UserProfile } from '../types';

export type UnlockResult = 'unlocked' | 'insufficient' | 'already';

export interface UserStateAdapter {
  loadProfile(): Promise<UserProfile | null>;
  recordQuiz(quizId: number, correct: boolean, pointsEarned: number): Promise<boolean>;
  getAttemptedQuizIds(): Promise<number[]>;
  unlockTopic(topicId: number, cost: number): Promise<UnlockResult>;
  getUnlockedTopicIds(): Promise<number[]>;
  addHistory(entityType: 'article' | 'faq', entityId: number): Promise<void>;
  getHistory(): Promise<BrowsingRecord[]>;
  logQuestion(question: string, matchedTopicId: number | null): Promise<void>;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
