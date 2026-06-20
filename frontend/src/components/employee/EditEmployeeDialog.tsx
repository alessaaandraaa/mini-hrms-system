import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditEmployeeForm } from "./EditEmployeeForm";
import type { Employee, EmployeeFormType } from "@/lib/types";

export function EditEmployeeDialog({
  employee,
  onEdit,
}: {
  employee: Employee;
  onEdit: (id: string, data: EmployeeFormType) => void;
}) {
  const { employeeId, ...rest } = employee;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs! py-0.5!">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm min-w-156 focus:ring-0 focus:outline-none [&>button]:bg-white [&>button]:border [&>button]:border-gray-200">
        <EditEmployeeForm
          employeeId={employeeId}
          employeeData={{
            ...rest,
            contactNumber: rest.contactNumber ?? "",
          }}
          onEditEmployee={(id, data) => onEdit(id, data)}
        />
      </DialogContent>
    </Dialog>
  );
}
