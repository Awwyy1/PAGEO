// Single link card in the dashboard editor with edit/delete/toggle + social icon
"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2, Check, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getSocialIcon } from "@/lib/social-icons";
import type { Link } from "@/types/database";

interface LinkCardProps {
  link: Link;
  onUpdate: (id: string, data: Partial<Link>) => void;
  onDelete: (id: string) => void;
}

export function LinkCard({ link, onUpdate, onDelete }: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    onUpdate(link.id, { title, url });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(link.title);
    setUrl(link.url);
    setIsEditing(false);
  };

  const social = getSocialIcon(link.url);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 rounded-2xl border bg-card p-4 transition-shadow ${isDragging ? "shadow-lg opacity-50" : "shadow-sm"
        }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Link title"
            />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Check className="h-3 w-3 mr-1" /> Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-3 w-3 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Social icon badge */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${social.color}15` }}
            >
              <social.Icon
                className="h-4 w-4"
                style={{ color: social.color }}
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{link.title}</p>
              <p className="text-sm text-muted-foreground truncate">{link.url}</p>
              <div className="flex items-center gap-3 mt-1">
                {link.scheduled_at && (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(link.scheduled_at) > new Date() ? "Scheduled: " : "Published: "}
                    {new Date(link.scheduled_at).toLocaleDateString()} {new Date(link.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
                {link.click_count > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {link.click_count} clicks
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center gap-2">
          <Switch
            checked={link.is_active}
            onCheckedChange={(checked) =>
              onUpdate(link.id, { is_active: checked })
            }
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(link.id)}
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
