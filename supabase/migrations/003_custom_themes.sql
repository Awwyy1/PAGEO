-- Add custom theme support: custom_colors JSONB column + update theme constraint

-- Add custom_colors column (stores bg, text, buttonBg, buttonText)
alter table public.profiles
  add column if not exists custom_colors jsonb default null;

-- Drop the existing check constraint on theme and add 'custom' option
-- Note: constraint name may vary; try both common patterns
alter table public.profiles drop constraint if exists profiles_theme_check;
alter table public.profiles
  add constraint profiles_theme_check
  check (theme in ('light', 'dark', 'gradient', 'ocean', 'sunset', 'forest', 'custom'));
