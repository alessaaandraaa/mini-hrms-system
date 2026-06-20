import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardType } from "@/lib/types";
type DashboardStatsProps = {
  data: DashboardType;
};

export default function DashboardStats({ data }: DashboardStatsProps) {
  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  const payrollValue = Number(
    data.totalMonthlyPayroll || data.estimatedMonthlyPayroll,
  );

  const isActualPayroll = data.totalMonthlyPayroll > 0;

  const cards = [
    {
      title: "Total Employees",
      value: data.totalEmployees,
      color: "border-l-4 border-l-blue-400",
      valueColor: "text-blue-600",
    },
    {
      title: "Active Employees",
      value: data.activeEmployees,
      color: "border-l-4 border-l-green-400",
      valueColor: "text-green-600",
    },
    {
      title: "On Leave",
      value: data.onLeaveEmployees,
      color: "border-l-4 border-l-yellow-400",
      valueColor: "text-yellow-600",
    },
    {
      title: "Monthly Payroll",
      value: pesoFormatter.format(payrollValue),

      color: isActualPayroll
        ? "border-l-4 border-l-[#80645f]"
        : "border-l-4 border-l-gray-300",

      valueColor: isActualPayroll ? "text-[#80645f]" : "text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 pt-5">
      {cards.map((card) => (
        <Card key={card.title} className={`shadow-lg ${card.color}`}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${card.valueColor}`}>
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
