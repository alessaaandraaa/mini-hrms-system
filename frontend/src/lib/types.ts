import { z } from "zod";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(5, "Password too short!"),
});

// ---- EMPLOYEE

export type Employee = {
  employeeId: string;
  fullName: string;
  email: string;
  contactNumber: string | null;
  position: string;
  department: string;
  dateHired: string;
  employmentStatus: "Active" | "Resigned" | "On_Leave";
};

export type EmployeeAttendance = {
  employeeId: string;
  fullName: string;
};

export const employeeFormSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  contactNumber: z.string(),
  position: z.string(),
  department: z.string(),
  dateHired: z.string(),
});

export type AddEmployeeFormType = z.infer<typeof addEmployeeSchema>;
export type EmployeeFormType = z.infer<typeof employeeFormSchema>;

// ---- SALARY
export type SalaryData = {
  employeeId: string;
  fullName: string;
  basicSalary: number;
  allowance: number;
  deductions: number;
  netSalary: number;
};

export const salaryFormSchema = z.object({
  basicSalary: z.number(),
  allowance: z.number(),
  deductions: z.number(),
});

export type SalaryFormType = z.infer<typeof salaryFormSchema>;

// ---- ATTENDANCE

export type AttendanceData = {
  employeeId: string;
  fullName: string;
  attendanceId: string;
  attendanceDate: Date;
  timeIn?: Date;
  timeOut?: Date;
  status: "Present" | "Late" | "Absent" | "On_Leave";
};

export type AddAttendanceType = {
  employeeId: string;
  timeIn?: Date;
  timeOut?: Date;
  status: "Present" | "Late" | "Absent" | "On_Leave";
};

export type AttendanceRow = {
  employeeId: string;
  fullName: string;

  attendance?: {
    attendanceDate?: string;
    status: "Present" | "Late" | "Absent" | "On_Leave";
    timeIn?: string;
    timeOut?: string;
    attendanceId?: string;
  };
};

// --- PAYROLL
export type PayrollType = {
  fullName: string;
  basicSalary: number;
  allowance: number;
  deductions: number;
  net_salary: number;
  payrollDate: string;
};

// --- DASHBOARD
export type DashboardType = {
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  estimatedMonthlyPayroll: number;
  totalMonthlyPayroll: number;
};

export type AddEmployeePayload = {
  employeeData: EmployeeFormType;
  salaryData: SalaryFormType;
};

export const addEmployeeSchema = employeeFormSchema.merge(salaryFormSchema);

export { formSchema };
