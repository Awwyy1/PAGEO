// Settings page — profile editor with avatar upload + username availability check
"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/lib/profile-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TAKEN_USERNAMES = [
  "admin",
  "demo",
  "allme",
  "test",
  "user",
  "help",
  "support",
  "about",
  "blog",
  "api",
  "app",
  "www",
  "mail",
  "ftp",
];

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export default function SettingsPage() {
  const { profile, updateProfile, avatarPreview, setAvatarPreview } =
    useProfile();

  const [username, setUsername] = useState(profile.username);
  const [displayName, setDisplayName] = useState(profile.display_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [saved, setSaved] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initial = (
    profile.display_name ||
    profile.username ||
    "?"
  )[0].toUpperCase();

  // Debounced username availability check
  useEffect(() => {
    if (!username || username.length < 2) {
      setUsernameStatus(username.length === 0 ? "invalid" : "idle");
      return;
    }

    // Only allow lowercase letters, numbers, hyphens, underscores
    if (!/^[a-z0-9_-]+$/.test(username)) {
      setUsernameStatus("invalid");
      return;
    }

    setUsernameStatus("checking");

    const timer = setTimeout(() => {
      if (TAKEN_USERNAMES.includes(username.toLowerCase())) {
        setUsernameStatus("taken");
      } else {
        setUsernameStatus("available");
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [username]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile({
      username,
      display_name: displayName || null,
      bio: bio || null,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile info.</p>
      </div>

      {/* Avatar section */}
      <div className="rounded-2xl border bg-card p-6">
        <h2 className="text-sm font-medium mb-4">Profile photo</h2>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {initial}
                </span>
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleAvatarUpload}
            />
          </button>
          <div className="space-y-1">
            <p className="text-sm font-medium">Upload a photo</p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WebP or GIF. Max 5 MB.
            </p>
            {avatarPreview && (
              <button
                onClick={() => setAvatarPreview(null)}
                className="text-xs text-destructive hover:underline"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="rounded-2xl border bg-card p-6 space-y-5">
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              allme.site/
            </span>
            <div className="relative flex-1 max-w-[240px]">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className={cn(
                  "pr-9",
                  usernameStatus === "available" &&
                    "border-emerald-500 focus-visible:ring-emerald-500",
                  usernameStatus === "taken" &&
                    "border-destructive focus-visible:ring-destructive",
                  usernameStatus === "invalid" &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="yourname"
              />
              {/* Status icon */}
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                {usernameStatus === "checking" && (
                  <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                )}
                {usernameStatus === "available" && (
                  <Check className="h-4 w-4 text-emerald-500" />
                )}
                {(usernameStatus === "taken" ||
                  usernameStatus === "invalid") && (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
          </div>
          {/* Status message */}
          <div className="min-h-[20px]">
            {usernameStatus === "available" && (
              <p className="text-xs text-emerald-600">
                allme.site/{username} is available!
              </p>
            )}
            {usernameStatus === "taken" && (
              <p className="text-xs text-destructive">
                This username is already taken.
              </p>
            )}
            {usernameStatus === "invalid" && username.length > 0 && (
              <p className="text-xs text-destructive">
                Only lowercase letters, numbers, hyphens, and underscores.
              </p>
            )}
          </div>
        </div>

        {/* Display name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Display name</label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Name"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            placeholder="Tell people about yourself..."
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={
            usernameStatus === "taken" ||
            usernameStatus === "invalid" ||
            usernameStatus === "checking"
          }
        >
          {saved ? "Saved!" : "Save changes"}
        </Button>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-destructive/20 bg-card p-6 space-y-3">
        <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
        <p className="text-sm text-muted-foreground">
          Account deletion will be available when Supabase is connected.
        </p>
      </div>
    </div>
  );
}
