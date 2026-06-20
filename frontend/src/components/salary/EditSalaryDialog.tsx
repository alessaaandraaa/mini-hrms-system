import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditSalaryForm } from "./EditSalaryForm";
import type { SalaryData, SalaryFormType } from "@/lib/types";

export function EditSalaryDialog({
  salary,
  onEdit,
}: {
  salary: SalaryData;
  onEdit: (id: string, data: SalaryFormType) => void;
}) {
  const id = salary.employeeId;
  const { basicSalary, allowance, deductions } = salary;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm" className="m-0.5 px-5!">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="focus:ring-0 focus:outline-none [&>button]:bg-white [&>button]:border [&>button]:border-gray-200">
        <EditSalaryForm
          employeeId={id}
          salaryData={{
            basicSalary,
            allowance,
            deductions,
          }}
          onEditSalary={(id, data) => onEdit(id, data)}
        />
      </DialogContent>
    </Dialog>
  );
}
