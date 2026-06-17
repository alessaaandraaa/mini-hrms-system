import { prisma } from "../lib/prisma.ts";
import type { AttendanceCreateInput } from "../generated/prisma/models.ts";

export class AttendanceService {
  async getAttendance(date: string) {
    try {
      const attendances = await prisma.attendance.findMany({
        ...(date && { where: { attendanceDate: new Date(date) } }),
      });
      return attendances;
    } catch (error) {
      console.error("[attendance]: ", error);
      throw new Error(
        "[attendance]: An unexpected error occurred while finding attendance.",
      );
    }
  }

  async addAttendance(attendanceData: AttendanceCreateInput) {
    try {
      const attendance = await prisma.attendance.create({
        data: attendanceData,
      });

      return attendance;
    } catch (error) {
      console.error("[attendance]: ", error);
      throw new Error(
        "[attendance]: An unexpected error occurred while adding attendance.",
      );
    }
  }
}
