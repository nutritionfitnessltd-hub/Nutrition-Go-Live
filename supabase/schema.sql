-- Nutrition.Fitness Go Live Control
-- Standalone Supabase schema. Do not apply to the public Nutrition.Fitness project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'contributor' check (role in ('admin','manager','contributor','reviewer')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  auth_user_id uuid references auth.users(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  task_code text not null unique,
  workstream text not null,
  phase text not null,
  title text not null,
  priority text not null check (priority in ('P0','P1','P2')),
  due_date date,
  instructions text,
  done_means text,
  dependencies text[] not null default '{}',
  owner_id uuid references public.team_members(id) on delete set null,
  owner_name text not null default 'Unassigned',
  status text not null default 'todo' check (status in ('todo','inprogress','blocked','submitted','needschanges','done')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  title text not null,
  note text,
  url text,
  storage_path text,
  submitted_by uuid references auth.users(id) on delete set null,
  submitted_by_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.task_notes (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  note text not null,
  author_id uuid references auth.users(id) on delete set null,
  author_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  decision_code text not null unique,
  decision_date date not null default current_date,
  title text not null,
  decision text not null,
  owner text,
  status text not null default 'locked',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_log (
  id bigint generated always as identity primary key,
  entity_type text not null,
  entity_id text,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  actor_id uuid references auth.users(id) on delete set null,
  actor_name text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare initial_role text;
begin
  if not exists(select 1 from public.profiles) then initial_role := 'admin'; else initial_role := 'contributor'; end if;
  insert into public.profiles(id,email,full_name,role)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name',split_part(new.email,'@',1)),initial_role)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_manager()
returns boolean
language sql
stable
security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id=auth.uid() and active=true and role in ('admin','manager')); $$;

alter table public.profiles enable row level security;
alter table public.team_members enable row level security;
alter table public.tasks enable row level security;
alter table public.submissions enable row level security;
alter table public.task_notes enable row level security;
alter table public.decisions enable row level security;
alter table public.activity_log enable row level security;

create policy "profiles_read_authenticated" on public.profiles for select to authenticated using (true);
create policy "profiles_update_self_or_manager" on public.profiles for update to authenticated using (id=auth.uid() or public.is_manager()) with check (id=auth.uid() or public.is_manager());

create policy "team_read_authenticated" on public.team_members for select to authenticated using (true);
create policy "team_manage_managers" on public.team_members for all to authenticated using (public.is_manager()) with check (public.is_manager());

create policy "tasks_read_authenticated" on public.tasks for select to authenticated using (true);
create policy "tasks_insert_managers" on public.tasks for insert to authenticated with check (public.is_manager());
create policy "tasks_update_authenticated" on public.tasks for update to authenticated using (true) with check (true);
create policy "tasks_delete_managers" on public.tasks for delete to authenticated using (public.is_manager());

create policy "submissions_read_authenticated" on public.submissions for select to authenticated using (true);
create policy "submissions_insert_authenticated" on public.submissions for insert to authenticated with check (submitted_by=auth.uid());
create policy "submissions_update_own_or_manager" on public.submissions for update to authenticated using (submitted_by=auth.uid() or public.is_manager()) with check (submitted_by=auth.uid() or public.is_manager());
create policy "submissions_delete_own_or_manager" on public.submissions for delete to authenticated using (submitted_by=auth.uid() or public.is_manager());

create policy "notes_read_authenticated" on public.task_notes for select to authenticated using (true);
create policy "notes_insert_authenticated" on public.task_notes for insert to authenticated with check (author_id=auth.uid());
create policy "notes_delete_own_or_manager" on public.task_notes for delete to authenticated using (author_id=auth.uid() or public.is_manager());

create policy "decisions_read_authenticated" on public.decisions for select to authenticated using (true);
create policy "decisions_manage_managers" on public.decisions for all to authenticated using (public.is_manager()) with check (public.is_manager());

create policy "activity_read_authenticated" on public.activity_log for select to authenticated using (true);
create policy "activity_insert_authenticated" on public.activity_log for insert to authenticated with check (actor_id=auth.uid());

insert into storage.buckets(id,name,public,file_size_limit)
values ('task-files','task-files',false,52428800)
on conflict (id) do nothing;

create policy "task_files_read_authenticated" on storage.objects for select to authenticated using (bucket_id='task-files');
create policy "task_files_insert_authenticated" on storage.objects for insert to authenticated with check (bucket_id='task-files' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "task_files_update_own_or_manager" on storage.objects for update to authenticated using (bucket_id='task-files' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_manager()));
create policy "task_files_delete_own_or_manager" on storage.objects for delete to authenticated using (bucket_id='task-files' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_manager()));

create index if not exists tasks_priority_idx on public.tasks(priority);
create index if not exists tasks_status_idx on public.tasks(status);
create index if not exists tasks_due_idx on public.tasks(due_date);
create index if not exists submissions_task_idx on public.submissions(task_id);
create index if not exists notes_task_idx on public.task_notes(task_id);
