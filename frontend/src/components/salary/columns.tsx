"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { SalaryData, SalaryFormType } from "@/lib/types";
import { EditSalaryDialog } from "./EditSalaryDialog";

export function getColumns(
  onEdit: (id: string, data: SalaryFormType) => void,
): ColumnDef<SalaryData>[] {
  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  return [
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "basicSalary",
      header: "Basic Salary",
      cell: ({ row }) => pesoFormatter.format(Number(row.original.basicSalary)),
    },
    {
      accessorKey: "allowance",
      header: "Allowance",
      cell: ({ row }) => pesoFormatter.format(Number(row.original.allowance)),
    },
    {
      accessorKey: "deductions",
      header: "Deductions",
      cell: ({ row }) => pesoFormatter.format(Number(row.original.deductions)),
    },
    {
      accessorKey: "netSalary",
      header: "Net Salary",
      cell: ({ row }) => pesoFormatter.format(Number(row.original.netSalary)),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <EditSalaryDialog salary={row.original} onEdit={onEdit} />
      ),
    },
  ];
}
