import type { PayrollType } from "@/lib/types";
import { getColumns } from "./columns";
import { PayrollDataTable } from "./data-table";
export default function PayrollTable({ data }: { data: PayrollType[] }) {
  const columns = getColumns();
  return (
    <div className="w-full py-5">
      <PayrollDataTable columns={columns} data={data} />
    </div>
  );
}
