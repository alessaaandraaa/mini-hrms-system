import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DialogProps = {
  month: number;
  year: number;
  onGenerate: () => void;
};
export default function GeneratePayrollDialog({
  month,
  year,
  onGenerate,
}: DialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          Generate Payroll for {month}/{year}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate Payroll?</AlertDialogTitle>
          <AlertDialogDescription>
            This will create a payroll snapshot based on current salary data.
            Any salary changes made after this will not be reflected.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onGenerate()}>
            Generate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
