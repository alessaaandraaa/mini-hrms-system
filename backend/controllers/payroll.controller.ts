import type { Request, Response } from "express";
import { PayrollService } from "../services/payroll.service.ts";

const payrollService = new PayrollService();
export class PayrollController {
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

  async addPayrolls(req: Request, res: Response) {
    try {
      const data = await payrollService.addPayrolls();

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
