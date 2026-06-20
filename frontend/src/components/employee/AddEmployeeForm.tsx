"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { EmployeeFormFields } from "./EmployeeFormFields";
import { SalaryFormFields } from "../salary/SalaryFormFields";
import {
  addEmployeeSchema,
  type AddEmployeeFormType,
  type AddEmployeePayload,
} from "@/lib/types";

export function AddEmployeeForm({
  onAdd,
}: {
  onAdd: (data: AddEmployeePayload) => void;
}) {
  const form = useForm<AddEmployeeFormType>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNumber: "",
      position: "",
      department: "",
      dateHired: new Date().toISOString().slice(0, 10),
      basicSalary: 0,
      allowance: 0,
      deductions: 0,
    },
  });

  const onSubmit = async (data: AddEmployeeFormType) => {
    const { basicSalary, allowance, deductions, ...employeeData } = data;

    const payload = {
      employeeData,
      salaryData: {
        basicSalary: Number(basicSalary),
        allowance: Number(allowance),
        deductions: Number(deductions),
      },
    };

    onAdd(payload);
  };

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>ADD NEW EMPLOYEE</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-employee-form"
          className="flex flex-row gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <EmployeeFormFields form={form} />
          <SalaryFormFields form={form} />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="add-employee-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
