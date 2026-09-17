-- Evolution Gym — run in Supabase SQL Editor
-- After Auth user is created for admin, link them:
--   insert into public.admin_profiles (user_id) values ('<auth-user-uuid>');

create extension if not exists "pgcrypto";

-- ── Packages ───────────────────────────────────────────────
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_label text not null,
  period_label text not null,
  duration_days int not null check (duration_days > 0),
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Trial bookings (public leads) ──────────────────────────
create table if not exists public.trial_bookings (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages (id),
  visit_date date not null,
  visit_time text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'converted', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists trial_bookings_status_idx on public.trial_bookings (status);
create index if not exists trial_bookings_created_idx on public.trial_bookings (created_at desc);

-- ── Members ────────────────────────────────────────────────
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  notes text,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists members_email_idx on public.members (email);

-- ── Memberships ────────────────────────────────────────────
create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members (id) on delete cascade,
  package_id uuid not null references public.packages (id),
  starts_on date not null,
  ends_on date not null,
  status text not null default 'active'
    check (status in ('active', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  check (ends_on >= starts_on)
);

create index if not exists memberships_status_idx on public.memberships (status);
create index if not exists memberships_ends_on_idx on public.memberships (ends_on);

-- ── Admin profiles ─────────────────────────────────────────
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles ap where ap.user_id = auth.uid()
  );
$$;

-- Auto-expire memberships by date (call from app or cron)
create or replace function public.sync_membership_status()
returns void
language sql
security definer
set search_path = public
as $$
  update public.memberships
  set status = 'expired'
  where status = 'active' and ends_on < current_date;
$$;

-- ── Seed packages ──────────────────────────────────────────
insert into public.packages (slug, name, price_label, period_label, duration_days, featured)
values
  ('monthly', 'Monthly', '₹2,499', '/mo', 30, false),
  ('quarterly', 'Quarterly', '₹6,499', '/qtr', 90, true),
  ('yearly', 'Yearly', '₹21,999', '/yr', 365, false)
on conflict (slug) do update set
  name = excluded.name,
  price_label = excluded.price_label,
  period_label = excluded.period_label,
  duration_days = excluded.duration_days,
  featured = excluded.featured,
  active = true;

-- ── RLS ────────────────────────────────────────────────────
alter table public.packages enable row level security;
alter table public.trial_bookings enable row level security;
alter table public.members enable row level security;
alter table public.memberships enable row level security;
alter table public.admin_profiles enable row level security;

-- Packages: anyone can read active plans
drop policy if exists packages_public_read on public.packages;
create policy packages_public_read on public.packages
  for select using (active = true);

drop policy if exists packages_admin_all on public.packages;
create policy packages_admin_all on public.packages
  for all using (public.is_admin()) with check (public.is_admin());

-- Trial bookings: public insert; admin full access
-- IMPORTANT: do NOT add a public SELECT policy (exposes leads).
-- The app inserts without .select() because RETURNING needs SELECT under RLS.
drop policy if exists trial_bookings_public_insert on public.trial_bookings;
create policy trial_bookings_public_insert on public.trial_bookings
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists trial_bookings_admin_all on public.trial_bookings;
create policy trial_bookings_admin_all on public.trial_bookings
  for all using (public.is_admin()) with check (public.is_admin());

-- Members / memberships: admin only
drop policy if exists members_admin_all on public.members;
create policy members_admin_all on public.members
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists memberships_admin_all on public.memberships;
create policy memberships_admin_all on public.memberships
  for all using (public.is_admin()) with check (public.is_admin());

-- Admin profiles: admins can read their row
drop policy if exists admin_profiles_self_read on public.admin_profiles;
create policy admin_profiles_self_read on public.admin_profiles
  for select using (auth.uid() = user_id or public.is_admin());
