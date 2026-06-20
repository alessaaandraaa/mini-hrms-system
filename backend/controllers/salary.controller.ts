import type { Request, Response } from "express";
import { SalaryService } from "../services/salary.service.ts";

const salaryService = new SalaryService();

export class SalaryController {
  async getSalary(req: Request, res: Response) {
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

      const data = await salaryService.getSalary(id);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[salary]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching salary.",
        },
      });
    }
  }

  async getSalaries(req: Request, res: Response) {
    try {
      const data = await salaryService.getSalaries();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[salary]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching salaries.",
        },
      });
    }
  }

  async editSalary(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const salaryData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Employee ID is required.",
          },
        });
      }

      if (!salaryData) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Salary data is missing.",
          },
        });
      }

      const data = await salaryService.editSalary(id, salaryData);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[attendance]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while updating salary.",
        },
      });
    }
  }
}
