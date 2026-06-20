import { authClient } from "./lib/auth-client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  console.log({
    session,
    isPending,
  });

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/");
    }
  }, [session, isPending]);

  if (isPending) return null;
  if (!session) return null;

  return children;
}
