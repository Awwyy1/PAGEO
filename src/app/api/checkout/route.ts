// API route to create a Creem checkout session
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const CREEM_API_KEY = process.env.CREEM_API_KEY || "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://allme.site";

// Map plan+billing to Creem product IDs
const PRODUCT_MAP: Record<string, string | undefined> = {
  "pro-monthly": process.env.CREEM_PRODUCT_PRO_MONTHLY,
  "pro-yearly": process.env.CREEM_PRODUCT_PRO_YEARLY,
  "business-monthly": process.env.CREEM_PRODUCT_BUSINESS_MONTHLY,
  "business-yearly": process.env.CREEM_PRODUCT_BUSINESS_YEARLY,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, billing } = body as { plan: string; billing: string };

    // Validate input
    if (!plan || !billing) {
      return NextResponse.json({ error: "plan and billing required" }, { status: 400 });
    }

    const productKey = `${plan}-${billing}`;
    const productId = PRODUCT_MAP[productKey];

    if (!productId) {
      return NextResponse.json({ error: "Invalid plan or billing period" }, { status: 400 });
    }

    if (!CREEM_API_KEY) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    // Get current user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Create Creem checkout session
    const response = await fetch("https://api.creem.io/v1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CREEM_API_KEY,
      },
      body: JSON.stringify({
        product_id: productId,
        success_url: `${APP_URL}/payment/success?plan=${plan}`,
        metadata: {
          userId: user.id,
          plan: plan,
          billing: billing,
        },
        customer: {
          email: user.email,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Creem checkout error:", response.status, errorText);
      return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      checkout_url: data.checkout_url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
