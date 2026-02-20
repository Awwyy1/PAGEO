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
import { mockProfile, mockLinks } from "@/lib/mock-data";
import type { Profile, Link } from "@/types/database";

interface ProfileContextType {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
  addLink: (title: string, url: string) => Promise<void>;
  removeLink: (id: string) => Promise<void>;
  updateLink: (id: string, data: Partial<Link>) => Promise<void>;
  reorderLinks: (newLinks: Link[]) => Promise<void>;
  avatarPreview: string | null;
  setAvatarPreview: (url: string | null) => void;
  isLoading: boolean;
  userId: string | null;
  signOut: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [links, setLinks] = useState<Link[]>(mockLinks);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Load user data from Supabase on mount
  useEffect(() => {
    let mounted = true;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !mounted) {
        setIsLoading(false);
        return;
      }

      setUserId(user.id);

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData && mounted) {
        setProfile(profileData as Profile);
        if (profileData.avatar_url) {
          setAvatarPreview(profileData.avatar_url);
        }
      }

      // Load links
      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .eq("profile_id", user.id)
        .order("position", { ascending: true });

      if (linksData && mounted) {
        setLinks(linksData as Link[]);
      }

      if (mounted) setIsLoading(false);
    }

    load();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUserId(null);
        setProfile(mockProfile);
        setLinks(mockLinks);
        setAvatarPreview(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateProfile = useCallback(
    (data: Partial<Profile>) => {
      setProfile((prev) => ({ ...prev, ...data }));

      // Persist to Supabase if authenticated
      if (userId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _pid, created_at: _ca, ...rest } = data as Record<string, unknown>;
        supabase
          .from("profiles")
          .update(rest)
          .eq("id", userId)
          .then(({ error }) => {
            if (error) console.error("Failed to update profile:", error.message);
          });
      }
    },
    [userId, supabase]
  );

  const addLink = useCallback(
    async (title: string, url: string) => {
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
        created_at: new Date().toISOString(),
      };
      setLinks((prev) => [...prev, newLink]);

      if (userId) {
        const { data, error } = await supabase
          .from("links")
          .insert({
            profile_id: userId,
            title,
            url,
            position,
            is_active: true,
          })
          .select()
          .single();

        if (data) {
          // Replace temp link with real one
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

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setProfile(mockProfile);
    setLinks(mockLinks);
    setAvatarPreview(null);
  }, [supabase]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
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
