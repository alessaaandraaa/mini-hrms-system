import express from "express";
import { EmployeeController } from "../controllers/employee.controller.ts";
import { authMiddleware } from "../lib/middleware.ts";
const router = express.Router();

const employeeController = new EmployeeController();

router.get(
  "/",
  authMiddleware,
  employeeController.getEmployees.bind(employeeController),
);
router.get(
  "/:id",
  authMiddleware,
  employeeController.getEmployee.bind(employeeController),
);
router.post(
  "/",
  authMiddleware,
  employeeController.addEmployee.bind(employeeController),
);
router.delete(
  "/:id",
  authMiddleware,
  employeeController.deleteEmployee.bind(employeeController),
);
router.put(
  "/:id",
  authMiddleware,
  employeeController.updateEmployee.bind(employeeController),
);

export default router;
