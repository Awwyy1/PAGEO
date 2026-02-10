// Dashboard main page — link editor with drag-and-drop + live preview
"use client";

import { useState, useCallback } from "react";
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
import { mockProfile, mockLinks } from "@/lib/mock-data";
import { LinkCard } from "@/components/dashboard/link-card";
import { AddLinkForm } from "@/components/dashboard/add-link-form";
import { PhonePreview } from "@/components/dashboard/phone-preview";
import type { Link } from "@/types/database";

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>(mockLinks);
  const [profile] = useState(mockProfile);

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
    []
  );

  const handleUpdate = useCallback((id: string, data: Partial<Link>) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...data } : l))
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const handleAdd = useCallback((title: string, url: string) => {
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
  }, [links.length, profile.id]);

  return (
    <div className="flex gap-8 max-w-5xl mx-auto">
      {/* Editor */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Links</h1>
          <span className="text-sm text-muted-foreground">
            {links.filter((l) => l.is_active).length} active
          </span>
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

      {/* Preview */}
      <PhonePreview profile={profile} links={links} />
    </div>
  );
}
