export interface QuizHistoryItem {
  quizId: number;
  selectedIndex: number;
  isCorrect: boolean;
  dateKey: string;
  answeredAt: string;
}

const KEY = 'kxb:quiz-history';

function safeStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function loadQuizHistory(): QuizHistoryItem[] {
  const storage = safeStorage();
  if (!storage) return [];
  const raw = storage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as QuizHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addQuizHistory(item: QuizHistoryItem): void {
  const storage = safeStorage();
  if (!storage) return;
  const history = loadQuizHistory();
  const existing = history.findIndex(
    (h) => h.quizId === item.quizId && h.dateKey === item.dateKey
  );
  if (existing >= 0) {
    history[existing] = item;
  } else {
    history.unshift(item);
  }
  storage.setItem(KEY, JSON.stringify(history.slice(0, 300)));
}
