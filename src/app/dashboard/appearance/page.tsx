// Appearance settings — theme picker (demo mode)
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { id: "light", label: "Light", bg: "bg-white", border: "border-gray-200" },
  { id: "dark", label: "Dark", bg: "bg-gray-900", border: "border-gray-700" },
  {
    id: "gradient",
    label: "Gradient",
    bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    border: "border-indigo-300",
  },
] as const;

export default function AppearancePage() {
  const [selected, setSelected] = useState<string>("light");

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Appearance</h1>
        <p className="text-muted-foreground mt-1">
          Customize how your public page looks.
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-4">Theme</h2>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelected(theme.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
                selected === theme.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-border"
              )}
            >
              <div
                className={cn(
                  "w-full h-24 rounded-xl",
                  theme.bg,
                  theme.border,
                  "border"
                )}
              />
              <span className="text-sm font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">A</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Avatar upload will be available when Supabase is connected.
          </div>
        </div>
      </div>
    </div>
  );
}
