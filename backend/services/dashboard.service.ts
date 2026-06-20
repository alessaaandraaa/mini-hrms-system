import { prisma } from "../lib/prisma.ts";

export class DashboardService {
  async getDashboardStats() {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const [
        totalEmployees,
        activeEmployees,
        onLeaveEmployees,
        monthlyPayroll,
        salaries,
      ] = await prisma.$transaction([
        prisma.employee.count(),
        prisma.employee.count({
          where: { employmentStatus: "Active" },
        }),
        prisma.employee.count({
          where: { employmentStatus: "On_Leave" },
        }),
        prisma.payroll.aggregate({
          _sum: { net_salary: true },
          where: {
            payrollDate: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        }),
        prisma.salary.findMany({
          select: {
            basicSalary: true,
            allowance: true,
            deductions: true,
          },
        }),
      ]);

      const estimatedMonthlyPayroll = salaries.reduce((sum, s) => {
        return (
          sum +
          Number(s.basicSalary) +
          Number(s.allowance) -
          Number(s.deductions)
        );
      }, 0);

      return {
        totalEmployees,
        activeEmployees,
        onLeaveEmployees,

        // actual payroll if payroll for the month is generated
        totalMonthlyPayroll: monthlyPayroll._sum?.net_salary ?? 0,

        // estimated oayroll estimates from current salary
        estimatedMonthlyPayroll,
      };
    } catch (error) {
      console.error("[dashboard]: ", error);
      throw new Error(
        "[dashboard]: An unexpected error occurred while fetching dashboard stats.",
      );
    }
  }
}
