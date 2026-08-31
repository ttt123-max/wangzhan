import { describe, it, expect, beforeEach } from 'vitest';
import { createLocalStateStore } from '../lib/state/localStore';
import type { StorageLike } from '../lib/state/types';

class MemStorage implements StorageLike {
  private m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
  removeItem(k: string) {
    this.m.delete(k);
  }
}

describe('localStateStore', () => {
  let storage: MemStorage;

  beforeEach(() => {
    storage = new MemStorage();
  });

  it('unlocks and deducts only when enough', async () => {
    const s = createLocalStateStore(storage);
    await s.recordQuiz(1, true, 30);
    expect((await s.loadProfile())?.points).toBe(30);
    expect(await s.unlockTopic(7, 30)).toBe('unlocked');
    expect((await s.loadProfile())?.points).toBe(0);
    expect(await s.unlockTopic(8, 40)).toBe('insufficient');
  });

  it('does not count a quiz twice', async () => {
    const s = createLocalStateStore(storage);
    await s.recordQuiz(1, true, 30);
    expect(await s.recordQuiz(1, true, 30)).toBe(false);
    expect((await s.loadProfile())?.points).toBe(30);
  });

  it('records browsing history', async () => {
    const s = createLocalStateStore(storage);
    await s.addHistory('article', 1);
    const history = await s.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].entityType).toBe('article');
    expect(history[0].entityId).toBe(1);
  });
});
