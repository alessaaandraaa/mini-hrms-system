import { NavLink } from "react-router-dom";

export default function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-white p-0.5 pl-2 rounded-xs font-bold transition-colors ${
          isActive ? "bg-[#5a4343e1]" : "hover:bg-[#5a4343e1]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
