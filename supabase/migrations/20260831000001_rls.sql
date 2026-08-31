alter table public.profiles enable row level security;
alter table public.user_quiz_attempts enable row level security;
alter table public.browsing_history enable row level security;
alter table public.unlocked_topics enable row level security;
alter table public.question_logs enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "attempts_select_own"
  on public.user_quiz_attempts for select
  using (auth.uid() = user_id);
create policy "attempts_insert_own"
  on public.user_quiz_attempts for insert
  with check (auth.uid() = user_id);

create policy "history_select_own"
  on public.browsing_history for select
  using (auth.uid() = user_id);
create policy "history_insert_own"
  on public.browsing_history for insert
  with check (auth.uid() = user_id);

create policy "unlocked_select_own"
  on public.unlocked_topics for select
  using (auth.uid() = user_id);
create policy "unlocked_insert_own"
  on public.unlocked_topics for insert
  with check (auth.uid() = user_id);

create policy "questions_select_own"
  on public.question_logs for select
  using (auth.uid() = user_id);
create policy "questions_insert_own"
  on public.question_logs for insert
  with check (auth.uid() = user_id);

-- 让 Supabase Data API（PostgREST）能访问这些表，同时由 RLS 控制行级访问。
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on
  public.profiles,
  public.user_quiz_attempts,
  public.browsing_history,
  public.unlocked_topics,
  public.question_logs
  to anon, authenticated;

grant execute on function public.add_points(uuid, integer) to authenticated;
