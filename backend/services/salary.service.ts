import { prisma } from "../lib/prisma.ts";
import type { SalaryUpdateInput } from "../generated/prisma/models.ts";

export class SalaryService {
  async getSalary(employeeId: string) {
    try {
      const salary = await prisma.salary.findUnique({
        where: { employeeId: employeeId },
      });

      return salary;
    } catch (error) {
      console.error("[salary]: ", error);
      throw new Error(
        "[salary]: An unexpected error occurred while retrieving salary.",
      );
    }
  }

  async getSalaries() {
    try {
      const salaries = await prisma.salary.findMany();
      return salaries;
    } catch (error) {
      console.error("[salary]: ", error);
      throw new Error(
        "[salary]: An unexpected error occurred while retrieving salaries.",
      );
    }
  }

  async editSalary(employeeId: string, salaryData: SalaryUpdateInput) {
    try {
      const newSalary = await prisma.salary.update({
        data: salaryData,
        where: {
          employeeId,
        },
      });

      return newSalary;
    } catch (error) {
      console.error("[salary]: ", error);
      throw new Error(
        "[salary]: An unexpected error occurred while updating salary.",
      );
    }
  }
}
