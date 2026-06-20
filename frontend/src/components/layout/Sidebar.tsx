import { useState } from "react";
import NavLinks from "./NavLinks";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/");
  };

  return (
    <>
      <div className="md:hidden p-2">
        <button onClick={() => setOpen(true)}>☰</button>
      </div>

      <div className="hidden md:flex md:flex-col w-64 min-h-screen bg-[#80645f] border-r p-5 shadow mr-5">
        <div className="pb-3 border-b mb-5">
          <div className="text-5xl font-extrabold text-white">ALSN</div>
          <p className="text-xs text-white/80">HR Management System</p>
        </div>

        <div className="flex-1">
          <NavLinks />
        </div>

        <div className="pt-3 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex flex-row gap-3 w-full text-left text-sm text-white/80 hover:text-white py-2 px-3 rounded hover:bg-[#5a4343e1] transition-colors"
          >
            <LogOut />
            Log Out
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-64 bg-white h-full z-50 p-4 flex flex-col">
            <button onClick={() => setOpen(false)}>✕</button>
            <div className="flex-1">
              <NavLinks />
            </div>
            <button
              onClick={handleLogout}
              className="text-left text-sm text-gray-600 hover:text-black py-2 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
