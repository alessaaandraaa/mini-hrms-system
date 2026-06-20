import { useState, useEffect } from "react";
import type { SalaryData, SalaryFormType } from "../types";
import { errorToast } from "../utils";

export function useSalary() {
  const [salaries, setSalaries] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/salary`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const resData = await res.json();
    const salaryData = resData.data.map((salary: any) => ({
      ...salary,
      fullName: salary.employee?.fullName,
      netSalary:
        Number(salary.basicSalary) +
        Number(salary.allowance) -
        Number(salary.deductions),
    }));

    setSalaries(salaryData);
    setLoading(false);
  };

  const fetchSalary = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/salary/${id}`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const salaryData = await res.json();
    return salaryData.data;
  };

  const editSalary = async (id: string, data: SalaryFormType) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/salary/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    setLoading(true);
    await fetchSalaries();
  };

  return {
    salaries,
    loading,
    fetchSalary,
    fetchSalaries,
    editSalary,
  };
}
