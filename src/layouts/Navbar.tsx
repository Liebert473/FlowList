import { List, Bell } from "@phosphor-icons/react";
import Logo from "@/components/common/Logo";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-fl-bg-sec border-b border-fl-border">
      {/* Left icon */}
      <button className="p-2 rounded-lg bg-fl-primary hover:bg-fl-primary-hover transition cursor-pointer">
        <List size={22} className="text-white" />
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
