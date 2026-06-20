import SalariesTable from "@/components/salary/page";
import { useSalary } from "@/lib/hooks/useSalary";

export default function Salary() {
  const { salaries, loading, editSalary } = useSalary();

  return (
    <>
      <div className="text-5xl font-extrabold text-[#80645f] mb-2">
        EMPLOYEE SALARIES
      </div>
      <hr className="mb-2" />
      {loading ? (
        <div className="h-64 w-full rounded-md bg-muted animate-pulse mt-8" />
      ) : (
        <SalariesTable data={salaries ?? []} onEdit={editSalary} />
      )}
    </>
  );
}
