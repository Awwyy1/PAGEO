// Form to add a new link
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddLinkFormProps {
  onAdd: (title: string, url: string) => void;
}

export function AddLinkForm({ onAdd }: AddLinkFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAdd(title.trim(), url.trim());
    setTitle("");
    setUrl("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-xl h-9 px-4"
        size="sm"
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" /> Add link
      </Button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-card p-4 space-y-3"
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
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setIsOpen(false);
            setTitle("");
            setUrl("");
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
