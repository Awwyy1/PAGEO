-- Add plan_source and subscription_id to profiles
-- plan_source: tracks how the user got their plan ('creem' = paid, 'promo' = promo code)
-- subscription_id: Creem subscription ID for paid users (used for revoke validation)

alter table public.profiles
  add column if not exists plan_source text default null
  check (plan_source in ('creem', 'promo'));

alter table public.profiles
  add column if not exists subscription_id text default null;

-- Update the redeem_promo_code function to also set plan_source
create or replace function public.redeem_promo_code(
  promo_code text,
  user_id uuid
) returns jsonb as $$
declare
  v_promo public.promo_codes;
  v_already boolean;
begin
  -- Find the code
  select * into v_promo
  from public.promo_codes
  where code = promo_code
    and is_active = true
    and expires_at > now()
    and current_uses < max_uses;

  if v_promo.id is null then
    return jsonb_build_object('success', false, 'error', 'Invalid or expired promo code');
  end if;

  -- Check if already redeemed by this user
  select exists(
    select 1 from public.promo_redemptions
    where promo_code_id = v_promo.id and profile_id = user_id
  ) into v_already;

  if v_already then
    return jsonb_build_object('success', false, 'error', 'You have already used this code');
  end if;

  -- Increment usage
  update public.promo_codes
  set current_uses = current_uses + 1
  where id = v_promo.id;

  -- Record redemption
  insert into public.promo_redemptions (promo_code_id, profile_id)
  values (v_promo.id, user_id);

  -- Upgrade user plan and set source
  update public.profiles
  set plan = v_promo.plan,
      plan_source = 'promo',
      subscription_id = null
  where id = user_id;

  return jsonb_build_object('success', true, 'plan', v_promo.plan);
end;
$$ language plpgsql security definer;
