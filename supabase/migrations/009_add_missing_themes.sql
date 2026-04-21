-- Add midnight, rose, cyber, minimal themes that are defined in design/page.tsx
alter table public.profiles drop constraint if exists profiles_theme_check;

alter table public.profiles
  add constraint profiles_theme_check
  check (theme in ('light', 'dark', 'gradient', 'ocean', 'sunset', 'forest', 'custom', 'midnight', 'rose', 'cyber', 'minimal'));
