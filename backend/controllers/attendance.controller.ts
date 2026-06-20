import type { Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service.ts";

const attendanceService = new AttendanceService();

export class AttendanceController {
  async getAttendance(req: Request, res: Response) {
    try {
      const date = req.query.date as string;

      const data = await attendanceService.getAttendance(date);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("[attendance]: ", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while fetching attendance.",
        },
      });
    }
  }

  async addAttendance(req: Request, res: Response) {
    try {
      const attendanceData = req.body;

      if (!attendanceData) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Attendance data is required.",
          },
        });
      }

      const now = new Date();
      const phDate = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      );
      const today = new Date(
        Date.UTC(phDate.getFullYear(), phDate.getMonth(), phDate.getDate()),
      );

      const payload = {
        employee: {
          connect: {
            employeeId: attendanceData.employeeId,
          },
        },
        status: attendanceData.status,
        attendanceDate: today,
        timeIn:
          attendanceData.status === "Present" ||
          attendanceData.status === "Late"
            ? new Date()
            : null,
      };

      const data = await attendanceService.addAttendance(payload);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("[attendance]: ", error);

      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while adding attendance.",
        },
      });
    }
  }

  async timeOutAttendance(req: Request, res: Response) {
    try {
      const now = new Date();
      const id = req.params.id as string;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Attendance ID is required.",
          },
        });
      }

      const data = await attendanceService.timeOutAttendance(id, now);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("[attendance]: ", error);

      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error happened while updating attendance.",
        },
      });
    }
  }
}
