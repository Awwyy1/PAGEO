-- Remove overly permissive SELECT policy on promo_codes.
-- The redeem_promo_code() RPC uses SECURITY DEFINER, so it already
-- bypasses RLS. No user needs direct SELECT access to the codes table.
DROP POLICY IF EXISTS "Anyone can read active promo codes" ON public.promo_codes;

-- Only allow authenticated users to check if a code exists via RPC,
-- never expose the raw codes table.
CREATE POLICY "No direct read access to promo codes"
  ON public.promo_codes FOR SELECT
  USING (false);
