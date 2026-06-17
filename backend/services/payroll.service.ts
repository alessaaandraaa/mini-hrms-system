import { prisma } from "../lib/prisma.ts";
import type { PayrollCreateInput } from "../generated/prisma/models.ts";

export class PayrollService {
  async getPayroll(employeeId: string) {
    try {
      const payroll = await prisma.payroll.findMany({
        where: { employeeId },
        orderBy: { payrollDate: "desc" },
      });
      return payroll;
    } catch (error) {
      console.error("[payroll]: ", error);
      throw new Error(
        "[payroll]: An unexpected error occurred while retrieving payroll.",
      );
    }
  }

  async getPayrolls() {
    try {
      const payrolls = await prisma.payroll.findMany();
      return payrolls;
    } catch (error) {
      console.error("[payroll]: ", error);
      throw new Error(
        "[payroll]: An unexpected error occurred while fetching payrolls.",
      );
    }
  }

  async addPayroll(payrollData: PayrollCreateInput) {
    try {
      const payroll = await prisma.payroll.create({
        data: payrollData,
      });

      return payroll;
    } catch (error) {
      console.error("[payroll]: ", error);
      throw new Error(
        "[payroll]: An unexpected error occurred while adding payroll.",
      );
    }
  }
}
