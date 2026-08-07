-- Close direct access to the counter functions (audit finding P1 #9)
--
-- increment_page_views and increment_click_count are SECURITY DEFINER and 004
-- granted EXECUTE to anon, so anybody could call them straight from the browser
-- with the public anon key and inflate any profile's view count or any link's
-- click count — no need to go through /api/view or /api/click at all.
--
-- Both API routes build their Supabase client with the service role key when it
-- is present, so tracking keeps working after this.
--
-- IMPORTANT — check before applying: if SUPABASE_SERVICE_ROLE_KEY is not set in
-- the deployment, those routes fall back to the anon key and this revoke stops
-- view and click counting entirely. It won't break the site, but the numbers
-- would quietly stop moving. The verification query at the bottom tells you
-- which situation you're in.

revoke execute on function public.increment_click_count(uuid) from anon, authenticated;
revoke execute on function public.increment_page_views(text) from anon, authenticated;

grant execute on function public.increment_click_count(uuid) to service_role;
grant execute on function public.increment_page_views(text) to service_role;

-- Hardening for every SECURITY DEFINER function here.
--
-- These run with the privileges of their owner. Without a pinned search_path, a
-- caller who can create objects in a schema that comes earlier on the path can
-- shadow a table or operator the function body refers to and have it run as the
-- owner. Pinning the path removes that whole class of attack. This only sets a
-- property on the functions — the bodies are untouched.

alter function public.increment_click_count(uuid) set search_path = public, pg_temp;
alter function public.increment_page_views(text) set search_path = public, pg_temp;
alter function public.redeem_promo_code(text, uuid) set search_path = public, pg_temp;
alter function public.handle_new_user() set search_path = public, pg_temp;

-- ---------------------------------------------------------------------------
-- Verify
-- ---------------------------------------------------------------------------
--
-- 1. Is the service role key actually in use? Analytics events are only ever
--    written inside the `if (serviceKey)` branch of the API routes, so a
--    non-zero count here proves the key is configured:
--
--      select count(*) as "событий записано" from public.analytics_events;
--
--    Zero means either no traffic yet or a missing key — check Vercel env vars
--    before assuming this migration is at fault.
--
-- 2. anon can no longer call the counters directly:
--
--      begin;
--      set local role anon;
--      select public.increment_page_views('anything');   -- must fail
--      rollback;
--
--    "permission denied for function increment_page_views" is the correct result.
