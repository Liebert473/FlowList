import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-fl-bg">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside>
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
