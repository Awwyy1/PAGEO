// Social icon detection — matches URL patterns to platform icons with brand colors
import {
  Github,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Twitch,
  Music2,
  Send,
  Globe,
  Mail,
  MessageSquare,
  Hash,
  Phone,
  ShoppingBag,
  Bookmark,
  type LucideIcon,
} from "lucide-react";

export interface SocialIconInfo {
  Icon: LucideIcon;
  color: string;
  label: string;
}

const SOCIAL_PATTERNS: { pattern: RegExp; icon: LucideIcon; label: string; color: string }[] = [
  { pattern: /youtube\.com|youtu\.be/i, icon: Youtube, label: "YouTube", color: "#FF0000" },
  { pattern: /github\.com/i, icon: Github, label: "GitHub", color: "#6e40c9" },
  { pattern: /instagram\.com/i, icon: Instagram, label: "Instagram", color: "#E4405F" },
  { pattern: /(twitter|x)\.com/i, icon: Twitter, label: "Twitter", color: "#1DA1F2" },
  { pattern: /linkedin\.com/i, icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
  { pattern: /facebook\.com/i, icon: Facebook, label: "Facebook", color: "#1877F2" },
  { pattern: /twitch\.tv/i, icon: Twitch, label: "Twitch", color: "#9146FF" },
  { pattern: /tiktok\.com/i, icon: Music2, label: "TikTok", color: "#ff0050" },
  { pattern: /spotify\.com/i, icon: Music2, label: "Spotify", color: "#1DB954" },
  { pattern: /discord\.(gg|com)/i, icon: MessageSquare, label: "Discord", color: "#5865F2" },
  { pattern: /t\.me|telegram\.(me|org)/i, icon: Send, label: "Telegram", color: "#26A5E4" },
  { pattern: /reddit\.com/i, icon: Hash, label: "Reddit", color: "#FF4500" },
  { pattern: /pinterest\.com/i, icon: Bookmark, label: "Pinterest", color: "#E60023" },
  { pattern: /wa\.me|whatsapp\.com/i, icon: Phone, label: "WhatsApp", color: "#25D366" },
  { pattern: /^mailto:/i, icon: Mail, label: "Email", color: "#EA4335" },
  { pattern: /medium\.com/i, icon: Bookmark, label: "Medium", color: "#000000" },
  { pattern: /shopify\.com|etsy\.com|amazon\./i, icon: ShoppingBag, label: "Shop", color: "#96bf48" },
];

export function getSocialIcon(url: string): SocialIconInfo {
  for (const { pattern, icon, label, color } of SOCIAL_PATTERNS) {
    if (pattern.test(url)) {
      return { Icon: icon, color, label };
    }
  }
  return { Icon: Globe, color: "#6b7280", label: "Link" };
}
