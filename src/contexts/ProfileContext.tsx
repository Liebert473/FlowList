import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { ProfileType } from "@/types/types";
import { useAuth } from "./AuthContext";

type ProfileContextType = {
  profile: ProfileType | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<ProfileType>) => Promise<void>;
  uploadAvatar: (avatar: File) => Promise<string>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single<ProfileType>();

    if (!error) setProfile(data);
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<ProfileType>) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);
    if (error) throw error;
    await fetchProfile();
  };

  const uploadAvatar = async (avatar: File) => {
    const fileExt = avatar.name.split(".").pop();
    const fileName = crypto.randomUUID() + fileExt;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(user.id + "/" + fileName, avatar, {
        cacheControl: "60",
        upsert: true,
      });

    if (error) throw Error("Upload Avatar error. " + fileName, error);

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(user.id + "/" + fileName);

    return urlData.publicUrl;
  };

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{ profile, loading, fetchProfile, updateProfile, uploadAvatar }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
}
