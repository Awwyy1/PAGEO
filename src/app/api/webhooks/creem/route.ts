// Webhook handler for Creem payment events
import { Webhook } from "@creem_io/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabaseAdmin() {
  return createClient(supabaseUrl, serviceKey);
}

async function upgradePlan(userId: string, plan: string) {
  if (!userId || !plan) {
    console.error("upgradePlan: missing userId or plan", { userId, plan });
    return;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("profiles")
    .update({ plan })
    .eq("id", userId);

  if (error) {
    console.error(`Failed to upgrade user ${userId} to ${plan}:`, error.message);
  } else {
    console.log(`User ${userId} upgraded to ${plan}`);
  }
}

async function downgradePlan(userId: string) {
  if (!userId) return;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("profiles")
    .update({ plan: "free" })
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

    const metadata = (data as unknown as Record<string, unknown>).metadata as Record<string, string> | undefined;
    const userId = metadata?.userId;
    const plan = metadata?.plan;

    if (userId && plan) {
      await upgradePlan(userId, plan);
    } else {
      console.warn("Checkout completed but no userId/plan in metadata:", metadata);
    }
  },

  onGrantAccess: async (context) => {
    console.log("Grant access:", JSON.stringify(context, null, 2));

    const metadata = (context as unknown as Record<string, unknown>).metadata as Record<string, string> | undefined;
    const userId = metadata?.userId;
    const plan = metadata?.plan;

    if (userId && plan) {
      await upgradePlan(userId, plan);
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
