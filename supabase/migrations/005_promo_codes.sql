-- Promo code system for plan upgrades

-- Table for promo codes
create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  plan text not null check (plan in ('pro', 'business')),
  max_uses integer not null default 1,
  current_uses integer not null default 0,
  expires_at timestamptz not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Table for tracking who used which code
create table if not exists public.promo_redemptions (
  id uuid primary key default gen_random_uuid(),
  promo_code_id uuid not null references public.promo_codes(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique(promo_code_id, profile_id) -- each user can only redeem each code once
);

-- Add plan column to profiles
alter table public.profiles
  add column if not exists plan text not null default 'free'
  check (plan in ('free', 'pro', 'business'));

-- RLS policies for promo_codes (read-only for authenticated users)
alter table public.promo_codes enable row level security;
create policy "Anyone can read active promo codes"
  on public.promo_codes for select
  using (true);

-- RLS for promo_redemptions
alter table public.promo_redemptions enable row level security;
create policy "Users can read own redemptions"
  on public.promo_redemptions for select
  using (auth.uid() = profile_id);
create policy "Users can insert own redemptions"
  on public.promo_redemptions for insert
  with check (auth.uid() = profile_id);

-- RPC to redeem a promo code (atomic, security definer)
create or replace function public.redeem_promo_code(
  promo_code text,
  user_id uuid
) returns jsonb as $$
declare
  v_promo public.promo_codes;
  v_already boolean;
begin
  -- Find the code
  select * into v_promo
  from public.promo_codes
  where code = promo_code
    and is_active = true
    and expires_at > now()
    and current_uses < max_uses;

  if v_promo.id is null then
    return jsonb_build_object('success', false, 'error', 'Invalid or expired promo code');
  end if;

  -- Check if already redeemed by this user
  select exists(
    select 1 from public.promo_redemptions
    where promo_code_id = v_promo.id and profile_id = user_id
  ) into v_already;

  if v_already then
    return jsonb_build_object('success', false, 'error', 'You have already used this code');
  end if;

  -- Increment usage
  update public.promo_codes
  set current_uses = current_uses + 1
  where id = v_promo.id;

  -- Record redemption
  insert into public.promo_redemptions (promo_code_id, profile_id)
  values (v_promo.id, user_id);

  -- Upgrade user plan
  update public.profiles
  set plan = v_promo.plan
  where id = user_id;

  return jsonb_build_object('success', true, 'plan', v_promo.plan);
end;
$$ language plpgsql security definer;

grant execute on function public.redeem_promo_code(text, uuid) to authenticated;

-- Insert 10 PRO promo codes (valid for 30 days, single use each)
insert into public.promo_codes (code, plan, max_uses, expires_at) values
  ('PRO-AX7K2M', 'pro', 1, now() + interval '30 days'),
  ('PRO-BN4R8W', 'pro', 1, now() + interval '30 days'),
  ('PRO-CT9F3L', 'pro', 1, now() + interval '30 days'),
  ('PRO-DQ6H5J', 'pro', 1, now() + interval '30 days'),
  ('PRO-EW2P7V', 'pro', 1, now() + interval '30 days'),
  ('PRO-FZ8S1X', 'pro', 1, now() + interval '30 days'),
  ('PRO-GU5M4C', 'pro', 1, now() + interval '30 days'),
  ('PRO-HY3N6B', 'pro', 1, now() + interval '30 days'),
  ('PRO-JR9T2D', 'pro', 1, now() + interval '30 days'),
  ('PRO-KL7W8G', 'pro', 1, now() + interval '30 days');

-- Insert 10 BUSINESS promo codes
insert into public.promo_codes (code, plan, max_uses, expires_at) values
  ('BIZ-MX4Q9N', 'business', 1, now() + interval '30 days'),
  ('BIZ-PV7R3H', 'business', 1, now() + interval '30 days'),
  ('BIZ-SW2K6F', 'business', 1, now() + interval '30 days'),
  ('BIZ-TY8L1J', 'business', 1, now() + interval '30 days'),
  ('BIZ-UZ5N4W', 'business', 1, now() + interval '30 days'),
  ('BIZ-VA3P7C', 'business', 1, now() + interval '30 days'),
  ('BIZ-WB9M2X', 'business', 1, now() + interval '30 days'),
  ('BIZ-XD6S8K', 'business', 1, now() + interval '30 days'),
  ('BIZ-YF1T5G', 'business', 1, now() + interval '30 days'),
  ('BIZ-ZH4W9L', 'business', 1, now() + interval '30 days');
