import { getColumns } from "./columns";
import { AttendanceDataTable } from "./data-table";
import type { EmployeeAttendance, AddAttendanceType } from "@/lib/types";

type AttendanceTableProps = {
  data: EmployeeAttendance[];
  onTimeOut: (id: string) => void;
  onAdd: (data: AddAttendanceType) => void;
};

export default function AttendanceTable({
  data,
  onTimeOut,
  onAdd,
}: AttendanceTableProps) {
  const columns = getColumns("today", {
    onAdd,
    onTimeOut,
  });

  return (
    <div className="w-full py-5">
      <AttendanceDataTable columns={columns} data={data} />
    </div>
  );
}
