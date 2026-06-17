import type { Request, Response } from "express";
import { PayrollService } from "../services/payroll.service.ts";

const payrollService = new PayrollService();
export class PayrollController {
  async getPayroll(req: Request, res: Response) {
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

      const data = await payrollService.getPayroll(id);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[payroll]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching payroll.",
        },
      });
    }
  }

  async getPayrolls(req: Request, res: Response) {
    try {
      const data = await payrollService.getPayrolls();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[payroll]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching payrolls.",
        },
      });
    }
  }

  async addPayroll(req: Request, res: Response) {
    try {
      const { payrollData } = req.body;

      if (!payrollData) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Payroll data is missing.",
          },
        });
      }

      const data = await payrollService.addPayroll(payrollData);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[payroll]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while adding payroll.",
        },
      });
    }
  }
}
