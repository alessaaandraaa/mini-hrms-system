import { getColumns } from "./columns";
import { DataTable } from "../employee/data-table";
import type { SalaryData, SalaryFormType } from "@/lib/types";

type SalaryTableProps = {
  data: SalaryData[];
  onEdit: (id: string, data: SalaryFormType) => void;
};

export default function SalariesTable({ data, onEdit }: SalaryTableProps) {
  const columns = getColumns(onEdit);

  return (
    <div className="w-full py-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
