-- Security fix: profiles.email (and other private columns) were world-readable
-- (audit finding P0 #1)
--
-- The policy "Public can view profiles" used USING (true) so that public
-- /:username pages work for anonymous visitors. RLS in Postgres filters ROWS,
-- not COLUMNS — so when the `email` column was added later, it silently became
-- readable by anyone holding the anon key, which ships inside the public JS
-- bundle:
--
--     supabase.from('profiles').select('username, email')
--
-- That dumps the email address of every registered user. The same hole exposed
-- `subscription_id` (a payment identifier), `plan_source`, and `page_views`.
--
-- Fix: publish an explicit allowlist of public columns as a view, and close the
-- base table so it is readable only by its owner. Columns added to `profiles`
-- in the future are private by default — they have to be added to the view on
-- purpose to become public.

-- 1. Public projection ---------------------------------------------------------
-- Everything the public profile page, OG image, and username check actually
-- read. Deliberately excluded: email, subscription_id, plan_source, page_views.

drop view if exists public.public_profiles;

create view public.public_profiles as
select
  id,
  username,
  display_name,
  bio,
  avatar_url,
  theme,
  custom_colors,
  font,
  content_alignment,
  plan,
  created_at
from public.profiles;

-- The view intentionally runs with definer rights (the PostgreSQL default), so
-- it reads past the owner-only policy added below. That is what makes public
-- profiles public while the base table stays closed. Its safety comes from the
-- column list above, not from RLS.

-- 2. Read-only access to the view ---------------------------------------------
-- Two reasons this revoke is required rather than cosmetic: Supabase grants ALL
-- on new objects in `public` to anon/authenticated by default, and a simple view
-- over a single table is auto-updatable in Postgres — without this, writes would
-- pass through the view and bypass the base table's RLS entirely.

revoke all on public.public_profiles from anon, authenticated;
grant select on public.public_profiles to anon, authenticated;

-- 3. Close the base table ------------------------------------------------------
-- Drop both historical names for the world-readable policy.

drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Public can view profiles" on public.profiles;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Unchanged: the insert/update/delete policies on profiles already scope to
-- auth.uid() = id, and server-side routes that need private columns
-- (/api/view, the Creem webhook) use the service role, which bypasses RLS.

-- 4. Verify --------------------------------------------------------------------
-- Run in the Supabase SQL editor after applying. Both must come back empty or
-- error for an anonymous caller — the second one is the actual leak:
--
--   select * from public.public_profiles limit 1;   -- should work, no email column
--   select email from public.profiles limit 1;      -- should return no rows
