// Dashboard main page — link editor with drag-and-drop
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
import { Crown } from "lucide-react";
import type { Link, Plan } from "@/types/database";

export default function DashboardPage() {
  const { profile, links, addLink, removeLink, updateLink, reorderLinks } = useProfile();
  const [upgradeModal, setUpgradeModal] = useState<{ feature: string; plan: Plan } | null>(null);

  const currentPlan = profile.plan || "free";
  const limits = getPlanLimits(currentPlan);
  const atLinkLimit = links.length >= limits.maxLinks;

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

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Links</h1>
        <span className="text-sm text-muted-foreground">
          {links.filter((l) => l.is_active).length} active
        </span>
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
