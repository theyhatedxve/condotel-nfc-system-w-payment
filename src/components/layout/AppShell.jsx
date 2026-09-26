import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f6f5]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="scrollbar-thin flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
