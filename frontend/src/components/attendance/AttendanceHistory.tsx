"use client";
import { getColumns } from "./columns";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAttendance } from "@/lib/hooks/useAttendance";
import { AttendanceDataTable } from "./data-table";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function AttendanceHistory({ loading }: { loading: boolean }) {
  const { attendances, fetchAttendances } = useAttendance();
  const columns = getColumns("history");

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  const rows = attendances.map((a: any) => ({
    employeeId: a.employeeId,
    fullName: a.employee.fullName,
    attendance: a,
  }));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <Field className="items-start w-48">
          <InputGroup>
            <InputGroupInput
              id="date-required"
              value={value}
              placeholder="June 01, 2026"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setValue(e.target.value);
                if (isValidDate(date)) {
                  setDate(date);
                  setMonth(date);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <InputGroupButton
                    id="date-picker"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Select date"
                  >
                    <CalendarIcon />
                    <span className="sr-only">Select date</span>
                  </InputGroupButton>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      setValue(formatDate(date));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Button
          onClick={() => date && fetchAttendances(date)}
          className="py-0 text-sm bg-[#80645f] text-white"
        >
          CHECK FOR RECORDS
        </Button>
      </div>
      {loading ? (
        <div className="h-64 w-full rounded-md bg-muted animate-pulse" />
      ) : (
        <AttendanceDataTable columns={columns} data={rows} />
      )}
    </div>
  );
}
