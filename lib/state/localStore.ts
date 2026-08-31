import type { BrowsingRecord, UserProfile } from '../types';
import { applyUnlock, INITIAL_POINTS } from '../logic/points';
import type { StorageLike, UnlockResult, UserStateAdapter } from './types';

const KEYS = {
  profile: 'kxb:profile',
  attempts: 'kxb:attempts',
  unlocked: 'kxb:unlocked',
  history: 'kxb:history'
} as const;

function defaultStorage(): StorageLike {
  if (typeof localStorage !== 'undefined') return localStorage;
  const mem = new Map<string, string>();
  return {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => void mem.set(k, v),
    removeItem: (k) => void mem.delete(k)
  };
}

function readJson<T>(storage: StorageLike, key: string, fallback: T): T {
  const raw = storage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(storage: StorageLike, key: string, value: unknown): void {
  storage.setItem(key, JSON.stringify(value));
}

export function createLocalStateStore(storage?: StorageLike): UserStateAdapter {
  const store = storage ?? defaultStorage();

  const getProfile = (): UserProfile | null =>
    readJson<UserProfile | null>(store, KEYS.profile, null);

  const setProfile = (profile: UserProfile | null): void => {
    if (profile === null) {
      store.removeItem(KEYS.profile);
    } else {
      writeJson(store, KEYS.profile, profile);
    }
  };

  return {
    async loadProfile() {
      return getProfile();
    },

    async recordQuiz(quizId, correct, pointsEarned) {
      const attempted = readJson<number[]>(store, KEYS.attempts, []);
      if (attempted.includes(quizId)) return false;
      attempted.push(quizId);
      writeJson(store, KEYS.attempts, attempted);

      const profile =
        getProfile() ??
        (correct ? { id: 'local-user', nickname: '本站访客', points: INITIAL_POINTS } : null);
      if (correct && profile) {
        setProfile({ ...profile, points: profile.points + pointsEarned });
      }
      return true;
    },

    async getAttemptedQuizIds() {
      return readJson<number[]>(store, KEYS.attempts, []);
    },

    async unlockTopic(topicId, cost) {
      const unlocked = readJson<number[]>(store, KEYS.unlocked, []);
      if (unlocked.includes(topicId)) return 'already';

      const profile = getProfile();
      if (!profile) return 'insufficient';

      const next = applyUnlock(profile.points, cost);
      if (next === null) return 'insufficient';

      unlocked.push(topicId);
      writeJson(store, KEYS.unlocked, unlocked);
      setProfile({ ...profile, points: next });
      return 'unlocked';
    },

    async getUnlockedTopicIds() {
      return readJson<number[]>(store, KEYS.unlocked, []);
    },

    async addHistory(entityType, entityId) {
      const history = readJson<BrowsingRecord[]>(store, KEYS.history, []);
      const id = `${Date.now()}-${entityType}-${entityId}`;
      history.unshift({
        id,
        entityType,
        entityId,
        viewedAt: new Date().toISOString()
      });
      writeJson(store, KEYS.history, history.slice(0, 100));
    },

    async getHistory() {
      return readJson<BrowsingRecord[]>(store, KEYS.history, []);
    },

    async logQuestion() {
      // 本地演示模式无需持久化提问日志。
    }
  };
}

export type { StorageLike, UnlockResult, UserStateAdapter };
