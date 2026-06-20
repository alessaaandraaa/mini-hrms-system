import NavItem from "./NavItem";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/employees", label: "Employees" },
  { to: "/salary", label: "Salary" },
  { to: "/attendance", label: "Attendance" },
  { to: "/payroll", label: "Payroll" },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ))}
    </div>
  );
}
