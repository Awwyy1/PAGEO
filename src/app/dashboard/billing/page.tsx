// Billing page — current plan info, upgrade/manage options
"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Sparkles, Building2, Check, ExternalLink, CreditCard, Ticket, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/profile-context";
import { PLAN_PRICES } from "@/lib/plan-config";
import type { Plan } from "@/types/database";
import { PromoCodeModal } from "@/components/promo-code-modal";

const planMeta: Record<Plan, { label: string; icon: typeof Sparkles; color: string; bg: string; border: string }> = {
  free: { label: "Free", icon: Sparkles, color: "text-muted-foreground", bg: "bg-muted", border: "border-border" },
  pro: { label: "Pro", icon: Crown, color: "text-violet-600", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  business: { label: "Business", icon: Building2, color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/30" },
};

const planFeatures: Record<Plan, string[]> = {
  free: [
    "Up to 5 links",
    "3 themes",
    "Basic analytics (total clicks)",
    "Profile avatar & bio",
  ],
  pro: [
    "Up to 15 links",
    "10 premium themes",
    "Detailed analytics with daily breakdown",
    "Custom OG preview",
    "Scheduled links",
    "QR code",
  ],
  business: [
    "Unlimited links",
    "All themes + custom colors",
    "Advanced analytics: geo, devices, UTM + CSV export",
    "QR code + remove branding",
    "Everything in Pro",
  ],
};

type Billing = "monthly" | "yearly";

export default function BillingPage() {
  const { profile, refreshData } = useProfile();
  const plan = profile.plan || "free";
  const planSource = profile.plan_source;
  const meta = planMeta[plan];
  const PlanIcon = meta.icon;
  const [billing, setBilling] = useState<Billing>("monthly");
  const [loading, setLoading] = useState<string | null>(null);
  const [showPromo, setShowPromo] = useState(false);

  const isPaid = plan !== "free";
  const sourceLabel = planSource === "creem" ? "Paid subscription" : planSource === "promo" ? "Promo code" : null;

  async function handleUpgrade(targetPlan: Plan) {
    setLoading(targetPlan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan, billing }),
      });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(null);
    }
  }

  // Plans available to upgrade to
  const upgradePlans = (["pro", "business"] as Plan[]).filter((p) => {
    if (plan === "business") return false;
    if (plan === "pro" && p === "pro") return false;
    return true;
  });

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your plan and subscription</p>
      </div>

      {/* Current plan card */}
      <div className={cn("rounded-2xl border-2 p-6 space-y-4", meta.border)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", meta.bg)}>
              <PlanIcon className={cn("h-5 w-5", meta.color)} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{meta.label} plan</h2>
              {sourceLabel && (
                <p className="text-xs text-muted-foreground">{sourceLabel}</p>
              )}
            </div>
          </div>
          {isPaid && (
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", meta.bg, meta.color)}>
              Active
            </span>
          )}
        </div>

        {isPaid && (
          <div className="text-sm text-muted-foreground">
            {planSource === "creem" ? (
              <p>Your subscription is managed through Creem. You can manage or cancel it from your Creem account.</p>
            ) : planSource === "promo" ? (
              <p>Your plan was activated with a promo code.</p>
            ) : null}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {planFeatures[plan].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {!isPaid && (
          <p className="text-sm text-muted-foreground">
            You&apos;re on the free plan. Upgrade to unlock more features.
          </p>
        )}
      </div>

      {/* Upgrade section */}
      {upgradePlans.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upgrade your plan</h3>

          {/* Billing toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                billing === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
              )}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-600 font-semibold">Save 17%</span>
            </button>
          </div>

          {/* Plan cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {upgradePlans.map((targetPlan) => {
              const targetMeta = planMeta[targetPlan];
              const TargetIcon = targetMeta.icon;
              const price = PLAN_PRICES[targetPlan];
              const isPopular = targetPlan === "pro";

              return (
                <div
                  key={targetPlan}
                  className={cn(
                    "rounded-2xl border p-5 space-y-4 relative",
                    isPopular && "border-violet-500/40 ring-1 ring-violet-500/20"
                  )}
                >
                  {isPopular && (
                    <span className="absolute -top-2.5 left-4 bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <TargetIcon className={cn("h-4 w-4", targetMeta.color)} />
                    <span className="font-semibold">{targetMeta.label}</span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">
                      ${billing === "monthly" ? price.monthly : price.yearly}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {planFeatures[targetPlan].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(targetPlan)}
                    disabled={loading !== null}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isPopular
                        ? "bg-violet-600 text-white hover:bg-violet-700"
                        : "bg-primary text-primary-foreground hover:bg-primary/90",
                      loading && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {loading === targetPlan ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Upgrade to {targetMeta.label}
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Promo code */}
          <button
            onClick={() => setShowPromo(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Ticket className="h-4 w-4" />
            I have a promo code
          </button>
        </div>
      )}

      {/* Already on the highest plan */}
      {plan === "business" && (
        <div className="rounded-2xl border border-dashed p-6 text-center text-muted-foreground">
          <p className="font-medium">You&apos;re on the highest plan!</p>
          <p className="text-sm mt-1">You have access to all features.</p>
        </div>
      )}

      {/* Compare all plans link */}
      <Link
        href="/pricing"
        target="_blank"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Compare all plans in detail
      </Link>

      {/* Promo code modal */}
      <PromoCodeModal
        open={showPromo}
        onClose={() => setShowPromo(false)}
        onSuccess={async () => {
          await refreshData();
          setShowPromo(false);
        }}
      />
    </div>
  );
}
