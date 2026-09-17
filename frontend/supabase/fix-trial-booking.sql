-- Run this in Supabase → SQL Editor if booking still fails.
-- Fixes missing GRANTs + adds a public booking RPC.

grant usage on schema public to anon, authenticated;
grant select on table public.packages to anon, authenticated;
grant insert on table public.trial_bookings to anon, authenticated;

drop policy if exists trial_bookings_public_insert on public.trial_bookings;
create policy trial_bookings_public_insert on public.trial_bookings
  for insert
  to anon, authenticated
  with check (true);

create or replace function public.book_trial_visit(
  p_package_slug text,
  p_visit_date date,
  p_visit_time text,
  p_full_name text,
  p_email text,
  p_phone text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_package_id uuid;
  v_id uuid;
begin
  if p_full_name is null or length(trim(p_full_name)) < 2 then
    raise exception 'INVALID_NAME';
  end if;
  if p_email is null or position('@' in p_email) = 0 then
    raise exception 'INVALID_EMAIL';
  end if;
  if p_phone is null or length(regexp_replace(p_phone, '\D', '', 'g')) < 10 then
    raise exception 'INVALID_PHONE';
  end if;

  select id into v_package_id
  from public.packages
  where slug = p_package_slug and active = true
  limit 1;

  if v_package_id is null then
    raise exception 'PACKAGE_NOT_FOUND';
  end if;

  insert into public.trial_bookings (
    package_id, visit_date, visit_time, full_name, email, phone, status
  ) values (
    v_package_id,
    p_visit_date,
    p_visit_time,
    trim(p_full_name),
    lower(trim(p_email)),
    trim(p_phone),
    'new'
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.book_trial_visit(text, date, text, text, text, text) from public;
grant execute on function public.book_trial_visit(text, date, text, text, text, text) to anon, authenticated;

-- Ensure packages exist
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
