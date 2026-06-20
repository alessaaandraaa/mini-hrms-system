"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AddAttendanceType } from "@/lib/types";
import type { AttendanceRow } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";
import AbsentButton from "./buttons/Absent";
import LateButton from "./buttons/Late";
import OnLeaveButton from "./buttons/On_Leave";
import PresentButton from "./buttons/Present";
import TimeOutButton from "./buttons/TimeOut";

export function getColumns(
  mode: "today" | "history",
  handlers?: {
    onTimeOut: (id: string) => void;
    onAdd: (data: AddAttendanceType) => void;
  },
): ColumnDef<AttendanceRow>[] {
  function formatToPHTime(date?: string | Date | null) {
    if (!date) return "--";

    return new Date(date).toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return [
    {
      accessorKey: "fullName",
      header: "Name",
    },

    {
      header: "Date",
      cell: ({ row }) => {
        const a = row.original.attendance;

        return (
          <>
            {a?.attendanceDate
              ? new Date(a.attendanceDate).toLocaleDateString("en-PH", {
                  timeZone: "Asia/Manila",
                })
              : "--"}
          </>
        );
      },
    },

    {
      header: "Time In",
      cell: ({ row }) => {
        const a = row.original.attendance;
        return <>{formatToPHTime(a?.timeIn) ?? "--"}</>;
      },
    },

    {
      header: "Time Out",
      cell: ({ row }) => {
        const a = row.original.attendance;
        return <>{formatToPHTime(a?.timeOut) ?? "--"}</>;
      },
    },

    {
      header: "Status",
      cell: ({ row }) => {
        const a = row.original.attendance;
        const status = a?.status;

        const statusStyles: Record<string, string> = {
          Present: "bg-green-100 text-green-800",
          Late: "bg-yellow-100 text-yellow-800",
          Absent: "bg-red-100 text-red-800",
          On_Leave: "bg-gray-100 text-gray-800",
        };

        return (
          <>
            {status ? (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
              >
                {status === "On_Leave" ? "On Leave" : status}
              </span>
            ) : (
              "--"
            )}
          </>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;
        const a = employee.attendance;

        if (mode === "history") {
          return (
            <>
              <span>—</span>
            </>
          );
        }

        const onAdd = handlers?.onAdd;
        const onTimeOut = handlers?.onTimeOut;

        return (
          <>
            {/* NOT YET MARKED */}
            {!a && onAdd && (
              <div className="flex gap-2">
                <PresentButton data={employee} onAdd={onAdd} />
                <LateButton data={employee} onAdd={onAdd} />
                <AbsentButton data={employee} onAdd={onAdd} />
                <OnLeaveButton data={employee} onAdd={onAdd} />
              </div>
            )}

            {/* ACTIVE (needs timeout) */}
            {a &&
              (a.status === "Present" || a.status === "Late") &&
              !a.timeOut &&
              a.attendanceId &&
              onTimeOut && (
                <TimeOutButton
                  attendanceId={a.attendanceId}
                  onTimeOut={onTimeOut}
                />
              )}

            {/* FINAL */}
            {a &&
              (a.status === "Absent" ||
                a.status === "On_Leave" ||
                a.timeOut) && (
                <span className="align-middle flex gap-2 ">
                  <CheckCircle2 className="text-green-500" />
                </span>
              )}
          </>
        );
      },
    },
  ];
}
