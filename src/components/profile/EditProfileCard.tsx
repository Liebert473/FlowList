import { useState } from "react";
import { X, FloppyDisk, ArrowCounterClockwise } from "@phosphor-icons/react";
import { useProfile } from "@/contexts/ProfileContext";
import type { ProfileType } from "@/types/types";
import ProfileImageUpload from "./ProfileImageUpload";

interface EditProfileCardProps {
  onClose: () => void;
}

export default function EditProfileCard({ onClose }: EditProfileCardProps) {
  const { profile, updateProfile, uploadAvatar } = useProfile();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [curProfile, setCurProfile] = useState<ProfileType | null>(profile);
  const [isChanged, setIsChanged] = useState(false);

  const handleSave = async () => {
    let updates = curProfile;
    if (updates) {
      if (avatar) {
        const newUrl = await uploadAvatar(avatar);
        updates.avatar_url = newUrl;
      }
      await updateProfile(updates);
    }

    setIsChanged(false);
    onClose();
  };

  const handleDiscard = () => {
    setCurProfile(profile);
    setIsChanged(false);
  };

  const handleAvatarChange = (file: File | null) => {
    setIsChanged(true);
    setAvatar(file);
  };

  const handleChange = (field: keyof ProfileType, value: string) => {
    setCurProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
    setIsChanged(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="w-full max-w-lg bg-fl-bg-sec rounded-xl shadow-lg border border-fl-border p-6 text-fl-text animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold underline decoration-fl-primary">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="text-fl-text hover:text-fl-primary transition"
          >
            <X size={22} weight="bold" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <ProfileImageUpload handleAvatarChange={handleAvatarChange} />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-fl-info">First Name</label>
              <input
                type="text"
                value={curProfile?.first_name ?? "-"}
                onChange={(e) => handleChange("first_name", e.target.value)}
                className="px-3 py-2 rounded-md bg-fl-bg text-fl-text border border-fl-border focus:outline-none focus:ring-2 focus:ring-fl-primary"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-fl-info">Last Name</label>
              <input
                type="text"
                value={curProfile?.last_name ?? "-"}
                onChange={(e) => handleChange("last_name", e.target.value)}
                className="px-3 py-2 rounded-md bg-fl-bg text-fl-text border border-fl-border focus:outline-none focus:ring-2 focus:ring-fl-primary"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-fl-info">Email</label>
            <input
              type="email"
              value={curProfile?.email}
              disabled
              className="px-3 py-2 rounded-md bg-fl-bg text-fl-text border border-fl-border opacity-70 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleDiscard}
            disabled={!isChanged}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
              isChanged
                ? "text-fl-text border-fl-border hover:bg-fl-hover"
                : "opacity-50 cursor-not-allowed border-fl-border"
            }`}
          >
            <ArrowCounterClockwise size={18} />
            Discard
          </button>

          <button
            onClick={handleSave}
            disabled={!isChanged}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              isChanged
                ? "bg-fl-primary text-white hover:bg-fl-primary-hover"
                : "opacity-50 cursor-not-allowed bg-fl-primary"
            }`}
          >
            <FloppyDisk size={18} weight="fill" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
