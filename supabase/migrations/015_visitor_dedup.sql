-- Deduplicate analytics by visitor
--
-- Every page load wrote a page_view: a refresh counted, a back-navigation
-- counted, and an owner checking their own page ten times a day counted ten
-- times. Views were inflated by an unknown factor, which made CTR
-- (clicks ÷ views) meaningless — the denominator was noise.
--
-- visitor_hash identifies a visitor without storing anything that identifies a
-- person. It is sha256 over IP + user agent + profile id + today's date, so:
--   - the raw IP is never stored
--   - the value rotates daily and cannot be correlated across days
--   - it is scoped per profile, so the same visitor looks different on two
--     different pages
--
-- The API routes use it to skip an event when the same visitor already
-- produced one within a short window. Rows written before this migration keep
-- visitor_hash null and simply stay outside the deduplication logic.

alter table public.analytics_events
  add column if not exists visitor_hash text;

-- Supports the "has this visitor been seen recently" lookup that runs before
-- every insert. created_at descending because the check is always for the most
-- recent window.
create index if not exists idx_analytics_dedup
  on public.analytics_events (profile_id, visitor_hash, event_type, created_at desc);

comment on column public.analytics_events.visitor_hash is
  'Daily-rotating sha256 of IP + user agent + profile id. Never contains a raw IP. Used only to deduplicate events; null on rows written before deduplication existed.';
