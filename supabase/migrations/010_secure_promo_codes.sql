-- Security fix for promo codes (audit finding #1)
--
-- Two problems being fixed here:
--
--   1. The RLS policy "Anyone can read active promo codes" allowed SELECT for
--      everyone. The Supabase anon key ships inside the public JS bundle, so
--      any visitor could run supabase.from('promo_codes').select('*') and dump
--      every code together with its plan.
--
--   2. The original 20 codes were committed in plaintext in 005_promo_codes.sql,
--      which means they are permanently readable in git history. They must be
--      treated as compromised regardless of the policy fix.
--
-- Every pre-existing code is deactivated below and replaced with values that are
-- generated inside the database, so no promo code is ever written to the repo
-- again. Read the new codes out of the database after applying this migration
-- (query at the bottom of this file).

-- 1. Close the read hole ------------------------------------------------------

drop policy if exists "Anyone can read active promo codes" on public.promo_codes;

alter table public.promo_codes enable row level security;

-- No SELECT policy remains, so with RLS on, anon and authenticated get nothing.
-- redeem_promo_code() is SECURITY DEFINER and runs as the table owner, so it
-- still reads the table normally — redemption keeps working.

-- Belt and braces: drop direct table privileges from the PostgREST roles so the
-- table is unreachable over the REST API even if a policy is added by mistake.
revoke all on public.promo_codes from anon, authenticated;

-- 2. Burn every code that has ever been in git --------------------------------

update public.promo_codes set is_active = false;

-- 3. Issue fresh codes, generated server-side ---------------------------------
-- gen_random_uuid() is core PostgreSQL 13+ (no pgcrypto needed) and is backed by
-- a cryptographic RNG. 8 hex chars = 32 bits of entropy per code.

insert into public.promo_codes (code, plan, max_uses, expires_at)
select
  'PRO-' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 8)),
  'pro',
  1,
  now() + interval '90 days'
from generate_series(1, 10)
on conflict (code) do nothing;

insert into public.promo_codes (code, plan, max_uses, expires_at)
select
  'BIZ-' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 8)),
  'business',
  1,
  now() + interval '90 days'
from generate_series(1, 10)
on conflict (code) do nothing;

-- 4. Retrieve the new codes ---------------------------------------------------
-- Run this in the Supabase SQL editor after applying the migration. Keep the
-- output out of the repo, out of chat logs, and out of issue trackers.
--
--   select code, plan, expires_at
--   from public.promo_codes
--   where is_active = true
--   order by plan, code;
