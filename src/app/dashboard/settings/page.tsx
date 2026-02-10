// Settings page — profile info editor (demo mode)
"use client";

import { useState } from "react";
import { mockProfile } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [username, setUsername] = useState(mockProfile.username);
  const [displayName, setDisplayName] = useState(mockProfile.display_name || "");
  const [bio, setBio] = useState(mockProfile.bio || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile info.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">pageo.app/</span>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="max-w-[200px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Display name</label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
        </div>

        <Button onClick={handleSave}>
          {saved ? "Saved!" : "Save changes"}
        </Button>
      </div>

      <div className="rounded-2xl border border-destructive/20 bg-card p-6 space-y-3">
        <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
        <p className="text-sm text-muted-foreground">
          Account deletion will be available when Supabase is connected.
        </p>
      </div>
    </div>
  );
}
