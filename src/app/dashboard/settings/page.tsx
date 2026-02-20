// Settings page — profile editor with avatar upload + username availability check
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/profile-context";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Check, X, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const RESERVED_USERNAMES = [
  "admin", "demo", "allme", "test", "user", "help",
  "support", "about", "blog", "api", "app", "www", "mail",
];

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export default function SettingsPage() {
  const { profile, updateProfile, avatarPreview, setAvatarPreview, userId } =
    useProfile();

  const [username, setUsername] = useState(profile.username);
  const [displayName, setDisplayName] = useState(profile.display_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Sync local state when real profile data loads from Supabase
  useEffect(() => {
    setUsername(profile.username);
    setDisplayName(profile.display_name || "");
    setBio(profile.bio || "");
  }, [profile.username, profile.display_name, profile.bio]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initial = (
    profile.display_name ||
    profile.username ||
    "?"
  )[0].toUpperCase();

  const supabase = createClient();

  // Debounced username availability check (via Supabase)
  useEffect(() => {
    if (!username || username.length < 2) {
      setUsernameStatus(username.length === 0 ? "invalid" : "idle");
      return;
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
      setUsernameStatus("invalid");
      return;
    }

    // Same as current → skip check
    if (username === profile.username) {
      setUsernameStatus("available");
      return;
    }

    if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
      setUsernameStatus("taken");
      return;
    }

    setUsernameStatus("checking");

    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      setUsernameStatus(data ? "taken" : "available");
    }, 600);

    return () => clearTimeout(timer);
  }, [username, profile.username]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5 MB.");
      return;
    }

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setUploading(true);
    setSaveError(null);
    let avatarUrl: string | undefined;

    // Upload avatar to Supabase Storage if a new file was selected
    if (avatarFile && userId) {
      // Always use same filename so upsert replaces it regardless of extension
      const filePath = `${userId}.avatar`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          upsert: true,
          contentType: avatarFile.type,
        });

      if (uploadError) {
        setSaveError(`Avatar upload failed: ${uploadError.message}. Make sure the "avatars" storage bucket exists in Supabase (Storage → New bucket → "avatars", Public ON).`);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      setAvatarFile(null);
    }

    updateProfile({
      username,
      display_name: displayName || null,
      bio: bio || null,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    });

    setUploading(false);
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
                onClick={() => {
                  setAvatarPreview(null);
                  setAvatarFile(null);
                  updateProfile({ avatar_url: null });
                }}
                className="text-xs text-destructive hover:underline"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {saveError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {saveError}
        </div>
      )}

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
            uploading ||
            usernameStatus === "taken" ||
            usernameStatus === "invalid" ||
            usernameStatus === "checking"
          }
        >
          {uploading ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
          ) : saved ? "Saved!" : "Save changes"}
        </Button>
      </div>

      {/* Danger zone */}
      <DangerZone />
    </div>
  );
}

function DangerZone() {
  const router = useRouter();
  const { profile } = useProfile();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const expectedText = profile.username;
  const canDelete = confirmText === expectedText;

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);

    const res = await fetch("/api/account", { method: "DELETE" });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setDeleteError(data.error || "Failed to delete account. Please try again.");
      setDeleting(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-destructive/20 bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
      </div>

      {!showConfirm ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-xs text-muted-foreground">
              Permanently delete your profile, all links, and analytics data.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
            onClick={() => setShowConfirm(true)}
          >
            Delete account
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4 space-y-3">
            <p className="text-sm font-medium text-destructive">
              This action is irreversible.
            </p>
            <p className="text-sm text-muted-foreground">
              This will permanently delete your profile, all your links, avatar,
              and analytics data. This cannot be undone.
            </p>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Type <span className="font-mono font-bold text-foreground">{expectedText}</span> to confirm:
              </label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={expectedText}
                className="max-w-xs"
              />
            </div>

            {deleteError && (
              <p className="text-sm text-destructive">{deleteError}</p>
            )}

            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                disabled={!canDelete || deleting}
                onClick={handleDelete}
              >
                {deleting ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Deleting...</>
                ) : (
                  "Delete my account forever"
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText("");
                  setDeleteError(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
