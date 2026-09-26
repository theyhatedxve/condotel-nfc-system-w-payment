import { useState } from "react";
import { ChevronDown, LogOut, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "@/features/notifications";
import { useAuthStore } from "@/store/authStore";

export default function Topbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex h-[58px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5">
      <label className="relative block w-[270px] max-w-[45vw]">
        <Search
          size={13}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search anything..."
          className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-[10px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#197a6f] focus:ring-2 focus:ring-[#197a6f]/10"
        />
      </label>

      <div className="flex items-center gap-3">
        <NotificationBell />

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 hover:bg-slate-50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#08323a] text-[10px] font-bold text-white">
              {user?.name?.[0] ?? "A"}
            </div>
            <span className="text-[10px] font-semibold text-slate-700">
              {user?.name?.split(" ")[0] ?? "Admin"}
            </span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-xl">
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <User size={14} />
                Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-slate-50"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
