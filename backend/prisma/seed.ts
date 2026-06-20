import { prisma } from "../lib/prisma.ts";
import { auth } from "../lib/auth.ts";
import { EmploymentStatus } from "../generated/prisma/client.js";
// ---------------- EMPLOYEES ----------------
const employees = [
  {
    employee_id: "c83e1c7e-4dc5-417d-a638-d420693aa5a2",
    full_name: "Maria Santos",
    email: "maria.santos@alns.com",
    contact_number: "09171234567",
    position: "HR Officer",
    department: "Human Resources",
    date_hired: new Date("2024-08-15"),
    employment_status: "Active",
  },
  {
    employee_id: "0a518bb0-a130-4f78-a84c-ca6f2b76b708",
    full_name: "Juan Dela Cruz",
    email: "juan.delacruz@alns.com",
    contact_number: "09181234567",
    position: "Software Developer",
    department: "IT",
    date_hired: new Date("2025-01-10"),
    employment_status: "Active",
  },
  {
    employee_id: "f4061a0e-3176-4236-bcfb-95e5b1fc8f23",
    full_name: "Mark Villanueva",
    email: "mark.villanueva@alns.com",
    contact_number: "09203456789",
    position: "Sales Associate",
    department: "Sales",
    date_hired: new Date("2024-03-12"),
    employment_status: "Active",
  },
  {
    employee_id: "83d6c713-6a5e-433c-b5a9-d3d5990a5606",
    full_name: "Patricia Gomez",
    email: "patricia.gomez@alns.com",
    contact_number: "09214567890",
    position: "Operations Manager",
    department: "Operations",
    date_hired: new Date("2022-11-01"),
    employment_status: "Active",
  },
  {
    employee_id: "7542567e-dfd9-4a52-81bb-b5b1a988452b",
    full_name: "Kevin Lim",
    email: "kevin.lim@alns.com",
    contact_number: "09225678901",
    position: "UI/UX Designer",
    department: "IT",
    date_hired: new Date("2025-02-18"),
    employment_status: "Active",
  },
  {
    employee_id: "bed8fc10-2b61-4e43-8e42-59d4143d5291",
    full_name: "Samantha Cruz",
    email: "samantha.cruz@alns.com",
    contact_number: "09236789012",
    position: "Recruitment Specialist",
    department: "Human Resources",
    date_hired: new Date("2024-07-08"),
    employment_status: "On_Leave",
  },
  {
    employee_id: "c7778634-e823-428d-969a-2cefbdc9dfe3",
    full_name: "Rafael Navarro",
    email: "rafael.navarro@alns.com",
    contact_number: "09247890123",
    position: "Business Analyst",
    department: "Operations",
    date_hired: new Date("2023-09-14"),
    employment_status: "Active",
  },
  {
    employee_id: "7a86221e-9682-4afd-aab8-a9137f1d6efb",
    full_name: "Nicole Garcia",
    email: "nicole.garcia@alns.com",
    contact_number: "09258901234",
    position: "Customer Support Representative",
    department: "Customer Service",
    date_hired: new Date("2025-04-25"),
    employment_status: "Resigned",
  },
  {
    employee_id: "2cf36504-8d4f-4401-9004-47c16bbaec0e",
    full_name: "Em R. Tan",
    email: "emtan@gmail.com",
    contact_number: "09125678901",
    position: "IT Manager",
    department: "IT",
    date_hired: new Date("2026-06-19"),
    employment_status: "Active",
  },
  {
    employee_id: "7a014999-e482-424d-86cb-d734cf45f852",
    full_name: "John E. Perez",
    email: "johnnyperez@alns.com",
    contact_number: "09298765100",
    position: "Marketing Specialist",
    department: "Marketing",
    date_hired: new Date("2025-12-05"),
    employment_status: "Active",
  },
];

// ---------------- SALARIES ----------------
const salaries = [
  {
    employee_id: "7a014999-e482-424d-86cb-d734cf45f852",
    basic: 25000,
    allowance: 3000,
    deductions: 500,
  },
  {
    employee_id: "c83e1c7e-4dc5-417d-a638-d420693aa5a2",
    basic: 32000,
    allowance: 4000,
    deductions: 800,
  },
  {
    employee_id: "0a518bb0-a130-4f78-a84c-ca6f2b76b708",
    basic: 40000,
    allowance: 5000,
    deductions: 1200,
  },
  {
    employee_id: "f4061a0e-3176-4236-bcfb-95e5b1fc8f23",
    basic: 45000,
    allowance: 5500,
    deductions: 1500,
  },
  {
    employee_id: "83d6c713-6a5e-433c-b5a9-d3d5990a5606",
    basic: 50000,
    allowance: 6000,
    deductions: 1800,
  },
  {
    employee_id: "7542567e-dfd9-4a52-81bb-b5b1a988452b",
    basic: 55000,
    allowance: 7000,
    deductions: 2000,
  },
  {
    employee_id: "bed8fc10-2b61-4e43-8e42-59d4143d5291",
    basic: 60000,
    allowance: 8000,
    deductions: 2500,
  },
  {
    employee_id: "c7778634-e823-428d-969a-2cefbdc9dfe3",
    basic: 75000,
    allowance: 10000,
    deductions: 3000,
  },
  {
    employee_id: "7a86221e-9682-4afd-aab8-a9137f1d6efb",
    basic: 25000,
    allowance: 1000,
    deductions: 750,
  },
  {
    employee_id: "2cf36504-8d4f-4401-9004-47c16bbaec0e",
    basic: 30000,
    allowance: 3500,
    deductions: 700,
  },
];

async function main() {
  console.log("Seeding admin user...");

  await auth.api.signUpEmail({
    body: {
      email: "admin@test.com",
      password: "admin123",
      name: "Admin",
    },
  });

  console.log("Seeding employees...");

  // EMPLOYEES FIRST
  for (const emp of employees) {
    await prisma.employee.upsert({
      where: { employeeId: emp.employee_id },
      update: {},
      create: {
        employeeId: emp.employee_id,
        fullName: emp.full_name,
        email: emp.email,
        contactNumber: emp.contact_number,
        position: emp.position,
        department: emp.department,
        dateHired: emp.date_hired,
        employmentStatus: emp.employment_status as EmploymentStatus,
      },
    });
  }

  console.log("Seeding salaries...");

  // SALARIES SECOND
  for (const sal of salaries) {
    await prisma.salary.upsert({
      where: {
        employeeId: sal.employee_id,
      },
      update: {},
      create: {
        employeeId: sal.employee_id,
        basicSalary: sal.basic,
        allowance: sal.allowance,
        deductions: sal.deductions,
      },
    });
  }

  console.log("Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
