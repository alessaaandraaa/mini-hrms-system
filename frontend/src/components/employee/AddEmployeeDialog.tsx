import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddEmployeeForm } from "./AddEmployeeForm";
import type { AddEmployeePayload } from "@/lib/types";

export function AddEmployeeDialog({
  onAdd,
}: {
  onAdd: (data: AddEmployeePayload) => void;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="py-0 text-sm bg-[#80645f] text-white"
          >
            Add Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm min-w-140 focus:ring-0 focus:outline-none [&>button]:bg-white [&>button]:border [&>button]:border-gray-200">
          <AddEmployeeForm onAdd={onAdd} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
