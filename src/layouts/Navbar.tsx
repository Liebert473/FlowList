import { List, Bell, XIcon } from "@phosphor-icons/react";
import Logo from "@/components/common/Logo";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Navbar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-fl-bg-sec border-b border-fl-border">
      {/* Left icon */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg bg-fl-primary hover:bg-fl-primary-hover transition cursor-pointer"
      >
        <div className="flex">
          {sidebarOpen ? (
            <XIcon size={22} className="text-white" />
          ) : (
            <List size={22} className="text-white" />
          )}
        </div>
      </button>

      {/* Center logo */}
      <Logo />

      {/* Right icon */}
      <button className="p-2 rounded-lg bg-fl-primary hover:bg-fl-primary-hover transition cursor-pointer">
        <Bell size={22} className="text-white" />
      </button>
    </header>
  );
}
