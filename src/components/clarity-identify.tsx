// Identifies the logged-in user to Clarity once profile is loaded.
// Must be rendered inside ProfileProvider.
"use client";

import { useEffect, useRef } from "react";
import { useProfile } from "@/lib/profile-context";
import { clarityIdentify, claritySet, clarityUpgrade } from "@/lib/clarity";

export function ClarityIdentify() {
  const { userId, profile, isLoading } = useProfile();
  const identified = useRef(false);

  useEffect(() => {
    if (isLoading || identified.current) return;
    if (!userId || !profile.username) return;

    // Link this Clarity session to the user
    clarityIdentify(userId, undefined, undefined, profile.display_name || profile.username);

    // Set custom tags for filtering sessions in Clarity dashboard
    claritySet("plan", profile.plan || "free");
    claritySet("username", profile.username);

    // Flag paid user sessions as high-priority for easier review
    if (profile.plan === "pro" || profile.plan === "business") {
      clarityUpgrade(`paid-${profile.plan}`);
    }

    identified.current = true;
  }, [userId, profile, isLoading]);

  return null;
}
