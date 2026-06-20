import type { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service.ts";
import { EmploymentStatus } from "../generated/prisma/enums.ts";
const employeeService = new EmployeeService();

export class EmployeeController {
  async getEmployees(req: Request, res: Response) {
    try {
      const employmentStatus = req.query.status as unknown as
        | EmploymentStatus
        | undefined;

      if (
        employmentStatus &&
        !Object.values(EmploymentStatus).includes(
          employmentStatus as EmploymentStatus,
        )
      ) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Invalid employment status.",
          },
        });
      }

      const data = await employeeService.getEmployees(employmentStatus);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching employees.",
        },
      });
    }
  }

  async getEmployee(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Employee ID is required.",
          },
        });
      }

      const data = await employeeService.getEmployee(id);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[employee]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching employee.",
        },
      });
    }
  }

  async getEmployeeAttendanceList(req: Request, res: Response) {
    try {
      const data = await employeeService.getEmployeeAttendanceList();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[employee]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching employee.",
        },
      });
    }
  }

  async addEmployee(req: Request, res: Response) {
    try {
      const { employeeData, salaryData } = req.body;
      const data = await employeeService.addEmployee(employeeData, salaryData);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[employee]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while adding employee.",
        },
      });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Employee ID is required.",
          },
        });
      }

      const data = await employeeService.deleteEmployee(id);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[employee]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while deleting employee.",
        },
      });
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const employeeData = req.body;
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Employee ID is required.",
          },
        });
      }

      if (!employeeData) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Employee data is required.",
          },
        });
      }

      const data = await employeeService.updateEmployee(id, employeeData);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[employee]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while updating employee.",
        },
      });
    }
  }
}
