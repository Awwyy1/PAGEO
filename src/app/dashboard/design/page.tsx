// Design page — profile page settings (avatar, name, bio) + theme picker with custom colors
"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/lib/profile-context";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Plus, Palette, Lock } from "lucide-react";
import { AvatarEditor } from "@/components/dashboard/avatar-editor";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";
import { cn } from "@/lib/utils";
import type { CustomColors, Plan, Profile } from "@/types/database";

/* ───── Theme definitions ───── */
const DEFAULT_CUSTOM: CustomColors = {
    bg: "#1a1a2e",
    text: "#ffffff",
    buttonBg: "#e94560",
    buttonText: "#ffffff",
};

const themes: { id: Profile["theme"]; label: string; bg: string; activeBorder: string; minPlanIndex: number }[] = [
    { id: "light", label: "Light", bg: "bg-white border-gray-200", activeBorder: "ring-gray-400", minPlanIndex: 0 },
    { id: "dark", label: "Dark", bg: "bg-gray-900 border-gray-700", activeBorder: "ring-gray-500", minPlanIndex: 0 },
    { id: "gradient", label: "Gradient", bg: "bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 border-violet-400", activeBorder: "ring-violet-400", minPlanIndex: 0 },
    { id: "ocean", label: "Ocean", bg: "bg-blue-600 border-blue-500", activeBorder: "ring-blue-400", minPlanIndex: 1 },
    { id: "sunset", label: "Sunset", bg: "bg-rose-500 border-rose-400", activeBorder: "ring-rose-400", minPlanIndex: 1 },
    { id: "forest", label: "Forest", bg: "bg-emerald-600 border-emerald-500", activeBorder: "ring-emerald-400", minPlanIndex: 1 },
    { id: "midnight", label: "Midnight", bg: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-800", activeBorder: "ring-indigo-600", minPlanIndex: 1 },
    { id: "rose", label: "Rosé", bg: "bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-pink-300", activeBorder: "ring-pink-400", minPlanIndex: 1 },
    { id: "cyber", label: "Cyber", bg: "bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 border-cyan-400", activeBorder: "ring-cyan-400", minPlanIndex: 1 },
    { id: "minimal", label: "Minimal", bg: "bg-stone-50 border-stone-300", activeBorder: "ring-stone-400", minPlanIndex: 1 },
];

const planIndex: Record<Plan, number> = { free: 0, pro: 1, business: 2 };

/* ───── Color Input ───── */
function ColorInput({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    const [localHex, setLocalHex] = useState(value);

    const handleHexInput = (raw: string) => {
        let hex = raw.startsWith("#") ? raw : `#${raw}`;
        hex = hex.slice(0, 7);
        setLocalHex(hex);
        if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
            onChange(hex);
        }
    };

    return (
        <div className="space-y-1.5">
            <span className="text-muted-foreground text-xs">{label}</span>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setLocalHex(e.target.value);
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                        className="w-8 h-8 rounded-lg border border-border shadow-sm cursor-pointer"
                        style={{ backgroundColor: value }}
                    />
                </div>
                <input
                    type="text"
                    value={localHex}
                    onChange={(e) => handleHexInput(e.target.value)}
                    onFocus={() => setLocalHex(value)}
                    onBlur={() => setLocalHex(value)}
                    placeholder="#000000"
                    className="w-[88px] h-8 rounded-lg border border-border bg-transparent px-2 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-ring"
                    maxLength={7}
                />
            </div>
        </div>
    );
}

/* ───── Design Page ───── */
export default function DesignPage() {
    const {
        profile,
        updateProfile,
        updateProfileLocal,
        avatarPreview,
        setAvatarPreview,
        userId,
    } = useProfile();

    const currentPlan = profile.plan || "free";
    const currentPlanIdx = planIndex[currentPlan];

    /* — Page section state — */
    const [displayName, setDisplayName] = useState(profile.display_name || "");
    const [bio, setBio] = useState(profile.bio || "");
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [editingFile, setEditingFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    /* — Theme section state — */
    const [showCustom, setShowCustom] = useState(profile.theme === "custom");
    const [upgradeModal, setUpgradeModal] = useState<{ feature: string; plan: Plan } | null>(null);
    const colors = profile.custom_colors || DEFAULT_CUSTOM;

    /* — Active tab — */
    const [activeTab, setActiveTab] = useState<"page" | "theme">("page");

    const supabase = createClient();

    // Sync state when profile loads/changes
    useEffect(() => {
        setDisplayName(profile.display_name || "");
        setBio(profile.bio || "");
    }, [profile.display_name, profile.bio]);

    const initial = (
        profile.display_name || profile.username || "?"
    )[0].toUpperCase();

    /* — Page handlers — */
    const handleDisplayNameChange = (value: string) => {
        setDisplayName(value);
        updateProfileLocal({ display_name: value || null });
    };

    const handleBioChange = (value: string) => {
        setBio(value);
        updateProfileLocal({ bio: value || null });
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("File too large. Max 5 MB.");
            return;
        }
        setEditingFile(file);
        e.target.value = "";
    };

    const handleCropSave = (croppedBlob: Blob) => {
        const croppedFile = new File([croppedBlob], "avatar.png", { type: "image/png" });
        setAvatarFile(croppedFile);
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(croppedFile);
        setEditingFile(null);
    };

    const handleSavePage = async () => {
        setUploading(true);
        setSaveError(null);
        let avatarUrl: string | undefined;

        if (avatarFile && userId) {
            const filePath = `${userId}.avatar`;
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, avatarFile, { upsert: true, contentType: avatarFile.type });

            if (uploadError) {
                setSaveError(`Avatar upload failed: ${uploadError.message}`);
                setUploading(false);
                return;
            }

            const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
            avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
            setAvatarFile(null);
        }

        updateProfile({
            display_name: displayName || null,
            bio: bio || null,
            ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
        });

        setUploading(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    /* — Theme handlers — */
    const handleThemeClick = (theme: typeof themes[0]) => {
        if (theme.minPlanIndex > currentPlanIdx) {
            setUpgradeModal({ feature: `${theme.label} theme`, plan: theme.minPlanIndex === 1 ? "pro" : "business" });
            return;
        }
        updateProfile({ theme: theme.id });
        setShowCustom(false);
    };

    const handleSelectCustom = () => {
        if (currentPlan !== "business") {
            setUpgradeModal({ feature: "Custom colors", plan: "business" });
            return;
        }
        setShowCustom(true);
        updateProfile({ theme: "custom", custom_colors: colors });
    };

    const handleCustomColorChange = (key: keyof CustomColors, value: string) => {
        const newColors = { ...colors, [key]: value };
        updateProfile({ theme: "custom", custom_colors: newColors });
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Design</h1>
                <p className="text-muted-foreground mt-1">Customize your page appearance.</p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
                <button
                    onClick={() => setActiveTab("page")}
                    className={cn(
                        "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                        activeTab === "page"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Page
                </button>
                <button
                    onClick={() => setActiveTab("theme")}
                    className={cn(
                        "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                        activeTab === "theme"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Theme
                </button>
            </div>

            {/* ═══ PAGE TAB ═══ */}
            {activeTab === "page" && (
                <div className="space-y-6">
                    {/* Avatar */}
                    <div className="rounded-2xl border bg-card p-6">
                        <h2 className="text-sm font-medium mb-4">Profile image</h2>
                        <div className="flex items-center gap-5">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="relative group cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary">{initial}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="h-5 w-5 text-white" />
                                </div>
                                {!avatarPreview && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-card shadow-sm">
                                        <Plus className="h-3 w-3 text-primary-foreground" />
                                    </div>
                                )}
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
                                <p className="text-xs text-muted-foreground">JPG, PNG, WebP or GIF. Max 5 MB.</p>
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

                    {/* Avatar crop editor */}
                    {editingFile && (
                        <AvatarEditor
                            file={editingFile}
                            onSave={handleCropSave}
                            onCancel={() => setEditingFile(null)}
                        />
                    )}

                    {/* Error */}
                    {saveError && (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            {saveError}
                        </div>
                    )}

                    {/* Display name + Bio */}
                    <div className="rounded-2xl border bg-card p-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Display name</label>
                            <Input
                                value={displayName}
                                onChange={(e) => handleDisplayNameChange(e.target.value)}
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => handleBioChange(e.target.value)}
                                rows={3}
                                className="flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                                placeholder="Tell people about yourself..."
                            />
                        </div>

                        <Button onClick={handleSavePage} disabled={uploading}>
                            {uploading ? (
                                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
                            ) : saved ? "Saved!" : "Save changes"}
                        </Button>
                    </div>
                </div>
            )}

            {/* ═══ THEME TAB ═══ */}
            {activeTab === "theme" && (
                <div className="space-y-4">
                    <div className="rounded-2xl border bg-card p-6 space-y-4">
                        <h2 className="text-sm font-medium">Choose a theme</h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            {themes.map((theme) => {
                                const locked = theme.minPlanIndex > currentPlanIdx;
                                return (
                                    <button
                                        key={theme.id}
                                        onClick={() => handleThemeClick(theme)}
                                        title={locked ? `${theme.label} (${theme.minPlanIndex === 1 ? "Pro" : "Business"})` : theme.label}
                                        className={cn(
                                            "w-10 h-10 rounded-xl border transition-all shrink-0 relative",
                                            theme.bg,
                                            locked && "opacity-40",
                                            profile.theme === theme.id && !locked
                                                ? "ring-2 ring-offset-2 ring-offset-background " + theme.activeBorder + " scale-110"
                                                : !locked && "opacity-70 hover:opacity-100 hover:scale-105"
                                        )}
                                    >
                                        {locked && (
                                            <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-black/30">
                                                <Lock className="h-3 w-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                            {/* Custom */}
                            <button
                                onClick={handleSelectCustom}
                                title="Custom"
                                className={cn(
                                    "w-10 h-10 rounded-xl border transition-all shrink-0 flex items-center justify-center",
                                    profile.theme === "custom"
                                        ? "ring-2 ring-offset-2 ring-offset-background ring-pink-400 scale-110"
                                        : "opacity-70 hover:opacity-100 hover:scale-105"
                                )}
                                style={
                                    profile.theme === "custom"
                                        ? { backgroundColor: colors.bg, borderColor: colors.buttonBg }
                                        : undefined
                                }
                            >
                                <Palette className="h-4 w-4" style={
                                    profile.theme === "custom" ? { color: colors.buttonBg } : undefined
                                } />
                            </button>
                        </div>
                    </div>

                    {/* Custom color pickers */}
                    {(showCustom || profile.theme === "custom") && (
                        <div className="rounded-2xl border bg-card p-6 space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Palette className="h-4 w-4" />
                                Custom colors
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <ColorInput label="Background" value={colors.bg} onChange={(v) => handleCustomColorChange("bg", v)} />
                                <ColorInput label="Text" value={colors.text} onChange={(v) => handleCustomColorChange("text", v)} />
                                <ColorInput label="Button" value={colors.buttonBg} onChange={(v) => handleCustomColorChange("buttonBg", v)} />
                                <ColorInput label="Button text" value={colors.buttonText} onChange={(v) => handleCustomColorChange("buttonText", v)} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Upgrade modal */}
            {upgradeModal && (
                <UpgradeModal
                    feature={upgradeModal.feature}
                    requiredPlan={upgradeModal.plan}
                    currentPlan={currentPlan}
                    onClose={() => setUpgradeModal(null)}
                />
            )}
        </div>
    );
}
