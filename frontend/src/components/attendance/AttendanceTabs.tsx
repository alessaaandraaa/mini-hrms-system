import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAttendance } from "@/lib/hooks/useAttendance";
import { AttendanceHistory } from "./AttendanceHistory";
import AttendanceTable from "./page";
export function AttendanceTabs() {
  const {
    attendances,
    employeeAttendance,
    fetchAttendances,
    addAttendance,
    timeOutAttendance,
    loading,
  } = useAttendance();

  const now = new Date();
  const phDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
  );
  const today = new Date(
    Date.UTC(phDate.getFullYear(), phDate.getMonth(), phDate.getDate()),
  );

  useEffect(() => {
    fetchAttendances(today);
  }, []);

  console.log("ATTENDANCE FOR: ", today);
  const rows = employeeAttendance.map((emp) => {
    const attendance = attendances.find((a) => a.employeeId === emp.employeeId);

    return {
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      attendance: attendance ?? undefined,
    };
  });

  console.log("ATTENDANCES: ", rows);

  return (
    <Tabs defaultValue="today" className="w-full">
      <TabsList>
        <TabsTrigger value="today">Today's Attendance</TabsTrigger>
        <TabsTrigger value="history">Attendance History</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        {loading ? (
          <div className="h-64 w-full rounded-md bg-muted animate-pulse mt-4" />
        ) : (
          <AttendanceTable
            data={rows}
            onTimeOut={timeOutAttendance}
            onAdd={addAttendance}
          />
        )}
      </TabsContent>
      <TabsContent value="history">
        <AttendanceHistory loading={loading} />
      </TabsContent>
    </Tabs>
  );
}
