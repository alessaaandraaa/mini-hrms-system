"use client";

import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  SelectTrigger,
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

import type { Path } from "react-hook-form";

interface EmployeeFieldFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

export function EmployeeFormFields<T extends FieldValues>({
  form,
}: EmployeeFieldFormProps<T>) {
  const departments = [
    "IT",
    "Finance",
    "Marketing",
    "Customer Service",
    "Operations",
    "Human Resources",
    "Sales",
    "Management",
  ];

  return (
    <>
      <FieldGroup className="gap-2">
        <Controller
          name={"fullName" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-full-name">Full Name</FieldLabel>
              <Input
                {...field}
                id="form-add-full-name"
                aria-invalid={fieldState.invalid}
                placeholder="John E. Perez"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"email" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-add-email"
                aria-invalid={fieldState.invalid}
                placeholder="johnperez@alns.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={"contactNumber" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-contact-number">
                Contact Number
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-add-contact-number"
                aria-invalid={fieldState.invalid}
                placeholder="09XXXXXXXXX"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldGroup className="flex flex-row">
          <Controller
            name={"position" as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-add-position">Position</FieldLabel>
                <Input
                  {...field}
                  id="form-add-position"
                  aria-invalid={fieldState.invalid}
                  placeholder="Manager"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name={"department" as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="employee-select-dept">
                    Department
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="employee-select-dept"
                    aria-invalid={fieldState.invalid}
                    className="min-w-30"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </FieldGroup>

        <Controller
          name={"dateHired" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-task-date-hired">
                Date Hired
              </FieldLabel>
              <Input
                {...field}
                id="form-add-task-date-hired"
                aria-invalid={fieldState.invalid}
                type="date"
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
