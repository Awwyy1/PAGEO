// API route to redeem promo codes — validates and upgrades user plan
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const code = body?.code;

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Promo code required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Call the RPC function to redeem
  const { data, error } = await supabase.rpc("redeem_promo_code", {
    promo_code: code.trim().toUpperCase(),
    user_id: user.id,
  });

  if (error) {
    console.error("Promo RPC failed:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to redeem code. Please try again." },
      { status: 200 }
    );
  }

  // RPC returns jsonb: { success: boolean, error?: string, plan?: string }
  const result = data as { success: boolean; error?: string; plan?: string };

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error || "Invalid code" },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, plan: result.plan });
}
