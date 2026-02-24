// TypeScript types matching the Supabase database schema

export type CustomColors = {
  bg: string;
  text: string;
  buttonBg: string;
  buttonText: string;
};

export type Plan = "free" | "pro" | "business";

export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme: "light" | "dark" | "gradient" | "ocean" | "sunset" | "forest" | "midnight" | "rose" | "cyber" | "minimal" | "custom";
  custom_colors: CustomColors | null;
  plan: Plan;
  page_views: number;
  created_at: string;
};

export type Link = {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  icon: string | null;
  position: number;
  is_active: boolean;
  click_count: number;
  scheduled_at: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      links: {
        Row: Link;
        Insert: Omit<Link, "id" | "click_count" | "created_at">;
        Update: Partial<Omit<Link, "id" | "profile_id" | "created_at">>;
      };
    };
  };
};
