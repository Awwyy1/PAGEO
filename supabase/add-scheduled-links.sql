-- Add scheduled_at column to links table for scheduled links (Pro/Business feature)
-- Run this in Supabase SQL Editor after the previous migration

-- Add column
ALTER TABLE public.links
  ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ DEFAULT NULL;

-- Add comment
COMMENT ON COLUMN public.links.scheduled_at IS 'Optional publish date for scheduled links (Pro/Business)';
