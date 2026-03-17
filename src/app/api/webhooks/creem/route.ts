// Webhook handler for Creem payment events
import { Webhook } from "@creem_io/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabaseAdmin() {
  return createClient(supabaseUrl, serviceKey);
}

async function upgradePlan(userId: string, plan: string, subscriptionId?: string) {
  if (!userId || !plan) {
    console.error("upgradePlan: missing userId or plan", { userId, plan });
    return;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("profiles")
    .update({
      plan,
      plan_source: "creem",
      subscription_id: subscriptionId || null,
    })
    .eq("id", userId);

  if (error) {
    console.error(`Failed to upgrade user ${userId} to ${plan}:`, error.message);
  } else {
    console.log(`User ${userId} upgraded to ${plan} via creem (sub: ${subscriptionId || "n/a"})`);
  }
}

async function downgradePlan(userId: string) {
  if (!userId) return;

  const supabase = getSupabaseAdmin();

  // Only downgrade if user's plan came from Creem (not promo)
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_source")
    .eq("id", userId)
    .maybeSingle();

  if (profile?.plan_source !== "creem") {
    console.log(`User ${userId} plan_source is "${profile?.plan_source}", skipping downgrade`);
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ plan: "free", plan_source: null, subscription_id: null })
    .eq("id", userId);

  if (error) {
    console.error(`Failed to downgrade user ${userId}:`, error.message);
  } else {
    console.log(`User ${userId} downgraded to free`);
  }
}

export const POST = Webhook({
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,

  onCheckoutCompleted: async (data) => {
    console.log("Checkout completed:", JSON.stringify(data, null, 2));

    const payload = data as unknown as Record<string, unknown>;
    const metadata = payload.metadata as Record<string, string> | undefined;
    const userId = metadata?.userId;
    const plan = metadata?.plan;
    const subscriptionId = (payload.subscription_id || payload.id) as string | undefined;

    if (userId && plan) {
      await upgradePlan(userId, plan, subscriptionId);
    } else {
      console.warn("Checkout completed but no userId/plan in metadata:", metadata);
    }
  },

  onGrantAccess: async (context) => {
    console.log("Grant access:", JSON.stringify(context, null, 2));

    const payload = context as unknown as Record<string, unknown>;
    const metadata = payload.metadata as Record<string, string> | undefined;
    const userId = metadata?.userId;
    const plan = metadata?.plan;
    const subscriptionId = (payload.subscription_id || payload.id) as string | undefined;

    if (userId && plan) {
      await upgradePlan(userId, plan, subscriptionId);
    }
  },

  onRevokeAccess: async (context) => {
    console.log("Revoke access:", JSON.stringify(context, null, 2));

    const metadata = (context as unknown as Record<string, unknown>).metadata as Record<string, string> | undefined;
    const userId = metadata?.userId;

    if (userId) {
      await downgradePlan(userId);
    }
  },
});
