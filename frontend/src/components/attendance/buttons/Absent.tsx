import type { AddAttendanceType, EmployeeAttendance } from "@/lib/types";

export default function AbsentButton({
  data,
  onAdd,
}: {
  data: EmployeeAttendance;
  onAdd: (data: AddAttendanceType) => void;
}) {
  async function markAbsent() {
    onAdd({
      employeeId: data.employeeId,
      status: "Absent",
    });
  }

  return (
    <button
      onClick={markAbsent}
      className="text-[15px] px-3 py-0 bg-red-100 text-red-800 rounded-full border border-red-200 hover:bg-red-200 cursor-pointer font-medium"
    >
      Absent
    </button>
  );
}
