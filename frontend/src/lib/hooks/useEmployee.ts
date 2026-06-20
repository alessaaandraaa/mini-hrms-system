import { useState, useEffect } from "react";
import type { Employee, EmployeeFormType, AddEmployeePayload } from "../types";
import { errorToast } from "../utils";

export function useEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const employeeData = await res.json();
    setEmployees(employeeData.data);
    setLoading(false);
  };

  const fetchEmployee = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    const employeeData = await res.json();
    return employeeData.data;
  };

  const addEmployee = async (data: AddEmployeePayload) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    setLoading(true);
    await fetchEmployees();
  };

  const deleteEmployee = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      errorToast(errData);
      return;
    }

    setLoading(true);
    await fetchEmployees();
  };

  const editEmployee = async (id: string, data: EmployeeFormType) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
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
    await fetchEmployees();
  };

  return {
    employees,
    loading,
    fetchEmployee,
    fetchEmployees,
    addEmployee,
    deleteEmployee,
    editEmployee,
  };
}
