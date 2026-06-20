import express from "express";
import { PayrollController } from "../controllers/payroll.controller.ts";
import { authMiddleware } from "../lib/middleware.ts";
const router = express.Router();
const payrollController = new PayrollController();

router.get(
  "/",
  authMiddleware,
  payrollController.getPayrolls.bind(payrollController),
);

router.post(
  "/",
  authMiddleware,
  payrollController.addPayrolls.bind(payrollController),
);

export default router;
