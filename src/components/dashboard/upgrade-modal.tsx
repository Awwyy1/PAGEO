// Upgrade modal — soft, elegant upsell popup when user tries a gated feature
"use client";

import { X, Sparkles, Crown, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/types/database";
import Link from "next/link";

interface UpgradeModalProps {
    feature: string;          // e.g. "QR Code", "Scheduled links"
    requiredPlan: Plan;       // minimum plan needed
    currentPlan: Plan;
    onClose: () => void;
}

const planDetails: Record<Plan, { icon: typeof Sparkles; label: string; color: string; gradient: string }> = {
    free: { icon: Sparkles, label: "Free", color: "text-muted-foreground", gradient: "from-gray-400 to-gray-500" },
    pro: { icon: Crown, label: "Pro", color: "text-violet-600", gradient: "from-violet-500 to-purple-600" },
    business: { icon: Building2, label: "Business", color: "text-amber-600", gradient: "from-amber-500 to-orange-600" },
};

export function UpgradeModal({ feature, requiredPlan, onClose }: UpgradeModalProps) {
    const plan = planDetails[requiredPlan];
    const PlanIcon = plan.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-card border rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="text-center space-y-4">
                    {/* Icon */}
                    <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                        <PlanIcon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title */}
                    <div>
                        <h3 className="text-lg font-bold">
                            Unlock {feature}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                            {feature} is available on the{" "}
                            <span className={`font-semibold ${plan.color}`}>{plan.label}</span>
                            {requiredPlan === "pro" ? " and Business" : ""} plan{requiredPlan === "pro" ? "s" : ""}.
                            Upgrade to unlock this and more premium features.
                        </p>
                    </div>

                    {/* CTA */}
                    <Link href="/pricing" onClick={onClose}>
                        <Button className="w-full gap-2 mt-2">
                            View plans
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>

                    <button
                        onClick={onClose}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
