-- Security fix: redeem_promo_code trusted a caller-supplied user_id
-- (audit finding P0 #4)
--
-- The function is SECURITY DEFINER and EXECUTE is granted to `authenticated`,
-- so any logged-in user could call it straight from the browser with the anon
-- key and pass somebody else's id:
--
--     supabase.rpc('redeem_promo_code', { promo_code: 'X', user_id: '<other>' })
--
-- That burns single-use codes against accounts the caller doesn't own and
-- upgrades arbitrary users. Target ids were easy to come by while `profiles`
-- was world-readable.
--
-- Two changes: the caller's identity now has to match the row being modified,
-- and the code row is locked while it is being spent.

create or replace function public.redeem_promo_code(
  promo_code text,
  user_id uuid
) returns jsonb as $$
declare
  v_promo public.promo_codes;
  v_already boolean;
begin
  -- A caller may only redeem for themselves. auth.uid() is null for anonymous
  -- callers, so `is distinct from` rejects those too.
  if user_id is distinct from auth.uid() then
    return jsonb_build_object('success', false, 'error', 'Not authorized');
  end if;

  -- FOR UPDATE holds the row until this transaction commits. Without it two
  -- concurrent redemptions could both pass the current_uses < max_uses check
  -- and a single-use code would be spent twice.
  select * into v_promo
  from public.promo_codes
  where code = promo_code
    and is_active = true
    and expires_at > now()
    and current_uses < max_uses
  for update;

  if v_promo.id is null then
    return jsonb_build_object('success', false, 'error', 'Invalid or expired promo code');
  end if;

  select exists(
    select 1 from public.promo_redemptions
    where promo_code_id = v_promo.id and profile_id = user_id
  ) into v_already;

  if v_already then
    return jsonb_build_object('success', false, 'error', 'You have already used this code');
  end if;

  update public.promo_codes
  set current_uses = current_uses + 1
  where id = v_promo.id;

  insert into public.promo_redemptions (promo_code_id, profile_id)
  values (v_promo.id, user_id);

  update public.profiles
  set plan = v_promo.plan
  where id = user_id;

  return jsonb_build_object('success', true, 'plan', v_promo.plan);
end;
$$ language plpgsql security definer;

-- anon was never meant to redeem; make that explicit.
revoke execute on function public.redeem_promo_code(text, uuid) from anon;
grant execute on function public.redeem_promo_code(text, uuid) to authenticated;
