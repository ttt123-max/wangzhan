import { getSupabaseClient } from './supabase/client';

export function isSupabaseConfigured(): boolean {
  return Boolean(
    typeof process !== 'undefined' &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    emitAuthChanged();
    return { ok: true };
  }
  setLocalSession(email.split('@')[0] || '本站访客');
  emitAuthChanged();
  return { ok: true };
}

export async function signUp(nickname: string, email: string, password: string): Promise<AuthResult> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabaseClient().auth.signUp({
      email,
      password,
      options: { data: { nickname } }
    });
    if (error) return { ok: false, error: error.message };
    emitAuthChanged();
    return { ok: true };
  }
  setLocalSession(nickname || email.split('@')[0] || '本站访客');
  emitAuthChanged();
  return { ok: true };
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    await getSupabaseClient().auth.signOut();
  } else if (typeof localStorage !== 'undefined') {
    ['kxb:profile', 'kxb:attempts', 'kxb:unlocked', 'kxb:history'].forEach((k) =>
      localStorage.removeItem(k)
    );
  }
  emitAuthChanged();
}

function setLocalSession(nickname: string): void {
  if (typeof localStorage === 'undefined') return;
  const current = localStorage.getItem('kxb:profile');
  const profile = current
    ? { ...(JSON.parse(current) as { id: string; points: number }), nickname }
    : { id: 'local-user', nickname, points: 0 };
  localStorage.setItem('kxb:profile', JSON.stringify(profile));
}

function emitAuthChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kxb:auth'));
  }
}
