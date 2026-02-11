// Appearance settings — functional theme picker with live mini-preview
"use client";

import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/database";

const themes: {
  id: Profile["theme"];
  label: string;
  preview: string;
  ring: string;
}[] = [
  {
    id: "light",
    label: "Light",
    preview: "bg-white border-gray-200",
    ring: "ring-gray-300",
  },
  {
    id: "dark",
    label: "Dark",
    preview: "bg-gray-900 border-gray-700",
    ring: "ring-gray-600",
  },
  {
    id: "gradient",
    label: "Gradient",
    preview: "bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 border-violet-400",
    ring: "ring-violet-400",
  },
];

export default function AppearancePage() {
  const { profile, updateProfile, links, avatarPreview } = useProfile();
  const activeLinks = links.filter((l) => l.is_active);

  const initial = (
    profile.display_name ||
    profile.username ||
    "?"
  )[0].toUpperCase();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Appearance</h1>
        <p className="text-muted-foreground mt-1">
          Customize how your public page looks.
        </p>
      </div>

      {/* Theme picker */}
      <div>
        <h2 className="text-sm font-medium mb-4">Theme</h2>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => updateProfile({ theme: theme.id })}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
                profile.theme === theme.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-border"
              )}
            >
              <div
                className={cn(
                  "w-full h-24 rounded-xl border",
                  theme.preview
                )}
              />
              <span className="text-sm font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live mini preview */}
      <div>
        <h2 className="text-sm font-medium mb-4">Preview</h2>
        <div className="flex justify-center">
          <div
            className={cn(
              "w-[240px] rounded-2xl border p-6 flex flex-col items-center transition-all duration-300",
              profile.theme === "dark" && "bg-gray-950 border-gray-800 text-white",
              profile.theme === "light" && "bg-white border-gray-200 text-gray-900",
              profile.theme === "gradient" &&
                "bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 border-violet-500 text-white"
            )}
          >
            {/* Avatar */}
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover mb-2"
              />
            ) : (
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center mb-2 text-lg font-bold",
                  profile.theme === "gradient"
                    ? "bg-white/20 text-white"
                    : "bg-primary/20 text-primary"
                )}
              >
                {initial}
              </div>
            )}

            <p className="text-sm font-semibold">
              {profile.display_name || profile.username}
            </p>
            {profile.bio && (
              <p
                className={cn(
                  "text-[10px] text-center mt-0.5 mb-3",
                  profile.theme === "gradient"
                    ? "text-white/70"
                    : profile.theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                )}
              >
                {profile.bio}
              </p>
            )}

            {/* Links */}
            <div className="w-full space-y-1.5 mt-1">
              {activeLinks.slice(0, 3).map((link) => (
                <div
                  key={link.id}
                  className={cn(
                    "w-full rounded-lg p-2 text-center text-[10px] font-medium transition-colors",
                    profile.theme === "gradient"
                      ? "bg-white/15 text-white"
                      : profile.theme === "dark"
                        ? "bg-gray-800 border border-gray-700 text-gray-200"
                        : "bg-gray-50 border border-gray-200 text-gray-900"
                  )}
                >
                  {link.title}
                </div>
              ))}
              {activeLinks.length > 3 && (
                <p
                  className={cn(
                    "text-[9px] text-center",
                    profile.theme === "gradient"
                      ? "text-white/50"
                      : profile.theme === "dark"
                        ? "text-gray-500"
                        : "text-gray-400"
                  )}
                >
                  +{activeLinks.length - 3} more
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
