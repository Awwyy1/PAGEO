-- Initial schema: profiles and links tables with RLS policies

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  theme text not null default 'light' check (theme in ('light', 'dark', 'gradient', 'ocean', 'sunset', 'forest')),
  created_at timestamptz not null default now()
);

-- Links table
create table public.links (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  icon text,
  position integer not null default 0,
  is_active boolean not null default true,
  click_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index links_profile_id_idx on public.links(profile_id);
create index profiles_username_idx on public.profiles(username);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.links enable row level security;

-- Profiles: anyone can read (public pages), only owner can update
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Links: anyone can read active links (public pages), owner manages their own
create policy "Active links are viewable by everyone"
  on public.links for select
  using (is_active = true or auth.uid() = profile_id);

create policy "Users can insert their own links"
  on public.links for insert
  with check (auth.uid() = profile_id);

create policy "Users can update their own links"
  on public.links for update
  using (auth.uid() = profile_id);

create policy "Users can delete their own links"
  on public.links for delete
  using (auth.uid() = profile_id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'username')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
