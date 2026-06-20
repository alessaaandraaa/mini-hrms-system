import { useState, useEffect } from "react";
import type { PayrollType } from "../types";
import { errorToast } from "../utils";

export function usePayroll() {
  const [payroll, setPayroll] = useState<PayrollType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payroll`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const resData = await res.json();
    const payrollData = resData.data.map((a: any) => ({
      ...a,
      fullName: a.employee?.fullName,
    }));

    setPayroll(payrollData);
    setLoading(false);
  };

  const generatePayroll = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payroll`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    setLoading(true);
    await fetchPayroll();
  };

  return {
    payroll,
    loading,
    fetchPayroll,
    generatePayroll,
  };
}
