create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null default '本站访客',
  points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.user_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  quiz_id integer not null,
  is_correct boolean not null default false,
  points_earned integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, quiz_id)
);

create table if not exists public.browsing_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  entity_type text not null check (entity_type in ('article', 'faq')),
  entity_id integer not null,
  viewed_at timestamptz not null default now()
);

create table if not exists public.unlocked_topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  topic_id integer not null,
  unlocked_at timestamptz not null default now(),
  unique (user_id, topic_id)
);

create table if not exists public.question_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  question text not null,
  matched_topic_id integer,
  created_at timestamptz not null default now()
);

create or replace function public.add_points(user_id uuid, amount integer)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  new_points integer;
begin
  if user_id is distinct from auth.uid() then
    raise exception 'forbidden: cannot modify another user points';
  end if;
  update public.profiles p
  set points = greatest(0, p.points + coalesce(amount, 0))
  where p.id = user_id
    and exists (
      select 1 from public.profiles mine
      where mine.id = auth.uid()
    )
  returning p.points into new_points;
  return new_points;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nickname', '本站访客'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
