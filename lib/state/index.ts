import { createLocalStateStore } from './localStore';
import { createSupabaseStateStore } from './supabaseStore';
import { getSupabaseClient } from '../supabase/client';
import type { UserStateAdapter } from './types';

let singleton: UserStateAdapter | null = null;

export function createStateStore(): UserStateAdapter {
  if (singleton) return singleton;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    singleton = createSupabaseStateStore(getSupabaseClient());
  } else {
    singleton = createLocalStateStore();
  }
  return singleton;
}

export type { UserStateAdapter } from './types';
