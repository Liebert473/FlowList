import {
  SquaresFour,
  CheckSquareOffset,
  ChartBar,
  Notebook,
  Robot,
  UserCircleIcon,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: SquaresFour, path: "/dashboard" },
  { label: "My Tasks", icon: CheckSquareOffset, path: "/tasks" },
  { label: "Projects", icon: ChartBar, path: "/projects" },
  { label: "Journals", icon: Notebook, path: "/journals" },
  { label: "Assistant", icon: Robot, path: "/assistant" },
  { label: "Profile", icon: UserCircleIcon, path: "/profile" },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="flex flex-col justify-between w-56 h-full bg-fl-bg-sec text-fl-text py-6 px-3 border-r border-fl-border">
      {/* Top Section */}
      <div className="space-y-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium cursor-pointer
                ${
                  isActive
                    ? "bg-fl-primary text-white hover:bg-fl-primary-hover"
                    : "text-fl-text hover:bg-fl-hover"
                }`}
            >
              <Icon
                size={22}
                weight={
                  ["Dashboard", "Assistant", "Profile"].includes(label)
                    ? "fill"
                    : "regular"
                }
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="px-4 pt-4 border-t border-fl-border">
        <button
          className="flex items-center gap-3 text-sm text-fl-text hover:text-fl-primary transition cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Moon size={22} weight="regular" />
          ) : (
            <Sun size={22} weight="regular" />
          )}
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
    </aside>
  );
}
