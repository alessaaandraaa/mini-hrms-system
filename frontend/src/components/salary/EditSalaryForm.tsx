"use client";

import { useEffect } from "react";
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
import { SalaryFormFields } from "./SalaryFormFields";
import { type SalaryFormType, salaryFormSchema } from "@/lib/types";

type EditSalaryFormProps = {
  employeeId: string;
  salaryData: SalaryFormType;
  onEditSalary: (id: string, data: SalaryFormType) => void;
};

export function EditSalaryForm({
  employeeId,
  salaryData,
  onEditSalary,
}: EditSalaryFormProps) {
  const form = useForm<SalaryFormType>({
    resolver: zodResolver(salaryFormSchema),
    defaultValues: {
      basicSalary: Number(salaryData.basicSalary),
      allowance: Number(salaryData.allowance),
      deductions: Number(salaryData.deductions),
    },
  });

  useEffect(() => {
    form.reset({
      basicSalary: Number(salaryData.basicSalary),
      allowance: Number(salaryData.allowance),
      deductions: Number(salaryData.deductions),
    });
  }, [salaryData]);

  const onSubmit = async (data: SalaryFormType) => {
    const payload = {
      basicSalary: Number(data.basicSalary),
      allowance: Number(data.allowance),
      deductions: Number(data.deductions),
    };

    onEditSalary(employeeId, payload);
  };

  return (
    <Card className="w-full border-none! shadow-none! focus:ring-0! focus:outline-none!">
      <CardHeader>
        <CardTitle>EDIT SALARY</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="edit-salary-form"
          className="flex flex-row gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <SalaryFormFields form={form} />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="edit-salary-form">
            Edit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
