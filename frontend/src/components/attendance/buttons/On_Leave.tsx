import type { AddAttendanceType, EmployeeAttendance } from "@/lib/types";

export default function OnLeaveButton({
  data,
  onAdd,
}: {
  data: EmployeeAttendance;
  onAdd: (data: AddAttendanceType) => void;
}) {
  async function markOnLeave() {
    onAdd({
      employeeId: data.employeeId,
      status: "On_Leave",
    });
  }

  return (
    <button
      onClick={markOnLeave}
      className="text-[15px] px-3 py-0 bg-gray-100 text-gray-800 rounded-full border border-gray-200 hover:bg-gray-200 cursor-pointer font-medium"
    >
      On Leave
    </button>
  );
}
