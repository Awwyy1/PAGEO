-- =====================================================
-- ALLME: Add email column + fix RLS policies
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =====================================================

-- 1. Add email column to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email text;

-- 2. Populate email from existing auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
  AND p.email IS NULL;

-- 3. Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for profiles
-- Allow users to read their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow public to view profiles by username (for public profile pages)
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles"
  ON public.profiles FOR SELECT
  USING (true);

-- Allow users to insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow users to delete their own profile
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- 5. RLS policies for links
-- Allow public to view active links (for public profile pages)
DROP POLICY IF EXISTS "Public can view active links" ON public.links;
CREATE POLICY "Public can view active links"
  ON public.links FOR SELECT
  USING (true);

-- Allow users to manage their own links
DROP POLICY IF EXISTS "Users can insert own links" ON public.links;
CREATE POLICY "Users can insert own links"
  ON public.links FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can update own links" ON public.links;
CREATE POLICY "Users can update own links"
  ON public.links FOR UPDATE
  USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can delete own links" ON public.links;
CREATE POLICY "Users can delete own links"
  ON public.links FOR DELETE
  USING (auth.uid() = profile_id);
