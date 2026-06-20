import { useState, useEffect } from "react";
import type { DashboardType } from "../types";
import { errorToast } from "../utils";

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const dashboardData = await res.json();

    setDashboardData(dashboardData.data);
    setLoading(false);
  };

  return {
    dashboardData,
    loading,
  };
}
