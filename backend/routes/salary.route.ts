import express from "express";
import { SalaryController } from "../controllers/salary.controller.ts";
import { authMiddleware } from "../lib/middleware.ts";
const router = express.Router();
const salaryController = new SalaryController();

router.get(
  "/",
  authMiddleware,
  salaryController.getSalaries.bind(salaryController),
);
router.get(
  "/:id",
  authMiddleware,
  salaryController.getSalary.bind(salaryController),
);
router.put(
  "/:id",
  authMiddleware,
  salaryController.editSalary.bind(salaryController),
);

export default router;
