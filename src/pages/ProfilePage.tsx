import ProfileCard from "@/components/profile/ProfileCard";
import { ThemeSection } from "@/components/theme/ThemeSection";
export const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ProfileCard />
      <ThemeSection />
    </div>
  );
};
