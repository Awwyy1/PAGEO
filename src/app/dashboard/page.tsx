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
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Link, CustomColors } from "@/types/database";
import type { Profile } from "@/types/database";

const DEFAULT_CUSTOM: CustomColors = {
  bg: "#1a1a2e",
  text: "#ffffff",
  buttonBg: "#e94560",
  buttonText: "#ffffff",
};

const themes: { id: Profile["theme"]; label: string; bg: string; activeBorder: string }[] = [
  {
    id: "light",
    label: "Light",
    bg: "bg-white border-gray-200",
    activeBorder: "ring-gray-400",
  },
  {
    id: "dark",
    label: "Dark",
    bg: "bg-gray-900 border-gray-700",
    activeBorder: "ring-gray-500",
  },
  {
    id: "gradient",
    label: "Gradient",
    bg: "bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 border-violet-400",
    activeBorder: "ring-violet-400",
  },
  {
    id: "ocean",
    label: "Ocean",
    bg: "bg-blue-600 border-blue-500",
    activeBorder: "ring-blue-400",
  },
  {
    id: "sunset",
    label: "Sunset",
    bg: "bg-rose-500 border-rose-400",
    activeBorder: "ring-rose-400",
  },
  {
    id: "forest",
    label: "Forest",
    bg: "bg-emerald-600 border-emerald-500",
    activeBorder: "ring-emerald-400",
  },
];

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-lg border border-border cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-none"
        />
      </div>
      <span className="text-muted-foreground text-xs">{label}</span>
    </label>
  );
}

export default function DashboardPage() {
  const { profile, updateProfile, links, addLink, removeLink, updateLink, reorderLinks } = useProfile();
  const [showCustom, setShowCustom] = useState(profile.theme === "custom");

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
    (title: string, url: string) => {
      addLink(title, url);
    },
    [addLink]
  );

  const handleCustomColorChange = (key: keyof CustomColors, value: string) => {
    const newColors = { ...colors, [key]: value };
    updateProfile({ theme: "custom", custom_colors: newColors });
  };

  const handleSelectCustom = () => {
    setShowCustom(true);
    updateProfile({ theme: "custom", custom_colors: colors });
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
          <div className="flex items-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  updateProfile({ theme: theme.id });
                  setShowCustom(false);
                }}
                title={theme.label}
                className={cn(
                  "w-8 h-8 rounded-lg border transition-all shrink-0",
                  theme.bg,
                  profile.theme === theme.id
                    ? "ring-2 ring-offset-1 ring-offset-background " + theme.activeBorder + " scale-110"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                )}
              />
            ))}
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

      <AddLinkForm onAdd={handleAdd} />

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
    </div>
  );
}
