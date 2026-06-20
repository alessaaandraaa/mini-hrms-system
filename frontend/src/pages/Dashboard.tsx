import DashboardStats from "@/components/dashboard/DashboardStats";
import { useDashboard } from "@/lib/hooks/useDashboard";
export default function Dashboard() {
  const { dashboardData, loading } = useDashboard();

  return (
    <div>
      <div className="text-5xl font-extrabold text-[#80645f] mb-2">
        DASHBOARD
      </div>
      <hr className="mb-2" />
      {loading || !dashboardData ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <DashboardStats data={dashboardData} />
      )}
    </div>
  );
}
