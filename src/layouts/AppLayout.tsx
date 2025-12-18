import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col bg-fl-bg">
      <Navbar />

      <div className="flex flex-1 overflow-auto">
        {/* Sidebar */}
        <aside>
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-auto custom-scrollbar relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
