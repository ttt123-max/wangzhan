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
    return error ? { ok: false, error: error.message } : { ok: true };
  }
  setLocalSession(email.split('@')[0] || '本站访客');
  return { ok: true };
}

export async function signUp(nickname: string, email: string, password: string): Promise<AuthResult> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabaseClient().auth.signUp({
      email,
      password,
      options: { data: { nickname } }
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  }
  setLocalSession(nickname || email.split('@')[0] || '本站访客');
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
}

function setLocalSession(nickname: string): void {
  if (typeof localStorage === 'undefined') return;
  const current = localStorage.getItem('kxb:profile');
  if (!current) {
    localStorage.setItem(
      'kxb:profile',
      JSON.stringify({ id: 'local-user', nickname, points: 0 })
    );
  }
}
