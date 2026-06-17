/*model Employee {
  employeeId       String           @id @default(uuid()) @map("employee_id") @db.Uuid
  fullName         String           @map("full_name")
  email            String           @unique
  contactNumber    String?          @map("contact_number")
  position         String
  department       String
  dateHired        DateTime         @map("date_hired") @db.Date
  employmentStatus EmploymentStatus @default(Active) @map("employment_status")

  salary     Salary?
  attendance Attendance[]
  payroll    Payroll[]

  @@map("employees")
}*/

export const EmploymentStatus = {
  ACTIVE: "ACTIVE",
  ON_LEAVE: "ON_LEAVE",
  RESIGNED: "RESIGNED",
} as const;

export interface EmployeeType {
  fullName: string;
  email: string;
  contactNumber: string;
  position: string;
  department: string;
  employmentStatus: typeof EmploymentStatus;
}
