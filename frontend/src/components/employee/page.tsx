import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import type { Employee, EmployeeFormType } from "@/lib/types";

type EmployeesTableProps = {
  data: Employee[];
  onDelete: (id: string) => void;
  onEdit: (id: string, data: EmployeeFormType) => void;
};

export default function EmployeesTable({
  data,
  onDelete,
  onEdit,
}: EmployeesTableProps) {
  const columns = getColumns(onDelete, onEdit);

  return (
    <div className="w-full py-5 overflow-x-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
