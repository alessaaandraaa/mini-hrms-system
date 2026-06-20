"use client";

import { Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import type { Path } from "react-hook-form";

import type { UseFormReturn, FieldValues } from "react-hook-form";

interface SalaryFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

export function SalaryFormFields<T extends FieldValues>({
  form,
}: SalaryFormFieldProps<T>) {
  return (
    <>
      <FieldGroup className="gap-2">
        <Controller
          name={"basicSalary" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-basic-salary">
                Basic Salary
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-add-basic-salary"
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="20000"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"allowance" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-allowance">Allowance</FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-add-allowance"
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="1500"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"deductions" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-deductions">Deductions</FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-add-deductions"
                aria-invalid={fieldState.invalid}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="1000"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
}
