"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Employee, EmployeeFormType } from "@/lib/types";
import { EditEmployeeDialog } from "./EditEmployeeDialog";
import { DeleteEmployeeDialog } from "./DeleteEmployeeDialog";
export function getColumns(
  onDelete: (id: string) => void,
  onEdit: (id: string, data: EmployeeFormType) => void,
): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "dateHired",
      header: "Date Hired",
      cell: ({ row }) => {
        return new Date(row.getValue("dateHired")).toLocaleDateString("en-US");
      },
    },
    {
      accessorKey: "employmentStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("employmentStatus") as string;
        return status === "On_Leave" ? "On Leave" : status;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <>
          <DeleteEmployeeDialog
            id={row.original.employeeId}
            onDelete={onDelete}
          />
          <EditEmployeeDialog employee={row.original} onEdit={onEdit} />
        </>
      ),
    },
  ];
}
