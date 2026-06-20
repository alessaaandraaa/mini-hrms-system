import { usePayroll } from "@/lib/hooks/usePayroll";
import PayrollContainer from "@/components/payroll/PayrollContainer";
export default function Payroll() {
  const { payroll, generatePayroll, loading } = usePayroll();

  return (
    <>
      <div className="text-5xl font-extrabold text-[#80645f] mb-2">PAYROLL</div>
      <hr className="mb-2" />
      <PayrollContainer
        payroll={payroll}
        onGenerate={generatePayroll}
        loading={loading}
      />
    </>
  );
}
