import { prisma } from "../lib/prisma.ts";
import type { SalaryUpdateInput } from "../generated/prisma/models.ts";

export class SalaryService {
  async getSalary(id: string) {
    try {
      const salary = await prisma.salary.findUnique({
        where: { employeeId: id },
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
      const salaries = await prisma.salary.findMany({
        include: {
          employee: {
            select: {
              employeeId: true,
              fullName: true,
            },
          },
        },
        orderBy: {
          employee: {
            fullName: "asc",
          },
        },
      });
      return salaries;
    } catch (error) {
      console.error("[salary]: ", error);
      throw new Error(
        "[salary]: An unexpected error occurred while retrieving salaries.",
      );
    }
  }

  async editSalary(id: string, data: SalaryUpdateInput) {
    try {
      const newSalary = await prisma.salary.update({
        data,
        where: {
          employeeId: id,
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
