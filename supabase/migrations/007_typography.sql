-- Add typography settings: font choice + content alignment
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS font TEXT NOT NULL DEFAULT 'modern',
  ADD COLUMN IF NOT EXISTS content_alignment TEXT NOT NULL DEFAULT 'center';
