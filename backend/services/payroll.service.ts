import { prisma } from "../lib/prisma.ts";
import type { PayrollCreateInput } from "../generated/prisma/models.ts";
import { start } from "node:repl";

export class PayrollService {
  async getPayrolls() {
    try {
      const now = new Date();
      const manilaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      );

      const year = manilaTime.getFullYear();
      const monthNum = manilaTime.getMonth() + 1;

      const startOfMonth = new Date(Date.UTC(year, monthNum - 1, 1));
      const endOfMonth = new Date(Date.UTC(year, monthNum, 0));

      return prisma.payroll.findMany({
        where: {
          payrollDate: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        include: { employee: { select: { fullName: true } } },
        orderBy: { payrollDate: "desc" },
      });
    } catch (error) {
      console.error("[payroll]: ", error);
      throw new Error(
        "[payroll]: An unexpected error occurred while fetching payrolls.",
      );
    }
  }

  async addPayrolls() {
    try {
      // 1. get all salaries
      const salaries = await prisma.salary.findMany({
        include: { employee: true },
      });

      const now = new Date();
      const manilaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      );

      const year = manilaTime.getFullYear();
      const monthNum = manilaTime.getMonth() + 1;

      const startOfMonth = new Date(Date.UTC(year, monthNum - 1, 1));
      const endOfMonth = new Date(Date.UTC(year, monthNum, 0));

      // 3. loop and create if not exists
      const results = await Promise.all(
        salaries.map(async (salary) => {
          const existing = await prisma.payroll.findFirst({
            where: {
              employeeId: salary.employeeId,
              payrollDate: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            },
          });

          if (existing) return existing;

          const net_salary =
            Number(salary.basicSalary) +
            Number(salary.allowance) -
            Number(salary.deductions);

          return prisma.payroll.create({
            data: {
              employeeId: salary.employeeId,
              basicSalary: salary.basicSalary,
              allowance: salary.allowance,
              deductions: salary.deductions,
              net_salary,
              payrollDate: new Date(),
            },
          });
        }),
      );

      return results;
    } catch (error) {
      console.error("[payroll]: ", error);
      throw new Error(
        "[payroll]: An unexpected error occurred while generating payroll.",
      );
    }
  }
}
