import { prisma } from "../lib/prisma.ts";
import { EmploymentStatus } from "../generated/prisma/enums.ts";
import type {
  EmployeeCreateInput,
  EmployeeUpdateInput,
  SalaryCreateInput,
  SalaryUncheckedCreateInput,
} from "../generated/prisma/models.ts";

export class EmployeeService {
  async getEmployees(employmentStatus?: EmploymentStatus) {
    try {
      const employees = await prisma.employee.findMany({
        where: {
          ...(employmentStatus ? { employmentStatus } : {}),
        },
      });

      return employees;
    } catch (error) {
      console.error("[employee]: ", error);
      throw new Error(
        "[employee]: An unexpected error occurred while finding all employees.",
      );
    }
  }

  // get employee
  async getEmployee(employeeId: string) {
    try {
      const employee = await prisma.employee.findUnique({
        where: {
          employeeId,
        },
      });

      return employee;
    } catch (error) {
      console.error("[employee]: ", error);
      throw new Error(
        "[employee]: An unexpected error occurred while finding employee.",
      );
    }
  }

  // add employee
  async addEmployee(
    employeeData: EmployeeCreateInput,
    salaryData: SalaryCreateInput,
  ) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const employee = await tx.employee.create({
          data: employeeData,
        });

        await tx.salary.create({
          data: {
            employeeId: employee.employeeId,
            ...salaryData,
          } as SalaryUncheckedCreateInput,
        });

        return employee;
      });

      return result;
    } catch (error) {
      console.error("[employee]: ", error);
      throw new Error(
        "[employee]: An unexpected error occurred while adding employee.",
      );
    }
  }

  // delete employee
  async deleteEmployee(employeeId: string) {
    try {
      const del = await prisma.employee.delete({
        where: {
          employeeId,
        },
      });

      return del;
    } catch (error) {
      console.error("[employee]: ", error);
      throw new Error(
        "[employee]: An unexpected error occurred while deleting employee.",
      );
    }
  }

  // update employee
  async updateEmployee(employeeId: string, employeeData: EmployeeUpdateInput) {
    try {
      const updatedUser = await prisma.employee.update({
        where: { employeeId },
        data: employeeData,
      });

      return updatedUser;
    } catch (error) {
      console.error("[employee]: ", error);
      throw new Error(
        "[employee]: An unexpected error occurred while updating employee.",
      );
    }
  }
}
