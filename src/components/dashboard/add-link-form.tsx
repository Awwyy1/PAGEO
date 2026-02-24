// Form to add a new link — with optional scheduling for Pro/Biz
"use client";

import { useState } from "react";
import { Plus, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddLinkFormProps {
  onAdd: (title: string, url: string, scheduledAt?: string) => void;
  canSchedule?: boolean;
  onScheduleGate?: () => void;
}

export function AddLinkForm({ onAdd, canSchedule = false, onScheduleGate }: AddLinkFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAdd(title.trim(), url.trim(), showSchedule && scheduledAt ? scheduledAt : undefined);
    setTitle("");
    setUrl("");
    setScheduledAt("");
    setShowSchedule(false);
    setIsOpen(false);
  };

  const handleScheduleClick = () => {
    if (!canSchedule) {
      onScheduleGate?.();
      return;
    }
    setShowSchedule(!showSchedule);
  };

  if (!isOpen) {
    return (
      <div className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-xl h-9 px-4"
          size="sm"
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add link
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border bg-card p-4 space-y-3"
    >
      <Input
        placeholder="Title (e.g. My Website)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <Input
        placeholder="URL (e.g. https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {/* Schedule toggle */}
      {showSchedule && (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="flex-1 h-9 rounded-lg border border-border bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => { setShowSchedule(false); setScheduledAt(""); }}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
        <button
          type="button"
          onClick={handleScheduleClick}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Calendar className="h-3.5 w-3.5" />
          Schedule
        </button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setIsOpen(false);
            setTitle("");
            setUrl("");
            setScheduledAt("");
            setShowSchedule(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
