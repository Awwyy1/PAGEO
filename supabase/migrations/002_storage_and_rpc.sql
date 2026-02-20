-- Storage bucket for avatar uploads
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- File naming: {user_id}.avatar (e.g. "abc-123.avatar")
-- Policy: user can only manage files that start with their own user ID

-- Allow authenticated users to upload their own avatar
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and name = concat(auth.uid()::text, '.avatar')
  );

-- Allow authenticated users to update (overwrite) their own avatar
create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and name = concat(auth.uid()::text, '.avatar')
  );

-- Allow authenticated users to delete their own avatar
create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and name = concat(auth.uid()::text, '.avatar')
  );

-- Anyone can view avatars (public bucket)
create policy "Avatars are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Add page_views column to profiles
alter table public.profiles add column if not exists page_views integer not null default 0;

-- RPC to increment link click count (called from public profile pages)
create or replace function public.increment_click_count(link_id uuid)
returns void as $$
begin
  update public.links
  set click_count = click_count + 1
  where id = link_id;
end;
$$ language plpgsql security definer;

-- RPC to increment page views for a profile
create or replace function public.increment_page_views(profile_username text)
returns void as $$
begin
  update public.profiles
  set page_views = page_views + 1
  where username = profile_username;
end;
$$ language plpgsql security definer;
