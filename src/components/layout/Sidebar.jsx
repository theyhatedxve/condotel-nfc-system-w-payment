import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { NAV_ITEMS } from "@/lib/constants";


function BrandLogo() {
  return (
    <div className="flex items-center px-3 pb-5 pt-3">
      <img
        src="/dashboard/condotel-logo.png"
        alt="Condotel NFC System with Payment"
        className="h-[52px] w-auto max-w-full object-contain object-left"
      />
    </div>
  );
}

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const items = NAV_ITEMS.filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col bg-[#082f31] text-slate-300">
      <BrandLogo />

      <div className="mx-3 mb-4 flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#155d5c] text-xs font-bold text-white">
          {user?.name?.[0] ?? "A"}
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-white">
            {user?.name || "Admin User"}
          </div>
          <div className="truncate text-[9px] capitalize text-slate-400">
            {user?.role || "admin"} Administrator
          </div>
        </div>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-2.5">
        {items.map((item) => {
          const Icon = Icons[item.icon] ?? Icons.Circle;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
                  isActive
                    ? "bg-[#197a6f] text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-4 pt-2 text-[9px] text-slate-500">
        <div className="mb-1.5 flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          System Online
        </div>
        Condotel NFC System v0.1
      </div>
    </aside>
  );
}
