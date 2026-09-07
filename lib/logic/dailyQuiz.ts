import type { Quiz } from '../types';

export const DAILY_QUIZ_COUNT = 15;

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function todayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDailyQuizzes(quizzes: Quiz[], dateKey: string = todayKey()): Quiz[] {
  const pool = [...quizzes];
  const random = mulberry32(hashString(dateKey));
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return pool.slice(0, DAILY_QUIZ_COUNT);
}

function dailyKey(dateKey: string): string {
  return `kxb:daily-quiz-seen:${dateKey}`;
}

function safeStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function readDailySeen(dateKey: string): number[] {
  const storage = safeStorage();
  if (!storage) return [];
  const raw = storage.getItem(dailyKey(dateKey));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markDailySeen(dateKey: string, quizId: number): number[] {
  const storage = safeStorage();
  const seen = readDailySeen(dateKey);
  if (!seen.includes(quizId)) {
    seen.push(quizId);
  }
  if (storage) {
    storage.setItem(dailyKey(dateKey), JSON.stringify(seen));
  }
  return seen;
}
