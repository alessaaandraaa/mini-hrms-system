import EmployeesTable from "@/components/employee/page";

import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { useEmployee } from "@/lib/hooks/useEmployee";

export default function Employees() {
  const { employees, loading, addEmployee, deleteEmployee, editEmployee } =
    useEmployee();

  return (
    <>
      <div className="text-5xl font-extrabold text-[#80645f] mb-2">
        EMPLOYEES LIST
      </div>
      <hr className="mb-2" />
      <AddEmployeeDialog onAdd={addEmployee} />
      {loading ? (
        <div className="h-64 w-full rounded-md bg-muted animate-pulse mt-4" />
      ) : (
        <EmployeesTable
          data={employees ?? []}
          onDelete={deleteEmployee}
          onEdit={editEmployee}
        />
      )}
    </>
  );
}
