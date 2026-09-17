-- Seed 20 members + memberships (run in Supabase SQL Editor)
-- 15–16 active, 4–5 expired. Phone 9211999653 on one expired member.

-- Resolve package ids
with pkgs as (
  select
    (select id from public.packages where slug = 'monthly' limit 1) as monthly_id,
    (select id from public.packages where slug = 'quarterly' limit 1) as quarterly_id,
    (select id from public.packages where slug = 'yearly' limit 1) as yearly_id
),
ins_members as (
  insert into public.members (full_name, email, phone, notes, status)
  values
    ('Aarav Mehta', 'aarav.mehta@example.com', '9876543210', 'Seed member', 'active'),
    ('Priya Shah', 'priya.shah@example.com', '9876543211', 'Seed member', 'active'),
    ('Rohan Kapoor', 'rohan.kapoor@example.com', '9876543212', 'Seed member', 'active'),
    ('Ananya Iyer', 'ananya.iyer@example.com', '9876543213', 'Seed member', 'active'),
    ('Vikram Singh', 'vikram.singh@example.com', '9876543214', 'Seed member', 'active'),
    ('Neha Joshi', 'neha.joshi@example.com', '9876543215', 'Seed member', 'active'),
    ('Kabir Nair', 'kabir.nair@example.com', '9876543216', 'Seed member', 'active'),
    ('Ishita Reddy', 'ishita.reddy@example.com', '9876543217', 'Seed member', 'active'),
    ('Arjun Desai', 'arjun.desai@example.com', '9876543218', 'Seed member', 'active'),
    ('Sana Khan', 'sana.khan@example.com', '9876543219', 'Seed member', 'active'),
    ('Dev Patel', 'dev.patel@example.com', '9876543220', 'Seed member', 'active'),
    ('Meera Banerjee', 'meera.banerjee@example.com', '9876543221', 'Seed member', 'active'),
    ('Yash Malhotra', 'yash.malhotra@example.com', '9876543222', 'Seed member', 'active'),
    ('Diya Chawla', 'diya.chawla@example.com', '9876543223', 'Seed member', 'active'),
    ('Harsh Vora', 'harsh.vora@example.com', '9876543224', 'Seed member', 'active'),
    -- Expired memberships (5)
    ('Rahul Verma', 'rahul.verma@example.com', '9211999653', 'Seed — expired (WhatsApp test)', 'active'),
    ('Kavya Menon', 'kavya.menon@example.com', '9876543226', 'Seed — expired', 'active'),
    ('Nikhil Rao', 'nikhil.rao@example.com', '9876543227', 'Seed — expired', 'active'),
    ('Pooja Agarwal', 'pooja.agarwal@example.com', '9876543228', 'Seed — expired', 'active'),
    ('Aditya Bansal', 'aditya.bansal@example.com', '9876543229', 'Seed — expired', 'active')
  returning id, email
)
insert into public.memberships (member_id, package_id, starts_on, ends_on, status)
select
  m.id,
  case
    when m.email in (
      'aarav.mehta@example.com',
      'priya.shah@example.com',
      'rohan.kapoor@example.com',
      'ananya.iyer@example.com',
      'vikram.singh@example.com'
    ) then p.monthly_id
    when m.email in (
      'neha.joshi@example.com',
      'kabir.nair@example.com',
      'ishita.reddy@example.com',
      'arjun.desai@example.com',
      'sana.khan@example.com',
      'dev.patel@example.com',
      'meera.banerjee@example.com'
    ) then p.quarterly_id
    when m.email in (
      'yash.malhotra@example.com',
      'diya.chawla@example.com',
      'harsh.vora@example.com'
    ) then p.yearly_id
    -- expired cohort
    when m.email = 'rahul.verma@example.com' then p.monthly_id
    when m.email in ('kavya.menon@example.com', 'nikhil.rao@example.com') then p.quarterly_id
    else p.yearly_id
  end,
  case
    when m.email in (
      'rahul.verma@example.com',
      'kavya.menon@example.com',
      'nikhil.rao@example.com',
      'pooja.agarwal@example.com',
      'aditya.bansal@example.com'
    ) then current_date - 120
    when m.email like '%malhotra%' or m.email like '%chawla%' or m.email like '%vora%'
      then current_date - 60
    when m.email in (
      'neha.joshi@example.com',
      'kabir.nair@example.com',
      'ishita.reddy@example.com',
      'arjun.desai@example.com',
      'sana.khan@example.com',
      'dev.patel@example.com',
      'meera.banerjee@example.com'
    ) then current_date - 30
    else current_date - 10
  end,
  case
    -- 5 expired
    when m.email = 'rahul.verma@example.com' then current_date - 15
    when m.email = 'kavya.menon@example.com' then current_date - 7
    when m.email = 'nikhil.rao@example.com' then current_date - 3
    when m.email = 'pooja.agarwal@example.com' then current_date - 1
    when m.email = 'aditya.bansal@example.com' then current_date - 45
    -- active: end in the future
    when m.email like '%malhotra%' or m.email like '%chawla%' or m.email like '%vora%'
      then current_date + 300
    when m.email in (
      'neha.joshi@example.com',
      'kabir.nair@example.com',
      'ishita.reddy@example.com',
      'arjun.desai@example.com',
      'sana.khan@example.com',
      'dev.patel@example.com',
      'meera.banerjee@example.com'
    ) then current_date + 60
    else current_date + 20
  end,
  case
    when m.email in (
      'rahul.verma@example.com',
      'kavya.menon@example.com',
      'nikhil.rao@example.com',
      'pooja.agarwal@example.com',
      'aditya.bansal@example.com'
    ) then 'expired'
    else 'active'
  end
from ins_members m
cross join pkgs p
where p.monthly_id is not null
  and p.quarterly_id is not null
  and p.yearly_id is not null;

-- Sanity check
select
  (select count(*) from public.members) as members_total,
  (select count(*) from public.memberships where status = 'active') as memberships_active,
  (select count(*) from public.memberships where status = 'expired') as memberships_expired,
  (select full_name || ' · ' || phone
   from public.members
   where phone = '9211999653'
   limit 1) as whatsapp_test_member;
