-- Fix RPC permissions: explicitly grant EXECUTE to anon and authenticated roles
-- This ensures anonymous visitors can call click/view tracking functions

-- Re-create the functions to ensure they exist
create or replace function public.increment_click_count(link_id uuid)
returns void as $$
begin
  update public.links
  set click_count = click_count + 1
  where id = link_id;
end;
$$ language plpgsql security definer;

create or replace function public.increment_page_views(profile_username text)
returns void as $$
begin
  update public.profiles
  set page_views = page_views + 1
  where username = profile_username;
end;
$$ language plpgsql security definer;

-- Grant execute permissions to both anon and authenticated roles
grant execute on function public.increment_click_count(uuid) to anon;
grant execute on function public.increment_click_count(uuid) to authenticated;
grant execute on function public.increment_page_views(text) to anon;
grant execute on function public.increment_page_views(text) to authenticated;
