// Centralized plan configuration — limits, features, and helpers
import type { Plan } from "@/types/database";

export interface PlanLimits {
    maxLinks: number;        // 5 / 15 / Infinity
    maxThemes: number;       // 3 / 10 / all
    hasFullAnalytics: boolean;
    hasCsvExport: boolean;
    hasQrCode: boolean;
    hasCustomOg: boolean;
    hasScheduledLinks: boolean;
    hasRemoveBranding: boolean;
    hasShortUsername: boolean; // 3-char usernames
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
    free: {
        maxLinks: 5,
        maxThemes: 3,
        hasFullAnalytics: false,
        hasCsvExport: false,
        hasQrCode: false,
        hasCustomOg: false,
        hasScheduledLinks: false,
        hasRemoveBranding: false,
        hasShortUsername: false,
    },
    pro: {
        maxLinks: 15,
        maxThemes: 10,
        hasFullAnalytics: true,
        hasCsvExport: false,
        hasQrCode: true,
        hasCustomOg: true,
        hasScheduledLinks: true,
        hasRemoveBranding: false,
        hasShortUsername: true,
    },
    business: {
        maxLinks: Infinity,
        maxThemes: Infinity,
        hasFullAnalytics: true,
        hasCsvExport: true,
        hasQrCode: true,
        hasCustomOg: true,
        hasScheduledLinks: true,
        hasRemoveBranding: true,
        hasShortUsername: true,
    },
};

export const PLAN_PRICES = {
    free: { monthly: 0, yearly: 0 },
    pro: { monthly: 3.99, yearly: 39.99 },
    business: { monthly: 9.99, yearly: 99.99 },
};

export function getPlanLimits(plan: Plan | undefined): PlanLimits {
    return PLAN_LIMITS[plan || "free"];
}

export function getPlanName(plan: Plan | undefined): string {
    const names: Record<Plan, string> = {
        free: "Free",
        pro: "Pro",
        business: "Business",
    };
    return names[plan || "free"];
}

// Which plans unlock a given feature
export function getRequiredPlan(feature: keyof PlanLimits): Plan {
    if (PLAN_LIMITS.free[feature as keyof PlanLimits]) return "free";
    if (PLAN_LIMITS.pro[feature as keyof PlanLimits]) return "pro";
    return "business";
}
