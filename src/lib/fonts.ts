import type { FontChoice, ContentAlignment } from "@/types/database";

export const fontConfig: Record<FontChoice, { label: string; description: string; className: string }> = {
  modern: { label: "Modern", description: "Inter", className: "font-modern" },
  classic: { label: "Classic", description: "Playfair Display", className: "font-classic" },
  code: { label: "Code", description: "JetBrains Mono", className: "font-code" },
  bold: { label: "Bold", description: "Syne", className: "font-heading" },
};

export const alignmentConfig: Record<ContentAlignment, { label: string; icon: "left" | "center" | "right" }> = {
  left: { label: "Left", icon: "left" },
  center: { label: "Center", icon: "center" },
  right: { label: "Right", icon: "right" },
};

export function getFontClass(font?: string): string {
  return fontConfig[(font as FontChoice) || "modern"]?.className || "font-modern";
}

export function getAlignmentClass(alignment?: string): string {
  switch (alignment) {
    case "left": return "text-left items-start";
    case "right": return "text-right items-end";
    default: return "text-center items-center";
  }
}
