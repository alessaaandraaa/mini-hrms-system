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
import { EmployeeFormFields } from "./EmployeeFormFields";
import { employeeFormSchema, type EmployeeFormType } from "@/lib/types";

type EditEmployeeFormProps = {
  employeeId: string;
  employeeData: EmployeeFormType;
  onEditEmployee: (id: string, data: EmployeeFormType) => void;
};
export function EditEmployeeForm({
  employeeId,
  employeeData,
  onEditEmployee,
}: EditEmployeeFormProps) {
  const form = useForm<EmployeeFormType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullName: employeeData.fullName,
      email: employeeData.email,
      contactNumber: employeeData.contactNumber,
      position: employeeData.position,
      department: employeeData.department,
      dateHired: employeeData.dateHired.slice(0, 10),
    },
  });

  useEffect(() => {
    form.reset({
      ...employeeData,
      dateHired: employeeData.dateHired.slice(0, 10),
    });
  }, [employeeData]);

  const onSubmit = async (data: EmployeeFormType) => {
    onEditEmployee(employeeId, data);
  };

  return (
    <Card className="w-full sm:max-w-lg min-w-xl">
      <CardHeader>
        <CardTitle>EDIT EMPLOYEE</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-employee-form"
          className="flex flex-row gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <EmployeeFormFields form={form} />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="add-employee-form">
            Edit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
