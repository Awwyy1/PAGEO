-- Two fixes (audit findings P1 #6 and #7). SQL only — no application code
-- depends on either change.
--
-- ---------------------------------------------------------------------------
-- 1. Links that are switched off, or scheduled for later, were still readable
-- ---------------------------------------------------------------------------
--
-- The original policy in 001 was:
--
--     using (is_active = true or auth.uid() = profile_id)
--
-- but add-email-and-fix-rls.sql later replaced it with USING (true) while
-- rewriting the policy set, and the is_active test was lost along the way. The
-- public page still hid disabled links because it filters them in the query, so
-- nothing looked wrong — but anyone asking the API directly got every link,
-- including ones the owner had switched off and ones scheduled for a future
-- date. A post queued for Monday was readable on Friday.
--
-- Two separate policies below. Postgres combines permissive policies with OR,
-- so the owner keeps full access to their own rows while everyone else sees
-- only what is actually published.

drop policy if exists "Active links are viewable by everyone" on public.links;
drop policy if exists "Public can view active links" on public.links;
drop policy if exists "Owner can view own links" on public.links;
drop policy if exists "Public can view published links" on public.links;

-- The dashboard needs every link the owner has, including disabled and
-- scheduled ones. This also covers the .select() that follows insert/update in
-- the profile context — without it, drag-to-reorder would read back zero rows
-- and report a failure.
create policy "Owner can view own links"
  on public.links for select
  using (auth.uid() = profile_id);

create policy "Public can view published links"
  on public.links for select
  using (
    is_active = true
    and (scheduled_at is null or scheduled_at <= now())
  );

-- ---------------------------------------------------------------------------
-- 2. Anyone could write fake rows into anyone else's analytics
-- ---------------------------------------------------------------------------
--
-- The policy was named "Service role can insert" but was written as
-- WITH CHECK (true). The service role bypasses RLS entirely and never needed a
-- policy, so the only thing this actually did was let anon and authenticated
-- insert events — into any profile_id they chose.
--
-- /api/view and /api/click only insert events inside their `if (serviceKey)`
-- branch, where the client is built with the service role key, so removing this
-- policy cannot affect real tracking.

drop policy if exists "Service role can insert" on public.analytics_events;

-- Second barrier, in case a permissive policy is ever added back by mistake.
revoke insert on public.analytics_events from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Verify
-- ---------------------------------------------------------------------------
-- Run as an anonymous caller. The first count must exclude anything switched
-- off or scheduled ahead; the insert must be rejected.
--
--   begin;
--   set local role anon;
--   select count(*) as "видно анониму" from public.links;
--   select count(*) as "реально опубликовано" from public.links
--     where is_active and (scheduled_at is null or scheduled_at <= now());
--   rollback;
--
-- The two numbers must match. Then:
--
--   begin;
--   set local role anon;
--   insert into public.analytics_events (profile_id, event_type)
--   values (gen_random_uuid(), 'page_view');   -- must fail
--   rollback;
