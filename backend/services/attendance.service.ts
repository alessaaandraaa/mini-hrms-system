import { prisma } from "../lib/prisma.ts";
import type { AttendanceCreateInput } from "../generated/prisma/models.ts";

export class AttendanceService {
  async getAttendance(date: string) {
    try {
      const attendances = await prisma.attendance.findMany({
        ...(date && { where: { attendanceDate: new Date(date) } }),
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
      const attendance = await prisma.attendance.upsert({
        where: {
          employeeId_attendanceDate: {
            employeeId: attendanceData.employee?.connect?.employeeId as string,
            attendanceDate: attendanceData.attendanceDate,
          },
        },
        update: {
          status: attendanceData.status,
          timeIn: attendanceData.timeIn ?? null,
        },
        create: attendanceData,
      });
      return attendance;
    } catch (error) {
      console.error("[attendance]: ", error);
      throw new Error(
        "[attendance]: An unexpected error occurred while adding attendance.",
      );
    }
  }

  async timeOutAttendance(id: string, timeOut: Date) {
    try {
      const updatedAttendance = await prisma.attendance.update({
        where: { attendanceId: id },
        data: {
          timeOut,
        },
      });

      return updatedAttendance;
    } catch (error) {
      console.error("[attendance]: ", error);
      throw new Error(
        "[attendance]: An unexpected error occurred while updating attendance.",
      );
    }
  }
}
