import express from "express";
import { PayrollController } from "../controllers/payroll.controller.ts";
import { authMiddleware } from "../lib/middleware.ts";
const router = express.Router();
const payrollController = new PayrollController();

router.get(
  "/:id",
  authMiddleware,
  payrollController.getPayroll.bind(payrollController),
);
router.post(
  "/:id",
  authMiddleware,
  payrollController.addPayroll.bind(payrollController),
);

export default router;
