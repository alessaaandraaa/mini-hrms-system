import type { PayrollType } from "@/lib/types";
import PayrollTable from "./page";
import GeneratePayrollDialog from "./GeneratePayrollDialog";
export default function PayrollContainer({
  payroll,
  onGenerate,
  loading,
}: {
  payroll: PayrollType[];
  onGenerate: () => void;
  loading: boolean;
}) {
  const now = new Date();
  const manilaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
  );

  const year = manilaTime.getFullYear();
  const monthNum = manilaTime.getMonth() + 1;

  if (loading)
    return (
      <div className="h-64 w-full rounded-md bg-muted animate-pulse mt-8" />
    );

  if (payroll.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <p>
          No payroll found for {monthNum}/{year}.
        </p>
        <GeneratePayrollDialog
          month={monthNum}
          year={year}
          onGenerate={onGenerate}
        />
      </div>
    );
  }

  return (
    <div>
      <p className="font-bold text-xl text-[#80645f]">
        Payroll Summary for {monthNum}/{year}
      </p>
      <PayrollTable data={payroll} />
    </div>
  );
}
