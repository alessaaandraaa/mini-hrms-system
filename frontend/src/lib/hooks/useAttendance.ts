import { useState, useEffect } from "react";
import type {
  AttendanceData,
  AddAttendanceType,
  EmployeeAttendance,
} from "../types";
import { errorToast } from "../utils";
export function useAttendance() {
  const [attendances, setAttendance] = useState<AttendanceData[]>([]);
  const [employeeAttendance, setEmployeeAttendance] = useState<
    EmployeeAttendance[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchEmployeeAttendance();
  }, []);

  const fetchAttendances = async (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/attendance?date=${formattedDate}`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const resData = await res.json();
    const attendanceData = resData.data.map((a: any) => ({
      ...a,
      fullName: a.employee?.fullName,
    }));

    setAttendance(attendanceData);
    setLoading(false);
  };

  const fetchEmployeeAttendance = async () => {
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/attendance`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const employeeAttendanceData = await res.json();
    setLoading(false);
    return setEmployeeAttendance(employeeAttendanceData.data);
  };

  const addAttendance = async (data: AddAttendanceType) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/attendance`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const now = new Date();
    const today = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
    );
    today.setHours(0, 0, 0, 0);

    setLoading(true);
    await fetchAttendances(today);
  };

  const timeOutAttendance = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/attendance/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const now = new Date();
    const today = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
    );
    today.setHours(0, 0, 0, 0);

    setLoading(true);
    await fetchAttendances(today);
  };

  return {
    attendances,
    loading,
    employeeAttendance,
    fetchEmployeeAttendance,
    fetchAttendances,
    addAttendance,
    timeOutAttendance,
  };
}
