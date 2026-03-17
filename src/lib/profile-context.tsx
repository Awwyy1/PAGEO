// Shared profile context — loads from Supabase, falls back to mock data for unauthenticated users
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Link } from "@/types/database";

const emptyProfile: Profile = {
  id: "",
  username: "",
  display_name: null,
  bio: null,
  avatar_url: null,
  theme: "light",
  custom_colors: null,
  plan: "free",
  plan_source: null,
  subscription_id: null,
  page_views: 0,
  created_at: new Date().toISOString(),
};

interface ProfileContextType {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  updateProfileLocal: (data: Partial<Profile>) => void;
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
  addLink: (title: string, url: string, scheduledAt?: string) => Promise<void>;
  removeLink: (id: string) => Promise<void>;
  updateLink: (id: string, data: Partial<Link>) => Promise<void>;
  reorderLinks: (newLinks: Link[]) => Promise<void>;
  avatarPreview: string | null;
  setAvatarPreview: (url: string | null) => void;
  isLoading: boolean;
  userId: string | null;
  signOut: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [links, setLinks] = useState<Link[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Core data loader — fetches profile + links for a given user
  // NEVER creates a profile here — profile creation only happens during registration
  const loadUserData = useCallback(
    async (uid: string) => {
      setUserId(uid);

      try {
        // Retry up to 3 times — Chrome/Firefox abort fetches during navigation
        let profileData: Record<string, unknown> | null = null;
        let lastError: { message: string } | null = null;

        for (let attempt = 0; attempt < 3; attempt++) {
          const result = await supabase
            .from("profiles")
            .select("*")
            .eq("id", uid)
            .maybeSingle();

          if (result.data) {
            profileData = result.data;
            lastError = null;
            break; // success
          }

          if (result.error) {
            lastError = result.error;
            const msg = result.error.message?.toLowerCase() || "";
            const isAbort = msg.includes("abort") || msg.includes("signal");
            if (isAbort && attempt < 2) {
              // Wait before retry: 300ms, 800ms
              await new Promise((r) => setTimeout(r, attempt === 0 ? 300 : 800));
              continue;
            }
            // Non-abort error or final attempt — stop retrying
            break;
          }

          // result.data is null and result.error is null  → profile genuinely doesn't exist
          // Do NOT create one here — just leave the empty state
          break;
        }

        if (lastError) {
          console.error("Profile fetch failed after retries:", lastError.message);
          setIsLoading(false);
          return;
        }

        if (profileData) {
          setProfile(profileData as Profile);
          if (profileData.avatar_url) {
            setAvatarPreview(profileData.avatar_url as string);
          }
        }
        // If profileData is null (no profile exists), we leave emptyProfile state.
        // The profile will be created by the register page, not here.

        // Load links (also with retry for AbortError)
        let linksData: Record<string, unknown>[] | null = null;
        for (let attempt = 0; attempt < 3; attempt++) {
          const result = await supabase
            .from("links")
            .select("*")
            .eq("profile_id", uid)
            .order("position", { ascending: true });

          if (result.data) {
            linksData = result.data;
            break;
          }
          if (result.error) {
            const msg = result.error.message?.toLowerCase() || "";
            const isAbort = msg.includes("abort") || msg.includes("signal");
            if (isAbort && attempt < 2) {
              await new Promise((r) => setTimeout(r, attempt === 0 ? 300 : 800));
              continue;
            }
            console.error("Links fetch failed:", result.error.message);
            break;
          }
          break;
        }

        if (linksData) {
          setLinks(linksData.map((l) => ({ scheduled_at: null, ...l })) as Link[]);
        }
      } catch (err) {
        console.error("loadUserData unexpected error:", err);
      }

      setIsLoading(false);
    },
    [supabase] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Load on mount + react to auth state changes
  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !mounted) {
        setIsLoading(false);
        return;
      }

      await loadUserData(user.id);
    }

    init();

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (session?.user) {
          await loadUserData(session.user.id);
        }
      } else if (event === "SIGNED_OUT") {
        setUserId(null);
        setProfile(emptyProfile);
        setLinks([]);
        setAvatarPreview(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserData, supabase]);

  // Update profile locally only (for live preview without DB calls)
  const updateProfileLocal = useCallback(
    (data: Partial<Profile>) => {
      setProfile((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const updateProfile = useCallback(
    async (data: Partial<Profile>) => {
      const prev = profile; // snapshot for rollback
      setProfile((p) => ({ ...p, ...data }));

      // Persist to Supabase if authenticated
      if (userId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _pid, created_at: _ca, ...rest } = data as Record<string, unknown>;
        const { error } = await supabase
          .from("profiles")
          .update(rest)
          .eq("id", userId);

        if (error) {
          console.error("Failed to update profile:", error.message);
          // Rollback to previous state so the UI doesn't lie
          setProfile(prev);
        }
      }
    },
    [userId, supabase, profile]
  );

  const addLink = useCallback(
    async (title: string, url: string, scheduledAt?: string) => {
      const position = links.length;
      const tempId = `temp_${Date.now()}`;

      // Optimistic update
      const newLink: Link = {
        id: tempId,
        profile_id: userId || "demo",
        title,
        url,
        icon: null,
        position,
        is_active: true,
        click_count: 0,
        scheduled_at: scheduledAt || null,
        created_at: new Date().toISOString(),
      };
      setLinks((prev) => [...prev, newLink]);

      if (userId) {
        const insertData: Record<string, unknown> = {
          profile_id: userId,
          title,
          url,
          position,
          is_active: true,
        };
        if (scheduledAt) {
          insertData.scheduled_at = scheduledAt;
        }
        const { data, error } = await supabase
          .from("links")
          .insert(insertData)
          .select()
          .single();

        if (data) {
          setLinks((prev) =>
            prev.map((l) => (l.id === tempId ? (data as Link) : l))
          );
        }
        if (error) console.error("Failed to add link:", error.message);
      }
    },
    [userId, links.length, supabase]
  );

  const removeLink = useCallback(
    async (id: string) => {
      setLinks((prev) => prev.filter((l) => l.id !== id));

      if (userId && !id.startsWith("temp_")) {
        const { error } = await supabase.from("links").delete().eq("id", id);
        if (error) console.error("Failed to delete link:", error.message);
      }
    },
    [userId, supabase]
  );

  const updateLink = useCallback(
    async (id: string, data: Partial<Link>) => {
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)));

      if (userId && !id.startsWith("temp_")) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _lid, profile_id: _pid2, created_at: _ca2, ...rest } = data as Record<string, unknown>;
        const { error } = await supabase
          .from("links")
          .update(rest)
          .eq("id", id);
        if (error) console.error("Failed to update link:", error.message);
      }
    },
    [userId, supabase]
  );

  const reorderLinks = useCallback(
    async (newLinks: Link[]) => {
      setLinks(newLinks);

      if (userId) {
        // Batch update positions
        const updates = newLinks.map((link, i) =>
          supabase
            .from("links")
            .update({ position: i })
            .eq("id", link.id)
        );
        await Promise.all(updates);
      }
    },
    [userId, supabase]
  );

  const refreshData = useCallback(async () => {
    if (!userId) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (profileData) {
      setProfile(profileData as Profile);
    }

    const { data: linksData } = await supabase
      .from("links")
      .select("*")
      .eq("profile_id", userId)
      .order("position", { ascending: true });

    if (linksData) {
      setLinks(linksData as Link[]);
    }
  }, [userId, supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setProfile(emptyProfile);
    setLinks([]);
    setAvatarPreview(null);
  }, [supabase]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        updateProfileLocal,
        links,
        setLinks,
        addLink,
        removeLink,
        updateLink,
        reorderLinks,
        avatarPreview,
        setAvatarPreview,
        isLoading,
        userId,
        signOut,
        refreshData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
