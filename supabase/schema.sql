-- A1 Coach : comptes et progression en ligne. À coller une fois dans Supabase → SQL Editor → Run.
-- Chaque compte a une ligne dans progress ; les règles RLS empêchent de lire ou d'écrire celle d'un autre.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint progress_size check (pg_column_size(state) < 300000)
);

alter table public.progress enable row level security;

drop policy if exists "lire sa progression" on public.progress;
drop policy if exists "créer sa progression" on public.progress;
drop policy if exists "modifier sa progression" on public.progress;
drop policy if exists "supprimer sa progression" on public.progress;
create policy "lire sa progression" on public.progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "créer sa progression" on public.progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "modifier sa progression" on public.progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "supprimer sa progression" on public.progress for delete to authenticated using ((select auth.uid()) = user_id);

-- « Supprimer mon compte » dans l'appli (obligatoire chez Apple, règle 5.1.1(v)) :
-- supprime le compte de la personne connectée, et sa progression avec (on delete cascade).
create or replace function public.delete_user()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = (select auth.uid());
$$;
revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
