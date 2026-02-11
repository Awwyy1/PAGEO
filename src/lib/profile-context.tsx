// Shared profile context — syncs profile, links, avatar and theme across all pages
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { mockProfile, mockLinks } from "@/lib/mock-data";
import type { Profile, Link } from "@/types/database";

interface ProfileContextType {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
  avatarPreview: string | null;
  setAvatarPreview: (url: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [links, setLinks] = useState<Link[]>(mockLinks);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const updateProfile = useCallback((data: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        links,
        setLinks,
        avatarPreview,
        setAvatarPreview,
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
