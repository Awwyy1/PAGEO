// Client wrapper for all providers (context, theme, etc.)
"use client";

import { ProfileProvider } from "@/lib/profile-context";
import { ClarityIdentify } from "@/components/clarity-identify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <ClarityIdentify />
      {children}
    </ProfileProvider>
  );
}
