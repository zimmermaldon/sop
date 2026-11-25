-- Daymark one-user-per-account sync. Run this in Supabase SQL Editor.
create table if not exists public.daymark_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{"tasks": [], "lists": ["Personal", "Work"], "tags": []}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.daymark_state enable row level security;
drop policy if exists "Users can read their own Daymark state" on public.daymark_state;
drop policy if exists "Users can create their own Daymark state" on public.daymark_state;
drop policy if exists "Users can update their own Daymark state" on public.daymark_state;
create policy "Users can read their own Daymark state" on public.daymark_state for select to authenticated using (auth.uid() = user_id);
create policy "Users can create their own Daymark state" on public.daymark_state for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own Daymark state" on public.daymark_state for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create or replace function public.set_daymark_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists daymark_updated_at on public.daymark_state;
create trigger daymark_updated_at before update on public.daymark_state for each row execute function public.set_daymark_updated_at();
do $$ begin alter publication supabase_realtime add table public.daymark_state; exception when duplicate_object then null; end $$;
