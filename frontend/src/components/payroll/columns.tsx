"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { PayrollType } from "@/lib/types";

export function getColumns(): ColumnDef<PayrollType>[] {
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
      accessorKey: "net_salary",
      header: "Net Salary",
      cell: ({ row }) => pesoFormatter.format(Number(row.original.net_salary)),
    },
    {
      accessorKey: "payrollDate",
      header: "Payroll Date",
      cell: ({ row }) =>
        new Date(row.original.payrollDate).toLocaleDateString("en-PH", {
          timeZone: "Asia/Manila",
        }),
    },
  ];
}
