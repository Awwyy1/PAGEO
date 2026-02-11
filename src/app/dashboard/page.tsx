// Dashboard main page — link editor with drag-and-drop + live preview + inline theme picker
"use client";

import { useCallback } from "react";
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
import { PhonePreview } from "@/components/dashboard/phone-preview";
import { cn } from "@/lib/utils";
import type { Link } from "@/types/database";
import type { Profile } from "@/types/database";

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
    bg: "bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-600 border-cyan-400",
    activeBorder: "ring-cyan-400",
  },
  {
    id: "sunset",
    label: "Sunset",
    bg: "bg-gradient-to-br from-orange-400 via-rose-500 to-pink-600 border-orange-400",
    activeBorder: "ring-orange-400",
  },
  {
    id: "forest",
    label: "Forest",
    bg: "bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 border-emerald-400",
    activeBorder: "ring-emerald-400",
  },
];

export default function DashboardPage() {
  const { profile, updateProfile, links, setLinks, avatarPreview } = useProfile();

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

      setLinks((prev) => {
        const oldIndex = prev.findIndex((l) => l.id === active.id);
        const newIndex = prev.findIndex((l) => l.id === over.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);
        return reordered.map((l, i) => ({ ...l, position: i }));
      });
    },
    [setLinks]
  );

  const handleUpdate = useCallback(
    (id: string, data: Partial<Link>) => {
      setLinks((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...data } : l))
      );
    },
    [setLinks]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    },
    [setLinks]
  );

  const handleAdd = useCallback(
    (title: string, url: string) => {
      const newLink: Link = {
        id: crypto.randomUUID(),
        profile_id: profile.id,
        title,
        url,
        icon: null,
        position: links.length,
        is_active: true,
        click_count: 0,
        created_at: new Date().toISOString(),
      };
      setLinks((prev) => [...prev, newLink]);
    },
    [links.length, profile.id, setLinks]
  );

  return (
    <div className="flex gap-10 max-w-5xl mx-auto">
      {/* Editor */}
      <div className="flex-1 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Links</h1>
          <span className="text-sm text-muted-foreground">
            {links.filter((l) => l.is_active).length} active
          </span>
        </div>

        {/* Theme picker + Add link — compact row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateProfile({ theme: theme.id })}
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
          </div>
          <div className="ml-auto">
            <AddLinkForm onAdd={handleAdd} />
          </div>
        </div>

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

      {/* Divider */}
      <div className="hidden lg:block w-px self-stretch bg-border/60" />

      {/* Preview */}
      <PhonePreview
        profile={profile}
        links={links}
        avatarPreview={avatarPreview}
      />
    </div>
  );
}
