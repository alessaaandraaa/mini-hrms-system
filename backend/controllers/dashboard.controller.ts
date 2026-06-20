import type { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service.ts";

const dashboardService = new DashboardService();
export class DashboardController {
  async getDashboardStats(req: Request, res: Response) {
    try {
      const data = await dashboardService.getDashboardStats();

      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[dashboard]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An unexpected error happened while fetching dashboard stats.",
        },
      });
    }
  }
}
