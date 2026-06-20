import { AttendanceTabs } from "@/components/attendance/AttendanceTabs";

export default function Attendance() {
  return (
    <div>
      <div className="text-5xl font-extrabold text-[#80645f] mb-2">
        MANAGE ATTENDANCE
      </div>
      <hr className="mb-2"></hr>
      <AttendanceTabs />
    </div>
  );
}
