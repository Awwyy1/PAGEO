// Dashboard main page — link editor with drag-and-drop + inline theme picker
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

export default function DashboardPage() {
  const { profile, updateProfile, links, addLink, removeLink, updateLink, reorderLinks } = useProfile();

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

  return (
    <div className="space-y-5">
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
