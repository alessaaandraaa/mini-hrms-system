import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "./lib/auth.ts";
import { toNodeHandler } from "better-auth/node";

import employeeRouter from "./routes/employee.route.ts";
import salaryRouter from "./routes/salary.route.ts";
import payrollRouter from "./routes/payroll.route.ts";
import attendanceRouter from "./routes/attendance.route.ts";
import dashboardRouter from "./routes/dashboard.route.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/employees", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/payroll", payrollRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});

export default app;
