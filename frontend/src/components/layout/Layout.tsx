import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-w-full">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
