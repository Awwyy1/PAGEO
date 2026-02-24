// Dashboard main page — link editor with drag-and-drop + inline theme picker + custom colors
"use client";

import { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useProfile } from "@/lib/profile-context";
import { LinkCard } from "@/components/dashboard/link-card";
import { AddLinkForm } from "@/components/dashboard/add-link-form";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";
import { getPlanLimits } from "@/lib/plan-config";
import { Palette, Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Link, CustomColors, Plan } from "@/types/database";
import type { Profile } from "@/types/database";

const DEFAULT_CUSTOM: CustomColors = {
  bg: "#1a1a2e",
  text: "#ffffff",
  buttonBg: "#e94560",
  buttonText: "#ffffff",
};

const themes: { id: Profile["theme"]; label: string; bg: string; activeBorder: string; minPlanIndex: number }[] = [
  // Free themes (0-2)
  {
    id: "light",
    label: "Light",
    bg: "bg-white border-gray-200",
    activeBorder: "ring-gray-400",
    minPlanIndex: 0,
  },
  {
    id: "dark",
    label: "Dark",
    bg: "bg-gray-900 border-gray-700",
    activeBorder: "ring-gray-500",
    minPlanIndex: 0,
  },
  {
    id: "gradient",
    label: "Gradient",
    bg: "bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 border-violet-400",
    activeBorder: "ring-violet-400",
    minPlanIndex: 0,
  },
  // Pro themes (3-9)
  {
    id: "ocean",
    label: "Ocean",
    bg: "bg-blue-600 border-blue-500",
    activeBorder: "ring-blue-400",
    minPlanIndex: 1,
  },
  {
    id: "sunset",
    label: "Sunset",
    bg: "bg-rose-500 border-rose-400",
    activeBorder: "ring-rose-400",
    minPlanIndex: 1,
  },
  {
    id: "forest",
    label: "Forest",
    bg: "bg-emerald-600 border-emerald-500",
    activeBorder: "ring-emerald-400",
    minPlanIndex: 1,
  },
  {
    id: "midnight",
    label: "Midnight",
    bg: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-800",
    activeBorder: "ring-indigo-600",
    minPlanIndex: 1,
  },
  {
    id: "rose",
    label: "Rosé",
    bg: "bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-pink-300",
    activeBorder: "ring-pink-400",
    minPlanIndex: 1,
  },
  {
    id: "cyber",
    label: "Cyber",
    bg: "bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 border-cyan-400",
    activeBorder: "ring-cyan-400",
    minPlanIndex: 1,
  },
  {
    id: "minimal",
    label: "Minimal",
    bg: "bg-stone-50 border-stone-300",
    activeBorder: "ring-stone-400",
    minPlanIndex: 1,
  },
];

const planIndex: Record<Plan, number> = { free: 0, pro: 1, business: 2 };

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

  // Sync when parent value changes
  const normalizedValue = value.toUpperCase();
  if (localHex.toUpperCase() !== normalizedValue && localHex !== "") {
    // Only sync if not actively editing
  }

  const handleHexInput = (raw: string) => {
    // Allow typing with or without #
    let hex = raw.startsWith("#") ? raw : `#${raw}`;
    hex = hex.slice(0, 7); // limit to #RRGGBB
    setLocalHex(hex);

    // Only apply if it's a valid color
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  return (
    <div className="space-y-1.5">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex items-center gap-2">
        {/* Color swatch (opens native picker on click) */}
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
        {/* Hex text input */}
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

export default function DashboardPage() {
  const { profile, updateProfile, links, addLink, removeLink, updateLink, reorderLinks } = useProfile();
  const [showCustom, setShowCustom] = useState(profile.theme === "custom");
  const [upgradeModal, setUpgradeModal] = useState<{ feature: string; plan: Plan } | null>(null);

  const currentPlan = profile.plan || "free";
  const limits = getPlanLimits(currentPlan);
  const currentPlanIdx = planIndex[currentPlan];
  const atLinkLimit = links.length >= limits.maxLinks;

  const colors = profile.custom_colors || DEFAULT_CUSTOM;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      const reordered = arrayMove(links, oldIndex, newIndex).map((l, i) => ({
        ...l,
        position: i,
      }));
      reorderLinks(reordered);
    },
    [links, reorderLinks]
  );

  const handleUpdate = useCallback(
    (id: string, data: Partial<Link>) => {
      updateLink(id, data);
    },
    [updateLink]
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeLink(id);
    },
    [removeLink]
  );

  const handleAdd = useCallback(
    (title: string, url: string, scheduledAt?: string) => {
      addLink(title, url, scheduledAt);
    },
    [addLink]
  );

  const handleCustomColorChange = (key: keyof CustomColors, value: string) => {
    const newColors = { ...colors, [key]: value };
    updateProfile({ theme: "custom", custom_colors: newColors });
  };

  const handleSelectCustom = () => {
    if (currentPlan !== "business") {
      setUpgradeModal({ feature: "Custom colors", plan: "business" });
      return;
    }
    setShowCustom(true);
    updateProfile({ theme: "custom", custom_colors: colors });
  };

  const handleThemeClick = (theme: typeof themes[0]) => {
    if (theme.minPlanIndex > currentPlanIdx) {
      setUpgradeModal({ feature: `${theme.label} theme`, plan: theme.minPlanIndex === 1 ? "pro" : "business" });
      return;
    }
    updateProfile({ theme: theme.id });
    setShowCustom(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Links</h1>
        <span className="text-sm text-muted-foreground">
          {links.filter((l) => l.is_active).length} active
        </span>
      </div>

      {/* Theme picker */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {themes.map((theme) => {
              const locked = theme.minPlanIndex > currentPlanIdx;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeClick(theme)}
                  title={locked ? `${theme.label} (${theme.minPlanIndex === 1 ? "Pro" : "Business"})` : theme.label}
                  className={cn(
                    "w-8 h-8 rounded-lg border transition-all shrink-0 relative",
                    theme.bg,
                    locked && "opacity-40",
                    profile.theme === theme.id && !locked
                      ? "ring-2 ring-offset-1 ring-offset-background " + theme.activeBorder + " scale-110"
                      : !locked && "opacity-70 hover:opacity-100 hover:scale-105"
                  )}
                >
                  {locked && (
                    <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-black/30">
                      <Lock className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
            {/* Custom theme button */}
            <button
              onClick={handleSelectCustom}
              title="Custom"
              className={cn(
                "w-8 h-8 rounded-lg border transition-all shrink-0 flex items-center justify-center",
                profile.theme === "custom"
                  ? "ring-2 ring-offset-1 ring-offset-background ring-pink-400 scale-110"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              )}
              style={
                profile.theme === "custom"
                  ? { backgroundColor: colors.bg, borderColor: colors.buttonBg }
                  : undefined
              }
            >
              <Palette className="h-4 w-4" style={
                profile.theme === "custom"
                  ? { color: colors.buttonBg }
                  : undefined
              } />
            </button>
          </div>
        </div>

        {/* Custom color pickers */}
        {(showCustom || profile.theme === "custom") && (
          <div className="rounded-2xl border bg-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Palette className="h-4 w-4" />
              Custom colors
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ColorInput
                label="Background"
                value={colors.bg}
                onChange={(v) => handleCustomColorChange("bg", v)}
              />
              <ColorInput
                label="Text"
                value={colors.text}
                onChange={(v) => handleCustomColorChange("text", v)}
              />
              <ColorInput
                label="Button"
                value={colors.buttonBg}
                onChange={(v) => handleCustomColorChange("buttonBg", v)}
              />
              <ColorInput
                label="Button text"
                value={colors.buttonText}
                onChange={(v) => handleCustomColorChange("buttonText", v)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add link — with limit check */}
      {atLinkLimit ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            You&apos;ve reached the {limits.maxLinks}-link limit on the {currentPlan === "free" ? "Free" : "Pro"} plan.
          </p>
          <button
            onClick={() => setUpgradeModal({ feature: "More links", plan: currentPlan === "free" ? "pro" : "business" })}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Crown className="h-3.5 w-3.5" />
            Upgrade for more
          </button>
        </div>
      ) : (
        <AddLinkForm
          onAdd={handleAdd}
          canSchedule={limits.hasScheduledLinks}
          onScheduleGate={() => setUpgradeModal({ feature: "Scheduled links", plan: "pro" })}
        />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {links.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No links yet. Add your first one above!</p>
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
