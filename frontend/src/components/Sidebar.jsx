import { Link, NavLink } from "react-router-dom";
import {
  BriefcaseBusiness,
  Plus,
  LayoutDashboard,
  ListChecks,
  User,
  LogOut,
} from "lucide-react";
import useLogut from "../hooks/useLogout.js";

const NAV = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/applications",
    label: "Applications",
    icon: ListChecks,
  },
];

function Sidebar() {
  const { logout } = useLogut();

  return (
    <div className="sticky top-0 flex h-screen w-[68px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0f1d] px-3 py-6 md:w-60 md:px-4">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-3 px-1 md:px-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-950/50">
          <BriefcaseBusiness className="h-5 w-5 text-white" />
        </span>

        <span className="hidden text-lg font-semibold tracking-tight text-white md:block">
          Job<span className="text-indigo-400">Track</span>
        </span>
      </Link>

      {/* New Application */}
      <Link
        to="/applications/new"
        className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110"
      >
        <Plus className="h-4 w-4 shrink-0" />

        <span className="hidden md:block">New application</span>
      </Link>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />

            <span className="hidden md:block">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <NavLink
          key={"/profile"}
          to={"/profile"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-indigo-500/15 text-indigo-300"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
            }`
          }
        >
          <User className="h-5 w-5 shrink-0" />

          <span className="hidden md:block">Profile</span>
        </NavLink>

        <NavLink
          key={"/"}
          to={"/signin"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-indigo-500/15 text-indigo-300"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
            }`
          }
        >
          <LogOut className="h-5 w-5 shrink-0" />

          <span className="hidden md:block" onClick={() => logout()}>
            Logout
          </span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
